import { ArrowDown, Mail } from "lucide-react"
import { StatusDot } from "@/components/status-dot"
import { experience, profile } from "@/lib/data"

const current = experience[0]

// The hero's one "moment": a terminal-style readout built only from facts
// already on the page, styled like the consoles behind a building
// management system.
const readout: { key: string; value: string }[] = [
  { key: "name", value: profile.name },
  { key: "role", value: current.role },
  { key: "company", value: `${current.company.replace(" Pvt Ltd", "")}, ${current.location}` },
  { key: "project", value: current.project },
  { key: "backend", value: "Ruby on Rails, Node.js, Express" },
  { key: "data", value: "PostgreSQL, Redis, OpenSearch" },
  { key: "frontend", value: "React, Vite, Tailwind CSS" },
  { key: "based in", value: profile.location.replace(", India", "") },
]

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16 lg:pt-16"
    >
      <div>
        <p className="rise flex items-center gap-2.5 text-sm text-muted-foreground">
          <StatusDot />
          {profile.status}
        </p>

        <h1
          className="rise mt-6 text-[2.75rem] font-medium leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]"
          style={{ animationDelay: "60ms" }}
        >
          Tamilarasan
          <br />
          Selvakumar
        </h1>

        <p
          className="rise mt-6 max-w-[34rem] text-lg leading-[1.6] text-muted-foreground"
          style={{ animationDelay: "120ms" }}
        >
          <span className="text-foreground">{profile.role}.</span> {profile.intro}
        </p>

        <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "180ms" }}>
          <a
            href="#experience"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-signal px-5 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16)] dark:text-background transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.98]"
          >
            View experience
            <ArrowDown className="size-4" strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-[15px] font-medium text-foreground transition-[background-color,transform] duration-150 hover:bg-raised active:scale-[0.98]"
          >
            <Mail className="size-4 text-muted-foreground" strokeWidth={1.5} />
            Email me
          </a>
        </div>
      </div>

      <figure
        className="rise overflow-hidden rounded-2xl border border-border bg-deep font-mono text-[13px] leading-6 shadow-[0_8px_24px_rgb(0_0_0/0.06)] dark:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]"
        style={{ animationDelay: "240ms" }}
        aria-label="Profile summary"
      >
        <div className="flex h-10 items-center gap-2 border-b border-border px-4">
          <span className="size-2.5 rounded-full bg-subtle/30" />
          <span className="size-2.5 rounded-full bg-subtle/30" />
          <span className="size-2.5 rounded-full bg-subtle/30" />
          <span className="ml-2 text-xs text-subtle">tamilarasan@portfolio: ~</span>
        </div>

        <div className="px-5 py-5">
          <p>
            <span className="text-subtle">~ $</span> <span className="text-foreground">whoami</span>
          </p>
          <dl className="mt-3 grid grid-cols-[5.5rem_1fr] gap-x-4">
            {readout.map((row) => (
              <div key={row.key} className="contents">
                <dt className="text-subtle">{row.key}</dt>
                <dd className="text-muted-foreground">{row.value}</dd>
              </div>
            ))}
            <dt className="text-subtle">status</dt>
            <dd className="flex items-center gap-2 text-signal-ink">
              <StatusDot />
              open to full-stack roles
            </dd>
          </dl>
          <p className="mt-3">
            <span className="text-subtle">~ $</span>{" "}
            <span aria-hidden className="inline-block h-4 w-2 translate-y-[3px] bg-muted-foreground/70" />
          </p>
        </div>
      </figure>
    </section>
  )
}
