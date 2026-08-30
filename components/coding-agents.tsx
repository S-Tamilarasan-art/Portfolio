"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { codingAgents } from "@/lib/data"
import { gsap } from "@/lib/gsap"

export function CodingAgents() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-agent-card]")
      gsap.set(cards, { opacity: 0, y: 50 })
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          end: "top 40%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tools" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="AI-assisted"
        title="Coding agents I work with"
        description="I pair with modern AI tooling to move faster without compromising on quality or ownership of the code."
      />

      <div ref={gridRef} className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
        {codingAgents.map((agent) => (
          <motion.div
            key={agent.name}
            data-agent-card
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
            className="glass group flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-border/70 bg-card/80 p-7 text-center transition-shadow duration-300 hover:border-primary/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
          >
            <span className="grid size-16 place-items-center rounded-2xl border border-border/80 bg-background/80 shadow-[0_10px_24px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 dark:bg-foreground/[0.02] dark:shadow-[0_10px_24px_rgba(0,0,0,0.25)] dark:ring-white/5">
              <Image
                src={agent.logo}
                alt={`${agent.name} logo`}
                width={44}
                height={44}
                className="size-10 object-contain"
              />
            </span>
            <span className="text-lg font-medium tracking-tight text-foreground">
              {agent.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
