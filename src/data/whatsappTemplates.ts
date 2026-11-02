/**
 * ---------------------------------------------------------------------------
 * WHATSAPP ENQUIRY TEMPLATES
 * ---------------------------------------------------------------------------
 * Each template is the starting point for the editable message shown in the
 * handoff review screen. The visitor always reviews and edits it, and nothing
 * is sent until they press send inside WhatsApp.
 *
 * Keywords are used only to pick a sensible starting template from the
 * conversation. They are not used to answer questions — the knowledge base is
 * the authoritative source for that.
 */

export type EnquiryTemplate = {
  /** Matches the service id used by quick replies where possible. */
  serviceId: string
  label: string
  intro: string
  closing: string
  keywords: string[]
}

export const enquiryTemplates: EnquiryTemplate[] = [
  {
    serviceId: 'llp-registration',
    label: 'LLP registration',
    intro: "Hi, I'm interested in LLP registration through Shifra Nuha Technologies.",
    closing:
      "I'd like to know more about the registration process, the documents required and the advertised package.",
    keywords: ['llp', 'limited liability partnership'],
  },
  {
    serviceId: 'private-limited-registration',
    label: 'Private Limited registration',
    intro:
      "Hi, I'm interested in Private Limited Company registration through Shifra Nuha Technologies.",
    closing:
      "I'd like to know more about the incorporation process, the documents required and the advertised package.",
    keywords: [
      'private limited',
      'private ltd',
      'pvt ltd',
      'pvt. ltd',
      'company registration',
      'company incorporation',
    ],
  },
  {
    serviceId: 'trademark-registration',
    label: 'trademark registration',
    intro: "Hi, I'm interested in trademark registration assistance.",
    closing: "I'd like to discuss the process, requirements and next steps.",
    keywords: ['trademark', 'trade mark'],
  },
  {
    serviceId: 'gst',
    label: 'GST and tax compliance',
    intro: 'Hi, I need help with GST and tax compliance for my business.',
    closing: "I'd like to discuss my requirements and the next steps.",
    keywords: [
      'gst',
      'goods and services tax',
      'tax filing',
      'income tax',
      'tax return',
      'tax consultation',
      'tax compliance',
    ],
  },
  {
    serviceId: 'accounting',
    label: 'accounting and bookkeeping',
    intro: "Hi, I'm looking for accounting, bookkeeping and financial support for my business.",
    closing: "I'd like to discuss the scope and pricing.",
    keywords: [
      'accounting',
      'bookkeeping',
      'book keeping',
      'financial statement',
      'audit',
      'project report',
    ],
  },
  {
    serviceId: 'website-development',
    label: 'website design and development',
    intro:
      "Hi, I'm interested in website design and development services from Shifra Nuha Technologies.",
    closing: "I'd like to discuss my website requirements and pricing.",
    keywords: [
      'website',
      'web site',
      'landing page',
      'web development',
      'web design',
      'website maintenance',
    ],
  },
  {
    serviceId: 'erp',
    label: 'ERP and business software',
    intro: 'Hi, I’m interested in ERP and business management software for my business.',
    closing: "I'd like to discuss my requirements and pricing.",
    keywords: [
      'erp',
      'business management software',
      'management system',
      'custom business application',
      'internal management',
      'workflow management',
    ],
  },
  {
    serviceId: 'billing-inventory',
    label: 'billing and inventory systems',
    intro: "Hi, I'm interested in billing and inventory management systems.",
    closing: "I'd like to discuss my requirements and pricing.",
    keywords: ['billing', 'inventory', 'stock management', 'sales and purchase'],
  },
  {
    serviceId: 'crm',
    label: 'CRM and lead management',
    intro: "Hi, I'm interested in CRM and lead management software.",
    closing: "I'd like to discuss my requirements and pricing.",
    keywords: ['crm', 'lead management', 'sales tracking', 'customer management'],
  },
  {
    serviceId: 'whatsapp-automation',
    label: 'WhatsApp automation and chatbots',
    intro: "Hi, I'm interested in WhatsApp automation and chatbot solutions.",
    closing: "I'd like to discuss which enquiries or workflows can be automated.",
    keywords: [
      'whatsapp automation',
      'whatsapp chatbot',
      'whatsapp bot',
      'chatbot',
      'ai chatbot',
      'workflow automation',
      'api integration',
    ],
  },
  {
    serviceId: 'cloud-technical',
    label: 'cloud hosting and technical support',
    intro: "Hi, I'm interested in cloud hosting, deployment and technical support.",
    closing: "I'd like to discuss my requirements and pricing.",
    keywords: [
      'cloud hosting',
      'hosting',
      'deployment',
      'server configuration',
      'technical support',
    ],
  },
  {
    serviceId: 'branding',
    label: 'branding and creative services',
    intro: "Hi, I'm interested in branding and creative services.",
    closing: "I'd like to discuss logo design and brand identity development.",
    keywords: [
      'branding',
      'brand identity',
      'brand guidelines',
      'logo',
      'business card',
      'letterhead',
      'brochure',
      'catalogue',
      'company profile',
      'social media post',
      'banner',
      'poster',
    ],
  },
  {
    serviceId: 'creative-content',
    label: 'creative and content design',
    intro: "Hi, I'm interested in creative and content design services.",
    closing: "I'd like to discuss my requirements and pricing.",
    keywords: [
      'pitch deck',
      'presentation design',
      'content design',
      'social media content',
      'advertising creative',
      'marketing material',
      'portfolio design',
    ],
  },
  {
    serviceId: 'business-registration',
    label: 'business registration',
    intro: "Hi, I'm planning to start a business and would like guidance on the right registration.",
    closing: 'Could you help me understand the options and next steps?',
    keywords: [
      'start a business',
      'starting a business',
      'register a business',
      'business registration',
      'proprietorship',
      'partnership firm',
      'incorporation',
    ],
  },
  {
    serviceId: 'digital-solutions',
    label: 'digital solutions',
    intro: "Hi, I'm interested in digital solutions for my business.",
    closing: "I'd like to discuss my requirements and pricing.",
    keywords: ['digital solutions', 'digital services', 'software', 'automation'],
  },
]

export const defaultEnquiryTemplate: EnquiryTemplate = {
  serviceId: 'general',
  label: 'your services',
  intro: "Hi, I'm interested in Shifra Nuha Technologies' services.",
  closing: 'Could you help me with the next steps?',
  keywords: [],
}

export function enquiryTemplateFor(serviceId: string | null | undefined): EnquiryTemplate {
  if (!serviceId) return defaultEnquiryTemplate
  return enquiryTemplates.find((template) => template.serviceId === serviceId) ?? defaultEnquiryTemplate
}
