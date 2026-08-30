"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { navLinks, profile } from "@/lib/data"
import { cn } from "@/lib/utils"

// Derive monogram initials (e.g. "TS") from the profile name.
const initials = profile.name
  .split(" ")
  .map((p) => p[0])
  .join("")

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") as "dark" | "light" | null
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const nextTheme = savedTheme ?? (preferredDark ? "dark" : "light")

    setTheme(nextTheme)
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    document.documentElement.style.colorScheme = nextTheme
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"))

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300",
          scrolled
            ? "glass shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border border-transparent bg-transparent",
        )}
      >
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
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          <a
            href="#contact"
            className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  )
}
