"use client";

import { useSyncExternalStore } from "react";

// Runs directly from the initial HTML, even when Next's scripts cannot load.
const THEME_INIT = `(function(){
  var theme;
  try { var match = document.cookie.match(/(?:^|;\\s*)theme=(light|dark)(?:;|$)/); theme = match && match[1]; } catch(e) {}
  if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();`;

const subscribeToHydration = () => () => undefined;

export default function ThemeInitScript() {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );

  // Match the server HTML during hydration, then remove the executed script.
  // A locale navigation mounts this component on the client, where the theme
  // is already managed by useThemePreference and no script should be created.
  if (isHydrated) return null;

  return <script id="theme-init" dangerouslySetInnerHTML={{ __html: THEME_INIT }} />;
}
