/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT — edit copy here.
 * ---------------------------------------------------------------------------
 * Everything a visitor reads on the site comes from this file, so wording can
 * be changed without touching any component.
 *
 * IMPORTANT: contact details, social links and the enquiry endpoint are NOT
 * filled in, because the real values have not been provided. They are left
 * blank on purpose so nothing is invented. The UI shows a clear placeholder
 * wherever a value is empty.
 */

export const site = {
  name: 'Shifra Nuha Technologies',
  wordmark: {
    primary: 'Shifra Nuha',
    secondary: 'Technologies',
  },
  tagline: 'Start. Build. Grow. Automate.',
  supportingLine: 'Everything your business needs to launch and grow.',
  description:
    'Shifra Nuha Technologies helps businesses with business setup, branding, websites, marketing, automation and technology — through one coordinated team.',
  /**
   * Leave blank until the real domain is confirmed. While it is blank the site
   * skips canonical and og:url tags rather than publishing a made-up address.
   */
  url: '' as string,
  locale: 'en_IN',
} as const

/**
 * Brand assets, generated from `brand/logo-source.png` into `public/brand/`.
 * See `brand/README.md` for how to regenerate them after a new logo arrives.
 */
export const brand = {
  /** Full lockup (mark + wordmark) for light backgrounds. */
  logo: '/brand/logo.png',
  /** The same lockup knocked out to white, for dark backgrounds. */
  logoOnDark: '/brand/logo-white.png',
  /** The square "SN" monogram on its own. */
  mark: '/brand/mark.png',
  /** Raster favicon, declared alongside the SVG for browsers that skip it. */
  faviconPng: '/brand/favicon-32.png',
  /** Vector favicon. */
  faviconSvg: '/favicon.svg',
  /** iOS home screen icon. Opaque, because iOS treats alpha as black. */
  appleTouchIcon: '/brand/apple-touch-icon.png',
  /** 1200x630 share card. */
  ogImage: '/brand/og-image.png',
  ogImageAlt: 'Shifra Nuha Technologies — Start. Build. Grow. Automate.',
} as const

export type ContactDetails = {
  phone: string
  whatsapp: string
  email: string
  address: string
  hours: string
  serviceAreas: string[]
}

export const contact: ContactDetails = {
  // TODO: replace with the real values. Empty strings render as a labelled
  // placeholder on the Contact page instead of fake contact information.
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  hours: '',
  serviceAreas: ['Malappuram', 'Kozhikode', 'Kannur', 'Kochi'],
}

/** Social profiles — empty links are hidden rather than pointed anywhere fake. */
export const social = {
  linkedin: '',
  facebook: '',
  instagram: '',
  x: '',
}

export type NavItem = { label: string; to: string }

export const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export type ServiceId = 'start' | 'build' | 'grow' | 'automate'

export type Service = {
  id: ServiceId
  step: string
  title: string
  category: string
  /** One-line summary used on cards. */
  summary: string
  /** Short paragraph used on the Services page. */
  description: string
  /** Short list shown on cards. */
  points: string[]
  /** Fuller list of work included, shown on the Services page. */
  capabilities: string[]
  /** Business outcomes, not tools — how the work is described to customers. */
  outcomes: string[]
  /** Accent colour classes (kept muted and consistent). */
  accent: {
    chip: string
    icon: string
    rule: string
  }
}

export const services: Service[] = [
  {
    id: 'start',
    step: '01',
    title: 'START',
    category: 'Business Setup & Compliance',
    summary: 'Get your business set up with the right professional support.',
    description:
      'Registration, tax registration, accounting and compliance handled through qualified professionals, coordinated end to end so you do not have to juggle multiple vendors.',
    points: [
      'Company / LLP / partnership setup',
      'GST',
      'Accounting',
      'Bookkeeping',
      'Compliance',
      'Project reports',
    ],
    capabilities: [
      'Company incorporation',
      'LLP incorporation',
      'Partnership setup',
      'GST registration and related services',
      'MSME / Udyam registration',
      'FSSAI registration where applicable',
      'Import Export Code (IEC)',
      'Accounting',
      'Bookkeeping',
      'Income-tax related services',
      'GST compliance and returns',
      'Audit coordination',
      'Payroll support',
      'Project reports and financial projections',
      'Business documentation',
      'Trademark application coordination',
      'Other applicable registrations',
    ],
    outcomes: [
      'A legally registered business with the right structure for your plans',
      'Tax, accounting and compliance handled by qualified professionals',
      'One point of contact instead of several vendors',
    ],
    accent: {
      chip: 'bg-brand-50 text-brand-700 ring-brand-200',
      icon: 'text-brand-600',
      rule: 'from-brand-500 to-brand-300',
    },
  },
  {
    id: 'build',
    step: '02',
    title: 'BUILD',
    category: 'Branding & Digital Presence',
    summary: 'Build a professional identity and digital presence for your business.',
    description:
      'A consistent identity across your logo, website, email and business listings — so customers recognise you and take you seriously from the first click.',
    points: [
      'Logo design',
      'Branding',
      'Websites',
      'Domain',
      'Business email',
      'Google Business Profile',
    ],
    capabilities: [
      'Logo design',
      'Brand identity',
      'Business cards and stationery',
      'Social media branding',
      'Business websites',
      'Landing pages',
      'E-commerce websites',
      'Domain registration',
      'Business email',
      'Hosting and SSL',
      'Google Business Profile setup',
      'WhatsApp Business setup',
      'Basic analytics',
      'Website maintenance',
    ],
    outcomes: [
      'A complete, consistent digital identity',
      'A website built to turn visitors into enquiries',
      'Professional email and listings customers can find and trust',
    ],
    accent: {
      chip: 'bg-blue-50 text-blue-700 ring-blue-200',
      icon: 'text-blue-600',
      rule: 'from-blue-500 to-blue-300',
    },
  },
  {
    id: 'grow',
    step: '03',
    title: 'GROW',
    category: 'Marketing & Lead Generation',
    summary: 'Reach more customers and turn attention into enquiries.',
    description:
      'Campaigns built around one specific customer problem at a time, with landing pages, tracking and reporting so you can see what is actually working.',
    points: [
      'Facebook / Instagram Ads',
      'Google Ads',
      'Landing pages',
      'Lead generation',
      'SEO',
      'Social media',
    ],
    capabilities: [
      'Facebook and Instagram advertising',
      'Google Ads',
      'Lead-generation campaigns',
      'Landing pages',
      'Social media setup',
      'Social media creatives',
      'Social media management',
      'SEO and local SEO',
      'WhatsApp marketing',
      'Email marketing',
      'Conversion tracking',
      'Analytics and reporting',
    ],
    outcomes: [
      'A predictable flow of enquiries instead of guesswork',
      'Clear reporting on cost, leads and follow-ups',
      'Campaigns focused on one problem at a time, not everything at once',
    ],
    accent: {
      chip: 'bg-amber-50 text-amber-700 ring-amber-200',
      icon: 'text-amber-600',
      rule: 'from-amber-500 to-amber-300',
    },
  },
  {
    id: 'automate',
    step: '04',
    title: 'AUTOMATE',
    category: 'AI & Business Automation',
    summary: 'Reduce repetitive work and connect your business systems.',
    description:
      'We connect the tools you already use, automate the repetitive steps between them, and remove the manual work that slows your team down.',
    points: [
      'AI chatbots',
      'WhatsApp automation',
      'CRM',
      'Workflow automation',
      'API integrations',
      'Custom software',
    ],
    capabilities: [
      'AI customer-support chatbots',
      'WhatsApp automation',
      'Telegram bots',
      'AI lead qualification',
      'CRM setup',
      'Lead management systems',
      'Automated follow-ups',
      'Document processing and AI document extraction',
      'Internal dashboards',
      'Business workflow automation',
      'API integrations',
      'Custom business software',
      'Customer and employee portals',
      'Cloud deployment',
      'IT infrastructure',
      'Monitoring and maintenance',
    ],
    outcomes: [
      'Faster response to every enquiry, including out-of-hours',
      'Fewer manual, repetitive tasks for your team',
      'A single view of leads, customers and work in progress',
    ],
    accent: {
      chip: 'bg-violet-50 text-violet-700 ring-violet-200',
      icon: 'text-violet-600',
      rule: 'from-violet-500 to-violet-300',
    },
  },
]

export const whyUs = {
  heading: 'One partner for your business journey.',
  intro:
    'Most small businesses do not have a technology problem. They have a coordination problem. We bring the pieces together.',
  points: [
    {
      title: 'One coordinated team',
      body: 'Business setup, branding, website, marketing and automation handled by one team instead of five disconnected vendors.',
    },
    {
      title: 'Business-first approach',
      body: 'We start with the problem in your business, then decide what technology is actually needed.',
    },
    {
      title: 'Professional network',
      body: 'Regulated work is performed or supervised by the appropriate qualified professionals — chartered accountants, company secretaries, lawyers and IP professionals.',
    },
    {
      title: 'Technology focused',
      body: 'Modern websites, automation, AI and software used to improve how your business actually operates.',
    },
    {
      title: 'Long-term support',
      body: 'Support continues after the initial setup, through maintenance, marketing, accounting, automation and technology support.',
    },
  ],
} as const

export const process = {
  heading: 'How it works',
  intro: 'A simple path from a first conversation to ongoing support.',
  steps: [
    {
      number: '01',
      title: 'Tell us what you need',
      body: 'Share your business and your requirements — in your own words.',
    },
    {
      number: '02',
      title: 'We understand',
      body: 'We identify the right combination of business, digital and technology services.',
    },
    {
      number: '03',
      title: 'We build',
      body: 'Our team and our professional partners carry out the agreed work.',
    },
    {
      number: '04',
      title: 'We support',
      body: 'Continue with marketing, maintenance, accounting, automation and technology support.',
    },
  ],
} as const

export const audience = {
  heading: 'Built for businesses at every stage.',
  intro:
    'We work mainly with small and medium businesses that are starting out or trying to modernise how they operate.',
  pills: [
    'New businesses',
    'Small businesses',
    'Growing businesses',
    'Local businesses',
    'Service businesses',
    'Online businesses',
    'Startups',
  ],
  /** Typical situations, framed as problems rather than service names. */
  situations: [
    {
      title: 'I am starting a business',
      body: 'You need registration, branding, a website, listings and marketing — and you want it handled in one place.',
    },
    {
      title: 'I have leads but I am losing them',
      body: 'Enquiries arrive on WhatsApp and nobody follows up in time. That is a process problem, and it is fixable.',
    },
    {
      title: 'My digital presence looks outdated',
      body: 'No website, no professional email, no Google Business listing. Competitors are being found instead of you.',
    },
    {
      title: 'Too much of the work is manual',
      body: 'Copy-pasting between forms, spreadsheets and WhatsApp. The same task, again and again, every single day.',
    },
  ],
} as const

export const cta = {
  heading: "Building a business? Let's build it together.",
  body: "Tell us what you're working on and we'll help you identify what you need to get started.",
  button: 'Start a Conversation',
} as const

/** Options for the "What do you need?" field on the enquiry form. */
export const enquiryNeeds = [
  'Starting a business',
  'Registration / GST / Accounting',
  'Logo / Branding',
  'Website',
  'Marketing / Ads',
  'AI / Automation',
  'Custom Software',
  'Other',
] as const

/** Options for the "Business type" field. */
export const businessTypes = [
  'Restaurant / Food',
  'Clinic / Healthcare',
  'Tuition / Coaching centre',
  'Manufacturing / Small industry',
  'Trading / Retail',
  'Real estate',
  'Recruitment / HR',
  'Travel',
  'Salon / Wellness',
  'E-commerce',
  'Professional services',
  'Agency',
  'Other',
] as const

export const contactPage = {
  heading: "Let's talk",
  intro:
    'Tell us a little about your business and what you need. We will come back with a clear next step — and tell you honestly if we are not the right fit.',
  formNote:
    'Fields marked with * are required. We only use these details to respond to your enquiry.',
  nextSteps: [
    {
      number: '01',
      title: 'You send an enquiry',
      body: 'Share your requirements through the form. A short description is enough to start.',
    },
    {
      number: '02',
      title: 'We review and respond',
      body: 'We understand the requirement, check what is actually needed, and reply with a suggested way forward.',
    },
    {
      number: '03',
      title: 'We agree the scope',
      body: 'Scope, timeline and pricing are agreed before any work begins, along with which partner is involved.',
    },
  ],
  serviceAreaTitle: 'Where we work',
  serviceAreaBody:
    'We work with businesses across Kerala, and remotely with businesses elsewhere in India.',
} as const

export const aboutPage = {
  heading: 'A business partner, not just a service provider.',
  intro:
    'Shifra Nuha Technologies helps businesses start, build, grow and automate. We combine business setup through qualified partners, branding and digital presence, marketing and lead generation, and AI, automation and custom technology.',
  positioning: {
    title: 'How we describe ourselves',
    primary: 'We help businesses start, build, grow, and automate.',
    secondary: 'Everything your business needs to launch and grow, under one roof.',
    body: 'We are deliberately not positioned as only a web-development agency, an accounting firm, or a marketing agency. Businesses rarely need one of those things — they need the right combination, coordinated properly.',
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
    title: 'Our partner network',
    intro:
      'We work with a small network of trusted specialists rather than a large in-house team, so you get the right expertise without a large fixed cost.',
    rows: [
      { role: 'CA', responsibility: 'Accounting, taxation, GST, audit-related work' },
      { role: 'CS', responsibility: 'Incorporation and corporate compliance' },
      { role: 'Lawyer', responsibility: 'Legal agreements, contracts, legal matters' },
      { role: 'Trademark / IP professional', responsibility: 'Trademark and IP work' },
      { role: 'Graphic designer', responsibility: 'Branding and creative overflow' },
      { role: 'Digital marketer', responsibility: 'Ads and SEO when required' },
      { role: 'Photographer / videographer', responsibility: 'Optional business content' },
      { role: 'Technical team', responsibility: 'Websites, software, automation, infrastructure' },
    ],
  },
  journey: {
    title: 'How an engagement usually grows',
    intro:
      'Most businesses do not need everything at once. The work usually moves in this order, and each stage feeds the next.',
    steps: [
      { title: 'START', body: 'Business registration, GST, accounting' },
      { title: 'BUILD', body: 'Branding, logo, website, email, WhatsApp' },
      { title: 'GROW', body: 'Meta Ads, Google Ads, lead generation' },
      { title: 'AUTOMATE', body: 'AI, WhatsApp, CRM, workflows, custom software' },
      { title: 'ONGOING SUPPORT', body: 'Maintenance, monitoring, reporting, improvements' },
    ],
  },
  principles: {
    title: 'What we sell',
    body: 'We sell business outcomes, not tools. It changes how projects are described, scoped and priced.',
    examples: [
      { weak: '"We build n8n workflows."', better: '"We automate repetitive business processes."' },
      { weak: '"We build AI chatbots."', better: '"We automate customer inquiries and lead qualification."' },
      { weak: '"We make React websites."', better: '"We build professional websites that turn visitors into enquiries."' },
      { weak: '"We run Facebook Ads."', better: '"We help businesses generate and manage qualified leads."' },
    ],
  },
  future: {
    title: 'Where this is going',
    body: 'We use service work to find the problems customers keep paying us to solve, then standardise, automate and productise them. If many businesses in the same industry need the same automation, that becomes a product — and eventually software you can log into.',
  },
} as const

export const footer = {
  blurb:
    'Business setup, branding and digital presence, marketing and lead generation, and AI & business automation — through one coordinated team.',
  navTitle: 'Explore',
} as const

export const notFound = {
  heading: 'Page not found',
  body: 'The page you are looking for does not exist or has moved.',
  button: 'Back to home',
} as const
