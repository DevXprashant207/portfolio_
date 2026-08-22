import { useEffect, useRef } from 'react'

/** One-pixel accent line across the top. Read position, no decoration. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left scale-x-0 bg-accent"
    />
  )
}
