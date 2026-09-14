import { expect, test, type Page } from "@playwright/test";

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
      const match = value.match(/^rgba?\(([^)]+)\)$/);
      return match
        ? match[1]!
            .split(/[,\s/]+/)
            .map(Number)
            .slice(0, 3)
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
    const frames: { time: number; colors: number[][] }[] = [];
    const start = performance.now();
    await new Promise<void>((resolve) => {
      function frame() {
        frames.push({ time: performance.now() - start, colors: snapshot() });
        if (performance.now() - start < 360) requestAnimationFrame(frame);
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
      if (expected < 0.08 || expected > 0.95) continue;
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
      await expect(page.locator("html")).toHaveCSS("color-scheme", direction);
    }
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
