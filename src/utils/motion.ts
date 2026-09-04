export type TransitionSpeed = "fast" | "slow";

const DURATION_PROPERTIES: Record<TransitionSpeed, string> = {
  fast: "--transition-fast-duration",
  slow: "--transition-slow-duration",
};

export function getTransitionDuration(speed: TransitionSpeed): number {
  if (typeof window === "undefined") return 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;

  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(DURATION_PROPERTIES[speed]);

  return parseCssDuration(value);
}

export function parseCssDuration(value: string): number {
  const match = value.trim().match(/^(\d*\.?\d+)\s*(ms|s)$/);
  if (!match) return 0;

  const duration = Number(match[1]);
  return match[2] === "s" ? duration * 1000 : duration;
}
