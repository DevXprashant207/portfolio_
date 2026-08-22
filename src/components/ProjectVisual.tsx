import type { Project } from '../data/site'

/**
 * Diagrams, not screenshots. A fake UI mock is worse than no image — a founder
 * can tell, and it makes everything next to it suspect. These describe the shape
 * of the system instead.
 */

const L = 'rgba(255,255,255,0.14)'
const T = 'rgba(236,236,238,0.55)'
const A = '#e0a96d'
const mono = { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.12em' }

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="relative border border-line bg-white/[0.015] p-5">
      <figcaption className="eyebrow mb-4 block">{label}</figcaption>
      {children}
    </figure>
  )
}

function Marketplace() {
  return (
    <Frame label="Two journeys, one model">
      <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="Diagram: student and tutor journeys sharing one data model, with an admin verification surface">
        <rect x="4" y="8" width="140" height="46" fill="none" stroke={L} />
        <text x="74" y="35" textAnchor="middle" fill={T} style={mono}>HIRE A TUTOR</text>
        <rect x="176" y="8" width="140" height="46" fill="none" stroke={L} />
        <text x="246" y="35" textAnchor="middle" fill={T} style={mono}>BECOME A TUTOR</text>

        <rect x="4" y="92" width="312" height="44" fill="rgba(224,169,109,0.1)" stroke={A} />
        <text x="160" y="119" textAnchor="middle" fill={A} style={mono}>SUBJECT · GRADE · PROFILE</text>

        <g stroke={L} fill="none">
          <path d="M74 54 V92" />
          <path d="M246 54 V92" />
          <path d="M160 136 V166" />
        </g>

        <rect x="4" y="166" width="150" height="42" fill="none" stroke={L} />
        <text x="79" y="192" textAnchor="middle" fill={T} style={mono}>REQUESTS</text>
        <rect x="166" y="166" width="150" height="42" fill="none" stroke={L} />
        <text x="241" y="192" textAnchor="middle" fill={T} style={mono}>ADMIN · VERIFY</text>
      </svg>
    </Frame>
  )
}

function Pipeline() {
  const steps = ['REPO URL', 'CLONE', 'BUILD', 'S3', 'LIVE URL']
  return (
    <Frame label="Deploy pipeline">
      <svg viewBox="0 0 320 230" className="w-full" role="img" aria-label="Diagram: repository URL cloned, built, uploaded to S3 and returned as a live URL, with deployment status held in Redis">
        <style>{`
          .march { stroke-dasharray: 4 6; animation: march 2s linear infinite }
          @keyframes march { to { stroke-dashoffset: -20 } }
          @media (prefers-reduced-motion: reduce) { .march { animation: none } }
        `}</style>

        {steps.map((s, i) => {
          const accent = i === 0 || i === steps.length - 1
          return (
            <g key={s}>
              <rect
                x="4"
                y={4 + i * 44}
                width="200"
                height="30"
                fill={accent ? 'rgba(224,169,109,0.1)' : 'transparent'}
                stroke={accent ? A : L}
              />
              <text x="18" y={23 + i * 44} fill={accent ? A : T} style={mono}>{s}</text>
              {i < steps.length - 1 && (
                <path className="march" d={`M104 ${34 + i * 44} V ${48 + i * 44}`} stroke={L} fill="none" />
              )}
            </g>
          )
        })}

        <rect x="232" y="70" width="84" height="86" fill="none" stroke={L} strokeDasharray="3 3" />
        <text x="274" y="110" textAnchor="middle" fill={T} style={mono}>REDIS</text>
        <text x="274" y="126" textAnchor="middle" fill={T} style={{ ...mono, fontSize: 7 }}>STATUS</text>
        <path d="M204 113 H232" stroke={L} fill="none" />
      </svg>
    </Frame>
  )
}

function Portal() {
  return (
    <Frame label="Record to certificate">
      <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="Diagram: volunteer and blood donation registrations become records, which generate certificates automatically">
        <rect x="4" y="8" width="150" height="44" fill="none" stroke={L} />
        <text x="79" y="34" textAnchor="middle" fill={T} style={mono}>VOLUNTEER</text>
        <rect x="166" y="8" width="150" height="44" fill="none" stroke={L} />
        <text x="241" y="34" textAnchor="middle" fill={T} style={mono}>BLOOD DRIVE</text>

        <g stroke={L} fill="none">
          <path d="M79 52 V86" />
          <path d="M241 52 V86" />
        </g>

        <rect x="4" y="86" width="312" height="44" fill="none" stroke={L} />
        <text x="160" y="113" textAnchor="middle" fill={T} style={mono}>REGISTRATION RECORD</text>

        <path d="M160 130 V162" stroke={A} fill="none" />
        <rect x="60" y="162" width="200" height="46" fill="rgba(224,169,109,0.1)" stroke={A} />
        <text x="160" y="182" textAnchor="middle" fill={A} style={mono}>CERTIFICATE</text>
        <text x="160" y="197" textAnchor="middle" fill={T} style={{ ...mono, fontSize: 7 }}>GENERATED, NOT TYPED</text>
      </svg>
    </Frame>
  )
}

export default function ProjectVisual({ visual }: { visual: Project['visual'] }) {
  if (visual === 'marketplace') return <Marketplace />
  if (visual === 'pipeline') return <Pipeline />
  return <Portal />
}
