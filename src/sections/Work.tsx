import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import ProjectVisual from '../components/ProjectVisual'
import { projects, contact } from '../data/site'
import type { Project } from '../data/site'

function Detail({ p }: { p: Project }) {
  return (
    <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <dl className="space-y-8">
          <div>
            <dt className="eyebrow mb-2.5">The problem</dt>
            <dd className="text-[15px] leading-relaxed text-muted">{p.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-2.5">What I built</dt>
            <dd className="text-[15px] leading-relaxed text-muted">{p.solution}</dd>
          </div>
        </dl>

        <h4 className="eyebrow mt-12 mb-5">Engineering decisions</h4>
        <ul>
          {p.decisions.map((d, i) => (
            <li key={d.title} className="border-t border-line py-5">
              <div className="flex gap-5">
                <span className="num mt-1 text-[11px] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h5 className="text-[15px] font-medium tracking-[-0.01em]">{d.title}</h5>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{d.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-5">
        {/* Screenshots first — they are the proof. Diagram second — it is the thinking. */}
        {p.shots?.map((shot) => (
          <figure key={shot.caption} className="mb-6 border border-line bg-white/[0.015] p-1.5">
            <a
              href={p.link?.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="visit"
              className="block overflow-hidden"
            >
              <img
                src={shot.src}
                alt={`${p.title} — ${shot.caption}`}
                loading="lazy"
                decoding="async"
                className="block w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
              />
            </a>
            <figcaption className="eyebrow mt-3 mb-1 px-1.5">{shot.caption}</figcaption>
          </figure>
        ))}
        <ProjectVisual visual={p.visual} />
        <div className="mt-6">
          <h4 className="eyebrow mb-3">Stack</h4>
          <p className="text-[13px] leading-relaxed text-muted">{p.stack.join('  ·  ')}</p>
        </div>
      </div>
    </div>
  )
}

function Row({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="border-t border-line py-10 lg:py-14">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="flex items-baseline gap-4 lg:col-span-3 lg:block">
          <span className="num text-[11px] text-accent">{p.index}</span>
          <span className="num mt-3 block text-[11px] text-muted">{p.year}</span>
        </div>

        <div className="lg:col-span-9">
          <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.04em]">
            {p.title}
          </h3>
          <p className="eyebrow mt-3">{p.kind}</p>
          {p.client && (
            <p className="mt-3 flex items-center gap-2.5 text-[13px] text-accent">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {p.client}
            </p>
          )}
          <p className="t-lead mt-5">{p.summary}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              data-cursor={open ? 'close' : 'read'}
              className="group inline-flex items-center gap-2.5 text-[13px] font-medium text-bone transition-colors hover:text-accent"
            >
              {open ? 'Close case study' : 'Read the case study'}
              <span
                aria-hidden
                className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              >
                ↓
              </span>
            </button>

            {p.link && (
              <a
                href={p.link.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="visit"
                className="inline-flex items-center gap-2 text-[13px] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {p.link.label}
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>

          {/* grid-rows animates to auto height with nothing to measure */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">{open && <Detail p={p} />}</div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Three systems, and the decisions behind them."
          lead="All three are live and clickable. Anyone can list features — what is worth reading is why a system is shaped the way it is, so here is the reasoning, not a gallery."
        />
        <div>
          {projects.map((p) => (
            <Reveal key={p.slug}>
              <Row p={p} />
            </Reveal>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-[13px] text-muted">
            Smaller builds — payments, chat, tourist safety, dev tooling — live on{' '}
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="visit"
              className="text-bone underline underline-offset-4 hover:text-accent"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-[13px] text-muted">
            Want the long version — repositories, schemas, trade-offs?{' '}
            <a href="#contact" className="text-bone underline underline-offset-4 hover:text-accent">
              Ask me on a call
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
