import { Section, SectionHeading } from "@/components/section-heading"
import { experience } from "@/lib/data"

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="01"
        label="Experience"
        title="Where I've worked"
        description="From internship to full-time, on microservice backends and the interfaces on top of them"
      />

      <ol className="relative">
        {experience.map((job) => {
          const isCurrent = job.end === "Present"
          return (
            <li
              key={`${job.company}-${job.start}`}
              className="grid gap-x-12 gap-y-3 border-t border-border py-8 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[12rem_1fr]"
            >
              <p className="flex items-center gap-2.5 self-start font-mono text-[13px] tabular-nums text-subtle md:h-7">
                <span
                  aria-hidden
                  className={`size-1.5 rounded-full ${isCurrent ? "bg-signal" : "bg-subtle/50"}`}
                />
                {job.start} – {job.end}
              </p>

              <div>
                <h3 className="text-xl font-medium tracking-tight">{job.role}</h3>
                <p className="mt-1 text-[15px] text-muted-foreground">
                  {job.company} <span className="text-subtle">· {job.location}, {job.type.toLowerCase()}</span>
                </p>

                <dl className="mt-5 grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-[7rem_1fr]">
                  <dt className="text-subtle">Project</dt>
                  <dd className="text-foreground">{job.project}</dd>
                  <dt className="text-subtle">Architecture</dt>
                  <dd className="text-muted-foreground">{job.architecture}</dd>
                </dl>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                  {job.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs leading-5 text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
