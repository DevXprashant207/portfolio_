import { useEffect, useState } from 'react'

/** On phones the nav CTA is behind a menu, so the ask needs to stay on screen. */
export default function MobileCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9
      const contactVisible = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.85
        : false
      setShow(pastHero && !contactVisible)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 px-4 pt-3 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      <a
        href="#contact"
        className="flex h-12 items-center justify-center gap-2 rounded-[3px] bg-accent text-[14px] font-medium text-ink"
        tabIndex={show ? 0 : -1}
      >
        Start a project <span aria-hidden>→</span>
      </a>
    </div>
  )
}
