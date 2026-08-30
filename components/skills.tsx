"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { skills } from "@/lib/data"
import { gsap } from "@/lib/gsap"

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-skill-item]")
      gsap.set(items, { opacity: 0, scale: 0.7 })
      gsap.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.4)",
        stagger: 0.04,
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
    <section ref={sectionRef} id="skills" className="relative overflow-hidden px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,113,227,0.10),transparent_52%)]"
      />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills & technologies"
          description="The stack I reach for across the full lifecycle — from database and infrastructure to pixel-level frontend."
        />

        <div ref={gridRef} className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              data-skill-item
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 24px rgba(0,113,227,0.35)",
                transition: { duration: 0.2 },
              }}
              className="glass group flex h-full flex-col items-center justify-center gap-3 rounded-2xl px-4 py-6 text-center"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-background/80 shadow-[0_6px_18px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 dark:bg-foreground/[0.02] dark:shadow-[0_6px_18px_rgba(0,0,0,0.35)] dark:ring-white/5">
                <Image
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  width={32}
                  height={32}
                  className="size-8 object-contain"
                />
              </span>
              <span className="text-sm font-medium transition-colors group-hover:text-primary">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
