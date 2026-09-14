import { expect, test, type Page } from "@playwright/test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Compare actual colors on animation frames: matching CSS durations alone misses
// instant changes and a second transition on an inherited/currentColor value.
async function measureThemeSwitch(page: Page) {
  // Opening the menu has its own animation; measure the theme from rest.
  await page.evaluate(async () => {
    let running;
    do {
      running = document.getAnimations().filter((animation) => animation.playState === "running");
      // Focus/hover changes can cancel a transition while the menu opens.
      await Promise.allSettled(running.map((animation) => animation.finished));
    } while (running.length);
  });
  return page.evaluate(async () => {
    const color = (value: string) => {
      const srgb = value.match(/^color\(srgb\s+([^)]+)\)$/);
      const match = srgb || value.match(/^rgba?\(([^)]+)\)$/);
      return match
        ? match[1]!
            .split(/[,\s/]+/)
            .map(Number)
            .slice(0, 3)
            .map((channel) => channel * (srgb ? 255 : 1))
        : null;
    };
    const targets: { element: Element; pseudo: string | null; property: string; label: string }[] =
      [];
    for (const element of document.querySelectorAll("body, body *")) {
      if (!(element instanceof HTMLElement || element instanceof SVGElement)) continue;
      if (!element.getClientRects().length || getComputedStyle(element).visibility === "hidden")
        continue;
      for (const pseudo of [null, "::before", "::after", "::marker"]) {
        const style = getComputedStyle(element, pseudo);
        if (pseudo === "::marker") {
          if (getComputedStyle(element).display !== "list-item" || style.listStyleType === "none")
            continue;
        } else if (pseudo && (style.content === "none" || style.content === "normal")) continue;
        const properties = ["color", "background-color", "fill", "stroke"];
        for (const side of ["top", "right", "bottom", "left"]) {
          if (parseFloat(style.getPropertyValue(`border-${side}-width`)) > 0)
            properties.push(`border-${side}-color`);
        }
        if (style.outlineStyle !== "none") properties.push("outline-color");
        if (style.textDecorationLine !== "none") properties.push("text-decoration-color");
        for (const property of properties) {
          if (color(style.getPropertyValue(property)))
            targets.push({
              element,
              pseudo,
              property,
              label: `${element.tagName}.${element.getAttribute("class") || ""}${pseudo || ""}:${property}`,
            });
        }
      }
    }
    const snapshot = () =>
      targets.map(({ element, pseudo, property }) =>
        color(getComputedStyle(element, pseudo).getPropertyValue(property))!
      );
    const before = snapshot();
    (document.querySelector("#theme-toggle") as HTMLButtonElement).click();
    const activeLink = document.querySelector('nav a[aria-current="page"]')!;
    const frames: {
      time: number;
      colors: number[][];
      accent: string;
      labelColor: string;
      underlineColor: string;
    }[] = [];
    const start = performance.now();
    await new Promise<void>((resolve) => {
      function frame() {
        frames.push({
          time: performance.now() - start,
          colors: snapshot(),
          accent: getComputedStyle(document.documentElement).getPropertyValue("--accent"),
          labelColor: getComputedStyle(activeLink.firstElementChild!).color,
          underlineColor: getComputedStyle(activeLink, "::after").backgroundColor,
        });
        if (performance.now() - start < 600) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
    const after = snapshot();
    const bodyIndex = targets.findIndex(
      ({ element, property }) => element === document.body && property === "background-color"
    );
    const progress = (index: number, values: number[]) => {
      const from = before[index]!;
      const to = after[index]!;
      const delta = to.map((value, channel) => value - from[channel]!);
      const distance = delta.reduce((total, value) => total + value * value, 0);
      return distance < 400
        ? null
        : values.reduce(
            (total, value, channel) => total + (value - from[channel]!) * delta[channel]!,
            0
          ) / distance;
    };
    const mismatches: { label: string; time: number; progress: number; expected: number }[] = [];
    let sampledFrames = 0;
    for (const frame of frames) {
      const expected = progress(bodyIndex, frame.colors[bodyIndex]!)!;
      // Include settled frames: restoring local transitions used to cause a
      // second color transition after the root palette had already finished.
      if (expected < 0.08) continue;
      sampledFrames++;
      frame.colors.forEach((values, index) => {
        const actual = progress(index, values);
        if (actual !== null && Math.abs(actual - expected) > 0.04)
          mismatches.push({
            label: targets[index]!.label,
            time: frame.time,
            progress: actual,
            expected,
          });
      });
    }
    return {
      sampledFrames,
      mismatches: mismatches.slice(0, 20),
      activeMismatches: frames
        .filter(({ accent, labelColor, underlineColor }) =>
          [labelColor, underlineColor].some((value) => {
            const actual = color(value);
            const expected = color(accent);
            // color-mix serializes as color(srgb), while the palette uses rgb().
            return (
              !actual ||
              !expected ||
              actual.some((channel, index) => Math.abs(channel - expected[index]!) > 1)
            );
          })
        )
        .map(({ time, accent, labelColor, underlineColor }) => ({
          time,
          accent,
          labelColor,
          underlineColor,
        })),
      changedColors: after.filter((value, index) => progress(index, value) !== null).length,
    };
  });
}

test("synchronizes theme colors in settings, icons, menu and banner", async ({ context, page }) => {
  await context.addCookies([{ name: "theme", value: "light", url: "http://127.0.0.1:3100" }]);
  for (const path of ["/ru/settings", "/en/settings"]) {
    await page.setViewportSize({ width: path === "/ru/settings" ? 390 : 1280, height: 900 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
    if (path === "/ru/settings") await page.getByRole("button", { name: "Разделы" }).click();
    for (const direction of ["dark", "light"]) {
      const result = await measureThemeSwitch(page);
      expect(result.sampledFrames, `${path} → ${direction}`).toBeGreaterThan(0);
      expect(result.changedColors).toBeGreaterThan(20);
      expect(result.mismatches, `${path} → ${direction}`).toEqual([]);
      expect(result.activeMismatches, `${path} → ${direction}: active navigation color`).toEqual(
        []
      );
      await expect(page.locator("html")).toHaveCSS("color-scheme", direction);
    }
  }
});

test("keeps visited navigation text accented throughout a theme change", async ({
  playwright,
  browserName,
  channel,
  baseURL,
}, testInfo) => {
  test.skip(browserName !== "chromium", "Regression for Chromium's visited-link paint");
  // The usual isolated contexts do not retain visited-link history, and
  // getComputedStyle deliberately hides visited colors. Compare painted pixels
  // in a disposable persistent profile instead of inspecting CSS values.
  const profile = await mkdtemp(join(tmpdir(), "svitya-visited-theme-"));
  const context = await playwright.chromium.launchPersistentContext(profile, {
    baseURL,
    channel,
    viewport: { width: 1280, height: 900 },
  });
  try {
    await context.addCookies([
      { name: "theme", value: "light", url: baseURL! },
      { name: "analytics_consent", value: "denied", url: baseURL! },
    ]);
    const page = await context.newPage();
    await page.goto("/ru/settings");
    await page.goto("/ru/about");
    await page.locator('nav a[href="/ru/settings"]').click();
    await expect(page).toHaveURL("/ru/settings");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
    const link = page.locator('nav a[aria-current="page"]');
    const label = link.locator("span");
    for (const theme of ["dark", "light"]) {
      await page.locator("#theme-toggle").click();
      const count = await page.evaluate(() => {
        const animations = document.documentElement.getAnimations();
        animations.forEach((animation) => {
          animation.pause();
          animation.currentTime = 0;
        });
        return animations.length;
      });
      expect(count).toBeGreaterThan(0);
      for (const time of [0, 55, 110, 180]) {
        await page.evaluate((time) => {
          document.documentElement.getAnimations().forEach((animation) => {
            animation.currentTime = time;
          });
        }, time);
        const visited = await label.screenshot();
        // The same text without link history is our reference at this exact
        // palette frame. Removing href preserves layout and active selection.
        await link.evaluate((element) => element.removeAttribute("href"));
        const reference = await label.screenshot();
        await link.evaluate((element) => element.setAttribute("href", "/ru/settings"));
        if (!visited.equals(reference)) {
          await testInfo.attach(`${theme}-${time}-visited`, {
            body: visited,
            contentType: "image/png",
          });
          await testInfo.attach(`${theme}-${time}-reference`, {
            body: reference,
            contentType: "image/png",
          });
        }
        expect(visited.equals(reference), `${theme} at ${time}ms: visited text color`).toBe(true);
      }
      await page.evaluate(async () => {
        document.documentElement.getAnimations().forEach((animation) => animation.finish());
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
      });
    }
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
  }
});

test("finishes rapid theme toggles and honors reduced motion", async ({ context, page }) => {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    await context.addCookies([
      { name: "theme", value: "light", url: "http://127.0.0.1:3100" },
      { name: "analytics_consent", value: "denied", url: "http://127.0.0.1:3100" },
    ]);
    await page.emulateMedia({ reducedMotion });
    await page.goto("/en/settings");
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
    await page.evaluate(async () => {
      const toggle = document.querySelector("#theme-toggle") as HTMLButtonElement;
      for (let click = 0; click < 3; click++) {
        toggle.click();
        await new Promise(requestAnimationFrame);
      }
    });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(12, 17, 26)");
    await expect(page.locator("body")).toHaveCSS("color", "rgb(237, 241, 247)");
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.style.getPropertyValue("--transition-theme"))
      )
      .toBe("");
    if (reducedMotion === "reduce") {
      const durations = await page.evaluate(() => [
        ...getComputedStyle(document.documentElement).transitionDuration.split(","),
        getComputedStyle(document.querySelector("#theme-toggle")!).transitionDuration,
      ]);
      expect(durations.every((duration) => parseFloat(duration) < 0.001)).toBe(true);
    }
  }
});
