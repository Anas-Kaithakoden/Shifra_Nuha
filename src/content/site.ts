import { hasEmail, hasPhone, hasWhatsapp, siteConfig, siteOrigin } from '../config/site.config'
import type { DigitalIconKey, ReasonIconKey } from '../components/iconRegistry'
import type { FaqItem } from './services'
import { registrationOffer } from './offer'

/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT — edit copy here.
 * ---------------------------------------------------------------------------
 * Everything a visitor reads that is not a short interface string comes from
 * this file and from `services.ts`, so wording can be changed without touching
 * a component. The offer itself lives in `offer.ts`, because the price has to be
 * identical everywhere it appears.
 *
 * TRANSLATION MODEL
 *  The site is English only. `ui.ts` holds short chrome — button labels, nav,
 *  form labels, errors — and is read by key. This file holds long-form copy,
 *  stored as plain strings beside the components that render them, so a wording
 *  change is a one-line edit and there is no lookup layer to get wrong.
 *
 * WHAT IS DELIBERATELY NOT INVENTED ANYWHERE IN THIS FILE
 *  - Contact details and social profiles. They come from
 *    `src/config/site.config.ts` and are empty until real values are supplied,
 *    so the UI shows a labelled placeholder rather than a number that does not
 *    work.
 *  - Claims. No customer numbers, ratings, testimonials, awards, years of
 *    experience, government affiliation or success rates appear anywhere on
 *    this site, because none of them have been verified. The `whyUs` points and
 *    the trust section are written as statements about how the work is
 *    organised, which is the only kind of claim that can be made honestly today.
 *  - Timelines and approvals. Both belong to the authority, not to us.
 *  - Testimonials. When real ones exist they go in the trust section. Until then
 *    the section says what we can actually stand behind, which is a far better
 *    answer than a paragraph of invented praise.
 */

// ============================================================================
// COMPANY
// ============================================================================

export const site = {
  name: siteConfig.COMPANY_NAME,
  /** The main promise, in the company's own words. */
  tagline: 'Business registration, made straightforward.',
  /** Short supporting line for the footer and the meta description. */
  supportingLine: 'LLP and Company registration support for new businesses in Kerala.',
  /**
   * The homepage `<title>`, the `og:title` and the `twitter:title`. They are one
   * string in one place because the crawler, the link unfurl and the browser tab
   * must never disagree, and the copy in `index.html` is the pre-JavaScript
   * version of the same value.
   */
  seoTitle: `Business Registration in Kerala | ${siteConfig.COMPANY_NAME}`,
  /**
   * The same for the meta description. The price is interpolated from
   * `registrationOffer` so the search snippet cannot quote a different figure
   * from the hero.
   */
  seoDescription: `Affordable LLP and Company registration assistance in Kerala. Get started from ${registrationOffer.price} + applicable charges.`,
  description:
    'Affordable LLP and Company registration assistance in Kerala. Documentation guidance, application preparation and support throughout the registration process. Get started from ₹2,999 + applicable charges.',
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
  ogImageAlt: `${siteConfig.COMPANY_NAME} — LLP and Company registration in Kerala.`,
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
 * Five items, in the brief's order. Home, Services, How It Works, FAQ and
 * Contact: the two anchor links are on the homepage, and everything else is one
 * click from the home page. There is deliberately no services mega-menu — the
 * nine service pages are all listed on `/services`, in the footer, and on this
 * site's service pages, so none of them is more than two clicks away.
 */
export const nav: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/#how-it-works', label: 'How It Works' },
  { to: '/#faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

// ============================================================================
// HOME — HERO
// ============================================================================

/**
 * The hero does one job: a visitor who arrived from a Facebook ad should
 * understand the offer within a few seconds, and see the WhatsApp button.
 *
 * So it carries, in order: what this is, the headline, the price with its
 * qualifier, one sentence of explanation, the two buttons, and three things
 * that make the price believable. Nothing else. The full service list moved to
 * the footer and the `/services` page, where it cannot push the price below the
 * fold on a phone.
 */
export const hero = {
  eyebrow: 'Business registration in Kerala',
  heading: 'Start Your Business Without the Paperwork Hassle',
  supporting:
    'Get professional assistance with LLP and Company registration, with a simple process and transparent pricing.',
  /**
   * The three points that make a starting price credible. They are statements
   * about how we work rather than claims about our history, which is why they
   * are safe to make before anything has been measured.
   */
  trustPoints: [
    'Simple process',
    'Transparent pricing',
    'Support throughout the registration process',
  ],
} as const

// ============================================================================
// HOME — WHAT THE PRICE COVERS
// ============================================================================

/**
 * The brief asks for a small "what's included" block next to the price. It
 * exists to answer the objection the price raises — "what am I actually paying
 * for?" — and its wording comes from `registrationOffer.includes`, so the two
 * can never drift apart.
 */
export const offerSection = {
  eyebrow: 'What the fee covers',
  title: 'What we help with',
  intro: 'The starting fee is for our work on the registration. These are the parts of it you can expect to be involved in.',
} as const

// ============================================================================
// HOME — REGISTRATION SERVICES
// ============================================================================

/**
 * Only the two registration services the offer covers, because those are the
 * two the advertising is about. The other seven are real and are linked from
 * `/services`, the footer and each service page — a founder deciding between an
 * LLP and a company should not be reading eight cards first.
 */
export const registrationSection = {
  eyebrow: 'Registration services',
  title: 'Business Registration Made Simple',
  intro:
    "Whether you're starting a new company or formalizing a partnership, we help simplify the registration process.",
  cards: [
    {
      slug: 'llp-registration',
      name: 'LLP Registration',
      body: 'For partners who want to establish a formal limited-liability business structure.',
    },
    {
      slug: 'company-registration',
      name: 'Company Registration',
      body: 'For entrepreneurs looking to establish a registered company.',
    },
  ],
} as const

// ============================================================================
// HOME — HOW IT WORKS
// ============================================================================

/**
 * Three steps, because three is what a person can hold in their head. There is
 * no step four promising a delivery date: the timeline belongs to the authority,
 * and the note underneath says so.
 */
export const process = {
  eyebrow: 'How it works',
  title: 'How It Works',
  intro:
    'The same three steps for almost everyone. What changes is the content of each one, which depends on your business and on the authority involved.',
  steps: [
    {
      number: '01',
      title: 'Tell Us What You Need',
      body: 'Contact us on WhatsApp or call us and tell us about your business.',
    },
    {
      number: '02',
      title: 'We Guide You Through the Process',
      body: 'We help with the required documentation and registration process.',
    },
    {
      number: '03',
      title: 'Get Your Business Registered',
      body: 'Complete the required process and receive the relevant registration documents.',
    },
  ],
  /**
   * Stated plainly, because the most common thing a registration company
   * oversells is a date. Promising one we do not control is how a firm loses a
   * customer in week two.
   */
  note: 'We do not quote a fixed completion time. Processing time depends on documentation, the authority involved and its workload — we will tell you what is realistic for your case instead.',
} as const

// ============================================================================
// HOME — WHY CHOOSE US
// ============================================================================

/**
 * Four points, all of them statements about how the work is organised. No
 * "Kerala's best", no client counts, no awards: the brief rules them out, and
 * so does the fact that none of them has been verified.
 */
export const whyUs = {
  eyebrow: 'Why choose us',
  title: 'Why Choose Shifra Nuha?',
  intro: 'Four things that decide whether a registration goes smoothly or turns into a runaround.',
  points: [
    {
      icon: 'wallet',
      title: 'Affordable',
      body: 'Competitive pricing designed for startups and small businesses.',
    },
    {
      icon: 'steps',
      title: 'Simple Process',
      body: 'We make the registration process easier to understand.',
    },
    {
      icon: 'chat',
      title: 'Responsive Support',
      body: 'Get assistance when you have questions about the process.',
    },
    {
      icon: 'shield',
      title: 'Transparent',
      body: 'Clearly communicate pricing, requirements and applicable charges.',
    },
  ],
} as const

// ============================================================================
// HOME — TRUST
// ============================================================================

/**
 * The credibility section. The brief asks for a clean one, and it deliberately
 * has no statistics in it: the number of businesses assisted, customer
 * testimonials, review counts and professional credentials all belong here when
 * they are real, and none of them is real yet. Rather than pad the section with
 * placeholders a visitor would read as failures, it makes the argument the
 * business can actually make — that there is a real person on the other end of
 * the WhatsApp message.
 *
 * When a testimonial is collected, it belongs in `testimonials` below and in
 * the render inside `components/Trust.tsx`. Inventing one instead is the
 * fastest way to lose a first-time business owner's trust.
 */
export const trust = {
  eyebrow: 'Start with a conversation',
  title: "Starting Your Business? Let's Get It Done.",
  body: "Whether you're starting your first business or formalizing an existing one, we're here to help you navigate the process.",
  points: [
    'You deal with the same person from the first message to the registration documents.',
    'We tell you what the documents are before you start gathering them, not after.',
    'Applicable charges are explained up front, so the invoice is not a surprise.',
    'If registration is not what you need, we will tell you that instead of selling it.',
  ],
  /**
   * Deliberately empty. Populate with real, attributable, verifiable quotes only
   * — name, business, and the words they actually said.
   */
  testimonials: [] as { quote: string; name: string; business: string }[],
  button: 'Talk to Us on WhatsApp',
} as const

// ============================================================================
// HOME — OTHER SERVICES
// ============================================================================

/**
 * Secondary, and presented as secondary. The brief is explicit: registration is
 * the main service, and these are additional support available to customers
 * once their business exists. They sit on the quietest surface on the page, as
 * a plain list rather than a grid of cards, because a grid of eight equal cards
 * is exactly the "repetitive cards" the brief asks us to remove.
 */
export const otherServices = {
  eyebrow: 'Also available',
  title: 'More Services for Your Business',
  intro:
    'Registration is where we start. Once your business exists, the ongoing professional work is usually what you actually need next — and it is easier to keep it with one contact than to find a new vendor for each piece.',
  professionalTitle: 'Business and compliance services',
  professional: [
    'GST Registration',
    'Income Tax Services',
    'Accounting',
    'Bookkeeping',
    'Auditing',
    'Project Reports',
    'Trademark',
    'Other business compliance services',
  ],
  digitalTitle: 'Digital Solutions',
  digitalIntro:
    'Also available once the business is set up, if you want it to be found online and to stop losing enquiries.',
  digital: [
    { icon: 'website', title: 'Business Websites', body: 'A simple, fast site for the business, set up to be found in search.' },
    { icon: 'crm', title: 'WhatsApp Automation', body: 'Enquiries answered and followed up without them sitting in a phone.' },
    { icon: 'automation', title: 'Business Automation', body: 'Quotes, reminders, follow-ups and reports handled automatically.' },
    { icon: 'marketing', title: 'Digital Marketing', body: 'Facebook, Instagram, Google Ads and search visibility.' },
    { icon: 'branding', title: 'Branding and Design', body: 'Logo, brand colours, print and social media templates.' },
    { icon: 'email', title: 'Email and Google Workspace', body: 'Domain-based email on your own business address.' },
  ] as { icon: DigitalIconKey; title: string; body: string }[],
} as const

// ============================================================================
// HOME — FAQ
// ============================================================================

export const faqsSection = {
  eyebrow: 'FAQ',
  title: 'Questions People Ask',
  intro: 'The six questions we are asked most, answered honestly. Where the honest answer is "it depends", that is what it says.',
} as const

/**
 * The homepage FAQ. The first three are the questions the ₹2,999 price raises —
 * what it costs, what is in it, and what happens next — and they are the first
 * thing a visitor opens after reading the hero.
 *
 * The price answer is built from `registrationOffer` so it cannot quote a figure
 * different from the one in the hero.
 */
export const faqs: FaqItem[] = [
  {
    question: 'How much does LLP registration cost?',
    answer: `Our LLP registration service starts at ${registrationOffer.price} plus applicable charges. The final cost depends on the specific registration requirements and applicable government/professional charges. We will tell you what applies to your case before you commit to anything.`,
  },
  {
    question: 'How much does company registration cost?',
    answer: `Our company registration service starts at ${registrationOffer.price} plus applicable charges. The total is our professional fee plus the government fees that apply — the MCA filing fee, stamp duty and any state charges — which vary with the number of directors, the authorised capital and the state. Those charges are additional to the starting figure, and they are always shown separately rather than folded into a single number.`,
  },
  {
    question: 'What documents are required?',
    answer:
      'The exact list depends on the applicant and the business structure. For a company we normally need, for each director, PAN and Aadhaar (or passport), date of birth, a passport-size photograph, a signature, proof of current address, an email address and a mobile number — plus proof of the registered office address, a short description of the business activity, and two or three preferred names in order of preference. We send you the exact list for your registration before you start gathering anything.',
  },
  {
    question: 'How long does registration take?',
    answer:
      'We do not quote a guaranteed timeline, because we do not control it. Processing time depends on how complete and correct the documentation is, on the authority handling the filing, and on its workload at the time. What we will do is tell you what is realistic for your specific case and keep you updated rather than going quiet.',
  },
  {
    question: 'Do I need to visit an office?',
    answer:
      'In most cases, no. We collect your documents digitally over WhatsApp or email, prepare the application and handle the filing, and you receive the registration documents the same way. If something in your case does need to be signed or verified in person, we will tell you exactly what and why before you pay anything.',
  },
  {
    question: 'Can you help after registration?',
    answer:
      'Yes. GST registration and return filing, accounting, bookkeeping, income tax support, auditing, project reports and trademark work are all services we handle, and the digital work — website, WhatsApp automation, business automation and digital marketing — is available too. The same contact continues, so you are not explaining your business again to each new vendor.',
  },
]

// ============================================================================
// HOME — CLOSING CTA
// ============================================================================

export const cta = {
  title: 'Ready to Start Your Business?',
  body: 'Get professional assistance with LLP and Company registration.',
  note: 'Tell us what you are setting up and we will tell you what it involves and what it will cost, before you commit to anything.',
} as const

// ============================================================================
// /services
// ============================================================================

export const servicesPage = {
  eyebrow: 'Services',
  title: 'Business registration and professional services',
  intro:
    'Registration is where we start. The services below cover starting a business and keeping it properly run — open any one to see what it covers, what documents it needs, and what we will ask you for before we start.',
  /** Rendered above the grid, so the cost policy is visible up front. */
  pricingPolicy: {
    title: 'About pricing',
    body: `Registration starts at ${registrationOffer.price} plus applicable charges. For the other services, the cost depends on your situation: the number of people involved, the state, the authorised capital, the transaction volume, and the government fees that apply at the time. We prepare a quotation for your case, and government fees are always shown separately from our professional fee.`,
  },
} as const

// ============================================================================
// /about
// ============================================================================

export const aboutPage = {
  eyebrow: 'About us',
  heading: 'A business partner, not just a service provider.',
  intro:
    'Shifra Nuha Technologies helps new and existing businesses across Kerala get properly registered, stay compliant, and keep the professional work in one place. Registration is where we start. It is not the whole relationship.',
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
      { title: 'Register', body: 'Company, LLP or partnership, plus GST' },
      { title: 'Comply', body: 'Accounting, bookkeeping, income tax, audit' },
      { title: 'Build', body: 'Branding, logo, website, email, WhatsApp Business' },
      { title: 'Grow', body: 'Facebook and Instagram ads, Google Ads, lead generation' },
      { title: 'Automate', body: 'CRM, WhatsApp automation, AI, workflow automation' },
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
  blurb: 'Business registration and business support services for new and existing businesses across Kerala.',
  servicesTitle: 'Services',
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
