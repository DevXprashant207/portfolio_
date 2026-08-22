import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * One reveal, used everywhere. Short distance, no bounce, fires once.
 * Anything more energetic than this reads as a template.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'span'
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  if (reduced) return <Tag className={className}>{children}</Tag>

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
