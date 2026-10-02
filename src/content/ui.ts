/**
 * ---------------------------------------------------------------------------
 * INTERFACE STRINGS
 * ---------------------------------------------------------------------------
 * The short chrome of the site: button labels, navigation and section headings.
 * They live in one file, keyed by purpose, and are imported directly as
 * `ui['key']` — a flat string map with no lookup layer in between.
 *
 * These are deliberately separate from `content/site.ts` and `content/services.ts`,
 * which hold the long-form copy. The split is deliberate: interface strings are
 * short, repeat on every page and are referred to by key, so a single table
 * keeps a wording change to one edit. Long-form copy sits beside the content it
 * belongs to and is passed straight into the component that renders it.
 *
 * There are no form strings here, because there is no form. The contact strategy
 * is WhatsApp-first and the whole funnel is two buttons and an email address.
 */

export const ui = {
  // --- Calls to action ------------------------------------------------------
  // "Contact on WhatsApp" is the primary CTA everywhere. The buttons say what
  // they do rather than making the visitor find out, and there is no price in
  // any of them: the figure appears in the conversation, once the case is known.
  'cta.primary': 'Contact on WhatsApp',
  'cta.whatsapp': 'Contact on WhatsApp',
  'cta.whatsappShort': 'WhatsApp Us',
  'cta.call': 'Call Us',
  'cta.email': 'Email Us',
  'cta.viewServices': 'See all services',
  'cta.exploreServices': 'Explore Our Services',
  'cta.learnMore': 'Learn more',
  'cta.getStarted': 'Get Started',
  'cta.readMore': 'Read more',
  'cta.notSure': 'Not sure which of these applies to you? Message us on WhatsApp and describe your business in a few lines. We will tell you what is actually needed, and which parts you can safely leave for later.',

  // --- Navigation ----------------------------------------------------------
  'nav.primary': 'Primary navigation',
  'nav.servicesList': 'All services',
  'nav.toggleServices': 'Show or hide the service list',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.contact': 'Contact',
  'nav.skip': 'Skip to content',

  // --- Placeholders --------------------------------------------------------
  'placeholder.contact': 'Our phone number, WhatsApp number and email address have not been published on this site yet.',
  'placeholder.ctaFallback': 'Opens the contact page until this number is added.',

  // --- Section headings used on inner pages --------------------------------
  'section.whoNeeds': 'Who needs this',
  'section.includes': 'What the service includes',
  'section.process': 'How the work is done',
  'section.documents': 'Documents and information you will need',
  'section.caveats': 'Important to know before you start',
  'section.related': 'Related services',
  'section.faq': 'Questions people ask',
  'section.direct': 'Direct contact',
  'section.whatsapp': 'WhatsApp',
  'section.phone': 'Phone',
  'section.email': 'Email',
  'section.hours': 'Working hours',
  'section.address': 'Address',
  'section.area': 'Where we work',
  'section.next': 'What happens after you get in touch',

  // --- Legal pages ---------------------------------------------------------
  'legal.draft': 'Draft — please review before launch.',
  'legal.draftBody': 'This is a starting template. Replace it with the information that applies to your business, including your registered entity details.',
} as const

export type UiKey = keyof typeof ui
