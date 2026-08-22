import { useEffect, useRef } from 'react'

/**
 * The build process drawing itself, under the "How I work" heading.
 *
 * DISCOVER → PLAN → BUILD → TEST → SHIP → IMPROVE. A pulse travels the rail and
 * each station resolves as it arrives: stem grows, index and label rise into
 * place, completion bar fills. Completed stations stay, dimmed.
 *
 * Deliberately typographic — an earlier version drew little pictograms for each
 * stage and they read as clipart next to this typography. Rules, numerals and
 * mono labels are the same language as the rest of the page.
 *
 * ponytail: one canvas, no library. Timeline is a single normalised clock.
 */

const STAGES = ['DISCOVER', 'PLAN', 'BUILD', 'TEST', 'SHIP', 'IMPROVE']

const CYCLE = 15_000 // ms for one full pass
const HOLD = 0.16 // share of the cycle spent holding the finished state

// slow out — things arrive rather than snap
const ease = (p: number) => 1 - Math.pow(1 - p, 4)
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export default function ProcessBackdrop({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let elapsed = 0
    let last = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return

      if (!last) last = now
      const dt = Math.min(now - last, 64) // a backgrounded tab must not fast-forward
      last = now
      if (!reduced) elapsed = (elapsed + dt) % CYCLE

      const t = reduced ? 1 - HOLD : elapsed / CYCLE
      ctx.clearRect(0, 0, w, h)

      // Six labels will not fit across a phone, so the rail stands up instead.
      const vertical = w < 640
      const pad = vertical ? 30 : 48
      const span = (vertical ? h : w) - pad * 2
      const last_i = STAGES.length - 1
      const rail = vertical ? 30 : h * 0.74
      const stem = vertical ? 22 : 30

      const at = (u: number): [number, number] =>
        vertical ? [rail, pad + span * u] : [pad + span * u, rail]

      const drawT = clamp01(t / (1 - HOLD))
      const cycleAlpha = reduced ? 1 : t > 1 - HOLD * 0.45 ? clamp01((1 - t) / (HOLD * 0.45)) : 1
      if (cycleAlpha <= 0.01) return

      const [hx, hy] = at(drawT)
      const [sx, sy] = at(0)
      const [ex, ey] = at(1)

      // --- rail: solid behind the pulse, ghosted ahead of it ---
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(255,255,255,${0.16 * cycleAlpha})`
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(hx, hy)
      ctx.stroke()

      ctx.strokeStyle = `rgba(255,255,255,${0.05 * cycleAlpha})`
      ctx.beginPath()
      ctx.moveTo(hx, hy)
      ctx.lineTo(ex, ey)
      ctx.stroke()

      ctx.textBaseline = 'middle'

      STAGES.forEach((label, i) => {
        const [x, y] = at(i / last_i)
        // each station resolves over roughly one sixth of the pass, starting early
        const p = ease(clamp01(drawT * last_i - (i - 0.55)))
        if (p <= 0.001) return

        const settled = p > 0.999
        const a = cycleAlpha * (settled ? 0.6 : 1)
        const rise = (1 - p) * 10 // content lifts into place

        // stem from the rail
        ctx.strokeStyle = `rgba(224,169,109,${0.45 * a})`
        ctx.beginPath()
        if (vertical) {
          ctx.moveTo(x, y)
          ctx.lineTo(x + stem * p, y)
        } else {
          ctx.moveTo(x, y)
          ctx.lineTo(x, y - stem * p)
        }
        ctx.stroke()

        // station mark on the rail
        const m = 3 + 2 * p
        ctx.fillStyle = `rgba(224,169,109,${0.85 * a})`
        ctx.fillRect(x - m / 2, y - m / 2, m, m)

        const tx = vertical ? x + stem + 14 : x
        const ty = vertical ? y : y - stem - 26 + rise
        ctx.textAlign = vertical ? 'left' : 'center'

        // index
        ctx.font = '500 9px "JetBrains Mono", monospace'
        ctx.letterSpacing = '0.14em'
        ctx.fillStyle = `rgba(224,169,109,${0.8 * a * p})`
        ctx.fillText(String(i + 1).padStart(2, '0'), tx, vertical ? ty - 11 : ty - 1)

        // label
        ctx.font = '500 11px "JetBrains Mono", monospace'
        ctx.letterSpacing = '0.16em'
        ctx.fillStyle = `rgba(236,236,238,${(settled ? 0.5 : 0.92) * cycleAlpha * p})`
        ctx.fillText(label, tx, vertical ? ty + 5 : ty + 17)

        // completion bar under the label
        const bw = vertical ? 56 : 44
        const bx = vertical ? tx : tx - bw / 2
        const by = vertical ? ty + 17 : ty + 30
        ctx.fillStyle = `rgba(255,255,255,${0.07 * cycleAlpha})`
        ctx.fillRect(bx, by, bw, 1.5)
        ctx.fillStyle = `rgba(224,169,109,${0.75 * a})`
        ctx.fillRect(bx, by, bw * p, 1.5)
      })

      // --- the pulse: stacked arcs, never shadowBlur ---
      if (!reduced && drawT > 0.001 && drawT < 0.999) {
        ctx.beginPath()
        ctx.arc(hx, hy, 8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(224,169,109,${0.09 * cycleAlpha})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(hx, hy, 4.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(224,169,109,${0.22 * cycleAlpha})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(hx, hy, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(224,169,109,${0.9 * cycleAlpha})`
        ctx.fill()
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      last = 0
    })
    io.observe(canvas)

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" role="presentation" />
}
