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
 *  - `ui.ts` holds short chrome — button labels, nav, form labels, errors.
 *  - This file holds long-form copy, and every piece is a `{ en, ml }` pair
 *    read through `pick()`. English is always present, so there is no such
 *    thing as a key that is missing its original. `ml` is optional: where it is
 *    absent the English is shown rather than an untranslated gap.
 *
 * A mistranslated explanation of a statutory or tax process is worse than an
 * English one, so the long bodies are only given a Malayalam string once
 * someone has checked it. The footer says plainly which parts are translated.
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

/** A piece of copy with an optional, checked Malayalam translation. */
export type Copy = { en: string; ml?: string }

const copy = (en: string, ml?: string): Copy => (ml ? { en, ml } : { en })

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
  /** Where the advertising sends people, for the record. */
  primaryAdLanguage: 'Malayalam',
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

export type NavItem = { to: string; label: string; labelMl?: string }

/**
 * Order matters: `Navbar` renders the first item as Home, the second as
 * Services (with a dropdown to the nine landing pages), and the rest inline.
 */
export const nav: NavItem[] = [
  { to: '/', label: 'Home', labelMl: 'ഹോം' },
  { to: '/services', label: 'Services', labelMl: 'സേവനങ്ങൾ' },
  { to: '/about', label: 'About', labelMl: 'ഞങ്ങളെപ്പറ്റി' },
  { to: '/contact', label: 'Contact', labelMl: 'ബന്ധപ്പെടുക' },
]

// ============================================================================
// HOME — HERO
// ============================================================================

/**
 * The hero does one job: a Malayalam-speaking visitor who arrived from a
 * Facebook ad should understand within a second that this is a business
 * registration company serving Kerala, and should see the two buttons.
 */
export const hero = {
  eyebrow: copy('Business registration & professional services', 'ബിസിനസ് രജിസ്ട്രേഷൻ, പ്രൊഫഷണൽ സേവനങ്ങൾ'),
  // The brief's suggested H1. The service keywords it used to carry live in the
  // meta title, the meta description and the service list at the foot of the
  // hero, so nothing is lost by leading with the question the ad asked.
  heading: copy('Starting a Business in Kerala?', 'കേരളത്തിൽ ബിസിനസ് തുടങ്ങണോ?'),
  subheading: copy(
    'Get your registration and professional business support in one place.',
    'നിങ്ങളുടെ രജിസ്ട്രേഷനും പ്രൊഫഷണൽ ബിസിനസ് സപ്പോർട്ടും ഒരിടത്ത്.',
  ),
  supporting: copy(
    'Most people starting a business do not need one service. They need to know which ones apply, in which order, and what it will involve. Tell us where you are, and we will tell you what actually applies to you.',
    'ബിസിനസ് തുടങ്ങുന്ന പ്രതിയും ഒരു സേവനം മാത്രമല്ല വേണ്ട. ഏതൊക്കെ സേവനങ്ങൾ ബാധിക്കും, ഏത് ക്രമത്തിൽ, എന്താണ് അതിന് വേണ്ടത് എന്ന് അറിയണം. നിങ്ങൾ എവിടെയാണെന്ന് പറയൂ, നിങ്ങൾക്ക് യഥാർത്ഥത്തിൽ ബാധിക്കുന്നത് ഞങ്ങൾ പറയും.',
  ),
  note: copy(
    'Reply in Malayalam or English — whichever is easier.',
    'മലയാളത്തിലോ ഇംഗ്ലീഷിലോ സ്വാഭാവികമായത് ഉള്ളതിൽ മറുപടി നൽകാം.',
  ),
} as const

// ============================================================================
// HOME — CORE SERVICES
// ============================================================================

export const coreServicesSection = {
  eyebrow: copy('What we do', 'ഞങ്ങൾ ചെയ്യുന്നത്'),
  title: copy('Business Services', 'ബിസിനസ് സേവനങ്ങൾ'),
  intro: copy(
    'Each one has its own page, explaining what it covers, what documents it needs and what we will ask you before we start. Open the one that matches your situation — or start with the one you know you need.',
    'ഓരോന്നിനും വെറ്റിയ പേജ് ഉണ്ട് — അതിൽ എന്ത് ഉൾപ്പെടുന്നു, ഏത് രേഖകൾ വേണം, തുടങ്ങുന്നതിനു മുമ്പ് നമ്മൾ എന്ത് ചോദിക്കും എന്ന് വിശദമാക്കുന്നു. നിങ്ങളുടെ സാഹചര്യത്തിന് അനുയോജ്യമായ ഒന്ന് തുറക്കൂ.',
  ),
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
  eyebrow: copy('Why choose us', 'എന്തുകൊണ്ട് ഞങ്ങളെ'),
  title: copy('Straight answers, and one person to deal with', 'നേരിട്ടുള്ള ഉത്തരങ്ങൾ, ഒരു വ്യക്തിയെ മാത്രം കാണാൻ'),
  intro: copy(
    'Most people starting a business do not need one service. They need a short list, delivered by someone who explains it in plain language. That is what this is for.',
    'ബിസിനസ് തുടങ്ങുന്ന പ്രതിയും ഒരു സേവനം മാത്രമല്ല വേണ്ട. ചുരുക്കിയ ഒരു പട്ടിക, അത് ലളിതമായ ഭാഷയിൽ വിവരിക്കുന്ന ഒരാളിനിൽ നിന്ന് ആണ് വേണ്ടത്.',
  ),
  points: [
    {
      icon: 'wallet',
      title: copy('You know what you are paying for', 'നിങ്ങൾ എന്തിന് പണം നൽകുന്നു എന്ന് അറിയും'),
      body: copy(
        'Our fee and the government fees are shown separately, every time. Where a cost depends on your situation, we explain what drives it instead of quoting a number we would have to take back.',
        'ഞങ്ങളുടെ ഫീസും സർക്കാർ ഫീസും എപ്പോഴും വേർതിരിച്ച് കാണിക്കും. ചെലവ് നിങ്ങളുടെ സാഹചര്യത്തെ ആശ്രയിച്ചിരിക്കുമ്പോൾ, അത് എന്താണ് ആശ്രയിക്കുന്നതെന്ന് പറയും — പിന്നീട് തിരസ്കരിക്കേണ്ടിവരുന്ന ഒരു അക്കവുമല്ല.',
      ),
    },
    {
      icon: 'steps',
      title: copy('A simple, explained process', 'ലളിതമായി വിവരിക്കുന്ന പ്രക്രിയ'),
      body: copy(
        'We tell you what you actually need, in order, and we help you coordinate it — instead of leaving you to run between vendors on your own.',
        'നിങ്ങൾക്ക് യഥാർത്ഥത്തിൽ വേണ്ടത് ഏതെന്ന്, ഏത് ക്രമത്തിലെന്ന് പറയും, പിന്നെ ആ പ്രക്രിയ നിങ്ങൾക്കൊപ്പാറും ഞങ്ങൾ സഹായിക്കും — ഓരോ കടയാളിലേക്കും നിങ്ങൾ ഒറ്റിക്കിട്ട് ഓടേണ്ടിവരുന്ന അവസ്ഥയില്ല.',
      ),
    },
    {
      icon: 'shield',
      title: copy('The right professional for the work', 'ജോലിക്ക് അനുയോജ്യമായ പ്രൊഫഷണൽ'),
      body: copy(
        'Regulated work is carried out or supervised by the appropriate qualified professional — a chartered accountant, a company secretary, a lawyer or an IP professional, depending on what the task requires. We will tell you in advance which part of the work that involves.',
        'നിയന്ത്രണത്തിലുള്ള ജോലികൾ അനുയോജ്യമായ പ്രൊഫഷണലാണ് ചെയ്യുകയോ നോക്കുകയോ ചെയ്യുന്നത് — chartered accountant, company secretary, അല്ലെങ്കിൽ വക്കീസ്, അല്ലെങ്കിൽ IP പ്രൊഫഷണൽ, ജോലിയുടെ സ്വഭാവത്തെ സംബന്ധിച്ച്. ഏത് ഭാഗം അതുകൊണ്ടുപോകും എന്ന് മുമ്പിന്നും പറയും.',
      ),
    },
    {
      icon: 'partner',
      title: copy('One contact, not five vendors', 'അഞ്ച് കടയാളിലല്ല, ഒരു വ്യക്തി'),
      body: copy(
        'Registration, accounting, tax and the digital work can all be handled through the same person. You will not be passed between departments, and you will not have to explain your business again each time.',
        'രജിസ്ട്രേഷൻ, അക്കൗണ്ടിംഗ്, നികുതി, ഡിജിറ്റൽ ജോലികൾ — എല്ലാം ഒരു വ്യക്തിയിലൂടെയാണ്. വിഭാഗങ്ങൾക്കിടയിൽ മാറുകയും, ഓരോ തവണയും നിങ്ങളുടെ ബിസിനസ് വിവരം ആവർത്തിക്കുകയും വേണ്ടിവരുന്നില്ല.',
      ),
    },
    {
      icon: 'layers',
      title: copy('Support that does not end at the certificate', 'സർട്ടിഫിക്കറ്റിലൂടെ അവസാനിക്കാത്ത പിന്തുണിന്നു'),
      body: copy(
        'The relationship does not end when the registration is issued. Most businesses need accounting and compliance support long afterwards, and you should not have to explain yourself to a new vendor to get it.',
        'രജിസ്ട്രേഷൻ തരുന്നതിലൂടെ ബന്ധം അവസാനമാകുകയില്ല. അക്കൗണ്ടിംഗ്, കമ്പ്ലയൻസ് എന്നിവ പലതരം രജിസ്ട്രേഷന് ശേഷം വേണ്ടിവരും — അതിന് പുതിയ കടയാളിയിൽ പറയേണ്ടിവരുന്നില്ല.',
      ),
    },
  ],
  /** Fills the sixth cell in the grid and carries the WhatsApp CTA. */
  closing: {
    title: copy(
      'Start with one service. Add the next when you are ready.',
      'ഒരു സേവനത്തിലാണ് തുടങ്ങൂ. അടുത്തത് വേണ്ടിവന്നാൽ അപ്പോൾ കൂടുതൽ ചേർക്കൂ.',
    ),
    button: copy('Start on WhatsApp', 'WhatsApp-ൽ തുടങ്ങൂ'),
  },
} as const

// ============================================================================
// HOME — HOW IT WORKS
// ============================================================================

export const process = {
  eyebrow: copy('How it works', 'എങ്ങനെയാണ് പ്രവൃത്തികുന്നത്'),
  title: copy('Four steps, and you will know where you are at each one', 'നാല് ഘട്ടങ്ങൾ; ഓരോ ഘട്ടത്തിലും നിങ്ങൾക്ക് അറിയില്ല'),
  intro: copy(
    'The same sequence for almost everyone. What changes is the content of each step, which depends on your business and on the authority involved.',
    'ഏതാണ്ട് എല്ലാവർക്കും ഒരേ ക്രമം. മാറുന്നത് ഓരോ ഘട്ടത്തിലെയും ഉള്ളടക്കമാണ് — അത് നിങ്ങളുടെ ബിസിനസിനും ബന്ധപ്പെട്ട അധികാരവിനും ആശ്രയിച്ചിരിക്കും.',
  ),
  steps: [
    {
      number: '01',
      title: copy('Contact us', 'ഞങ്ങളെ ബന്ധപ്പെടൂ'),
      body: copy(
        'WhatsApp, a phone call, or the enquiry form. A few lines about what you need is enough to start — you do not need to have decided which service applies.',
        'WhatsApp, ഫോൺ കോൾ, അല്ലെങ്കിൽ എൻക്വയറി ഫോം. എന്താണ് വേണ്ടത് എന്ന് കുറച്ച് വരികൾ പറഞ്ഞാൽ മതി — ഏത് സേവനമാണെന്ന് നിങ്ങൾക്ക് തീരുമാനിക്കേണ്ടിവരുന്നില്ല.',
      ),
    },
    {
      number: '02',
      title: copy('We work out what applies', 'ഏത് സേവനമാണ് ബാധിക്കുക എന്ന് ഞങ്ങൾ കണ്ടെത്തുക'),
      body: copy(
        'We understand the business and work out which service actually applies — which is sometimes not the one you expected, and sometimes is more than one thing.',
        'ബിസിനസ് മനസ്സിലാക്കി ഏത് സേവനമാണ് യഥാർത്ഥത്തിൽ ബാധിക്കുക എന്ന് നമ്മൾ കണ്ടെത്തുക — ചിലപ്പോൾ നിങ്ങൾ പ്രതീക്ഷിച്ചത് അല്ല, ചിലപ്പോൾ ഒന്നിലധികം ആവശ്യമായിരിക്കും.',
      ),
    },
    {
      number: '03',
      title: copy('Documents and processing', 'രേഖകളും പ്രോസസിംഗും'),
      body: copy(
        'We list exactly what you need to provide, in one place, and coordinate the process end to end with the professional who has to carry it out.',
        'നിങ്ങൾ നൽകേണ്ടത് ഒരിടത്ത് വ്യക്തമായി ഞങ്ങൾ പറയും, പ്രക്രിയ പൂർത്തിയാക്കുന്നതുവരെ നിരീക്ഷിക്കും.',
      ),
    },
    {
      number: '04',
      title: copy('Delivery and continuing support', 'തിരിയുകയും തുടരുകയും'),
      body: copy(
        'The work is completed, and accounting, compliance or digital support can continue with the same contact whenever you need it next.',
        'ജോലി പൂർത്തിയാകും; അക്കൗണ്ടിംഗ്, കമ്പ്ലയൻസ്, അല്ലെങ്കിൽ ഡിജിറ്റൽ പിന്തുണിന്നു വേണ്ടിവന്നാൽ അതേ വ്യക്തിയിലൂടെ തുടരാം.',
      ),
    },
  ],
  /**
   * Shown under the steps, so no turnaround time is implied anywhere on the
   * site. Timelines belong to the authority, not to us.
   */
  note: copy(
    'Timelines depend on the authority involved and on how quickly documents are available. We will always tell you what is realistic for your case rather than quoting a date we cannot control.',
    'സമയം ആശ്രയിക്കുന്നത് ബന്ധപ്പെട്ട അധികാരവിനും രേഖകൾ ലഭ്യമാകുന്ന വേഗത്തിനും ആണ്. നമ്മൾക്ക് നിയന്ത്രണം ചെയ്യാത്ത ഒരു തീയതി ഞങ്ങൾ പറയില്ല; നിങ്ങളുടെ കാസിന് യാഥാർത്ഥമായി എന്താണ് സാധ്യമെന്ന് പറയും.',
  ),
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
  eyebrow: copy('Who we help', 'നമ്മൾ ആരെപ്പെൽ സഹായിക്കുന്നു'),
  title: copy('Whether you are starting out or already trading', 'പുതിയതായി തുടങ്ങുന്നവരും നടക്കുന്നവരും'),
  intro: copy(
    'Both. Most of our work is not new registrations at all — it is keeping an existing business properly run.',
    'രണ്ടും. ഞങ്ങളുടെ മിക്കാളിയും പ്രവർത്തിക്കുന്ന ബിസിനസുകളുടെ പരിചരണമാണ് — പുതിയ രജിസ്ട്രേഷൻ അല്ല.',
  ),
  groups: [
    {
      title: copy('If you are starting a business', 'നിങ്ങൾ ബിസിനസ് തുടങ്ങുകയാണെങ്കിൽ'),
      body: copy(
        'You need a structure that fits, the right registrations, and someone who will explain which step comes first. Company, LLP or partnership — we will help you work out which one, and why.',
        'നിങ്ങളുടെ ബിസിനസിന് ചേരുന്ന ഒരു ഘടന, ശരിയായ രജിസ്ട്രേഷനുകൾ, ഏത് ഘട്ടമാണ് ആദ്യം എന്ന് വിവരിക്കുന്ന ഒരാള് — കമ്പനി, എൽഎൽപി, പാർട്ടർണർഷിപ്പ് — ഏതെന്ന് കണ്ടെത്താൻ ഞങ്ങൾ സഹായിക്കും, കാരണവും പറയും.',
      ),
    },
    {
      title: copy('If you are already trading', 'നിങ്ങൾ ഇപ്പോഴും വ്യാപാരം ചെയ്യുന്നവരാണെങ്കിൽ'),
      body: copy(
        'You need GST registration or return filing, books that are actually up to date, income tax support, an audit, or a new structure around an existing business. Starting over is not necessary.',
        'GST രജിസ്ട്രേഷൻ അല്ലെങ്കിൽ റിട്ടർൻ ഫയലിംഗ്, ശരിയായി അപ്ഡേറ്റ് ആയ അക്കൗണ്ടുകൾ, നികുതി സപ്പോർട്ട്, ഓഡിറ്റ്, അല്ലെങ്കിൽ നിലവിലുള്ള ബിസിനസിന് പുതിയ ഘടന — എല്ലാം വേണ്ടിവരാകും. ആദ്യം മുടക്കേണ്ടിവരുന്നില്ല.',
      ),
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
  eyebrow: copy('Also available', 'ഇതരം ലഭ്യമാണ്'),
  title: copy('Need More Than Registration?', 'രജിസ്ട്രേഷനിലധികം വേണോ?'),
  intro: copy(
    'Once your business is set up, we can also help you establish your digital presence, attract customers and automate repetitive work.',
    'ബിസിനസ് സജ്ജമായ ശേഷം ഡിജിറ്റൽ സാന്നിഹ്യം ഉണ്ടാക്കാനും, കസ്റ്റമേഴ്‌സറെ ആകരിക്കാനും, ആവർത്തരമായ ജോലികൾ ഓട്ടൊമേറ്റ് ചെയ്യാനും ഞങ്ങൾ സഹായിക്കുന്നു.',
  ),
  groups: [
    {
      icon: 'branding',
      title: copy('Branding and design', 'ബ്രാൻഡിംഗ്, ഡിസൈൻ'),
      body: copy(
        'Logo, business name support, brand colours, print and social media templates.',
        'ലോഗോ, ബിസിനസ്സിന്റെ പേരിന് സപ്പോർട്ട്, ബ്രാൻഡ് കളറുകൾ, പ്രിന്റ്, സോഷ്യൽ മീഡിയ ടെംപ്ലേറ്റുകൾ.',
      ),
    },
    {
      icon: 'website',
      title: copy('Websites and hosting', 'വെബ്‌സൈറ്റും ഹോസ്റ്റിംഗും'),
      body: copy(
        'Simple, fast websites, and the hosting and maintenance to keep them working.',
        'ലളിതമായി വേഗത്തിൽ ഉള്ള വെബ്‌സൈറ്റുകൾ, അവയുടെ ഹോസ്റ്റിംഗും അറ്റക്കുറിസ്റ്റിംഗും.',
      ),
    },
    {
      icon: 'email',
      title: copy('Email and Google Workspace', 'ഇമെയിലും Google Workspace ഉം'),
      body: copy(
        'Domain-based email on your own business address, set up properly.',
        'നിങ്ങളുടെ ബിസിനസ് വിലാസിൽ ഡൊമെയിൻ ഇമെയിൽ, ശരിയായി സജ്ജസംസ്ഥപ്പെടുത്തിയിട്ട്.',
      ),
    },
    {
      icon: 'marketing',
      title: copy('Marketing and lead generation', 'മാർക്കറ്റിംഗ്, ലീഡ് ജനറേഷൻ'),
      body: copy(
        'Facebook and Instagram campaigns, Google Ads, and search visibility for the searches your customers actually make.',
        'ഫേസ്ബുക്ക്, ഇൻസ്റ്റഗ്രാം ക്യാമ്പെയിനുകൾ, Google Ads, ഉപഭോക്താക്കൾ യഥാർത്ഥത്തിൽ തിരയുന്ന വിവരങ്ങൾക്കായിയുള്ള ദൃശ്യത.',
      ),
    },
    {
      icon: 'crm',
      title: copy('WhatsApp Business and CRM', 'WhatsApp ബിസിനസ്, CRM'),
      body: copy(
        'Setting up enquiry tracking and a shared list, so leads do not sit unanswered in a phone.',
        'എൻക്വയറി ട്രാക്കിംഗും ഷയേർഡ് ലിസ്റ്റും സജ്ജസംസ്ഥപ്പെടുത്തുക — ലീഡുകൾ ഫോണിലേക്ക് മാത്രം കിടിക്കാത് ഇരുക്കുക.',
      ),
    },
    {
      icon: 'automation',
      title: copy('AI and workflow automation', 'AI, ഓട്ടൊമേഷൻ'),
      body: copy(
        'Automating the repetitive parts — quotes, follow-ups, reminders, reports — so the work does not depend on remembering to do it.',
        'വിലകളും ഫോളോ അപ്പുകളും ഓർമ്മപ്പെടുത്തലുകളും റിപ്പോർട്ടുകളുമായി ആവർത്തരം ചെയ്യുന്ന ജോലികൾ ഓട്ടൊമേറ്റ് ചെയ്യുക.',
      ),
    },
  ],
  note: copy(
    'These are the secondary part of what we do. If you are here to register a business, file returns or get your accounts in order, start with those — they are what we are set up for, and they are where the advertising points.',
    'ഇത് ഞങ്ങളുടെ ജോലിയുടെ രണ്ടാം ഭാഗമാണ്. ബിസിനസ് രജിസ്ടർ ചെയ്യാൻ, റിട്ടർൻ ഫയൽ ചെയ്യാൻ, അക്കൗണ്ടുകൾ ക്രമത്തിലാക്കാൻ വന്നാൽ അതിനും തന്നെ തുടങ്ങൂ — അതാണ് ഞങ്ങൾക്ക് ചേരുന്നതും പരിചരണവും തിരിക്കുന്നതുമായിരുന്നത്.',
  ),
} as const

// ============================================================================
// HOME — FAQ
// ============================================================================

export const faqsSection = {
  eyebrow: copy('Questions', 'ചോദ്യങ്ങൾ'),
  title: copy('The questions we are asked most often', 'ഏറ്റവും കൂടുതൽ ചോദിക്കപ്പെടുന്ന ചോദ്യങ്ങൾ'),
  intro: copy(
    'Answered honestly. Where the honest answer is "it depends", that is what it says — because a number we would have to take back helps nobody.',
    'നേരിട്ടുള്ളതായി ഉത്തരിക്കുന്നു. നേരിട്ടുള്ള ഉത്തരം "അവസരത്തിനു വേണ്ടിരിക്കും" എന്നാണെങ്കിൽ അതാണ് പറയുന്നത് — പിന്നീട് പിന്നെ പറയേണ്ടിവരുന്ന ഒരു അക്കവ് ആരുടെയും ഉപയോഗമാകില്ല.',
  ),
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
  title: copy('Tell us what you need, and we will tell you what it involves', 'നിങ്ങൾക്ക് എന്താണ് വേണ്ടത് എന്ന് പറയൂ, അതിന് എന്ത് വേണ്ടം എന്ന് ഞങ്ങൾ പറയും'),
  body: copy(
    "A short conversation is usually enough for us to tell you what is needed and what it involves. No obligation — and if we are not the right fit, we will say so rather than take the work and pass it on.",
    'എന്ത് വേണ്ടം, എന്തൊക്കെ പടികൾ ഉണ്ടെന്ന് പറയാൻ ഒരു ചുരുക്കിയ സംഭാഷണം മതി. ഒരു ബാധ്യതയുമില്ല — ഞങ്ങൾക്ക് അത് ചെയ്യാൻ കഴിയില്ലെങ്കിൽ അത് ചെയ്യാൻ കഴിയില്ലെന്ന് ഞങ്ങൾ തന്നെ പറയും.',
  ),
  note: copy(
    'No prices or timelines are promised anywhere on this site, because both change with your situation and with the authority involved. You will get a real answer when you ask.',
    'ഈ വെബ്‌സൈറ്റിൽ എവിടെയും വിലയും സമയവിവരകണക്കാരവും വാഗ്ദാനമാക്കുന്നില്ല — രണ്ടും നിങ്ങളുടെ സാഹചര്യവും ബന്ധപ്പെട്ട അധികാരവും അനുസരിച്ച് മാറുന്നതാണ്. ചോദിക്കുമ്പോൾ യഥാർത്ഥമായ ഉത്തരം ലഭിക്കും.',
  ),
} as const

// ============================================================================
// /services
// ============================================================================

export const servicesPage = {
  eyebrow: copy('Services', 'സേവനങ്ങൾ'),
  title: copy('Business registration and professional services', 'ബിസിനസ് രജിസ്ട്രേഷനും പ്രൊഫഷണൽ സേവനങ്ങളും'),
  intro: copy(
    'Nine services that cover starting a business and keeping it properly run. Open any one to see what is included, what documents are needed, and what we will ask you for before we start.',
    'ബിസിനസ് തുടങ്ങുകയും അത് ശരിയായി തുടരുകയും എന്ന് കവറെ ഉൾപ്പെടുന്ന ഒൻപത് സേവനങ്ങൾ. ഏതെന്നും ഒന്ന് തുറന്നാൽ എന്ത് ഉൾപ്പെടുന്നു, ഏത് രേഖകൾ വേണം, തുടങ്ങുന്നതിനു മുമ്പ് നമ്മൾ എന്ത് ചോദിക്കും എന്ന് കാണാം.',
  ),
  /** Rendered above the grid, so the cost policy is visible up front. */
  pricingPolicy: {
    title: copy('About pricing', 'വിലപറയുന്നതിനെപ്പറ്റി'),
    body: copy(
      'Our pricing is not published as a single figure, because for most of these services the cost depends on your situation: the number of people involved, the state, the authorised capital, the transaction volume, and the government fees that apply at the time. We prepare a quotation for your case, and government fees are always shown separately from our professional fee.',
      'ഈ സേവനങ്ങളിൽ മിക്കതിലും ചെലവ് നിങ്ങളുടെ സാഹചര്യത്തെ ആശ്രയിച്ചിരിക്കുന്നതിനാൽ ഒരു നിശ്ചിത വില ഞങ്ങൾ പ്രസിദ്ധീകരിക്കുന്നില്ല: എത്ത ആളുകളുണ്ട്, ഏത് സംസ്ഥാനം, അംഗീകൃത മൂലധനം, ഇടപാടിയുടെ വലിപ്പം, അന്നപ്പോഴുള്ള സർക്കാർ ഫീസുകൾ. നിങ്ങളുടെ കാസിന് ഞങ്ങൾ ക്വോട്ടേഷൻ തയ്യാറാക്കും, സർക്കാർ ഫീസ് ഞങ്ങളുടെ പ്രൊഫഷണൽ ഫീസിൽ നിന്നും വേർതിരിച്ചാണ് എപ്പോഴും കാണിക്കുക.',
    ),
  },
} as const

// ============================================================================
// /about
// ============================================================================

export const aboutPage = {
  eyebrow: copy('About us', 'ഞങ്ങളെപ്പറ്റി'),
  heading: copy('A business partner, not just a service provider.', 'ഒരു സേവന ദാതാവ് മാത്രമല്ല, ഒരു ബിസിനസ് പങ്കാളി.'),
  intro: copy(
    'Shifra Nuha Technologies helps new and existing businesses across Kerala get properly registered, stay compliant, and keep the professional work in one place. Registration is where we start. It is not the whole relationship.',
    'കേരളത്തിലെ പുതിയതും നിലവിലുള്ളതുമായ ബിസിനസുകൾക്ക് Shifra Nuha Technologies ശരിയായി രജിസ്ടർ ചെയ്യാൻ, കമ്പ്ലയൻസ് നിർത്തിക്കാൻ, പ്രൊഫഷണൽ ജോലികൾ ഒരിടത്ത് സൂക്ഷിക്കാൻ സഹായിക്കുന്നു. രജിസ്ട്രേഷനിലാണ് തുടങ്ങുന്നത്; അതല്ല ബന്ധമത്തിന്റെ അത്യം.',
  ),
  positioning: {
    title: copy('How we describe ourselves', 'ഞങ്ങളെ എങ്ങനെ വിവരിക്കുന്നു'),
    primary: copy(
      'We help businesses start properly, and stay that way.',
      'ബിസിനസുകൾ ശരിയായി തുടങ്ങാൻ സഹായിക്കുക, അതുപോലെയുള്ളതായിരിക്കാൻ സഹായിക്കുക.',
    ),
    secondary: copy(
      'Registration, tax, accounting and professional support — through one point of contact.',
      'രജിസ്ട്രേഷൻ, നികുതി, അക്കൗണ്ടിംഗ്, പ്രൊഫഷണൽ സപ്പോർട്ട് — ഒരു കോൺടാക്ടിലൂടെയാണ്.',
    ),
    body: copy(
      'We are deliberately not positioned as only a web development agency, an accounting firm or a marketing agency. A business rarely needs one of those things. It usually needs the right combination, in the right order, coordinated properly — and that is a different job from selling any single one of them.',
      'ഞങ്ങൾ മാത്രം ഒരു വെബ് ഡവലപ്പ്മെന്റ് ഏജൻസിയോ അക്കൗണ്ടിംഗ് സ്ഥാപനമോ മാർക്കറ്റിംഗ് ഏജൻസിയോ ആണെന്ന് സ്ഥാനം വഹിക്കുന്നില്ല. ഒരു ബിസിനസിന് അവയിൽ ഒന്ന് മാത്രമാണ് വേണ്ടത് എന്ന് സാധ്യമല്ല. ശരിയായ ക്രമത്തിൽ ശരിയായ കമ്പൈനേഷൻ ആണ് അടിമം — അവയിൽ ഏതെന്നും ഒന്ന് വിൽപ്പന്നതിനേക്കാൾ മറ്റൊരു ജോലി.',
    ),
  },
  boundaries: {
    title: copy('How we work with professional partners', 'പ്രൊഫഷണൽ പങ്കാളികളുമായി നമ്മൾ പ്രവർത്തിക്കുന്ന രീതി'),
    body: copy(
      'Some business services are regulated and must be performed or supervised by qualified professionals. Where that applies, we coordinate the work and the appropriate professional carries it out — a chartered accountant for accounting, taxation, GST and audit-related work; a company secretary for incorporation and corporate compliance; a lawyer for agreements and contracts; and a trademark or IP professional for IP work.',
      'ചില ബിസിനസ് സേവനങ്ങൾ നിയന്ത്രണത്തിലുള്ളവയാണ്; അവ യോഗ്യതയുള്ള പ്രൊഫഷണലിനാണ് ചെയ്യേണ്ടത്. അത്തരം ജോലികളിൽ ഞങ്ങൾ പ്രക്രിയ നിരീക്ഷിക്കും, അനുയോജ്യമായ പ്രൊഫഷണൽ അത് ചെയ്യും — അക്കൗണ്ടിംഗ്, നികുതി, GST, ഓഡിറ്റ് സംബന്ധിച്ച ജോലികൾക്ക് chartered accountant, ഇൻകോർപ്പറേഷൻ, കോർപ്പറേറ്റ് കമ്പ്ലയൻസിന് company secretary, കരാറുകൾക്ക് വക്കീസ്, IP ജോലികൾക്ക് ട്രേഡ്മാർക്ക്/IP പ്രൊഫഷണൽ.',
    ),
    points: [
      'You deal with one point of contact for the whole project.',
      'Regulated work is performed or supervised by the appropriate qualified professional.',
      'We tell you in advance which part of the work involves an external partner.',
    ],
  },
  partners: {
    title: copy('Who does what', 'ആര് എന്ത് ചെയ്യും'),
    intro: copy(
      'We work with a small network of trusted specialists rather than a large in-house team, so you get the right expertise without a large fixed cost. You will always be told which work is being handled by an external partner.',
      'വലിയ ഇൻ-ഹൗസ് ടീമിനേക്കാൾ ചെറിയ, വിശ്വസനീയമായ വിദഗ്ധരുടെ ഒരു ചെറിയ നെറ്റ്‌വർക്കാണ് ഞങ്ങൾ പ്രവർത്തിക്കുന്നത് — അതിനാൽ വലിയ സ്ഥിര ചെലവില്ലാതെ ശരിയായ വിദഗ്ധത ലഭിക്കും. ഏത് ജോലിയാണ് പുറത്തുള്ള പങ്കാളി നോക്കുന്നതെന്ന് എപ്പോഴും പറയും.',
    ),
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
    title: copy('How an engagement usually grows', 'ഒരു ബന്ധം സാധാരണം എങ്ങനെയാണ് വളർന്നത്'),
    intro: copy(
      'Most businesses do not need everything at once. The work usually moves in this order, and each stage feeds the next. We do not push the later stages onto anyone.',
      'മിക്കാളി ബിസിനസുകളും ഒറ്റയിക്ക് എല്ലാം വേണ്ട. ജോലികൾ സാധാരണം ഈ ക്രമത്തിലാണ് മുന്നോടുന്നത്, ഓരോ ഘട്ടവും അടുത്തതിന് അടിത്തിട്ടുണ്ട്. പിന്നീടുള്ള ഘട്ടങ്ങൾ ആരെയും നിർബന്ധിക്കാത്ത രീതിയിലാണ് ഞങ്ങൾ പ്രവർത്തിക്കുന്നത്.',
    ),
    steps: [
      { title: 'REGISTER', body: 'Company, LLP or partnership, plus GST' },
      { title: 'COMPLY', body: 'Accounting, bookkeeping, income tax, audit' },
      { title: 'BUILD', body: 'Branding, logo, website, email, WhatsApp Business' },
      { title: 'GROW', body: 'Facebook and Instagram ads, Google Ads, lead generation' },
      { title: 'AUTOMATE', body: 'CRM, WhatsApp automation, AI, workflow automation' },
    ],
  },
  closing: {
    title: copy('Start with a conversation, not a commitment.', 'ഒരു പ്രതിബദ്ധതയല്ല, ഒരു സംഭാഷണത്തിലാണ് തുടങ്ങൂ.'),
    body: copy(
      'Tell us what you are dealing with. If it is not something we handle, we will say so rather than take the work and pass it on.',
      'നിങ്ങളുടെ പ്രശ്നം എന്താണെന്ന് പറയൂ. അത് ഞങ്ങൾ ചെയ്യുന്നതല്ലെങ്കിൽ, ജോലി എടുത്തുകൊടുത്ത് മറ്റൊരാളിനെ കൊടുക്കാതെ അത് ഞങ്ങൾ തന്നെ പറയും.',
    ),
  },
} as const

// ============================================================================
// /contact
// ============================================================================

export const contactPage = {
  eyebrow: copy('Contact', 'ബന്ധപ്പെടുക'),
  heading: copy('Ready to Get Started?', 'തുടങ്ങാൻ തയ്യാറാണോ?'),
  intro: copy(
    'WhatsApp or a phone call is fastest and we read both. Use the form if you would rather not start a conversation yet — it asks for very little and we will come back to you either way.',
    'WhatsApp അല്ലെങ്കിൽ ഫോൺ കോളാണ് വേഗത്തിന്; രണ്ടും ഞങ്ങൾ വായിക്കും. ഇപ്പോൾ ഒരു സംഭാഷണം തുടങ്ങാൻ ഇഷ്ടമില്ലെങ്കിൽ ഫോം ഉപയോഗിക്കൂ — വളരെ കുറച്ച് ചോദിക്കുന്നു, എങ്കിലും ഞങ്ങൾ തിരികെ ബന്ധപ്പെടും.',
  ),
  formTitle: copy('Send an enquiry', 'എൻക്വയറി അയയ്ക്കുക'),
  formIntro: copy(
    'Three things are required — your name, a number we can reply to, and what you need. Everything else is optional.',
    'മൂന്ന് കാര്യങ്ങൾ ആവശ്യമാണ് — പേര്, ഞങ്ങൾക്ക് പ്രതികരിക്കാവുന്ന ഒരു നമ്പർ, എന്താണ് വേണ്ടത്. ബാക്കിയവ ഐച്ഛികമാണ്.',
  ),
  directTitle: copy('Direct contact', 'നേരിട്ടുള്ള ബന്ധപ്പെടുക'),
  nextSteps: [
    {
      number: '01',
      title: copy('You send an enquiry', 'നിങ്ങൾ എൻക്വയറി അയയ്ക്കും'),
      body: copy(
        'Message us on WhatsApp, call us, or fill in the form. A short description is enough to start.',
        'WhatsApp-ൽ സന്ദേശം ചെയ്യൂ, വിളിക്കൂ, അല്ലെങ്കിൽ ഫോം പൂർത്തിയാക്കൂ. തുടങ്ങാൻ ഒരു ചെറിയ വിവരണം മതി.',
      ),
    },
    {
      number: '02',
      title: copy('We review and respond', 'ഞങ്ങൾ പരിശോധിച്ച് പ്രതികരിക്കും'),
      body: copy(
        'We understand the requirement, check what is actually needed, and reply with a suggested way forward.',
        'ആവശ്യം മനസ്സിലാക്കി, യഥാർത്ഥത്തിൽ എന്താണ് വേണ്ടതെന്ന് പരിശോധിച്ച്, ഒരു സ്പഷ്ടമായ മുന്നോട്ടുള്ള ഘട്ടവുമായി മറുപടി നൽകും.',
      ),
    },
    {
      number: '03',
      title: copy('We agree the scope', 'ഞങ്ങൾ അതിന്റെ വ്യാപ്തി തീരുമാനിക്കും'),
      body: copy(
        'Scope, cost and who will be involved are agreed before any work begins.',
        'ജോലിയുടെ വ്യാപ്തി, ചെലവ്, ആരൊക്കെ പങ്കെടും എന്നിവ ജോലി തുടങ്ങുന്നതിനു മുമ്പ് തീരുമാനിക്കും.',
      ),
    },
  ],
} as const

// ============================================================================
// FOOTER / UTILITY
// ============================================================================

export const footer = {
  blurb: copy(
    'Business registration, tax, accounting and professional support for new and existing businesses across Kerala.',
    'കേരളത്തിലെ പുതിയതും നിലവിലുള്ളതുമായ ബിസിനസുകൾക്ക് ബിസിനസ് രജിസ്ട്രേഷൻ, നികുതി, അക്കൗണ്ടിംഗ്, പ്രൊഫഷണൽ പിന്തുണിന്നു.',
  ),
  servicesTitle: copy('Business services', 'ബിസിനസ് സേവനങ്ങൾ'),
  legalTitle: copy('Legal', 'നിയമങ്ങൾ'),
  legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Disclaimer', to: '/disclaimer' },
  ],
} as const

export const notFound = {
  heading: copy('Page not found', 'പേജ് കണ്ടെത്തിയില്ല'),
  body: copy(
    'The page you are looking for does not exist or has moved. Try one of the services, or get in touch and we will point you to the right place.',
    'നിങ്ങൾ തിരയുന്ന പേജ് ഇല്ല, അല്ലെങ്കിൽ മാറ്റിയിരിക്കും. ഒരു സേവനം ശ്രമിക്കൂ, അല്ലെങ്കിൽ ഞങ്ങളെ ബന്ധപ്പെടൂ — ശരിയായ സ്ഥലത്തിലേക്ക് വിവരിക്കാം.',
  ),
  button: copy('Go to the homepage', 'ഹോംപേജിലേക്ക് പോകുക'),
} as const

// Re-exported so the icon registries stay the single source of icon keys.
export type { DigitalIconKey, ReasonIconKey }
