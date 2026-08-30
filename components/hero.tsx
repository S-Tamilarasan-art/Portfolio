"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"
import { ArrowUpRight, Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { profile } from "@/lib/data"
import { gsap } from "@/lib/gsap"

// The WebGL canvas is loaded client-side only and lazily, so it never
// blocks first paint or ships in the server bundle.
const HeroCanvas = dynamic(() => import("@/components/hero-canvas"), {
  ssr: false,
})

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll("[data-word]") ?? []
      const ctaButtons = ctaRef.current?.children ?? []

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

      tl.set([badgeRef.current, roleRef.current, taglineRef.current], { opacity: 0, y: 20 })
      tl.set(words, { opacity: 0, y: 40 })
      tl.set(ctaButtons, { opacity: 0, scale: 0.9 })
      tl.set(canvasWrapRef.current, { opacity: 0 })

      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .to(canvasWrapRef.current, { opacity: 1, duration: 1.2, ease: "power1.out" }, 0.5)
        .to(
          words,
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          0.2,
        )
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
        .to(
          ctaButtons,
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.6)" },
          0.6,
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      {/* Soft radial accent glow painted with CSS, sits behind the canvas. */}
      <div aria-hidden className="accent-glow pointer-events-none absolute inset-0" />

      {/* One (and only one) Three.js canvas for the whole page. */}
      <div ref={canvasWrapRef} aria-hidden className="absolute inset-0 opacity-80">
        <HeroCanvas />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p
          ref={badgeRef}
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-muted-foreground"
        >
          <span className="size-2 rounded-full bg-primary" />
          {profile.location}
        </p>

        <h1
          ref={headlineRef}
          className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name.split(" ").map((word, i) => (
            <span key={i} data-word className="inline-block will-change-transform">
              {word}
              {i < profile.name.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p ref={roleRef} className="mt-4 text-xl font-medium text-primary sm:text-2xl">
          {profile.role}
        </p>

        <p
          ref={taglineRef}
          className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {profile.tagline}
        </p>

        <div ref={ctaRef} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#experience"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90",
            )}
          >
            View work
            <ArrowUpRight className="size-4" />
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-full border-white/15 bg-white/5 px-7 backdrop-blur-xl hover:bg-white/10 hover:text-foreground",
            )}
          >
            <Mail className="size-4" />
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
