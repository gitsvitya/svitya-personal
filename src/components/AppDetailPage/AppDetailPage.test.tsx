import {
  Children,
  isValidElement,
  type ComponentProps,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getLocalizedCompany } from "../../content/portfolio";
import { getTranslations } from "../../content/ui-text";
import TransitionLink from "../SiteShell/TransitionLink";
import AppDetailPage from "./AppDetailPage";

const { navigate } = vi.hoisted(() => ({
  navigate: vi.fn(),
}));

vi.mock("../SiteShell/RouteTransitionContext", () => ({
  useRouteTransition: () => ({
    navigate,
    isTransitioning: false,
  }),
}));

describe("AppDetailPage", () => {
  beforeEach(() => {
    navigate.mockClear();
  });

  it("replaces the detail route when returning to its card section", () => {
    const company = getLocalizedCompany("CI", "ru");
    if (!company) throw new Error("ChemInsight test fixture is missing");

    const page = AppDetailPage({
      company,
      text: getTranslations("ru"),
      sectionTitle: "Опыт работы",
      backHref: "/ru/work",
    });
    const container = page.props.children as ReactElement<{ children: ReactNode }>;
    const backLink = Children.toArray(container.props.children)[0];

    if (
      !isValidElement<ComponentProps<typeof TransitionLink>>(backLink) ||
      backLink.type !== TransitionLink
    ) {
      throw new Error("Back link is missing");
    }

    const link = TransitionLink(backLink.props);
    const event = {
      button: 0,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      defaultPrevented: false,
      preventDefault: vi.fn(),
    };
    expect(link.props.href).toBe("/ru/work");
    link.props.onClick(event as unknown as MouseEvent<HTMLAnchorElement>);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith("/ru/work", { replace: true });
  });
});
