import shotUpHome from '../assets/shot-uphometuition.jpg'
import shotUddeshhya from '../assets/shot-uddeshhya.jpg'
import shotUddeshhyaCert from '../assets/shot-uddeshhya-cert.jpg'

/**
 * All copy lives here. Replace anything in [BRACKETS] with the real value.
 */

export const contact = {
  email: 'prashant.thakur.work@gmail.com',
  phone: '+91 94517 40121',
  phoneHref: '+919451740121',
  whatsapp: 'https://wa.me/919451740121',
  /** Prefilled so the first message already says what it is about. */
  whatsappText:
    'Hi Prashant — I found your site. I have a project I would like to talk about:',
  /**
   * FormSubmit relays the contact form to `email`. No account, no API key — but the
   * FIRST submission triggers a one-time confirmation email that must be clicked
   * before anything is delivered. Swap in the hashed endpoint FormSubmit emails you
   * (https://formsubmit.co/ajax/<hash>) to keep the address out of the bundle.
   */
  formEndpoint: 'https://formsubmit.co/ajax/prashant.thakur.work@gmail.com',
  github: 'https://github.com/DevXprashant207',
  linkedin: 'https://www.linkedin.com/in/devxprashant207/',
  x: 'https://twitter.com/DevXprashant207',
  location: 'Delhi NCR, India · Working with teams remotely',
  availability: 'Available for new projects',
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#working' },
]

export const services = [
  {
    n: '01',
    title: 'Full-stack web applications',
    body: 'Custom applications built around how your business actually operates — not around a template that has to be bent into shape.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    n: '02',
    title: 'SaaS products',
    body: 'MVP to production: multi-tenant data models, billing, roles and permissions, and the boring reliability work that decides whether v2 is possible.',
    tags: ['Multi-tenancy', 'Billing', 'Auth', 'Roles'],
  },
  {
    n: '03',
    title: 'Backend & APIs',
    body: 'Services other teams can build against. Versioned contracts, predictable errors, authentication that holds, and a schema that survives its second migration.',
    tags: ['Node.js', 'TypeScript', 'REST', 'PostgreSQL'],
  },
  {
    n: '04',
    title: 'Business systems',
    body: 'Dashboards, admin panels and internal tools that replace the spreadsheet everyone is quietly terrified of.',
    tags: ['Dashboards', 'Admin', 'Reporting', 'Ops tooling'],
  },
  {
    n: '05',
    title: 'Integrations',
    body: 'Payments, messaging, and third-party services wired in properly — webhooks verified, retries bounded, failure states visible instead of silent.',
    tags: ['Payments', 'Webhooks', 'SMS/Email', 'Automation'],
  },
  {
    n: '06',
    title: 'System architecture',
    body: 'Caching, queues, rate limiting and service boundaries. Sized to your current load and the next order of magnitude, not to a conference talk.',
    tags: ['Redis', 'Queues', 'Rate limiting', 'Caching'],
  },
]

export type Project = {
  slug: string
  index: string
  title: string
  kind: string
  year: string
  summary: string
  problem: string
  solution: string
  decisions: { title: string; body: string }[]
  stack: string[]
  visual: 'marketplace' | 'pipeline' | 'portal'
  /** Who it was built for. Only set where that is a fact, never a flourish. */
  client?: string
  /** Screenshots of the live product. Proof first, diagram second. */
  shots?: { src: string; caption: string }[]
  link?: { href: string; label: string }
}

export const projects: Project[] = [
  {
    slug: 'uphometuition',
    index: '01',
    title: 'UpHomeTuition',
    kind: 'Client work · Two-sided marketplace, in production',
    year: '2025',
    summary:
      'A tutoring platform in production, connecting students with verified home tutors across subjects and grades — tutor discovery, hiring requests, tutor onboarding and role-based access.',
    problem:
      'Matching students to tutors was happening over phone calls and message threads. There was no verified tutor record, no structured way for a parent to state what they needed, and no shared view of which request had been handled.',
    solution:
      'A platform with two distinct journeys — hire a tutor and become a tutor — over one data model. Subjects, grades and tutor profiles are structured data, requests are tracked records rather than messages, and an admin surface manages verification and content.',
    decisions: [
      {
        title: 'Two audiences, one schema',
        body: 'Students and tutors need different screens but describe the same objects: a subject, a grade, a location, an availability. Modelling that once kept the second journey from becoming a second codebase.',
      },
      {
        title: 'Role-based access from the first commit',
        body: 'Tutor, student and admin capabilities diverge fast. Putting roles in the auth layer early avoided the rewrite that follows bolting permissions on afterwards.',
      },
      {
        title: 'Content the owner can change without me',
        body: 'Subjects, faculty profiles and articles are editable data, not hardcoded markup. A platform the client cannot update is a platform that goes stale the week after handover.',
      },
    ],
    stack: ['React', 'Node.js', 'REST APIs', 'Authentication', 'Responsive UI'],
    visual: 'marketplace',
    client: 'Built for Saurabh Yadav, founder of UpHomeTuition',
    shots: [{ src: shotUpHome, caption: 'uphometuition.com — live' }],
    link: { href: 'https://www.uphometuition.com/', label: 'uphometuition.com' },
  },
  {
    slug: 'nebulahost',
    index: '02',
    title: 'NebulaHost',
    kind: 'Own project · Infrastructure',
    year: '2025',
    summary:
      'A deployment platform that takes a public React repository URL and returns a live URL — clone, build, upload, serve. Built as separate services rather than one box.',
    problem:
      'Shipping a static front end still means wiring a build pipeline, a bucket and a host. I wanted the whole path reduced to one input: the repository URL.',
    solution:
      'A request handler accepts the URL and queues the job; an upload service stores the artefacts; a deploy service builds and publishes to S3; the dashboard polls status until a live URL comes back.',
    decisions: [
      {
        title: 'Split the services along the failure lines',
        body: 'Cloning, building and serving fail for entirely different reasons and at different rates. Separate services mean a build failure never takes the dashboard or the served sites down with it.',
      },
      {
        title: 'Status in Redis, polled by the UI',
        body: 'A build is a long operation the user needs to watch. Deployment state lives in Redis and the dashboard polls it, so progress is visible instead of the page appearing to hang.',
      },
      {
        title: 'Object storage instead of a server per site',
        body: 'Deployed output is static. Serving it from S3 rather than a running process per deployment removes the entire class of problems where a site is down because its server died.',
      },
    ],
    stack: ['Node.js', 'React', 'Redis', 'AWS S3', 'Microservices'],
    visual: 'pipeline',
    link: { href: 'https://github.com/DevXprashant207/NebulaHost', label: 'Source on GitHub' },
  },
  {
    slug: 'uddeshhya',
    index: '03',
    title: 'Uddeshhya NGO',
    kind: 'Client work · Platform for a registered NGO',
    year: '2024',
    summary:
      'The official platform for Uddeshhya, a registered NGO — volunteer registration, a blood donation portal, automated certificates, and content the team publishes themselves.',
    problem:
      'A volunteer-run organisation was handling registrations and certificates by hand. Every drive meant another spreadsheet, and every certificate meant someone editing a document and emailing it.',
    solution:
      'Registration and blood-donation flows became forms backed by records, certificates are generated from those records automatically, and the gallery, blogs and project pages are content modules the team edits without touching code.',
    decisions: [
      {
        title: 'Generate the certificate from the record',
        body: 'A certificate is a view of a registration, not a file someone types. Deriving it means it cannot disagree with the record it certifies, and reissuing costs nothing.',
      },
      {
        title: 'Hand over the content, not just the site',
        body: 'The people running the organisation change every year. Anything they publish regularly — drives, articles, galleries — had to be editable by a volunteer with no technical background.',
      },
      {
        title: 'Built for search, because reach is the point',
        body: 'For an NGO, being found is the function. Semantic structure, metadata and performance were requirements, not polish.',
      },
    ],
    stack: ['React', 'Node.js', 'Content modules', 'PDF generation', 'SEO'],
    visual: 'portal',
    client: 'Built for Uddeshhya, registered under the Societies Registration Act, 1860',
    shots: [
      { src: shotUddeshhya, caption: 'uddeshhya.in — live' },
      { src: shotUddeshhyaCert, caption: 'Certificate generated from the donation record' },
    ],
    link: { href: 'https://uddeshhya.in/', label: 'uddeshhya.in' },
  },
]

export const engineering = [
  { k: 'API design', v: 'Contracts that survive their second consumer.' },
  { k: 'Authentication', v: 'Sessions, roles and permissions that hold under real use.' },
  { k: 'Database design', v: 'Constraints in the schema, not assumptions in the code.' },
  { k: 'Caching', v: 'Redis where it removes work — not everywhere by reflex.' },
  { k: 'Rate limiting', v: 'Protecting the service and its downstream providers.' },
  { k: 'Failure handling', v: 'Explicit states. No silent drops.' },
  { k: 'Observability', v: 'When something breaks, the logs already answer why.' },
  { k: 'Scalability', v: 'Sized for the next order of magnitude, not the next keynote.' },
]

export const process = [
  {
    n: '01',
    title: 'Discover',
    body: 'What the business needs, who uses it, and what actually counts as done. Ambiguity is cheapest to kill here.',
  },
  {
    n: '02',
    title: 'Plan',
    body: 'Scope, architecture, milestones and the trade-offs behind each — written down before anything is built.',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Iterative delivery with something reviewable at the end of each milestone. No month-long silences.',
  },
  {
    n: '04',
    title: 'Test',
    body: 'Behaviour, edge cases and the failure paths. The interesting bugs live where things go wrong.',
  },
  {
    n: '05',
    title: 'Ship',
    body: 'Deployed, configured and documented — handed over so your team can operate it without me.',
  },
  {
    n: '06',
    title: 'Improve',
    body: 'Measure, tune and extend. Software is a product, not a delivery.',
  },
]

export const expectations = [
  {
    title: 'Written before built',
    body: 'Scope, architecture and trade-offs are documented up front, so we disagree on a page instead of in the codebase.',
  },
  {
    title: 'One thread, no chasing',
    body: 'A single channel, a weekly update, and a straight answer when something slips. You will never wonder where a project stands.',
  },
  {
    title: 'Code your team can own',
    body: 'Readable, conventional, documented. The goal is that I am replaceable — that is what makes hiring me low-risk.',
  },
  {
    title: 'Production mindset',
    body: 'Error states, migrations, backups and deployment are part of the build, not a phase that gets cut when time runs short.',
  },
]

export const stack = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'Go'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { group: 'Infrastructure', items: ['Docker', 'AWS S3', 'CI/CD', 'Git', 'REST APIs'] },
  {
    group: 'Engineering',
    items: ['System design', 'Authentication', 'Rate limiting', 'Caching', 'Distributed systems'],
  },
]

export const projectTypes = [
  'Web application',
  'SaaS product',
  'Backend / API',
  'Internal tool or dashboard',
  'Integration work',
  'Scaling an existing product',
  'Not sure yet',
]

export const budgets = [
  'Under ₹20,000 · under $250',
  '₹20,000 – ₹50,000 · $250 – $600',
  '₹50,000 – ₹1,00,000 · $600 – $1,200',
  '₹1,00,000 – ₹2,00,000 · $1,200 – $2,400',
  '₹2,00,000+ · $2,400+',
  'Need guidance',
]

/**
 * DRAFT — awaiting Saurabh's sign-off.
 *
 * This wording was drafted for him, not written by him. Send it over, let him
 * edit or reject it, and replace this with whatever he actually says. It stays
 * accurate to the work either way: no invented numbers, nothing he would have to
 * dispute. See TESTIMONIAL-REQUEST.md.
 */
export type Testimonial = {
  quote: string
  name: string
  role: string
  rating?: number
  source?: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Prashant took UpHomeTuition from an idea and a lot of phone calls to a platform that actually runs. He asked the questions I had not thought about — how tutors get verified, what happens when two parents request the same tutor — before writing any code, and that is why it works. He kept me updated without me having to chase him, and he handed it over so my team can add subjects and tutors ourselves. I would work with him again without thinking about it.',
    name: 'Saurabh Yadav',
    role: 'Founder, UpHomeTuition',
    rating: 5,
  },
]

/**
 * Commercial shape. CONFIRM THESE NUMBERS before publishing — see README.
 * Both currencies are shown because the audience is split between Indian and
 * international clients; INR figures are rounded equivalents, not a fixed rate.
 */
export const engagements = [
  {
    n: '01',
    title: 'Discovery sprint',
    meta: 'One week · Fixed fee',
    body: 'For an idea that is not yet a spec. You get a written scope, an architecture, a milestone plan and a real estimate — yours to keep even if you build it elsewhere. The fee is credited against the build if we continue.',
  },
  {
    n: '02',
    title: 'Fixed-scope build',
    meta: 'Typically 3–10 weeks · Billed per milestone',
    body: 'The usual engagement. Scope agreed up front, delivered in reviewable milestones, deployed and handed over. Most projects land between ₹20,000 and ₹2,00,000 — roughly $250 to $2,400 — depending on surface area and integrations.',
  },
  {
    n: '03',
    title: 'Ongoing partnership',
    meta: 'Monthly · Rolling',
    body: 'For products already live that need steady iteration — features, performance, reliability work, or a second pair of hands beside your existing team.',
  },
]

export const faqs = [
  {
    q: 'Who owns the code?',
    a: 'You do, in full, on final payment. Repositories are transferred to your account along with deployment access and documentation. No lock-in, no hosting held hostage.',
  },
  {
    q: 'What happens when the scope changes mid-project?',
    a: 'It usually does, and that is fine. Anything outside the agreed scope gets estimated before it is built, so the change is a decision you make rather than an invoice you discover.',
  },
  {
    q: 'Can you work with our existing codebase and team?',
    a: 'Yes. I am comfortable inheriting a codebase, working to your conventions and reviewing alongside your developers. Not every project needs a rewrite, and I will say so if yours does not.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, before any detail is shared. Send yours, or I can work to a standard mutual one.',
  },
  {
    q: 'Which currency do you bill in?',
    a: 'Indian clients are billed in rupees, international clients in dollars — whichever removes the friction on your side. Figures on this page are shown in both because the work is the same either way.',
  },
  {
    q: 'Where are you, and does that matter?',
    a: 'Delhi NCR (IST). That overlaps European mornings and US evenings comfortably. Updates are written, not dependent on catching me live, so timezone rarely becomes the bottleneck.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'One decision-maker, a clear idea of the problem, and feedback within a couple of days at each milestone. That is genuinely the difference between a project that ships and one that drifts.',
  },
]
