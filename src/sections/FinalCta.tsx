import Reveal from '../components/Reveal'
import Cta from '../components/Cta'

export default function FinalCta() {
  return (
    <section className="section" aria-labelledby="final-cta">
      <div className="shell">
        <Reveal>
          <h2
            id="final-cta"
            className="t-hero font-display max-w-[13ch] text-balance"
          >
            <span className="spot-host" data-text="Let’s build something worth shipping.">
              Let’s build something <span className="text-muted">worth shipping.</span>
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Cta href="#contact" cursor="start">Start a project</Cta>
            <Cta href="#work" variant="ghost" cursor="view work">
              See how I work
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
