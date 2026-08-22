import { motion, useReducedMotion } from 'framer-motion'
import Cta from '../components/Cta'
import { contact } from '../data/site'
import PortraitCard from '../components/PortraitCard'

const LINE_1 = 'Software your'
const LINE_2 = 'business can'
const LINE_3 = 'actually run on.'

function Line({ text, delay }: { text: string; delay: number }) {
  const reduced = useReducedMotion()
  if (reduced) return <span className="block">{text}</span>
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden pt-28 pb-10 lg:justify-center lg:pt-24"
    >
      {/* single soft vignette — the only gradient on the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(70% 55% at 72% 42%, rgba(224,169,109,0.07), transparent 70%)',
        }}
      />

      <div className="shell relative grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="eyebrow text-bone">Prashant Thakur</span>
            <span className="hairline w-8" />
            <span className="eyebrow">Software Developer</span>
          </motion.div>

          <h1 className="t-hero font-display">
            <Line text={LINE_1} delay={0.06} />
            <Line text={LINE_2} delay={0.14} />
            <span className="block text-muted">
              <Line text={LINE_3} delay={0.22} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="t-lead mt-7"
          >
            I help startups and businesses turn ideas into production-ready software — web
            applications, SaaS products, backend systems, APIs and integrations. Designed,
            built and shipped end to end.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Cta href="#contact" cursor="start">Start a project</Cta>
            <Cta href="#work" variant="ghost" cursor="view work">
              View selected work
            </Cta>
          </motion.div>
        </div>

        {/* One object in this column, not two: the photo, framed as a plate. */}
        <div className="lg:col-span-5 lg:justify-self-center">
          <PortraitCard />
        </div>
      </div>

      {/* Trust strip: availability, location, socials — the things a founder scans for */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="shell relative mt-14 lg:mt-12"
      >
        <div className="hairline mb-5" />
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2.5 text-[12.5px] text-bone">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {contact.availability}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[12.5px] text-muted transition-colors hover:text-bone"
            >
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[12.5px] text-muted transition-colors hover:text-bone"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
