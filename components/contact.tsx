import { Mail, Phone, FileText, ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { profile } from "@/lib/data"

type Link = {
  label: string
  value: string
  href: string
  icon: LucideIcon
}

const primary: Link[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, icon: Phone },
]

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Open to interesting full-stack roles and collaborations. The fastest way to reach me is directly by email or phone."
      />

      <div className="mx-auto max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {primary.map((link, i) => (
            <Reveal key={link.label} delay={i * 0.06}>
              <a
                href={link.href}
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <link.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted-foreground">{link.label}</span>
                  <span className="block truncate font-medium">{link.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-4">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group flex items-center justify-center gap-3 rounded-2xl p-5 font-medium transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
          >
            <FileText className="size-5 text-primary" />
            View / download resume
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
