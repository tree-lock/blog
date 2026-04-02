import { useEffect } from "react";

/** Sets `document.title` while the component is mounted; updates when `title` changes. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
