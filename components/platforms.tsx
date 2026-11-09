import { ArrowUpRight } from "lucide-react"
import { Section, SectionHeading } from "@/components/section-heading"
import { platforms } from "@/lib/data"

export function Platforms() {
  return (
    <Section id="profiles">
      <SectionHeading
        index="04"
        label="Profiles"
        title="Where to find my work"
        description="Code, problem solving and hackathon builds"
      />

      <ul className="border-t border-border">
        {platforms.map((p) => (
          <li key={p.label} className="border-b border-border">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-3 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-lg px-3 py-4 transition-colors duration-150 hover:bg-card sm:grid-cols-[10rem_1fr_1fr_auto]"
            >
              <span className="text-[15px] font-medium">{p.label}</span>
              <ArrowUpRight
                className="size-4 text-subtle transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground sm:order-last"
                strokeWidth={1.5}
              />
              <span className="font-mono text-[13px] text-muted-foreground">{p.handle}</span>
              <span className="text-sm text-subtle max-sm:col-span-2">{p.blurb}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
