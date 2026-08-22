import Cta from '../components/Cta'
import { contact, testimonials, projects } from '../data/site'
import PortraitCard from '../components/PortraitCard'

const LINE_1 = 'Software your'
const LINE_2 = 'business can'
const LINE_3 = 'actually run on.'

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <span className="anim-line" style={{ animationDelay: `${delay}s` }}>
        {text}
      </span>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden pt-28 pb-10 lg:justify-center lg:pt-24"
    >
      {/* single soft vignette — the only gradient on the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 transition-transform duration-300 ease-out"
        style={{
          background:
            'radial-gradient(70% 55% at 72% 42%, rgba(224,169,109,0.07), transparent 70%)',
          transform: 'translate3d(calc(var(--mx) * -18px), calc(var(--my) * -12px), 0)',
        }}
      />

      <div className="shell relative grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="anim-fade mb-7 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow text-bone">Prashant Thakur</span>
            <span className="hairline w-8" />
            <span className="eyebrow">Software Developer</span>
          </div>

          <h1 className="t-hero font-display">
            <Line text={LINE_1} delay={0.06} />
            <Line text={LINE_2} delay={0.14} />
            <span className="block text-muted">
              <Line text={LINE_3} delay={0.22} />
            </span>
          </h1>

          <p className="anim-rise t-lead mt-6" style={{ animationDelay: '0.4s' }}>
            I help startups and businesses turn ideas into production-ready software — web
            applications, SaaS products, backend systems, APIs and integrations. Designed,
            built and shipped end to end.
          </p>

          <div
            className="anim-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '0.5s' }}
          >
            <Cta href="#contact" cursor="start">Start a project</Cta>
            <Cta href="#work" variant="ghost" cursor="view work">
              View selected work
            </Cta>
          </div>

          {/* Proof, before the fold. A stranger should not have to scroll for it. */}
          {testimonials[0] && (
            <a
              href="#working"
              className="anim-rise group mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]"
              style={{ animationDelay: '0.62s' }}
            >
              <span aria-hidden className="shrink-0 tracking-[0.1em] text-accent">
                ★★★★★
              </span>
              <span className="text-bone">“Would work with him again.”</span>
              <span className="text-muted">
                {testimonials[0].name}, {testimonials[0].role}
              </span>
            </a>
          )}
        </div>

        {/* One object in this column, not two: the photo, framed as a plate. */}
        <div
          className="lg:col-span-5 lg:justify-self-center"
          style={{ transform: 'translate3d(calc(var(--mx) * 7px), calc(var(--my) * 5px), 0)' }}
        >
          <PortraitCard />
        </div>
      </div>

      {/* Trust strip: availability, location, socials — the things a founder scans for */}
      <div className="anim-fade shell relative mt-10 lg:mt-8" style={{ animationDelay: '0.7s' }}>
        <div className="hairline mb-5" />
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2.5 text-[12.5px] text-bone">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {contact.availability}
            </span>
            <span className="hidden items-center gap-2 text-[12.5px] text-muted sm:flex">
              Live:
              {projects
                .filter((p) => p.client)
                .map((p) => (
                  <a
                    key={p.slug}
                    href={p.link?.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-bone transition-colors hover:text-accent"
                  >
                    {p.link?.label}
                  </a>
                ))}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[12.5px] text-muted transition-colors hover:text-bone"
            >
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[12.5px] text-muted transition-colors hover:text-bone"
            >
              LinkedIn
            </a>
            <a
              href={contact.x}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[12.5px] text-muted transition-colors hover:text-bone"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
