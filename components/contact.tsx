"use client"

import { Mail, Phone, FileText, ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-28">
      {/* Barely-there ambient pulse — atmospheric only. */}
      <div
        aria-hidden
        className="animate-ambient-pulse pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,_rgba(0,113,227,0.14),transparent_60%)]"
      />

      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Open to interesting full-stack roles and collaborations. The fastest way to reach me is directly by email or phone."
        splitWords
      />

      <motion.div
        className="mx-auto max-w-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {primary.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              variants={fadeUp}
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <link.icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted-foreground">{link.label}</span>
                <span className="block truncate font-medium">{link.value}</span>
              </span>
            </motion.a>
          ))}
        </div>

        <motion.a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
          className="glass group mt-4 flex items-center justify-center gap-3 rounded-2xl p-5 font-medium transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
        >
          <FileText className="size-5 text-primary" />
          View / download resume
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </motion.a>
      </motion.div>
    </section>
  )
}
