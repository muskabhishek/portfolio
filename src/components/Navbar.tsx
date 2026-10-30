"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

export function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label="Abhishek Tripathi — home">
      <span className="grid size-9 place-items-center rounded-lg bg-gradient-accent font-mono text-sm font-bold text-white shadow-lg shadow-accent/20">
        AT
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        Abhishek<span className="text-muted font-normal"> Tripathi</span>
        <span className="ml-0.5 animate-pulse text-accent">_</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onWide = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onWide);

    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onWide);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  active === id ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {label}
                {active === id && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-accent" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-lg bg-gradient-accent px-4 py-2 text-sm font-medium text-white shadow-lg shadow-accent/20 transition hover:opacity-90 sm:inline-block"
          >
            Hire Me
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-lg border border-border bg-surface active:scale-95 md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border px-5 py-3 md:hidden">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-3 text-base ${
                  active === id ? "bg-accent-soft text-accent" : "text-muted active:bg-surface-2"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2 pb-1">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-gradient-accent px-4 py-3 text-center text-base font-medium text-white"
            >
              Hire Me
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
