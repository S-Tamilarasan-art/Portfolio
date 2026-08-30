"use client"

import { useEffect, useRef } from "react"
import { SectionHeading } from "@/components/section-heading"
import { about } from "@/lib/data"
import { gsap } from "@/lib/gsap"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-about-line]")
      gsap.set(lines, { opacity: 0, y: 30 })
      gsap.to(lines, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 40%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading eyebrow="About" title="A bit about me" />

      <div className="mx-auto max-w-2xl space-y-6">
        {about.map((paragraph, i) => (
          <p key={i} data-about-line className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
