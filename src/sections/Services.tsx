import { useRef } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { services } from '../data/site'

/** Tilt is capped at 2.5deg. Past that it stops reading as depth and starts reading as a gimmick. */
function Tile({ s }: { s: (typeof services)[number] }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (
      !el ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    el.style.transform = `perspective(900px) rotateY(${dx * 2.5}deg) rotateX(${-dy * 2.5}deg)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group relative flex h-full flex-col border-t border-line p-7 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:bg-white/[0.02] lg:p-9"
    >
      <span className="num text-[11px] text-muted transition-colors duration-300 group-hover:text-accent">
        {s.n}
      </span>
      <h3 className="mt-6 font-display text-[1.35rem] leading-[1.15] tracking-[-0.03em] lg:text-[1.5rem]">
        {s.title}
      </h3>
      <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
      <p className="num mt-7 pt-1 text-[10.5px] tracking-[0.1em] text-muted lg:mt-auto">
        {s.tags.join(' · ')}
      </p>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="What I build"
          title="Six things I get hired for."
          lead="Scoped as outcomes, not as a technology list. If your problem sits between two of these, that is usually the interesting project."
        />

        {/* phone: swipeable, one card at a time. tablet up: the hairline grid. */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-0 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              delay={(i % 3) * 0.06}
              className="w-[80%] shrink-0 snap-start border border-line sm:w-auto sm:border-0 sm:border-t sm:border-line lg:[&:nth-child(3n+2)]:border-x lg:[&:nth-child(3n+2)]:border-line"
            >
              <Tile s={s} />
            </Reveal>
          ))}
        </div>

        <p className="eyebrow mt-4 sm:hidden">Swipe for all six →</p>
      </div>
    </section>
  )
}
