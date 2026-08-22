import Reveal from './Reveal'
import { testimonials } from '../data/site'

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          className={i <= Math.round(rating) ? 'text-accent' : 'text-line-2'}
        >
          ★
        </span>
      ))}
      <span className="num ml-2 text-[11px] text-muted">{rating.toFixed(1)}</span>
    </span>
  )
}

/**
 * Renders nothing until a real client sends a real quote. An empty section is
 * honest; a written-for-you quote under someone else's name is not, and it is
 * the one thing on this site that could be called fraud.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <div className="mt-24 lg:mt-32">
      <Reveal>
        <div className="mb-10 flex items-center gap-4">
          <span className="hairline w-10" />
          <span className="eyebrow">In their words</span>
        </div>
      </Reveal>

      <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 0.06}>
            <figure className="border-t border-line pt-6">
              {t.rating !== undefined && (
                <div className="mb-5">
                  <Stars rating={t.rating} />
                </div>
              )}
              <blockquote className="font-display text-[1.15rem] leading-[1.45] tracking-[-0.02em]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-[13px]">
                <span className="text-bone">{t.name}</span>
                <span className="text-muted"> — {t.role}</span>
                {t.source && <span className="eyebrow mt-1.5 block">{t.source}</span>}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
