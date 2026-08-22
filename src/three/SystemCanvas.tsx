import { useEffect, useRef } from 'react'

/**
 * A perspective-projected system graph drawn on a 2D canvas.
 *
 * Deliberately not three.js — this is one object with ~10 nodes. A WebGL runtime
 * would cost ~600KB and a second render loop to draw a wireframe we can project
 * in 40 lines. Depth sorting, perspective, fog and cursor orbit are all here.
 *
 * ponytail: no lighting model, flat depth-tinted strokes. Swap in three.js only
 * if this ever needs materials, shadows or loaded geometry.
 */

type Vec3 = [number, number, number]

type Node = { id: string; label: string; p: Vec3; accent?: boolean }

const NODES: Node[] = [
  { id: 'client', label: 'CLIENT', p: [0, 2.05, 0] },
  { id: 'api', label: 'API', p: [0, 1.15, 0], accent: true },
  { id: 'limit', label: 'RATE LIMIT', p: [0, 0.35, 0] },
  { id: 'svc', label: 'SERVICE', p: [0, -0.5, 0], accent: true },
  { id: 'redis', label: 'REDIS', p: [-1.55, -0.08, 0.62] },
  { id: 'pg', label: 'POSTGRES', p: [1.55, -0.08, -0.62] },
  { id: 'router', label: 'QUEUE', p: [0, -1.3, 0] },
  { id: 'sms', label: 'WORKERS', p: [-1.4, -2.1, 0.55] },
  { id: 'email', label: 'STORAGE', p: [0, -2.15, -0.4] },
  { id: 'wa', label: 'WEBHOOKS', p: [1.4, -2.1, 0.55] },
]

const EDGES: [string, string][] = [
  ['client', 'api'],
  ['api', 'limit'],
  ['limit', 'svc'],
  ['svc', 'redis'],
  ['svc', 'pg'],
  ['svc', 'router'],
  ['router', 'sms'],
  ['router', 'email'],
  ['router', 'wa'],
]

/** Packets travel this path in order, so the eye reads a request, not noise. */
const FLOW = ['client', 'api', 'limit', 'svc', 'router', 'sms']

export default function SystemCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let t = reduced ? 2.4 : 0
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

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - (rect.left + rect.width / 2)) / rect.width
      pointer.y = (e.clientY - (rect.top + rect.height / 2)) / rect.height
    }

    const project = (p: Vec3, yaw: number, pitch: number) => {
      const [x, y, z] = p
      // yaw about Y
      const cx = Math.cos(yaw)
      const sx = Math.sin(yaw)
      const x1 = x * cx + z * sx
      const z1 = -x * sx + z * cx
      // pitch about X
      const cy = Math.cos(pitch)
      const sy = Math.sin(pitch)
      const y1 = y * cy - z1 * sy
      const z2 = y * sy + z1 * cy

      const dist = 6.2
      const scale = Math.min(w, h) / 5.6
      const f = dist / (dist - z2)
      return {
        // labels hang to the right of every node, so the optical centre sits left of w/2
        x: w / 2 - 26 + x1 * scale * f,
        y: h / 2 - y1 * scale * f,
        // 0 = far, 1 = near
        d: Math.min(1, Math.max(0, (z2 + 2.2) / 4.4)),
      }
    }

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return

      // time-based, not per-frame: a fixed step runs double speed on a 120Hz panel
      if (!last) last = now
      const dt = Math.min(now - last, 64)
      last = now
      if (!reduced) t += dt * 0.00036

      // ease the cursor so nothing snaps
      eased.x += (pointer.x - eased.x) * 0.045
      eased.y += (pointer.y - eased.y) * 0.045

      const yaw = Math.sin(t * 0.5) * 0.42 + eased.x * 0.55
      const pitch = -0.09 + Math.sin(t * 0.34) * 0.05 + eased.y * 0.3

      ctx.clearRect(0, 0, w, h)

      const pts = new Map(NODES.map((n) => [n.id, project(n.p, yaw, pitch)]))
      const small = w < 460

      // --- edges, far to near ---
      const edges = EDGES.map(([a, b]) => {
        const pa = pts.get(a)!
        const pb = pts.get(b)!
        return { a, b, pa, pb, d: (pa.d + pb.d) / 2 }
      }).sort((m, n) => m.d - n.d)

      for (const e of edges) {
        ctx.beginPath()
        ctx.moveTo(e.pa.x, e.pa.y)
        ctx.lineTo(e.pb.x, e.pb.y)
        ctx.strokeStyle = `rgba(255,255,255,${0.09 + e.d * 0.15})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // --- packets: one request walking the happy path ---
      if (!reduced) {
        for (let k = 0; k < 3; k++) {
          const head = (t * 0.26 + k * 0.34) % 1
          const seg = head * (FLOW.length - 1)
          const i = Math.floor(seg)
          const f = seg - i
          const pa = pts.get(FLOW[i])!
          const pb = pts.get(FLOW[i + 1])!
          const x = pa.x + (pb.x - pa.x) * f
          const y = pa.y + (pb.y - pa.y) * f
          const fade = Math.sin(head * Math.PI)
          // stacked arcs instead of shadowBlur: same look, a fraction of the cost
          ctx.beginPath()
          ctx.arc(x, y, 5.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(224,169,109,${0.12 * fade})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(x, y, 2.1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(224,169,109,${0.85 * fade})`
          ctx.fill()
        }
      }

      // --- nodes, far to near ---
      const ordered = NODES.map((n) => ({ n, pt: pts.get(n.id)! })).sort(
        (m, o) => m.pt.d - o.pt.d,
      )

      ctx.font = `500 ${small ? 8 : 9.5}px "JetBrains Mono", monospace`
      ctx.letterSpacing = '0.12em'
      ctx.textBaseline = 'middle'

      for (const { n, pt } of ordered) {
        const s = (n.accent ? 5 : 3.6) * (0.75 + pt.d * 0.5)
        const alpha = 0.45 + pt.d * 0.55

        ctx.beginPath()
        ctx.rect(pt.x - s / 2, pt.y - s / 2, s, s)
        if (n.accent) {
          ctx.fillStyle = `rgba(224,169,109,${alpha})`
          ctx.fill()
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.75})`
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = `rgba(8,8,10,${alpha})`
          ctx.fill()
        }

        ctx.fillStyle = n.accent
          ? `rgba(224,169,109,${alpha * 0.95})`
          : `rgba(236,236,238,${alpha * 0.72})`
        ctx.fillText(n.label, pt.x + s / 2 + 8, pt.y + 0.5)
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

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', onPointer, { passive: true })
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  )
}
