import { useState } from 'react'
import portrait from '../assets/portrait.png'
import { contact } from '../data/site'

const row = 'flex items-baseline justify-between gap-4 border-t border-line py-2.5'

/**
 * The portrait plate, with a back side.
 *
 * Hover flips it on desktop; click or Enter flips it anywhere, so it is not a
 * mouse-only feature. Reduced motion swaps the faces without the rotation.
 */
export default function PortraitCard() {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)

  const showBack = flipped || hovered

  return (
    <div className="mx-auto w-full max-w-[340px] sm:max-w-[380px]">
      <button
        type="button"
        aria-pressed={showBack}
        aria-label={showBack ? 'Show portrait' : 'Show details'}
        data-cursor="flip"
        onClick={() => setFlipped((v) => !v)}
        /**
         * Touch emits a synthetic mouseenter that never gets a matching leave, so
         * hover would latch on and the second tap could not flip the card back.
         * Hover is therefore mouse-only; taps go through `flipped` alone.
         */
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
        onPointerDown={(e) => e.pointerType !== 'mouse' && setHovered(false)}
        className="relative block w-full cursor-pointer text-left [perspective:1400px]"
      >
        <div
          className={`relative transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] ${
            showBack ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ---- front ---- */}
          <figure className="border border-line bg-white/[0.015] p-6 [backface-visibility:hidden]">
            <div className="relative mx-auto max-w-[228px] overflow-hidden">
              {/* Source is 201x219 — never scaled past native, or it softens. */}
              <img
                src={portrait}
                width={201}
                height={219}
                alt="Prashant Thakur"
                fetchPriority="high"
                className="block w-full grayscale-[0.8] contrast-[1.06] brightness-[0.92]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-overlay"
                style={{
                  background: 'linear-gradient(180deg, rgba(224,169,109,0.22), rgba(8,8,10,0.5))',
                }}
              />
            </div>

            <figcaption className="mt-5">
              <dl className="text-[12px]">
                <div className={row}>
                  <dt className="eyebrow">Based</dt>
                  <dd className="text-bone">Delhi NCR, India</dd>
                </div>
                <div className={row}>
                  <dt className="eyebrow">Focus</dt>
                  <dd className="text-bone">Product &amp; backend</dd>
                </div>
                <div className={row}>
                  <dt className="eyebrow">Stack</dt>
                  <dd className="text-bone">React · Node · Postgres</dd>
                </div>
              </dl>
            </figcaption>
          </figure>

          {/* ---- back ---- */}
          <div className="absolute inset-0 flex flex-col justify-between border border-line-2 bg-ink p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <p className="eyebrow mb-5">Working with me</p>
              <dl className="text-[12.5px]">
                <div className="border-t border-line py-3">
                  <dt className="eyebrow mb-1">Availability</dt>
                  <dd className="flex items-center gap-2 text-bone">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {contact.availability}
                  </dd>
                </div>
                <div className="border-t border-line py-3">
                  <dt className="eyebrow mb-1">Reply time</dt>
                  <dd className="text-bone">Within 2 working days</dd>
                </div>
                <div className="border-t border-line py-3">
                  <dt className="eyebrow mb-1">Engineering</dt>
                  <dd className="text-bone">
                    APIs · Auth · Caching · Rate limiting · Postgres · Redis
                  </dd>
                </div>
                <div className="border-t border-line py-3">
                  <dt className="eyebrow mb-1">Direct</dt>
                  <dd className="break-all text-bone">{contact.email}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </button>

      <p className="eyebrow mt-3 text-right">
        {showBack ? 'Details' : 'Hover or tap to flip'}
      </p>
    </div>
  )
}
