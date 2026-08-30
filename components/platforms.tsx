"use client"

import { useEffect, useRef } from "react"
import { Briefcase, GitBranch, Code2, Trophy, Rocket, ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { profile } from "@/lib/data"
import { gsap } from "@/lib/gsap"

type Platform = {
  label: string
  handle: string
  blurb: string
  href: string
  icon: LucideIcon
}

const platforms: Platform[] = [
  {
    label: "LinkedIn",
    handle: "Tamilarasan Selvakumar",
    blurb: "Career, roles, and professional network.",
    href: profile.linkedin,
    icon: Briefcase,
  },
  {
    label: "GitHub",
    handle: "S-Tamilarasan-art",
    blurb: "Source code, projects, and open contributions.",
    href: profile.github,
    icon: GitBranch,
  },
  {
    label: "LeetCode",
    handle: "S_Tamilarasan",
    blurb: "Data structures & algorithm problem solving.",
    href: profile.leetcode,
    icon: Code2,
  },
  {
    label: "Devpost",
    handle: "tamilarasant904",
    blurb: "Hackathon builds and shipped prototypes.",
    href: profile.devpost,
    icon: Rocket,
  },
  {
    label: "Codewars",
    handle: "S-Tamilarasan-art",
    blurb: "Kata practice and coding challenge ranks.",
    href: profile.codewars,
    icon: Trophy,
  },
]

export function Platforms() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-platform-card]")
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
    <section ref={sectionRef} id="platforms" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="Proof of work"
        title="Expertise across platforms"
        description="Where my problem-solving, shipping, and engineering track record lives — from competitive coding to open source and hackathons."
      />

      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => (
          <motion.a
            key={p.label}
            data-platform-card
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
            className="glass group flex h-full flex-col gap-4 rounded-2xl p-6 transition-shadow duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_rgba(0,113,227,0.15)]"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                <p.icon className="size-5" />
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <div>
              <h3 className="font-semibold tracking-tight">{p.label}</h3>
              <p className="text-sm text-primary">{p.handle}</p>
            </div>
            <p className="mt-auto text-pretty text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
