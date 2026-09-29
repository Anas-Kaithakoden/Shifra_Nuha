import { hasEmail, hasPhone, hasWhatsapp, siteConfig, siteOrigin } from '../config/site.config'
import type { DigitalIconKey, ReasonIconKey } from '../components/iconRegistry'
import type { FaqItem } from './services'

/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT — edit copy here.
 * ---------------------------------------------------------------------------
 * Everything a visitor reads that is not a short interface string comes from
 * this file and from `services.ts`, so wording can be changed without touching
 * a component.
 *
 * TRANSLATION MODEL
 *  The site is English only. `ui.ts` holds short chrome — button labels, nav,
 *  form labels, errors — and is read by key. This file holds long-form copy,
 *  stored as plain strings beside the components that render them, so a wording
 *  change is a one-line edit and there is no lookup layer to get wrong.
 *
 * DELIBERATELY NOT INVENTED ANYWHERE IN THIS FILE
 *  - Contact details and social profiles. They come from
 *    `src/config/site.config.ts` and are empty until real values are supplied,
 *    so the UI shows a labelled placeholder rather than a number that does not
 *    work.
 *  - Prices. Nothing here states a price. Cost notes explain what drives the
 *    price and point at a quotation.
 *  - Timelines and approval guarantees. Both are the authority's to decide, not
 *    ours.
 *  - Testimonials, statistics, client numbers, awards, client logos and
 *    government affiliation. None have been verified, and faking any of them
 *    is the fastest way to lose a business owner's trust.
 */

// ============================================================================
// COMPANY
// ============================================================================

export const site = {
  name: siteConfig.COMPANY_NAME,
  /** The main promise, in the company's own words. */
  tagline: 'Starting a Business? Get Your Registration & Professional Support in One Place.',
  /** Short supporting line for the footer and the meta description. */
  supportingLine: 'Business registration, tax, accounting and professional support across Kerala.',
  description:
    'Shifra Nuha Technologies helps new and existing businesses in Kerala with company incorporation, LLP and partnership registration, GST, accounting, income tax, auditing, project reports and trademark support.',
  /**
   * The live origin, or an empty string until the domain is confirmed. While it
   * is empty the site withholds canonical and og:url tags and does not publish a
   * sitemap, rather than publishing a made-up address.
   */
  url: siteOrigin,
  /** The market the company actually serves. Deliberately not one city. */
  region: 'Kerala',
  market: 'All of Kerala',
  locale: 'en_IN',
} as const

export const brand = {
  logo: '/brand/logo.png',
  logoOnDark: '/brand/logo-white.png',
  mark: '/brand/mark.png',
  faviconPng: '/brand/favicon-32.png',
  faviconSvg: '/favicon.svg',
  appleTouchIcon: '/brand/apple-touch-icon.png',
  ogImage: '/brand/og-image.png',
  ogImageAlt: `${siteConfig.COMPANY_NAME} — business registration and professional business support in Kerala.`,
} as const

// ============================================================================
// CONTACT
// ============================================================================

/**
 * Sourced from `src/config/site.config.ts`. Every one is empty until the company
 * supplies it, and the UI degrades to a labelled placeholder instead of showing
 * a number that does not work.
 */
export const contact = {
  phone: siteConfig.PHONE_NUMBER,
  whatsapp: siteConfig.WHATSAPP_NUMBER,
  email: siteConfig.EMAIL,
  address: '',
  hours: '',
  serviceAreaTitle: 'Where we work',
  serviceAreaBody:
    'We work with businesses across Kerala, and remotely with businesses elsewhere in India. Registration work is filed with the appropriate central or state authority wherever you are based.',
  /**
   * The market as a whole. Listed once, rather than as a page per district:
   * thin location pages are worse than no location pages.
   */
  serviceAreas: ['All of Kerala'],
} as const

/** Lets the UI skip an entire contact block while a value is still blank. */
export const contactConfigured = {
  phone: hasPhone,
  email: hasEmail,
  whatsapp: hasWhatsapp,
  any: hasPhone || hasEmail || hasWhatsapp,
} as const

/** Social profiles — empty links are hidden rather than pointed anywhere fake. */
export const social = {
  linkedin: '',
  facebook: '',
  instagram: '',
  x: '',
} as const

// ============================================================================
// NAVIGATION
// ============================================================================

export type NavItem = { to: string; label: string }

/**
 * Order matters: `Navbar` renders the first item as Home, the second as
 * Services (with a dropdown to the nine landing pages), and the rest inline.
 */
export const nav: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// ============================================================================
// HOME — HERO
// ============================================================================

/**
 * The hero does one job: a visitor who arrived from a Facebook ad should
 * understand within a second that this is a business registration company
 * serving Kerala, and should see the two buttons.
 */
export const hero = {
  eyebrow: 'Business registration & professional services',
  // The brief's suggested H1. The service keywords it used to carry live in the
  // meta title, the meta description and the service list at the foot of the
  // hero, so nothing is lost by leading with the question the ad asked.
  heading: 'Starting a Business in Kerala?',
  subheading: 'Get your registration and professional business support in one place.',
  supporting: 'Most people starting a business do not need one service. They need to know which ones apply, in which order, and what it will involve. Tell us where you are, and we will tell you what actually applies to you.',
  note: 'Message or call — whichever is easier.',
} as const

// ============================================================================
// HOME — CORE SERVICES
// ============================================================================

export const coreServicesSection = {
  eyebrow: 'What we do',
  title: 'Business Services',
  intro: 'Each one has its own page, explaining what it covers, what documents it needs and what we will ask you before we start. Open the one that matches your situation — or start with the one you know you need.',
} as const

// ============================================================================
// HOME — WHY CHOOSE US
// ============================================================================

/**
 * Every point is a factual statement about how the work is organised — no
 * "Kerala's best", no client counts, no awards, because none of those have
 * been verified.
 */
export const whyUs = {
  eyebrow: 'Why choose us',
  title: 'Straight answers, and one person to deal with',
  intro: 'Most people starting a business do not need one service. They need a short list, delivered by someone who explains it in plain language. That is what this is for.',
  points: [
    {
      icon: 'wallet',
      title: 'You know what you are paying for',
      body: 'Our fee and the government fees are shown separately, every time. Where a cost depends on your situation, we explain what drives it instead of quoting a number we would have to take back.',
    },
    {
      icon: 'steps',
      title: 'A simple, explained process',
      body: 'We tell you what you actually need, in order, and we help you coordinate it — instead of leaving you to run between vendors on your own.',
    },
    {
      icon: 'shield',
      title: 'The right professional for the work',
      body: 'Regulated work is carried out or supervised by the appropriate qualified professional — a chartered accountant, a company secretary, a lawyer or an IP professional, depending on what the task requires. We will tell you in advance which part of the work that involves.',
    },
    {
      icon: 'partner',
      title: 'One contact, not five vendors',
      body: 'Registration, accounting, tax and the digital work can all be handled through the same person. You will not be passed between departments, and you will not have to explain your business again each time.',
    },
    {
      icon: 'layers',
      title: 'Support that does not end at the certificate',
      body: 'The relationship does not end when the registration is issued. Most businesses need accounting and compliance support long afterwards, and you should not have to explain yourself to a new vendor to get it.',
    },
  ],
  /** Fills the sixth cell in the grid and carries the WhatsApp CTA. */
  closing: {
    title: 'Start with one service. Add the next when you are ready.',
    button: 'Start on WhatsApp',
  },
} as const

// ============================================================================
// HOME — HOW IT WORKS
// ============================================================================

export const process = {
  eyebrow: 'How it works',
  title: 'Four steps, and you will know where you are at each one',
  intro: 'The same sequence for almost everyone. What changes is the content of each step, which depends on your business and on the authority involved.',
  steps: [
    {
      number: '01',
      title: 'Contact us',
      body: 'WhatsApp, a phone call, or the enquiry form. A few lines about what you need is enough to start — you do not need to have decided which service applies.',
    },
    {
      number: '02',
      title: 'We work out what applies',
      body: 'We understand the business and work out which service actually applies — which is sometimes not the one you expected, and sometimes is more than one thing.',
    },
    {
      number: '03',
      title: 'Documents and processing',
      body: 'We list exactly what you need to provide, in one place, and coordinate the process end to end with the professional who has to carry it out.',
    },
    {
      number: '04',
      title: 'Delivery and continuing support',
      body: 'The work is completed, and accounting, compliance or digital support can continue with the same contact whenever you need it next.',
    },
  ],
  /**
   * Shown under the steps, so no turnaround time is implied anywhere on the
   * site. Timelines belong to the authority, not to us.
   */
  note: 'Timelines depend on the authority involved and on how quickly documents are available. We will always tell you what is realistic for your case rather than quoting a date we cannot control.',
} as const

// ============================================================================
// HOME — WHO WE HELP
// ============================================================================

/**
 * Two audiences, stated separately, because a trading business looking for GST
 * support is a different conversation from a founder deciding between an LLP
 * and a company. Making that explicit stops a visitor concluding "these people
 * only work with new businesses".
 */
export const audience = {
  eyebrow: 'Who we help',
  title: 'Whether you are starting out or already trading',
  intro: 'Both. Most of our work is not new registrations at all — it is keeping an existing business properly run.',
  groups: [
    {
      title: 'If you are starting a business',
      body: 'You need a structure that fits, the right registrations, and someone who will explain which step comes first. Company, LLP or partnership — we will help you work out which one, and why.',
    },
    {
      title: 'If you are already trading',
      body: 'You need GST registration or return filing, books that are actually up to date, income tax support, an audit, or a new structure around an existing business. Starting over is not necessary.',
    },
  ],
  /** The business types named in the brief, as neutral pills. */
  types: [
    'Small businesses',
    'Startups',
    'Traders',
    'Restaurants',
    'Shops',
    'Service businesses',
    'Agencies',
    'Freelancers going formal',
    'E-commerce businesses',
    'Professional practices',
    'Small manufacturers',
    'Family businesses',
  ],
} as const

// ============================================================================
// HOME — SECONDARY DIGITAL SERVICES
// ============================================================================

/**
 * Real services, deliberately not the message. The brief is explicit that the
 * advertising must lead with registration and professional work, so this sits
 * below them, on a quieter surface, and says plainly that it is the secondary
 * side of what we do.
 */
export const digital = {
  eyebrow: 'Also available',
  title: 'Need More Than Registration?',
  intro: 'Once your business is set up, we can also help you establish your digital presence, attract customers and automate repetitive work.',
  groups: [
    {
      icon: 'branding',
      title: 'Branding and design',
      body: 'Logo, business name support, brand colours, print and social media templates.',
    },
    {
      icon: 'website',
      title: 'Websites and hosting',
      body: 'Simple, fast websites, and the hosting and maintenance to keep them working.',
    },
    {
      icon: 'email',
      title: 'Email and Google Workspace',
      body: 'Domain-based email on your own business address, set up properly.',
    },
    {
      icon: 'marketing',
      title: 'Marketing and lead generation',
      body: 'Facebook and Instagram campaigns, Google Ads, and search visibility for the searches your customers actually make.',
    },
    {
      icon: 'crm',
      title: 'WhatsApp Business and CRM',
      body: 'Setting up enquiry tracking and a shared list, so leads do not sit unanswered in a phone.',
    },
    {
      icon: 'automation',
      title: 'AI and workflow automation',
      body: 'Automating the repetitive parts — quotes, follow-ups, reminders, reports — so the work does not depend on remembering to do it.',
    },
  ],
  note: 'These are the secondary part of what we do. If you are here to register a business, file returns or get your accounts in order, start with those — they are what we are set up for, and they are where the advertising points.',
} as const

// ============================================================================
// HOME — FAQ
// ============================================================================

export const faqsSection = {
  eyebrow: 'Questions',
  title: 'The questions we are asked most often',
  intro: 'Answered honestly. Where the honest answer is "it depends", that is what it says — because a number we would have to take back helps nobody.',
} as const

export const faqs: FaqItem[] = [
  {
    question: 'What documents are required to register a company?',
    answer:
      'For every director we need PAN and Aadhaar (or passport), date of birth, a passport-size photograph, a signature, proof of current address, an email address and a mobile number. You also need proof of the proposed registered office address, a short description of the business activity, and two or three preferred company names in order of preference. A director living outside India may need additional documents such as a notarised power of attorney.',
  },
  {
    question: 'How much does company registration cost?',
    answer:
      'It depends on your structure, so we do not publish a single figure. The total is the professional fee plus government fees such as the MCA filing fee, stamp duty and any state charges, which vary with the number of directors, the authorised capital and the state. We prepare a quotation once we know your case, and the government component is always shown separately.',
  },
  {
    question: 'How long does registration take?',
    answer:
      'We do not quote a fixed timeline, because the process depends on the workload at the authority and on how many queries are raised on an application. In practice three things drive the time: how quickly a name is approved, how complete the documents are, and the queue at the time of filing. We will give you a realistic view for your specific case, and we will keep you updated.',
  },
  {
    question: 'Can an existing business get help?',
    answer:
      'Yes. You do not have to be starting something new. Businesses that have been trading for years come to us for GST registration or return filing, accounting and bookkeeping, income tax support, audits, project reports, trademark, or a proper company or LLP structure around what already exists.',
  },
  {
    question: 'Can you help with accounting after registration?',
    answer:
      'Yes, and most of our work is exactly that. We maintain the books monthly, reconcile the bank, prepare the financial statements and file the returns, so the numbers are ready when you need them — for a loan, an audit or a decision. The same contact point continues after the registration is done.',
  },
  {
    question: 'Do you provide trademark support?',
    answer:
      'Yes. We run an availability search, help you choose the classes that match what your business actually does, and coordinate the filing with the appropriate IP professional. Registration is not automatic — identical or similar marks can be refused, and Indian law does not permit using a ™ or ® symbol before the mark is registered.',
  },
]

// ============================================================================
// HOME — CLOSING CTA
// ============================================================================

export const cta = {
  title: 'Tell us what you need, and we will tell you what it involves',
  body: "A short conversation is usually enough for us to tell you what is needed and what it involves. No obligation — and if we are not the right fit, we will say so rather than take the work and pass it on.",
  note: 'No prices or timelines are promised anywhere on this site, because both change with your situation and with the authority involved. You will get a real answer when you ask.',
} as const

// ============================================================================
// /services
// ============================================================================

export const servicesPage = {
  eyebrow: 'Services',
  title: 'Business registration and professional services',
  intro: 'Nine services that cover starting a business and keeping it properly run. Open any one to see what is included, what documents are needed, and what we will ask you for before we start.',
  /** Rendered above the grid, so the cost policy is visible up front. */
  pricingPolicy: {
    title: 'About pricing',
    body: 'Our pricing is not published as a single figure, because for most of these services the cost depends on your situation: the number of people involved, the state, the authorised capital, the transaction volume, and the government fees that apply at the time. We prepare a quotation for your case, and government fees are always shown separately from our professional fee.',
  },
} as const

// ============================================================================
// /about
// ============================================================================

export const aboutPage = {
  eyebrow: 'About us',
  heading: 'A business partner, not just a service provider.',
  intro: 'Shifra Nuha Technologies helps new and existing businesses across Kerala get properly registered, stay compliant, and keep the professional work in one place. Registration is where we start. It is not the whole relationship.',
  positioning: {
    title: 'How we describe ourselves',
    primary: 'We help businesses start properly, and stay that way.',
    secondary: 'Registration, tax, accounting and professional support — through one point of contact.',
    body: 'We are deliberately not positioned as only a web development agency, an accounting firm or a marketing agency. A business rarely needs one of those things. It usually needs the right combination, in the right order, coordinated properly — and that is a different job from selling any single one of them.',
  },
  boundaries: {
    title: 'How we work with professional partners',
    body: 'Some business services are regulated and must be performed or supervised by qualified professionals. Where that applies, we coordinate the work and the appropriate professional carries it out — a chartered accountant for accounting, taxation, GST and audit-related work; a company secretary for incorporation and corporate compliance; a lawyer for agreements and contracts; and a trademark or IP professional for IP work.',
    points: [
      'You deal with one point of contact for the whole project.',
      'Regulated work is performed or supervised by the appropriate qualified professional.',
      'We tell you in advance which part of the work involves an external partner.',
    ],
  },
  partners: {
    title: 'Who does what',
    intro: 'We work with a small network of trusted specialists rather than a large in-house team, so you get the right expertise without a large fixed cost. You will always be told which work is being handled by an external partner.',
    rows: [
      { role: 'Chartered Accountant', responsibility: 'Accounting, taxation, GST, audit-related work and financial statements' },
      { role: 'Company Secretary', responsibility: 'Incorporation and corporate compliance' },
      { role: 'Lawyer', responsibility: 'Agreements, contracts and other legal matters' },
      { role: 'Trademark / IP professional', responsibility: 'Trademark search, filing and representation' },
      { role: 'Design and creative', responsibility: 'Branding, logo and creative work' },
      { role: 'Marketing', responsibility: 'Advertising, lead generation and SEO' },
      { role: 'Technical team', responsibility: 'Websites, software, automation and integrations' },
    ],
  },
  journey: {
    title: 'How an engagement usually grows',
    intro: 'Most businesses do not need everything at once. The work usually moves in this order, and each stage feeds the next. We do not push the later stages onto anyone.',
    steps: [
      { title: 'REGISTER', body: 'Company, LLP or partnership, plus GST' },
      { title: 'COMPLY', body: 'Accounting, bookkeeping, income tax, audit' },
      { title: 'BUILD', body: 'Branding, logo, website, email, WhatsApp Business' },
      { title: 'GROW', body: 'Facebook and Instagram ads, Google Ads, lead generation' },
      { title: 'AUTOMATE', body: 'CRM, WhatsApp automation, AI, workflow automation' },
    ],
  },
  closing: {
    title: 'Start with a conversation, not a commitment.',
    body: 'Tell us what you are dealing with. If it is not something we handle, we will say so rather than take the work and pass it on.',
  },
} as const

// ============================================================================
// /contact
// ============================================================================

export const contactPage = {
  eyebrow: 'Contact',
  heading: 'Ready to Get Started?',
  intro: 'WhatsApp or a phone call is fastest and we read both. Use the form if you would rather not start a conversation yet — it asks for very little and we will come back to you either way.',
  formTitle: 'Send an enquiry',
  formIntro: 'Three things are required — your name, a number we can reply to, and what you need. Everything else is optional.',
  directTitle: 'Direct contact',
  nextSteps: [
    {
      number: '01',
      title: 'You send an enquiry',
      body: 'Message us on WhatsApp, call us, or fill in the form. A short description is enough to start.',
    },
    {
      number: '02',
      title: 'We review and respond',
      body: 'We understand the requirement, check what is actually needed, and reply with a suggested way forward.',
    },
    {
      number: '03',
      title: 'We agree the scope',
      body: 'Scope, cost and who will be involved are agreed before any work begins.',
    },
  ],
} as const

// ============================================================================
// FOOTER / UTILITY
// ============================================================================

export const footer = {
  blurb: 'Business registration, tax, accounting and professional support for new and existing businesses across Kerala.',
  servicesTitle: 'Business services',
  legalTitle: 'Legal',
  legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Disclaimer', to: '/disclaimer' },
  ],
} as const

export const notFound = {
  heading: 'Page not found',
  body: 'The page you are looking for does not exist or has moved. Try one of the services, or get in touch and we will point you to the right place.',
  button: 'Go to the homepage',
} as const

// Re-exported so the icon registries stay the single source of icon keys.
export type { DigitalIconKey, ReasonIconKey }
