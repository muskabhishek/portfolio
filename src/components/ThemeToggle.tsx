"use client";

import { Moon, Sun } from "lucide-react";

declare global {
  interface Window {
    __setTheme?: (theme: "light" | "dark") => void;
  }
}

export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    // Defined by the inline script in layout.tsx (also updates the browser bar colour).
    window.__setTheme?.(next);
  }

  // Both icons render; CSS shows the right one, so server and client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      className="grid size-10 place-items-center rounded-lg border border-border bg-surface text-muted transition hover:text-accent hover:border-accent/50 active:scale-95"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  );
}
