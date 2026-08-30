import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { CodingAgents } from "@/components/coding-agents"
import { About } from "@/components/about"
import { Platforms } from "@/components/platforms"
import { Contact } from "@/components/contact"
import { profile } from "@/lib/data"

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />

      <div className="relative">
        <Experience />
        <Skills />
        <CodingAgents />
        <About />
        <Platforms />
        <Contact />
      </div>

      <footer className="border-t border-border bg-background/80 px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Portfolio</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{profile.name}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.role} building resilient products, fast interfaces, and dependable systems for modern teams.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Links</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#experience" className="hover:text-foreground">Experience</a></li>
              <li><a href="#skills" className="hover:text-foreground">Skills</a></li>
              <li><a href="#tools" className="hover:text-foreground">Coding agents</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href={`mailto:${profile.email}`} className="hover:text-foreground">{profile.email}</a></li>
              <li><a href={`tel:${profile.phone}`} className="hover:text-foreground">{profile.phone}</a></li>
              <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a></li>
              <li><a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js, Three.js &amp; Framer Motion.
        </div>
      </footer>
    </main>
  )
}
