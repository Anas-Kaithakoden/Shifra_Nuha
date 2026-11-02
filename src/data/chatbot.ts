/**
 * ---------------------------------------------------------------------------
 * CHATBOT COPY AND QUICK REPLIES
 * ---------------------------------------------------------------------------
 * The welcome message is fixed by the brief. Quick replies submit a normal
 * user message, so the assistant can respond conversationally rather than
 * dropping people into a scripted decision tree.
 */

export const WELCOME_MESSAGE = `Hello! Welcome to Shifra Nuha Technologies.

I'm here to help you explore our business, digital and creative services.

What would you like help with today?`

export type QuickReply = {
  id: string
  label: string
  /** The message submitted when the visitor taps this reply. */
  message: string
  /** Used to prefill the WhatsApp handoff. */
  serviceId?: string
}

/** The five initial replies required by the brief. */
export const initialQuickReplies: QuickReply[] = [
  {
    id: 'starting-business',
    label: 'Starting a Business',
    message: 'I want to start a business. Can you help me understand the registration options?',
    serviceId: 'business-registration',
  },
  {
    id: 'tax-compliance',
    label: 'Tax & Compliance',
    message: 'I need help with GST, tax filing and compliance for my business.',
    serviceId: 'gst',
  },
  {
    id: 'digital-solutions',
    label: 'Digital Solutions',
    message: 'Tell me about your website and digital solutions.',
    serviceId: 'digital-solutions',
  },
  {
    id: 'branding-creative',
    label: 'Branding & Creative',
    message: 'Tell me about your branding and creative services.',
    serviceId: 'branding',
  },
  {
    id: 'pricing-enquiries',
    label: 'Pricing & Enquiries',
    message: 'I would like to know about pricing and how to get a quotation.',
  },
]

/** Additional topic shortcuts shown once the conversation has started. */
export const followUpQuickReplies: QuickReply[] = [
  {
    id: 'llp',
    label: 'LLP Registration',
    message: 'How much does LLP registration cost, and what documents are required?',
    serviceId: 'llp-registration',
  },
  {
    id: 'private-limited',
    label: 'Private Limited',
    message: 'How much does Private Limited Company registration cost?',
    serviceId: 'private-limited-registration',
  },
  {
    id: 'gst',
    label: 'GST & Taxation',
    message: 'I need help with GST registration, returns and tax compliance.',
    serviceId: 'gst',
  },
  {
    id: 'website',
    label: 'Website Development',
    message: 'I need a business website. Can you tell me about your website development services?',
    serviceId: 'website-development',
  },
  {
    id: 'branding',
    label: 'Branding Services',
    message: 'I am interested in logo design and brand identity development.',
    serviceId: 'branding',
  },
  {
    id: 'pricing',
    label: 'Pricing Information',
    message: 'Can you tell me how pricing works and how I can get a quotation?',
  },
]
