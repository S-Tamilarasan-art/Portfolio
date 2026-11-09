import { CodingAgents } from "@/components/coding-agents"
import { Logo } from "@/components/logo"
import { Section, SectionHeading } from "@/components/section-heading"
import { skills } from "@/lib/data"

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        label="Skills"
        title="Skills and technologies"
        description="What I reach for day to day, from the database and infrastructure to the interface"
      />

      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="flex h-12 items-center gap-3 rounded-lg border border-border bg-card px-3.5 text-[15px] transition-colors duration-150 hover:bg-raised"
          >
            <Logo item={skill} />
            <span className="truncate">{skill.name}</span>
          </li>
        ))}
      </ul>

      <CodingAgents />
    </Section>
  )
}
