"use client";

import { createContext, useContext } from "react";

export type RouteTransitionOptions = {
  replace?: boolean;
  kind?: "route" | "language";
};

type RouteTransitionContextValue = {
  navigate: (href: string, options?: RouteTransitionOptions) => void;
  isTransitioning: boolean;
};

export const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

export function useRouteTransition(): RouteTransitionContextValue {
  const context = useContext(RouteTransitionContext);
  if (!context) {
    throw new Error("useRouteTransition must be used inside SiteShell");
  }
  return context;
}
