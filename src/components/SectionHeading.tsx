import Reveal from './Reveal'

export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
}: {
  index: string
  eyebrow: string
  title: string
  lead?: string
}) {
  return (
    <header className="mb-14 lg:mb-20">
      <Reveal>
        <div className="mb-7 flex items-center gap-4">
          <span className="num text-[11px] tracking-[0.18em] text-accent">{index}</span>
          <span className="hairline w-10" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="t-section max-w-[18ch]">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="t-lead mt-6">{lead}</p>
        </Reveal>
      )}
    </header>
  )
}
