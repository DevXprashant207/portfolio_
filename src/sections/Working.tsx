import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Testimonials from '../components/Testimonials'
import { engagements, faqs } from '../data/site'

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-cursor={open ? 'close' : 'open'}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span className="text-[15px] font-medium tracking-[-0.01em]">{q}</span>
        <span
          aria-hidden
          className={`mt-0.5 shrink-0 text-accent transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      {/* grid-rows trick: animates to auto height without measuring anything */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[62ch] pb-6 text-[14.5px] leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Working() {
  return (
    <section id="working" className="section">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="Working together"
          title="What it costs, and how it runs."
          lead="Most developer sites make you email to find out whether you are even in the right range. Here it is up front."
        />

        <div className="grid lg:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal
              key={e.n}
              delay={(i % 3) * 0.06}
              className="border-t border-line lg:[&:nth-child(2)]:border-x lg:[&:nth-child(2)]:border-line"
            >
              <div className="h-full p-7 transition-colors duration-500 hover:bg-white/[0.02] lg:p-9">
                <span className="num text-[11px] text-accent">{e.n}</span>
                <h3 className="mt-6 font-display text-[1.35rem] tracking-[-0.03em]">{e.title}</h3>
                <p className="num mt-2 text-[10.5px] tracking-[0.12em] text-muted uppercase">
                  {e.meta}
                </p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Testimonials />

        <div className="mt-24 lg:mt-32">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <span className="hairline w-10" />
              <span className="eyebrow">Questions I get asked</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="max-w-[860px]">
              {faqs.map((f) => (
                <Faq key={f.q} {...f} />
              ))}
              <div className="border-t border-line" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
