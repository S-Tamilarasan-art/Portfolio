"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "@/lib/gsap"

// Drives the whole site's scroll physics through Lenis, then syncs its
// raf loop onto the GSAP ticker so every ScrollTrigger stays in lockstep
// with the smoothed scroll position instead of the native one.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ lerp: 0.08 })

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
