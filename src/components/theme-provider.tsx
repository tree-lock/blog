import { type ReactNode, useEffect } from "react";
import { applyThemeMode, getStoredThemeMode } from "@/lib/theme/mode";

/**
 * Re-applies stored theme on mount so client state matches `localStorage`
 * (complements the inline script in `index.html` that prevents flash).
 * Same role as wrapping with `ThemeProvider` from next-themes in the
 * [shadcn Next.js dark mode guide](https://ui.shadcn.com/docs/dark-mode/next).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyThemeMode(getStoredThemeMode());
  }, []);

  return children;
}
