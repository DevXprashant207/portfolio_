import { useState } from 'react'
import Reveal from '../components/Reveal'
import { contact, projectTypes, budgets } from '../data/site'
import { WhatsAppMark, whatsappHref } from '../components/WhatsAppLink'

const field =
  'w-full bg-transparent border-b border-line px-0 py-3.5 text-[15px] text-bone placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors duration-300'

const label = 'eyebrow mb-1 block'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Submissions POST to FormSubmit, which relays them to contact.email. No server
 * to run and no API key. If the relay is down or blocked, the visitor is handed a
 * prefilled mailto instead — an enquiry must never disappear because a third party
 * had a bad day.
 */
export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [fallback, setFallback] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const get = (k: string) => String(f.get(k) ?? '').trim()

    // honeypot: real people leave this empty, bots fill everything
    if (get('_honey')) return

    const summary = [
      `Name: ${get('name')}`,
      `Email: ${get('email')}`,
      `Company: ${get('company') || '—'}`,
      `Project type: ${get('type')}`,
      `Budget: ${get('budget')}`,
      '',
      get('message'),
    ].join('\n')

    setFallback(
      `mailto:${contact.email}?subject=${encodeURIComponent(
        `New project enquiry — ${get('name')}`,
      )}&body=${encodeURIComponent(summary)}`,
    )

    setStatus('sending')

    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: get('name'),
          email: get('email'),
          company: get('company') || '—',
          'project type': get('type'),
          budget: get('budget'),
          message: get('message'),
          _subject: `New project enquiry — ${get('name')}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="mb-7 flex items-center gap-4">
                <span className="num text-[11px] tracking-[0.18em] text-accent">07</span>
                <span className="hairline w-10" />
                <span className="eyebrow">Contact</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-section max-w-[14ch]">Have a project in mind?</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-lead mt-6">
                Tell me what you’re building, what problem you’re solving, and where you want
                to take it. If it isn’t a fit, I’ll say so and point you somewhere better.
              </p>
            </Reveal>

            {/* A form is a commitment. WhatsApp is how most of this market actually opens. */}
            <Reveal delay={0.12}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="message"
                className="group mt-10 flex items-center justify-between gap-4 border border-line-2 p-5 transition-colors duration-300 hover:border-accent hover:bg-white/[0.02]"
              >
                <span className="flex items-center gap-3.5">
                  <WhatsAppMark className="h-5 w-5 text-accent" />
                  <span>
                    <span className="block text-[15px] text-bone">Message me on WhatsApp</span>
                    <span className="eyebrow mt-1 block">
                      Faster than the form · {contact.phone}
                    </span>
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-10 space-y-5">
                <div className="border-t border-line pt-4">
                  <dt className="eyebrow mb-1.5">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[15px] text-bone underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-line pt-4">
                  <dt className="eyebrow mb-1.5">Phone &amp; WhatsApp</dt>
                  <dd className="flex flex-wrap items-center gap-x-5 gap-y-1">
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="text-[15px] text-bone transition-colors hover:text-accent"
                    >
                      {contact.phone}
                    </a>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-[15px] text-muted transition-colors hover:text-accent"
                    >
                      <WhatsAppMark className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </dd>
                </div>
                <div className="border-t border-line pt-4">
                  <dt className="eyebrow mb-1.5">Elsewhere</dt>
                  <dd className="flex gap-6">
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[15px] text-bone transition-colors hover:text-accent"
                    >
                      GitHub
                    </a>
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[15px] text-bone transition-colors hover:text-accent"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={contact.x}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[15px] text-bone transition-colors hover:text-accent"
                    >
                      X
                    </a>
                  </dd>
                </div>
                <div className="border-t border-line pt-4">
                  <dt className="eyebrow mb-1.5">Response</dt>
                  <dd className="text-[15px] text-muted">Every enquiry gets a reply within 2 working days.</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="name">
                    Name *
                  </label>
                  <input id="name" name="name" required className={field} placeholder="Your name" />
                </div>
                <div>
                  <label className={label} htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={field}
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className={label} htmlFor="company">
                    Company
                  </label>
                  <input id="company" name="company" className={field} placeholder="Optional" />
                </div>
                <div>
                  <label className={label} htmlFor="type">
                    Project type
                  </label>
                  <select id="type" name="type" className={`${field} appearance-none bg-[length:10px] bg-[right_2px_center] bg-no-repeat pr-8 bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" fill="none" stroke="%238e8e98" stroke-width="1.2"/></svg>')]`} defaultValue={projectTypes[0]}>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-ink">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="budget">
                    Budget range
                  </label>
                  <select id="budget" name="budget" className={`${field} appearance-none bg-[length:10px] bg-[right_2px_center] bg-no-repeat pr-8 bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" fill="none" stroke="%238e8e98" stroke-width="1.2"/></svg>')]`} defaultValue={budgets[1]}>
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-ink">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="message">
                    What are you building? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className={`${field} resize-none`}
                    placeholder="The problem, who it’s for, and where you are today."
                  />
                </div>

                {/* honeypot — hidden from people, irresistible to bots */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    data-cursor="send"
                    className="inline-flex h-12 items-center justify-center gap-2.5 rounded-[3px] bg-accent px-7 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-bone disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Start a conversation'}
                    <span aria-hidden>→</span>
                  </button>

                  <p aria-live="polite" className="text-[13px] text-muted">
                    {status === 'sent' && (
                      <span className="text-bone">
                        Sent. I’ll reply within 2 working days.
                      </span>
                    )}
                    {status === 'error' && (
                      <>
                        Something blocked the send.{' '}
                        <a
                          href={fallback}
                          className="text-accent underline underline-offset-4"
                        >
                          Email it to me directly
                        </a>{' '}
                        instead.
                      </>
                    )}
                    {(status === 'idle' || status === 'sending') &&
                      'Goes straight to my inbox. No newsletter, no CRM.'}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
