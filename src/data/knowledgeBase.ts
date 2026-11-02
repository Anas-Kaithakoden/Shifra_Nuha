/**
 * ---------------------------------------------------------------------------
 * BUSINESS KNOWLEDGE BASE — the single source of truth
 * ---------------------------------------------------------------------------
 * Everything the assistant is allowed to say about the business comes from
 * here, from `faqs.ts` and from the approved pricing below. The same modules
 * are imported by the Cloudflare Pages Function and by the browser, so the
 * business rules cannot drift between what the UI shows and what the model is
 * told.
 *
 * There is deliberately no RAG, no embeddings and no external retrieval. The
 * content is small enough to inject into the system prompt, and keeping it as
 * typed data means a wrong price or an invented service cannot hide in a
 * vector store.
 *
 * WHAT MUST NEVER BE ADDED WITHOUT APPROVAL
 *  - Prices for any service other than the two listed below.
 *  - Timelines, guarantees, government affiliations, client counts, awards,
 *    testimonials, ratings, office locations or credentials.
 *  - Claims that a service is free.
 *
 * The language is deliberately plain. Where the business only offers
 * "assistance" or "support", the summary says so rather than implying that the
 * company itself is the authority.
 */

export type KnowledgeService = {
  id: string
  name: string
  summary: string
}

export type KnowledgeGroup = {
  id: string
  title: string
  intro: string
  services: KnowledgeService[]
}

export type KnowledgeCategory = {
  id: 'business-solutions' | 'digital-solutions' | 'branding-creative' | 'creative-content'
  title: string
  intro: string
  groups: KnowledgeGroup[]
}

export const businessProfile = {
  name: 'Shifra Nuha Technologies',
  shortDescription:
    'A business services company supporting businesses across Kerala with registration, taxation, accounting, compliance, digital solutions and branding.',
  serviceArea: 'Kerala, with remote support for businesses elsewhere in India.',
  workingStyle: [
    'One point of contact coordinates the engagement.',
    'Scope, documents and fees are agreed before work begins.',
    'Qualified professionals are involved where the work requires them.',
  ],
  contactGuidance:
    'Visitors can continue with the team on WhatsApp from this chat. The team replies during working hours. Do not claim that a human is online at this moment.',
} as const

export const knowledgeBase: KnowledgeCategory[] = [
  {
    id: 'business-solutions',
    title: 'Business Solutions',
    intro: 'Business registration, taxation, accounting and regulatory compliance.',
    groups: [
      {
        id: 'business-registration',
        title: 'Business Registration',
        intro: 'Support with choosing a structure and completing the registration for a new business.',
        services: [
          {
            id: 'llp-registration',
            name: 'LLP Registration',
            summary:
              'Registration of a Limited Liability Partnership for two or more partners, including coordination of the required filings.',
          },
          {
            id: 'private-limited-registration',
            name: 'Private Limited Company Registration',
            summary: 'Incorporation of a private limited company for its directors and shareholders.',
          },
          {
            id: 'partnership-firm-registration',
            name: 'Partnership Firm Registration',
            summary: 'Registration support for a partnership firm.',
          },
          {
            id: 'proprietorship-setup',
            name: 'Proprietorship Business Setup',
            summary: 'Guidance and setup support for a sole proprietorship business.',
          },
          {
            id: 'company-incorporation',
            name: 'Company Incorporation Assistance',
            summary: 'Coordination and filing assistance for company incorporation.',
          },
        ],
      },
      {
        id: 'taxation-compliance',
        title: 'Taxation & Compliance',
        intro: 'Tax registrations, filings and ongoing compliance support.',
        services: [
          {
            id: 'gst-registration',
            name: 'GST Registration',
            summary: 'GST registration support where the business is required or chooses to register.',
          },
          {
            id: 'gst-return-filing',
            name: 'GST Return Filing',
            summary: 'Preparation and filing of periodic GST returns.',
          },
          {
            id: 'income-tax-return-filing',
            name: 'Income Tax Return Filing',
            summary: 'Preparation and filing of income tax returns.',
          },
          {
            id: 'tax-consultation',
            name: 'Tax Consultation',
            summary: 'Discussion of tax questions and compliance requirements for the business.',
          },
          {
            id: 'gst-compliance',
            name: 'GST Compliance',
            summary: 'Ongoing GST compliance support for the business.',
          },
        ],
      },
      {
        id: 'accounting-financial',
        title: 'Accounting & Financial Services',
        intro: 'Day-to-day accounting, financial statements and audit coordination.',
        services: [
          {
            id: 'bookkeeping',
            name: 'Bookkeeping',
            summary: 'Recording day-to-day business transactions.',
          },
          {
            id: 'accounting-services',
            name: 'Accounting Services',
            summary: 'Ongoing accounting support for the business.',
          },
          {
            id: 'financial-statement-preparation',
            name: 'Financial Statement Preparation',
            summary: 'Preparing financial statements from the business records.',
          },
          {
            id: 'auditing-assistance',
            name: 'Auditing Assistance',
            summary: 'Coordination and support for audit requirements.',
          },
          {
            id: 'project-report-preparation',
            name: 'Project Report Preparation',
            summary: 'Preparing project reports for business or finance requirements.',
          },
        ],
      },
      {
        id: 'registrations-certifications',
        title: 'Registrations & Certifications',
        intro: 'Business registrations, certifications and related filings.',
        services: [
          {
            id: 'trademark-registration',
            name: 'Trademark Registration',
            summary: 'Assistance with filing a trademark application.',
          },
          {
            id: 'msme-udyam-registration',
            name: 'MSME / Udyam Registration',
            summary: 'Registration support under the MSME / Udyam framework.',
          },
          {
            id: 'digital-signature-certificate',
            name: 'Digital Signature Certificate (DSC)',
            summary: 'Digital signature certificates for people who need one for a filing.',
          },
          {
            id: 'other-business-registrations',
            name: 'Other Business Registrations and Licensing Assistance',
            summary:
              'Support with other registrations and licensing requirements, subject to the specific authority and the business’s circumstances.',
          },
        ],
      },
    ],
  },
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    intro: 'Technology, software development and business process automation.',
    groups: [
      {
        id: 'website-design-development',
        title: 'Website Design & Development',
        intro: 'Websites built around the business, its services and the action a visitor should take.',
        services: [
          {
            id: 'business-websites',
            name: 'Business Websites',
            summary: 'Websites for small and growing businesses.',
          },
          {
            id: 'corporate-websites',
            name: 'Corporate Websites',
            summary: 'Websites for established companies and multiple service lines.',
          },
          {
            id: 'landing-pages',
            name: 'Landing Pages',
            summary: 'Focused pages for a campaign, offer or single service.',
          },
          {
            id: 'portfolio-websites',
            name: 'Portfolio Websites',
            summary: 'Websites that present work, projects or a professional profile.',
          },
          {
            id: 'website-maintenance',
            name: 'Website Maintenance',
            summary: 'Ongoing updates, fixes and upkeep for an existing website.',
          },
        ],
      },
      {
        id: 'business-software',
        title: 'Business Software & Management Systems',
        intro: 'Software built around how the business actually works.',
        services: [
          {
            id: 'erp-business-management',
            name: 'ERP & Business Management Software',
            summary: 'Custom ERP and management software for core business operations.',
          },
          {
            id: 'custom-business-applications',
            name: 'Custom Business Applications',
            summary: 'Applications built around a specific business process.',
          },
          {
            id: 'internal-management-systems',
            name: 'Internal Management Systems',
            summary: 'Internal tools for teams, records and approvals.',
          },
          {
            id: 'workflow-management-systems',
            name: 'Workflow Management Systems',
            summary: 'Systems that organise tasks, handoffs and approvals.',
          },
        ],
      },
      {
        id: 'billing-inventory',
        title: 'Billing & Inventory Solutions',
        intro: 'Systems for billing, stock and day-to-day sales and purchase records.',
        services: [
          {
            id: 'billing-software',
            name: 'Billing Software',
            summary: 'Billing and invoicing software for day-to-day sales.',
          },
          {
            id: 'inventory-management-systems',
            name: 'Inventory Management Systems',
            summary: 'Systems for tracking stock and inventory.',
          },
          {
            id: 'stock-management',
            name: 'Stock Management',
            summary: 'Stock records, movement and availability tracking.',
          },
          {
            id: 'sales-purchase-management',
            name: 'Sales & Purchase Management',
            summary: 'Recording and managing sales and purchase activity.',
          },
        ],
      },
      {
        id: 'crm-lead-management',
        title: 'CRM & Lead Management',
        intro: 'Tools for organising customers, leads and follow-up.',
        services: [
          {
            id: 'crm-systems',
            name: 'Customer Relationship Management Systems',
            summary: 'A central place to manage customer relationships and activity.',
          },
          {
            id: 'lead-management-systems',
            name: 'Lead Management Systems',
            summary: 'Capture, organise and follow up on leads.',
          },
          {
            id: 'sales-tracking',
            name: 'Sales Tracking',
            summary: 'Track sales activity and pipeline progress.',
          },
          {
            id: 'customer-management-tools',
            name: 'Customer Management Tools',
            summary: 'Tools for organising customer information and interactions.',
          },
        ],
      },
      {
        id: 'automation-ai',
        title: 'Automation & AI Solutions',
        intro: 'Automation for repetitive work and integrations between business tools.',
        services: [
          {
            id: 'whatsapp-automation',
            name: 'WhatsApp Automation',
            summary: 'Automated WhatsApp replies and enquiry flows.',
          },
          {
            id: 'whatsapp-chatbots',
            name: 'WhatsApp Chatbots',
            summary: 'Chatbots that handle common WhatsApp enquiries and workflows.',
          },
          {
            id: 'ai-chatbots',
            name: 'AI Chatbots',
            summary: 'AI-assisted chat experiences for customer support and lead capture.',
          },
          {
            id: 'workflow-automation',
            name: 'Workflow Automation',
            summary: 'Automation of repetitive tasks and handoffs between tools.',
          },
          {
            id: 'third-party-api-integrations',
            name: 'Third-party API Integrations',
            summary: 'Connecting business tools through their APIs.',
          },
        ],
      },
      {
        id: 'cloud-technical',
        title: 'Cloud & Technical Services',
        intro: 'Hosting, deployment and ongoing technical support.',
        services: [
          {
            id: 'cloud-hosting',
            name: 'Cloud Hosting',
            summary: 'Hosting setup for websites and applications.',
          },
          {
            id: 'website-deployment',
            name: 'Website Deployment',
            summary: 'Deploying a website to a hosting environment.',
          },
          {
            id: 'server-configuration',
            name: 'Server Configuration',
            summary: 'Configuration of servers and related services.',
          },
          {
            id: 'technical-support',
            name: 'Technical Support',
            summary: 'Ongoing technical help for deployed systems.',
          },
        ],
      },
    ],
  },
  {
    id: 'branding-creative',
    title: 'Branding & Creative Solutions',
    intro: 'Brand identity, visual communication and professional business materials.',
    groups: [
      {
        id: 'logo-design',
        title: 'Logo Design',
        intro: 'A logo mark that works across print, screen and small sizes.',
        services: [
          {
            id: 'business-logo-design',
            name: 'Business Logo Design',
            summary: 'A custom logo for a business.',
          },
          {
            id: 'brand-logo-redesign',
            name: 'Brand Logo Redesign',
            summary: 'A refreshed logo for an existing brand.',
          },
          {
            id: 'logo-variations',
            name: 'Logo Variations',
            summary: 'Versions of a logo for different uses and backgrounds.',
          },
        ],
      },
      {
        id: 'brand-identity',
        title: 'Brand Identity & Guidelines',
        intro: 'A consistent visual system rather than a single logo file.',
        services: [
          {
            id: 'brand-identity-development',
            name: 'Brand Identity Development',
            summary: 'A consistent visual identity for the business.',
          },
          {
            id: 'brand-colour-palette',
            name: 'Brand Colour Palette',
            summary: 'A defined colour system for the brand.',
          },
          {
            id: 'typography-selection',
            name: 'Typography Selection',
            summary: 'A type system for headings and body text.',
          },
          {
            id: 'brand-guidelines',
            name: 'Brand Guidelines',
            summary: 'A document explaining how to use the identity consistently.',
          },
          {
            id: 'visual-identity-systems',
            name: 'Visual Identity Systems',
            summary: 'A complete system of visual elements for the brand.',
          },
        ],
      },
      {
        id: 'business-stationery',
        title: 'Business Stationery Design',
        intro: 'The printed and digital materials a business uses every day.',
        services: [
          {
            id: 'business-cards',
            name: 'Business Cards',
            summary: 'Business card design.',
          },
          {
            id: 'letterheads',
            name: 'Letterheads',
            summary: 'Letterhead design.',
          },
          {
            id: 'envelopes',
            name: 'Envelopes',
            summary: 'Envelope design.',
          },
          {
            id: 'invoice-quotation-templates',
            name: 'Invoice & Quotation Templates',
            summary: 'Templates for invoices and quotations.',
          },
        ],
      },
      {
        id: 'corporate-marketing',
        title: 'Corporate & Marketing Materials',
        intro: 'Documents that explain the business to customers and partners.',
        services: [
          {
            id: 'company-profiles',
            name: 'Company Profiles',
            summary: 'Company profile documents.',
          },
          {
            id: 'service-brochures',
            name: 'Service Brochures',
            summary: 'Brochures describing services.',
          },
          {
            id: 'product-catalogues',
            name: 'Product Catalogues',
            summary: 'Catalogues for products.',
          },
          {
            id: 'business-proposals',
            name: 'Business Proposals',
            summary: 'Proposal documents for clients or partners.',
          },
          {
            id: 'promotional-flyers',
            name: 'Promotional Flyers',
            summary: 'Flyers for offers and promotions.',
          },
          {
            id: 'digital-marketing-creatives',
            name: 'Digital Marketing Creatives',
            summary: 'Visuals for digital marketing.',
          },
        ],
      },
      {
        id: 'social-advertising',
        title: 'Social Media & Advertising Design',
        intro: 'Visuals made for social platforms and campaigns.',
        services: [
          {
            id: 'social-media-posts',
            name: 'Social Media Posts',
            summary: 'Posts designed for social platforms.',
          },
          {
            id: 'advertising-posters',
            name: 'Advertising Posters',
            summary: 'Posters for advertising.',
          },
          {
            id: 'campaign-creatives',
            name: 'Campaign Creatives',
            summary: 'Visuals for a campaign.',
          },
          {
            id: 'promotional-banners',
            name: 'Promotional Banners',
            summary: 'Banners for promotions.',
          },
        ],
      },
    ],
  },
  {
    id: 'creative-content',
    title: 'Creative & Content Solutions',
    intro: 'Presentations, documents, catalogues and campaign content.',
    groups: [
      {
        id: 'creative-content-solutions',
        title: 'Creative & Content Solutions',
        intro: 'Professional design for the moments when the business has to explain itself clearly.',
        services: [
          {
            id: 'business-presentation-design',
            name: 'Business Presentation Design',
            summary: 'Presentation design for business use.',
          },
          {
            id: 'pitch-deck-design',
            name: 'Pitch Deck Design',
            summary: 'Pitch deck design for a business or fundraising conversation.',
          },
          {
            id: 'corporate-document-design',
            name: 'Corporate Document Design',
            summary: 'Design for corporate documents and reports.',
          },
          {
            id: 'marketing-material-design',
            name: 'Marketing Material Design',
            summary: 'Design for marketing materials.',
          },
          {
            id: 'digital-catalogue-design',
            name: 'Digital Catalogue Design',
            summary: 'Catalogue design for digital use.',
          },
          {
            id: 'social-media-content-design',
            name: 'Social Media Content Design',
            summary: 'Content design for social media.',
          },
          {
            id: 'advertising-creative-design',
            name: 'Advertising Creative Design',
            summary: 'Creative design for advertising.',
          },
          {
            id: 'business-profile-portfolio-design',
            name: 'Business Profile & Portfolio Design',
            summary: 'Profile and portfolio design for a business.',
          },
        ],
      },
    ],
  },
]

// ============================================================================
// APPROVED PRICING
// ============================================================================

export type PricingLine = {
  label: string
  amount: number
  /** e.g. "per person" — never folded into the amount. */
  note?: string
  /** True when the amount applies to each partner or director in the package. */
  perPerson?: boolean
}

export type PricingEntry = {
  id: string
  serviceId: string
  title: string
  lines: PricingLine[]
  packageTotal: number
  packageTotalFor: string
  /** Number of partners or directors the package total is quoted for. */
  packagePeople: number
  notes: string[]
}

/**
 * The only two services with approved pricing. The supplier's own component
 * values sum to ₹9,899 and ₹13,199 respectively; the advertised package totals
 * are ₹9,900 and ₹13,200. Both figures are kept exactly as supplied. Neither
 * the components nor the totals may be "corrected" by code or by the model.
 */
export const pricingEntries: PricingEntry[] = [
  {
    id: 'llp-registration',
    serviceId: 'llp-registration',
    title: 'LLP Registration',
    lines: [
      { label: 'Service charge', amount: 2999 },
      { label: 'Digital Signature Certificate', amount: 2000, note: 'per person', perPerson: true },
      { label: 'Government charges', amount: 900 },
      { label: 'Stamp paper', amount: 1000 },
      { label: 'Certification charges', amount: 1000 },
    ],
    packageTotal: 9900,
    packageTotalFor: '2 partners',
    packagePeople: 2,
    notes: [
      'Government charges may change depending on share capital and the respective state.',
      'The listed component values add up to ₹9,899, while the advertised package total is ₹9,900. The advertised package total is the figure to quote; neither figure may be changed.',
    ],
  },
  {
    id: 'private-limited-registration',
    serviceId: 'private-limited-registration',
    title: 'Private Limited Company Registration',
    lines: [
      { label: 'Service charge', amount: 3499 },
      { label: 'Digital Signature Certificate', amount: 2000, note: 'per person', perPerson: true },
      { label: 'Government charges', amount: 4200 },
      { label: 'Certification charges', amount: 1500 },
    ],
    packageTotal: 13200,
    packageTotalFor: '2 directors',
    packagePeople: 2,
    notes: [
      'Government charges may change depending on share capital and the respective state.',
      'The listed component values add up to ₹13,199, while the advertised package total is ₹13,200. The advertised package total is the figure to quote; neither figure may be changed.',
    ],
  },
]

/** Exact response required for any service without approved pricing. */
export const UNLISTED_PRICING_RESPONSE =
  'Pricing depends on your requirements. Please contact our team for a quotation.'

export const pricingRules = [
  'Only LLP Registration and Private Limited Company Registration have approved pricing.',
  'Clearly separate service charges from government charges.',
  'Mention that government charges may vary by state and share capital.',
  'Quote the advertised package total only for the approved package and number of partners or directors.',
  `For every other service, respond: "${UNLISTED_PRICING_RESPONSE}"`,
  'Never invent a price, fee or inclusion for another service.',
  'Never claim that a service is free.',
  'Never guarantee that a price will remain unchanged.',
  'Recommend contacting the business for a customised quotation.',
] as const

/** ₹ grouping for Indian pricing, e.g. 9900 -> ₹9,900. */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

/** Convenience lookup used by the FAQ answer for LLP pricing. */
export function pricingById(id: string): PricingEntry | undefined {
  return pricingEntries.find((entry) => entry.id === id)
}
