"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Within } from "@/components/ui/within";

interface ThemeToggleProps {
  showLabel?: boolean;
}

export function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [isDark, setIsDark] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className={showLabel ? "h-[46px] w-full" : "h-8 w-8"} />
    );
  }

  return (
    <Within
      onClick={toggleTheme}
      title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
      aria-label="Toggle theme"
      className={showLabel
        ? "flex min-h-[46px] w-full flex-col items-center justify-center gap-1 rounded-lg text-[21px] text-on-surface-variant transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
        : "flex h-8 w-8 items-center justify-center rounded-lg text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      }
    >
      {showLabel && (
        <span className="text-[10px] font-medium leading-none">Giao diện</span>
      )}
    </Within>
  );
}
