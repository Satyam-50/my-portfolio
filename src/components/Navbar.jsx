import { useState } from "react";
import { NAV_ITEMS } from "../constants/portfolio";
import { useTheme } from "../ThemeContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-(--border-soft) bg-(--surface-float) backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-cyan-600 dark:text-cyan-300"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Satyam.dev
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-(--text-muted) transition hover:text-cyan-600 dark:hover:text-cyan-300"
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="rounded-full border border-(--border-soft) bg-white/70 p-2 text-base leading-none shadow-sm transition hover:scale-105 dark:bg-slate-900/70"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? "sun" : "moon"}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-(--border-soft) bg-white/70 p-2 text-xs uppercase tracking-wider dark:bg-slate-900/70"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? "sun" : "moon"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-(--border-soft) bg-white/70 px-3 py-2 text-sm font-semibold tracking-wide dark:bg-slate-900/70"
            aria-label="Toggle mobile menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="flex flex-col gap-5 border-t border-(--border-soft) bg-(--surface-float) px-6 py-6 text-sm md:hidden"
          id="mobile-menu"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-lg border border-transparent px-2 py-1 text-(--text-muted) transition hover:border-(--border-soft) hover:text-cyan-600 dark:hover:text-cyan-300"
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;