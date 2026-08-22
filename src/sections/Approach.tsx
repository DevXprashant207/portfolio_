import { lazy, Suspense } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { process, expectations } from '../data/site'

const ProcessBackdrop = lazy(() => import('../three/ProcessBackdrop'))

export default function Approach() {
  return (
    <section id="approach" className="section">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="How I work"
          title="A process built so nothing goes quiet."
          lead="Most failed software projects do not fail technically. They fail because scope drifted, nobody said so, and everyone found out late."
        />

        {/* The six steps, drawing themselves. Its own band — never behind copy. */}
        <Suspense fallback={<div className="h-[150px]" />}>
          <ProcessBackdrop className="mb-16 h-[330px] w-full sm:h-[150px] lg:mb-20 lg:h-[170px]" />
        </Suspense>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <Reveal
              as="li"
              key={p.n}
              delay={(i % 3) * 0.05}
              className="border-t border-line lg:[&:nth-child(3n+2)]:border-x lg:[&:nth-child(3n+2)]:border-line sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:border-line lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(3n+2)]:border-l"
            >
              <div className="h-full p-7 transition-colors duration-500 hover:bg-white/[0.02] lg:p-9">
                <span className="num text-[11px] text-accent">{p.n}</span>
                <h3 className="mt-6 font-display text-xl tracking-[-0.03em]">{p.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-24 lg:mt-32">
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <span className="hairline w-10" />
              <span className="eyebrow">What you can expect</span>
            </div>
          </Reveal>

          <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
            {expectations.map((e, i) => (
              <Reveal key={e.title} delay={(i % 2) * 0.06}>
                <h3 className="font-display text-[1.15rem] tracking-[-0.025em]">{e.title}</h3>
                <p className="mt-2.5 max-w-[46ch] text-[14.5px] leading-relaxed text-muted">
                  {e.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
