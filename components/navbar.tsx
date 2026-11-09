"use client"

import { Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useState } from "react"
import { navLinks, profile } from "@/lib/data"
import { cn } from "@/lib/utils"

function toggleTheme() {
  const root = document.documentElement
  const next = root.classList.contains("light") ? "dark" : "light"
  root.classList.toggle("dark", next === "dark")
  root.classList.toggle("light", next === "light")
  try {
    window.localStorage.setItem("theme", next)
  } catch {}
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-150",
        scrolled || menuOpen
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="text-[15px] font-medium tracking-tight text-foreground">
          {profile.shortName}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Both icons render on the server; CSS picks one, so there is no
              hydration mismatch with the theme set by the inline script. */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-raised hover:text-foreground"
          >
            <Sun className="hidden size-4 dark:block" strokeWidth={1.5} />
            <Moon className="size-4 dark:hidden" strokeWidth={1.5} />
          </button>

          <a
            href={`mailto:${profile.email}`}
            className="hidden h-9 items-center rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity duration-150 hover:opacity-90 sm:inline-flex"
          >
            Email me
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-9 place-items-center rounded-lg text-foreground transition-colors duration-150 hover:bg-raised md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="size-4" strokeWidth={1.5} /> : <Menu className="size-4" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <ul id="mobile-menu" className="mx-auto max-w-6xl px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex h-11 items-center rounded-lg px-2 text-[15px] text-muted-foreground transition-colors duration-150 hover:bg-raised hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  )
}
