import { contact, nav } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-[15px] font-medium tracking-[-0.02em]">
            Prashant Thakur<span className="text-accent">.</span>
          </p>
          <p className="eyebrow mt-2">Software Developer</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
          {nav.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-[13px] text-muted transition-colors hover:text-bone"
            >
              {i.label}
            </a>
          ))}
          <a href="#contact" className="text-[13px] text-muted transition-colors hover:text-bone">
            Contact
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[13px] text-muted transition-colors hover:text-bone"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[13px] text-muted transition-colors hover:text-bone"
          >
            LinkedIn
          </a>
          <a
            href={contact.x}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[13px] text-muted transition-colors hover:text-bone"
          >
            X
          </a>
        </nav>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="num text-[10.5px] tracking-[0.14em] text-muted uppercase">
          © {new Date().getFullYear()} Prashant Thakur
        </p>
        <p className="num text-[10.5px] tracking-[0.14em] text-muted uppercase">
          Built from scratch · No template
        </p>
      </div>
    </footer>
  )
}
