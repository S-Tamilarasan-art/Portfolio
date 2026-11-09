import { Logo } from "@/components/logo"
import { codingAgents } from "@/lib/data"

// Sits inside the Skills section as a smaller second group rather than
// a full section of its own.
export function CodingAgents() {
  return (
    <div id="tools" className="mt-12 grid gap-4 border-t border-border pt-8 md:grid-cols-[12rem_1fr] md:gap-12">
      <div>
        <h3 className="text-[15px] font-medium">Coding agents</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          AI tools I pair with, while keeping ownership of the code
        </p>
      </div>
      <ul className="flex flex-wrap gap-2 self-start">
        {codingAgents.map((agent) => (
          <li
            key={agent.name}
            className="flex h-12 items-center gap-3 rounded-lg border border-border bg-card px-3.5 text-[15px]"
          >
            <Logo item={agent} />
            {agent.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
