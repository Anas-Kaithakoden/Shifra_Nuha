/**
 * ---------------------------------------------------------------------------
 * INTERFACE STRINGS
 * ---------------------------------------------------------------------------
 * The short chrome of the site: button labels, navigation, form labels, error
 * messages. They live in one file, keyed by purpose, and are imported directly
 * as `ui['key']` — a flat string map with no lookup layer in between.
 *
 * These are deliberately separate from `content/site.ts` and `content/services.ts`,
 * which hold the long-form copy. The split is deliberate: interface strings are
 * short, repeat on every page and are referred to by key, so a single table
 * keeps a wording change to one edit. Long-form copy sits beside the content it
 * belongs to and is passed straight into the component that renders it.
 */

export const ui = {
  // --- Calls to action ------------------------------------------------------
  'cta.primary': 'Message us on WhatsApp',
  'cta.whatsapp': 'Chat on WhatsApp',
  'cta.call': 'Call now',
  'cta.enquiry': 'Send an enquiry',
  'cta.viewServices': 'See all services',
  'cta.learnMore': 'Learn more',
  'cta.notSure': 'Not sure which of these applies to you? Message us on WhatsApp and describe your business in a few lines. We will tell you what is actually needed, and which parts you can safely leave for later.',

  // --- Navigation ----------------------------------------------------------
  'nav.primary': 'Primary navigation',
  'nav.servicesList': 'All services',
  'nav.toggleServices': 'Show or hide the service list',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.contact': 'Contact',
  'nav.skip': 'Skip to content',

  // --- Enquiry form --------------------------------------------------------
  'form.name': 'Full name',
  'form.phone': 'Phone / WhatsApp number',
  'form.service': 'What do you need?',
  'form.emailOptional': 'Email (optional)',
  'form.businessNameOptional': 'Business name (optional)',
  'form.businessTypeOptional': 'Type of business (optional)',
  'form.messageOptional': 'Tell us what you need (optional)',
  'form.selectService': 'Select a service',
  'form.selectType': 'Select a type',
  'form.submit': 'Send enquiry',
  'form.sending': 'Sending…',
  'form.sent': 'Thank you — your enquiry has been sent',
  'form.again': 'Send another enquiry',
  'form.fasterCta': 'Faster if you need an answer now: message us on WhatsApp or call. Most people are answered quicker that way, and it saves you typing everything out again.',
  'form.note': 'We use these details only to reply to your enquiry. We do not add you to a mailing list.',

  // --- Enquiry form validation --------------------------------------------
  'form.err.name': 'Please tell us your name.',
  'form.err.phone': 'Please enter a phone or WhatsApp number we can reply to.',
  'form.err.phoneInvalid': 'That number looks too short. Please include the area or country code.',
  'form.err.email': 'That email address does not look right. Leave it blank if you prefer.',
  'form.err.service': 'Please choose what you need, or pick Other and tell us in the message.',

  // --- Placeholders --------------------------------------------------------
  'placeholder.contact': 'Our phone number, WhatsApp number and email address have not been published on this site yet. Use the enquiry form — we read those and we reply.',
  'placeholder.ctaFallback': 'Opens the enquiry form until this number is added.',

  // --- Section headings used on inner pages --------------------------------
  'section.whoNeeds': 'Who needs this',
  'section.includes': 'What the service includes',
  'section.process': 'How the work is done',
  'section.documents': 'Documents and information you will need',
  'section.caveats': 'Important to know before you start',
  'section.related': 'Related services',
  'section.faq': 'Questions people ask',
  'section.form': 'Send an enquiry',
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
  'legal.draftBody': 'This is a starting template. Replace it with the information that applies to your business, including your registered entity details and whichever service actually stores enquiry data.',
} as const

export type UiKey = keyof typeof ui
