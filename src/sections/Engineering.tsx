import { lazy, Suspense } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { engineering } from '../data/site'

const SystemCanvas = lazy(() => import('../three/SystemCanvas'))

export default function Engineering() {
  return (
    <section id="engineering" className="section">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Beyond the interface"
          title="I care about what happens behind the screen."
          lead="The screen is the part clients see. Whether the product survives its first real week of traffic is decided somewhere else."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <dl>
              {engineering.map((e, i) => (
                <Reveal key={e.k} delay={i * 0.04}>
                  <div className="flex flex-col gap-1 border-t border-line py-5 sm:flex-row sm:items-baseline sm:gap-8">
                    <dt className="num w-44 shrink-0 text-[11px] tracking-[0.14em] text-bone uppercase">
                      {e.k}
                    </dt>
                    <dd className="text-[14.5px] text-muted">{e.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              {/* The 3D lives here, with a whole column to itself and nothing to collide with. */}
              <figure className="border border-line bg-white/[0.015] p-6 lg:p-8">
                <figcaption className="eyebrow mb-2">Anatomy of one request</figcaption>
                <Suspense fallback={<div className="h-[380px]" />}>
                  <SystemCanvas className="h-[380px] w-full lg:h-[440px]" />
                </Suspense>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
