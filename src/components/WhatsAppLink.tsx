import { contact } from '../data/site'

export const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`

/** Kept as a hairline glyph — a green bubble would undo the rest of the page. */
export function WhatsAppMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2.5a9.4 9.4 0 0 0-8.1 14.1L2.5 21.5l5-1.3A9.4 9.4 0 1 0 12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.9 7.6c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a7 7 0 0 0 3 2.6c.3.1.4 0 .6-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.4a2 2 0 0 1-1.4 1.8c-.5.2-1.2.2-3.4-.8a9 9 0 0 1-3.7-3.7c-.7-1.3-.7-2.3-.6-2.8a2 2 0 0 1 .5-.8Z"
        fill="currentColor"
      />
    </svg>
  )
}
