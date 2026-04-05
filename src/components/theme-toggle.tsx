import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  applyThemeMode,
  getStoredThemeMode,
  persistThemeMode,
  type ThemeMode,
} from "@/lib/theme/mode";

function nextMode(mode: ThemeMode): ThemeMode {
  if (mode === "light") {
    return "dark";
  }
  if (mode === "dark") {
    return "auto";
  }
  return "light";
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => getStoredThemeMode());

  useEffect(() => {
    applyThemeMode(mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== "auto") {
      return;
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode("auto");
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [mode]);

  function handleClick() {
    const next = nextMode(mode);
    setMode(next);
    persistThemeMode(next);
  }

  const label =
    mode === "auto"
      ? "主题：跟随系统。点击切换为浅色模式。"
      : mode === "light"
        ? "主题：浅色。点击切换为深色模式。"
        : "主题：深色。点击切换为跟随系统。";

  const Icon = mode === "auto" ? Monitor : mode === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink)] shadow-[0_1px_2px_rgba(9,9,11,0.05)] transition hover:bg-[var(--link-bg-hover)]"
    >
      <Icon className="size-[1.125rem]" aria-hidden strokeWidth={2} />
    </button>
  );
}
