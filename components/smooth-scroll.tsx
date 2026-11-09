"use client"

import { useEffect } from "react"
import Lenis from "lenis"

// Smoothed scrolling for the whole site. Skipped entirely for visitors who
// ask for reduced motion. Anchor links are routed through Lenis so in-page
// navigation glides instead of jumping.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: { offset: -64 } })
    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
