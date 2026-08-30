"use client"

import { useEffect, useRef } from "react"
import { MapPin, Layers, Boxes } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { experience } from "@/lib/data"
import { gsap } from "@/lib/gsap"

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            end: "bottom 40%",
            scrub: 1,
          },
        },
      )

      const cards = gsap.utils.toArray<HTMLElement>("[data-exp-card]")
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 40%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've been building"
        description="A track record across product companies — shipping microservice backends and monolithic UIs from internship to full-time."
      />

      <ol ref={listRef} className="relative mx-auto max-w-3xl border-l border-transparent pl-6 sm:pl-10">
        <span
          ref={lineRef}
          aria-hidden
          className="absolute inset-y-0 left-0 w-px bg-primary/20"
          style={{ transformOrigin: "top center" }}
        />
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.period}`} className="relative pb-12 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[calc(0.6rem+1px)] top-5 size-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_0_5px_rgba(0,113,227,0.12)] sm:-left-[calc(0.6rem+1px)]"
            />
            <div
              data-exp-card
              className="glass rounded-3xl border border-primary/10 bg-card/80 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.28)]"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{job.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{job.role}</h3>
                  <p className="mt-1 text-base font-medium text-muted-foreground">{job.company}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary/80" />
                  {job.location} · {job.type}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Boxes className="size-4 text-primary/80" />
                  {job.architecture}
                </span>
              </div>

              <p className="mt-4 inline-flex items-start gap-2 text-sm text-muted-foreground">
                <Layers className="mt-0.5 size-4 shrink-0 text-primary/80" />
                <span>
                  <span className="font-medium text-foreground">Project:</span> {job.project}
                </span>
              </p>

              <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                {job.stack}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
