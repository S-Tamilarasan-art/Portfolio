import { MapPin, Layers, Boxes } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { experience } from "@/lib/data"

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've been building"
        description="A track record across product companies — shipping microservice backends and monolithic UIs from internship to full-time."
      />

      <ol className="relative mx-auto max-w-3xl border-l border-primary/20 pl-6 sm:pl-10">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.period}`} className="relative pb-12 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[calc(0.6rem+1px)] top-5 size-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_0_5px_rgba(0,113,227,0.12)] sm:-left-[calc(0.6rem+1px)]"
            />
            <Reveal delay={i * 0.05}>
              <div className="glass rounded-3xl border border-primary/10 bg-card/80 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.28)]">
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
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
