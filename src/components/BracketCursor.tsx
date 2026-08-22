import { useEffect, useRef } from 'react'

/**
 * A cursor made of code brackets.
 *
 * Free-roaming it is a small [ ] pair easing behind the pointer. Over anything
 * interactive it snaps open and wraps the element's box — the way a selection
 * wraps a token in an editor — and shows a mono verb for what the thing does.
 *
 * The native cursor is never hidden: this decorates the pointer, it does not
 * replace it. Desktop fine-pointers only, and off entirely under reduced motion.
 *
 * ponytail: one rAF loop, transforms only, no library.
 */

const VERB = 'data-cursor'

export default function BracketCursor() {
  const wrap = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = wrap.current
    const tag = label.current
    if (!el || !tag) return

    // current (eased) and target box, in viewport coords
    const cur = { x: innerWidth / 2, y: innerHeight / 2, w: 26, h: 26 }
    const dst = { ...cur }
    let locked: Element | null = null
    let raf = 0
    let shown = false

    const setTarget = (t: Element | null) => {
      locked = t
      if (t) {
        const r = t.getBoundingClientRect()
        dst.x = r.left + r.width / 2
        dst.y = r.top + r.height / 2
        dst.w = r.width + 18
        dst.h = r.height + 12
        const verb =
          t.getAttribute(VERB) ??
          (t.tagName === 'BUTTON'
            ? 'expand'
            : t.getAttribute('href')?.startsWith('http')
              ? 'open'
              : t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT'
                ? 'type'
                : 'go')
        tag.textContent = verb
        el.dataset.locked = 'true'
      } else {
        dst.w = 26
        dst.h = 26
        tag.textContent = ''
        delete el.dataset.locked
      }
    }

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true
        el.style.opacity = '1'
      }
      const hit = (e.target as Element | null)?.closest?.(
        `a, button, input, textarea, select, [${VERB}]`,
      )
      if (hit !== locked) setTarget(hit ?? null)
      if (!locked) {
        dst.x = e.clientX
        dst.y = e.clientY
      }
    }

    // a locked element can scroll out from under the brackets
    const onScroll = () => locked && setTarget(locked)
    const onLeave = () => {
      shown = false
      el.style.opacity = '0'
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      // brackets follow loosely when free, snap tight when locked
      const k = locked ? 0.28 : 0.19
      cur.x += (dst.x - cur.x) * k
      cur.y += (dst.y - cur.y) * k
      cur.w += (dst.w - cur.w) * 0.24
      cur.h += (dst.h - cur.h) * 0.24
      el.style.transform = `translate3d(${cur.x - cur.w / 2}px, ${cur.y - cur.h / 2}px, 0)`
      el.style.width = `${cur.w}px`
      el.style.height = `${cur.h}px`
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[65] hidden opacity-0 transition-opacity duration-300 will-change-transform md:block"
    >
      <span className="absolute top-0 -left-px h-full w-[7px] border-y border-l border-accent/70 transition-colors duration-300" />
      <span className="absolute top-0 -right-px h-full w-[7px] border-y border-r border-accent/70 transition-colors duration-300" />
      <span
        ref={label}
        className="num absolute top-full left-1/2 mt-2 -translate-x-1/2 text-[9px] tracking-[0.18em] whitespace-nowrap text-accent uppercase opacity-0 transition-opacity duration-200 [[data-locked]_&]:opacity-100"
      />
    </div>
  )
}
