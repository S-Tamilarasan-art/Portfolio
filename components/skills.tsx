import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { skills } from "@/lib/data"

// A single faint, monochrome logo drifting in the background marquee.
function BackdropLogo({ logo }: { logo: string }) {
  return (
    <span
      aria-hidden
      className="logo-mask block size-14 shrink-0 md:size-20"
      style={{ ["--logo" as string]: `url(${logo})` }}
    />
  )
}

// One seamless marquee row. Content is duplicated so the -50% translate
// // loops without a visible seam.
// function MarqueeRow({ reverse }: { reverse?: boolean }) {
//   const row = [...skills, ...skills]
//   return (
//     <div
//       className={`flex w-max gap-10 text-foreground ${
//         reverse ? "animate-marquee-reverse" : "animate-marquee"
//       }`}
//     >
//       {row.map((s, i) => (
//         <BackdropLogo key={`${s.name}-${i}`} logo={s.logo} />
//       ))}
//     </div>
//   )
// }

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,113,227,0.10),transparent_52%)]"
      />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills & technologies"
          description="The stack I reach for across the full lifecycle — from database and infrastructure to pixel-level frontend."
        />

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={(i % 4) * 0.05}>
              <div className="glass group flex h-full flex-col items-center justify-center gap-3 rounded-2xl px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="grid size-14 place-items-center rounded-2xl bg-background/80 shadow-[0_6px_18px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 dark:bg-foreground/[0.02] dark:shadow-[0_6px_18px_rgba(0,0,0,0.35)] dark:ring-white/5">
                  <Image
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                  />
                </span>
                <span className="text-sm font-medium transition-colors group-hover:text-primary">
                  {skill.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
