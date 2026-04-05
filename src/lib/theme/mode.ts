export type ThemeMode = "light" | "dark" | "auto";

const STORAGE_KEY = "theme";

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "auto";
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "auto") {
    return stored;
  }
  return "auto";
}

export function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === "dark") {
    return true;
  }
  if (mode === "light") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/** Syncs `<html class="dark">` and `color-scheme` (same idea as shadcn `next-themes` + `class`). */
export function applyThemeMode(mode: ThemeMode): void {
  const dark = resolveIsDark(mode);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export function persistThemeMode(mode: ThemeMode): void {
  window.localStorage.setItem(STORAGE_KEY, mode);
}
