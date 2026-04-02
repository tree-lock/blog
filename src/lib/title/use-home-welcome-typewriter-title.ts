import { useEffect } from "react";
import {
  HOME_TYPEWRITER_TEXT,
  HOME_WELCOME_HOLD_MS,
  SITE_TITLE,
  TYPEWRITER_INTERVAL_MS,
} from "@/lib/title/site-title";

/**
 * Typewriter effect on `document.title` for the home route only.
 * After the full welcome string is shown, waits {@link HOME_WELCOME_HOLD_MS}, then sets {@link SITE_TITLE}.
 */
export function useHomeWelcomeTypewriterTitle() {
  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const clearPending = () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const runStep = (index: number) => {
      if (cancelled) return;

      if (index <= HOME_TYPEWRITER_TEXT.length) {
        document.title = HOME_TYPEWRITER_TEXT.slice(0, index);
        if (index < HOME_TYPEWRITER_TEXT.length) {
          timeoutId = setTimeout(
            () => runStep(index + 1),
            TYPEWRITER_INTERVAL_MS,
          );
        } else {
          timeoutId = setTimeout(() => {
            if (!cancelled) {
              document.title = SITE_TITLE;
            }
          }, HOME_WELCOME_HOLD_MS);
        }
      }
    };

    runStep(1);

    return () => {
      cancelled = true;
      clearPending();
    };
  }, []);
}
