import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

type Props = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
  external?: boolean
  cursor?: string
}

/**
 * Magnetic pull is 5px and desktop-only. Enough to feel considered,
 * not enough to make a button hard to click.
 */
export default function Cta({
  href,
  children,
  variant = 'solid',
  className = '',
  external,
  cursor,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    el.style.transform = `translate(${dx * 5}px, ${dy * 5}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const base =
    'group inline-flex items-center justify-center gap-2.5 h-12 px-6 text-[13px] font-medium tracking-[0.02em] rounded-[3px] transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap'

  const styles =
    variant === 'solid'
      ? 'bg-accent text-ink hover:bg-bone'
      : 'border border-line-2 text-bone hover:border-bone hover:bg-white/[0.03]'

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${base} ${styles} ${className}`}
      data-cursor={cursor}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  )
}
