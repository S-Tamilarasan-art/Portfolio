export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  /** Two-digit section number, shown in mono like a panel channel. */
  index: string
  label: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="font-mono text-xs text-subtle">
        {index} <span className="px-1">/</span> {label}
      </p>
      <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}

export function Section({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-16 ${className ?? ""}`}>
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">{children}</div>
    </section>
  )
}
