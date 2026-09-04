import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getLocalizedCompany } from "../../content/portfolio";
import { getTranslations } from "../../content/ui-text";
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
    const backButton = Children.toArray(container.props.children)[0];

    if (!isValidElement<{ onClick: () => void }>(backButton)) {
      throw new Error("Back button is missing");
    }

    backButton.props.onClick();

    expect(navigate).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith("/ru/work", { replace: true });
  });
});
