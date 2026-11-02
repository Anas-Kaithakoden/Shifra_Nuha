import { formatINR, pricingById } from './knowledgeBase'

/**
 * ---------------------------------------------------------------------------
 * FAQS
 * ---------------------------------------------------------------------------
 * Maintainable in one file and shared by the chat UI and the server-side
 * system prompt. The answers are deliberately careful: no timelines, no
 * guarantees, no invented prices and no claim that a human is available at a
 * particular moment.
 *
 * The two price answers use the approved package totals from
 * `knowledgeBase.ts` rather than typing the figures again, so the FAQ cannot
 * drift from the pricing table.
 */

export type FaqItem = {
  id: string
  question: string
  answer: string
}

const llpPricing = pricingById('llp-registration')
const privateLimitedPricing = pricingById('private-limited-registration')

if (!llpPricing || !privateLimitedPricing) {
  throw new Error('Approved pricing is missing from the knowledge base.')
}

export const businessFaqs: FaqItem[] = [
  {
    id: 'services',
    question: 'What services does Shifra Nuha provide?',
    answer:
      'Shifra Nuha Technologies supports businesses with four broad areas: business solutions (registration, taxation, accounting and compliance), digital solutions (websites, business software, billing and inventory, CRM, automation and cloud services), branding and creative work (logo, identity, stationery and marketing materials), and creative content design (presentations, pitch decks, catalogues and campaign creatives).',
  },
  {
    id: 'online-registration',
    question: 'Can I complete business registration online?',
    answer:
      'In most cases, yes. Applications are filed electronically and documents can be shared digitally. Some structures or circumstances may need a physical signature or notarisation, and the team will confirm exactly what applies to your case before you begin.',
  },
  {
    id: 'llp-documents',
    question: 'What documents are required for LLP registration?',
    answer:
      'Typically PAN and Aadhaar of the partners, photographs and signatures, proof of address, proof of the proposed registered office, and details of the proposed business. Exact requirements depend on your case, so the team sends a written checklist before you collect anything.',
  },
  {
    id: 'llp-cost',
    question: 'What is the cost of LLP registration?',
    answer: `For two partners, the advertised LLP registration package is ${formatINR(
      llpPricing.packageTotal,
    )}. It covers the service charge, Digital Signature Certificates, government charges, stamp paper and certification charges as set out in the approved package. Government charges may change depending on share capital and the respective state. For a different number of partners, or a detailed breakdown, contact the team for a quotation.`,
  },
  {
    id: 'llp-vs-private-limited',
    question: 'What is the difference between LLP and Private Limited?',
    answer:
      'An LLP is a separate legal entity for two or more partners, with a lighter compliance load and management by designated partners. A private limited company is a separate company owned by shareholders and managed by directors, and is often chosen when there are co-founders, investment plans, or customers and vendors who expect a registered company. Both generally provide limited liability. The right choice depends on ownership, investment and compliance preferences, so the team can help you decide.',
  },
  {
    id: 'website-development',
    question: 'Do you provide website development?',
    answer:
      'Yes. Shifra Nuha designs and builds business websites, corporate websites, landing pages, portfolio websites and website maintenance. The team can also coordinate domain, hosting and ongoing technical support.',
  },
  {
    id: 'custom-erp',
    question: 'Do you build custom ERP software?',
    answer:
      'Yes. The team builds ERP and business management software, custom business applications, internal management systems and workflow tools around the way the business actually works. The scope is agreed before development starts.',
  },
  {
    id: 'whatsapp-automation',
    question: 'Do you provide WhatsApp automation?',
    answer:
      'Yes. Shifra Nuha provides WhatsApp automation, WhatsApp chatbots, AI chatbots, workflow automation and third-party API integrations. The team can discuss which enquiries or workflows are worth automating for your business.',
  },
  {
    id: 'contact',
    question: 'How can I contact Shifra Nuha?',
    answer:
      'The fastest way is WhatsApp — use the WhatsApp enquiry button in this chat to review and send your message. You can also call or email using the details on the Contact page.',
  },
]

export function faqById(id: string): FaqItem | undefined {
  return businessFaqs.find((faq) => faq.id === id)
}
