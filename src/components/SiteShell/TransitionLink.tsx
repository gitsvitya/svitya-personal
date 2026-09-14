"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { shouldHandleClientNavigation } from "../../utils/navigation";
import { useRouteTransition } from "./RouteTransitionContext";

export default function TransitionLink({
  href,
  onClick,
  replace,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { navigate } = useRouteTransition();
  return (
    <Link
      {...props}
      href={href}
      replace={replace}
      onClick={(event) => {
        onClick?.(event);
        if (!shouldHandleClientNavigation(event) || props.target || props.download) return;
        event.preventDefault();
        navigate(href, { replace });
      }}
    />
  );
}
