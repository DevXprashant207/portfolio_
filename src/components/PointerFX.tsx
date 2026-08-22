import { useEffect } from 'react'

/**
 * One pointer loop for the whole site.
 *
 * Publishes four CSS variables on <html> — --px/--py (eased cursor position) and
 * --mx/--my (the same, normalised to -1..1) — so any element can react to the
 * cursor with pure CSS and no extra listeners. The light that trails the pointer
 * is rendered here; parallax is opt-in per element.
 *
 * Heavy easing (0.07) is the whole trick: the light arrives a beat after the
 * cursor, which reads as depth. Snapping to the cursor reads as a gimmick.
 *
 * ponytail: one rAF, one element. Desktop pointers only, off under reduced motion.
 */
export default function PointerFX() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let tx = innerWidth / 2
    let ty = innerHeight / 2
    let cx = tx
    let cy = ty
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      root.style.setProperty('--px', `${cx.toFixed(1)}px`)
      root.style.setProperty('--py', `${cy.toFixed(1)}px`)
      root.style.setProperty('--mx', ((cx / innerWidth) * 2 - 1).toFixed(3))
      root.style.setProperty('--my', ((cy / innerHeight) * 2 - 1).toFixed(3))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] hidden md:block"
      style={{
        // screen blend keeps it additive light, so text underneath stays readable
        mixBlendMode: 'screen',
        background:
          'radial-gradient(460px circle at var(--px) var(--py), rgba(224,169,109,0.055), transparent 68%)',
      }}
    />
  )
}
