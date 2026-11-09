import { Section, SectionHeading } from "@/components/section-heading"
import { about } from "@/lib/data"

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-x-16 md:grid-cols-[minmax(0,20rem)_1fr]">
        <SectionHeading index="03" label="About" title="A bit about me" />
        <div className="max-w-2xl space-y-5 md:pt-8">
          {about.map((paragraph, i) => (
            <p key={i} className="text-pretty text-lg leading-[1.65] text-muted-foreground first:text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}
