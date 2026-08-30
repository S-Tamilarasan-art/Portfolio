"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, summary"

const ARM = 8
const GAP = 4
const THICKNESS = 1.5

// Minimal crosshair cursor: four short arms radiating from the pointer
// with a gap at the center, tracking the mouse exactly. Disabled on
// touch devices, where a synthetic cursor makes no sense.
export function CursorProvider() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    if (!root) return

    document.body.classList.add("custom-cursor-active")

    gsap.set(root, { xPercent: -50, yPercent: -50 })

    const onMove = (e: MouseEvent) => {
      gsap.set(root, { x: e.clientX, y: e.clientY })
    }

    const onDown = () => gsap.to(root, { scale: 0.8, duration: 0.15, ease: "power2.out" })
    const onUp = () => gsap.to(root, { scale: 1, duration: 0.15, ease: "power2.out" })

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) {
        gsap.to(root, { scale: 1.8, rotate: 45, duration: 0.25, ease: "power2.out" })
      }
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) {
        gsap.to(root, { scale: 1, rotate: 0, duration: 0.25, ease: "power2.out" })
      }
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mouseout", onOut)

    return () => {
      document.body.classList.remove("custom-cursor-active")
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mouseout", onOut)
    }
  }, [enabled])

  if (!enabled) return null

  const arm = (style: React.CSSProperties) => (
    <span aria-hidden className="absolute bg-foreground" style={style} />
  )

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] size-0">
      {arm({ width: THICKNESS, height: ARM, left: -THICKNESS / 2, top: -(GAP + ARM) })}
      {arm({ width: THICKNESS, height: ARM, left: -THICKNESS / 2, top: GAP })}
      {arm({ width: ARM, height: THICKNESS, top: -THICKNESS / 2, left: -(GAP + ARM) })}
      {arm({ width: ARM, height: THICKNESS, top: -THICKNESS / 2, left: GAP })}
    </div>
  )
}
