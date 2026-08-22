import { useEffect, useState } from 'react'
import { nav } from '../data/site'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-accent focus:text-ink focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || open
            ? 'bg-ink/80 backdrop-blur-xl border-b border-line'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-[68px] items-center justify-between" aria-label="Primary">
          <a
            href="#top"
            className="font-display text-[15px] font-medium tracking-[-0.02em]"
            onClick={() => setOpen(false)}
          >
            Prashant Thakur<span className="text-accent">.</span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] text-muted transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex h-9 items-center rounded-[3px] border border-line-2 px-4 text-[12.5px] font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Start a project
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`block h-px w-5 bg-bone transition-transform duration-300 ${
                open ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-bone transition-transform duration-300 ${
                open ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu: big targets, one screen, no animation theatre */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink pt-[68px] md:hidden"
      >
        <div className="shell flex h-full flex-col justify-between py-10">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5 font-display text-3xl tracking-[-0.03em]"
                >
                  <span className="num text-[11px] text-muted">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex h-14 items-center justify-center rounded-[3px] bg-accent text-[14px] font-medium text-ink"
          >
            Start a project
          </a>
        </div>
      </div>
    </>
  )
}
