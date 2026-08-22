import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { stack } from '../data/site'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeading index="05" eyebrow="About" title="I design it, build it, and ship it." />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] tracking-[-0.025em]">
                I’m Prashant — a software developer focused on building digital products,
                backend systems and scalable applications.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
                <p>
                  I work across the stack, from the interface someone actually uses to the
                  systems that keep it standing up. Most of my time goes to the second half:
                  data models, API contracts, caching, rate limiting, and the failure paths
                  that decide whether a product is trustworthy or merely demo-ready.
                </p>
                <p>
                  What I enjoy most is the part before the code — sitting with a problem long
                  enough to know which version of it is worth solving. A clear model of the
                  problem is what makes the build boring, and boring builds ship.
                </p>
                <p>
                  I have shipped platforms that people use daily — a tutoring marketplace
                  running in production, and the web platform for a registered NGO that
                  handles volunteer sign-ups and generates their certificates. Alongside that
                  I build the unglamorous infrastructure underneath: build pipelines, caching,
                  storage, the parts nobody demos.
                </p>
                <p>
                  If you are early, I can help you get to something real without painting
                  yourself into a corner. If you already have a product, I can help make it
                  faster, sturdier, or ready for the next order of magnitude. I work from
                  Delhi NCR, with clients wherever they are.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="eyebrow mb-6">Working with</p>
              <dl>
                {stack.map((g) => (
                  <div key={g.group} className="border-t border-line py-5">
                    <dt className="num mb-2.5 text-[10.5px] tracking-[0.16em] text-muted uppercase">
                      {g.group}
                    </dt>
                    <dd className="flex flex-wrap gap-x-2 gap-y-2">
                      {g.items.map((it) => (
                        <span
                          key={it}
                          className="rounded-[2px] border border-line px-2.5 py-1 text-[12px] text-bone/85 transition-colors duration-300 hover:border-accent hover:text-accent"
                        >
                          {it}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
