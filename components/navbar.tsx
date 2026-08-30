"use client"

import { Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { navLinks, profile } from "@/lib/data"
import { cn } from "@/lib/utils"
import { gsap } from "@/lib/gsap"

// Derive monogram initials (e.g. "TS") from the profile name.
const initials = profile.name
  .split(" ")
  .map((p) => p[0])
  .join("")

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // The blocking inline script in the document head already applies the
  // correct class before hydration, so read it back instead of assuming.
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("light")
      ? "light"
      : "dark",
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.classList.toggle("light", theme === "light")
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Page-load entrance: fade + slide down from -20px.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    )
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [scrolled])

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"))

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-5xl flex-col rounded-2xl transition-all duration-300",
          scrolled || menuOpen
            ? "glass shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border border-transparent bg-transparent",
        )}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <a
            href="#top"
            className="grid size-9 place-items-center rounded-xl bg-primary/15 text-sm font-semibold tracking-tight text-primary"
            aria-label={`${profile.name} — home`}
          >
            {initials}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border  bg-background/70 px-2 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            <a
              href="#contact"
              className="hidden rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-full border border-border bg-background/70 p-2 text-foreground shadow-sm transition-colors hover:bg-muted md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <ul className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-1 block rounded-xl bg-foreground px-3 py-2 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Get in touch
              </a>
            </li>
          </ul>
        ) : null}
      </nav>
    </header>
  )
}
