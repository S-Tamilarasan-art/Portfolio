import { ArrowUpRight, FileText, Mail, Phone } from "lucide-react"
import { Section } from "@/components/section-heading"
import { StatusDot } from "@/components/status-dot"
import { profile } from "@/lib/data"

const rows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone, external: false },
  { label: "Resume", value: "View or download PDF", href: profile.resume, icon: FileText, external: true },
]

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] md:gap-16">
        <div>
          <p className="font-mono text-xs text-subtle">
            05 <span className="px-1">/</span> Contact
          </p>
          <h2 className="mt-3 max-w-lg text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            Let&apos;s build something
          </h2>
          <p className="mt-5 flex items-baseline gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
            <span className="translate-y-[-1px]">
              <StatusDot />
            </span>
            <span>{profile.status}. Email is the fastest way to reach me</span>
          </p>
        </div>

        <ul className="self-end rounded-2xl border border-border bg-card p-2">
          {rows.map((row) => (
            <li key={row.label}>
              <a
                href={row.href}
                {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-raised"
              >
                <row.icon className="size-[18px] shrink-0 text-subtle" strokeWidth={1.5} />
                <span className="w-16 shrink-0 text-sm text-subtle">{row.label}</span>
                <span className="min-w-0 flex-1 truncate text-[15px]">{row.value}</span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-subtle transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  strokeWidth={1.5}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
