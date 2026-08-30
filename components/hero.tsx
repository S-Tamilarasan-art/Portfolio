"use client"

import dynamic from "next/dynamic"
import { motion, type Variants } from "framer-motion"
import { ArrowUpRight, Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { profile } from "@/lib/data"

// The WebGL canvas is loaded client-side only and lazily, so it never
// blocks first paint or ships in the server bundle.
const HeroCanvas = dynamic(() => import("@/components/hero-canvas"), {
  ssr: false,
})

// Staggered entrance for the hero copy.
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      {/* Soft radial accent glow painted with CSS, sits behind the canvas. */}
      <div aria-hidden className="accent-glow pointer-events-none absolute inset-0" />

      {/* One (and only one) Three.js canvas for the whole page. */}
      <div aria-hidden className="absolute inset-0 opacity-80">
        <HeroCanvas />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.p
          variants={item}
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-muted-foreground"
        >
          <span className="size-2 rounded-full bg-primary" />
          {profile.location}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-xl font-medium text-primary sm:text-2xl"
        >
          {profile.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
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
        </motion.div>
      </motion.div>
    </section>
  )
}
