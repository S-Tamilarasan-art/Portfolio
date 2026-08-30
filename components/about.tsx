import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { about } from "@/lib/data"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading eyebrow="About" title="A bit about me" />

      <div className="mx-auto max-w-2xl space-y-6">
        {about.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
