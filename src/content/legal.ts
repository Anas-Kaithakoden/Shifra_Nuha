import { site } from './site'

/**
 * ---------------------------------------------------------------------------
 * LEGAL PAGES
 * ---------------------------------------------------------------------------
 * Privacy Policy, Terms & Conditions and Disclaimer, all in the same shape so
 * one page component renders all three. Keeping them together is deliberate:
 * the draft banner, the "questions" footer and the on-page navigation are the
 * same on each, and a legal page that looks different from its neighbours
 * reads as a page nobody checked.
 *
 * These are starting templates, and the page says so on screen. They describe
 * the structure of a business relationship in general terms; they are not a
 * substitute for terms drafted for this specific company by a lawyer, and the
 * brief rules out claiming professional advice we have not given.
 *
 * Nothing here invents a jurisdiction clause, a governing law, a liability cap
 * or a turnaround. Where a real answer depends on the company's registered
 * entity, its location and its actual working arrangements, the text says what
 * needs filling in rather than guessing it.
 */

export type LegalSection = { heading: string; paragraphs: string[] }

export type LegalDoc = {
  slug: 'privacy' | 'terms' | 'disclaimer'
  eyebrow: string
  title: string
  intro: string
  /** Renders the "review before launch" banner above the document. */
  draft: boolean
  sections: LegalSection[]
}

export const terms: LegalDoc = {
  slug: 'terms',
  eyebrow: 'Legal',
  title: 'Terms & Conditions',
  intro:
    'The terms on which this website is provided, and the basis on which enquiries are handled. Using the site or contacting us means you have read these.',
  draft: true,
  sections: [
    {
      heading: 'About this website',
      paragraphs: [
        `This website is operated by ${site.name}. It is a marketing and enquiry site: it explains the services we offer and gives you a way to contact us. It is not an online service, and nothing you can do here completes a registration, files a return, produces a document, or engages a professional on your behalf.`,
        'An engagement only begins when we have agreed the scope, the cost and the work in writing, after discussing your specific situation.',
      ],
    },
    {
      heading: 'Enquiries and quotations',
      paragraphs: [
        'Sending an enquiry — by WhatsApp, by phone, or through the form on this site — does not create a contract, a client relationship, or an obligation on either side to do any work. It means only that you have asked us a question and we will try to answer it.',
        'Any figure we give you before a written scope is agreed is an estimate for the situation described, not a quotation. It is based on what you have told us, on the authority involved, and on the fees in force at that time, and it can change if any of those change.',
        'Where government fees apply, they are shown separately from our professional fee. Government fees are payable to the authority and are not refundable by us if an application is rejected or withdrawn.',
      ],
    },
    {
      heading: 'Information you give us',
      paragraphs: [
        'We rely on the accuracy of what you tell us. Registration, tax and audit work depends on correct information, and a filing made on the basis of something you know to be wrong is your responsibility, not ours.',
        'You are responsible for keeping the login credentials and documents you provide secure. We will tell you which professional partners need access to your documents, and we will ask before sharing anything with them.',
      ],
    },
    {
      heading: 'Availability and third-party systems',
      paragraphs: [
        'We do our work through government portals, filing systems and third-party services that we do not control. Those systems can be slow, unavailable, or changed without notice, and a failure in one of them is not something we can promise to prevent.',
        'For the same reason, no page on this website states a processing time, and none should be read as a commitment. What we can give you is an honest view of what is realistic for your case at the time we are discussing it.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        `The name, logo and design of this website belong to ${site.name}. You may read, print and share the pages for your own business purposes. You may not reproduce them commercially, or present them as your own, without written permission.`,
        'Documents, reports and advice we produce for you are yours. We keep the working papers needed to support our professional responsibilities and may retain copies after the engagement ends.',
      ],
    },
    {
      heading: 'Liability',
      paragraphs: [
        'To the extent permitted by law, we are not liable for loss arising from your reliance on general information published on this site, from the act or omission of a third-party system, or from decisions you take on the basis of this website before speaking to us.',
        'Nothing in these terms limits liability that cannot lawfully be limited, including for fraud. The registered entity, its registered address, and the governing law that applies to this agreement all need to be confirmed by a lawyer and completed here before launch.',
      ],
    },
    {
      heading: 'Changes to these terms',
      paragraphs: [
        'These terms may be updated as the website and our working arrangements change. The version published on this page is the one that applies to your use of the site.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        'If anything here is unclear, or you think something has gone wrong, say so. Use the contact details published on the contact page, or send an enquiry through the form, and we will pick it up.',
      ],
    },
  ],
}

export const disclaimer: LegalDoc = {
  slug: 'disclaimer',
  eyebrow: 'Legal',
  title: 'Disclaimer',
  intro:
    'What this website is, and — just as importantly — what it is not. Please read this before relying on anything you find here.',
  draft: true,
  sections: [
    {
      heading: 'General information only',
      paragraphs: [
        `Everything published on this website is general information about business registration, tax, accounting and related professional work in India, and on how we approach that work. It is not legal, tax, accounting or financial advice, and it is not a recommendation for your particular situation.`,
        'Requirements, fees and procedures change. Rules, thresholds and portal behaviour change, and they change differently in different states. Nothing here is a substitute for advice given to you after somebody has looked at your actual facts.',
      ],
    },
    {
      heading: 'No outcome is promised',
      paragraphs: [
        'No page on this website states a price, a processing time, or a guaranteed result, and none should be read as a commitment. Whether a name is approved, whether an application is accepted, whether a mark is registered, and how long any authority takes are all decisions made by the relevant authority, not by us.',
        'Where we describe what a process involves, we are describing it in general terms. Your facts may make a material difference to the answer.',
      ],
    },
    {
      heading: 'Regulated work and professional partners',
      paragraphs: [
        'Some of this work is regulated. Wherever that applies, the work is carried out or supervised by the appropriate qualified professional — a chartered accountant, a company secretary, a lawyer, or a trademark and IP professional — and we will tell you which part of a project that affects. Publishing a description of such work on a website is not the same as carrying it out.',
        'Nothing on this site should be read as us practising law, taxation or audit, or as a professional opinion.',
      ],
    },
    {
      heading: 'Content and links',
      paragraphs: [
        `We try to keep the information here accurate and current, but we do not warrant that it is complete, current, or free of error. ${site.name} may update, correct or remove any part of the site at any time.`,
        'Where a page links to a government portal or another site, we do not control that destination and we are not responsible for what is published there.',
      ],
    },
    {
      heading: 'Trademarks and company names',
      paragraphs: [
        'Company names, brand names and trade marks referred to on this site are the property of their respective owners and are used here for identification only. Their use here implies nothing about any relationship with, endorsement by, or affiliation with the owner.',
        'A registered mark protects the mark only in the classes it was registered in. Indian law does not permit the use of the ™ or ® symbol before a mark is registered, and nothing on this site should be read as advice on when either symbol may be used.',
      ],
    },
    {
      heading: 'External links and advertising',
      paragraphs: [
        'This site may be advertised on third-party platforms. We are not responsible for the content of any advertisement, landing page or creative produced by or for those platforms, or for how any platform handles data.',
      ],
    },
    {
      heading: 'Your responsibilities',
      paragraphs: [
        'You are responsible for the accuracy of the information you give us, for complying with any law that applies to your business, and for any decision you take. If you are unsure whether something applies to you, ask us before you act on it — that is a conversation, not a charge.',
      ],
    },
  ],
}

/** Slug → document, for the router and the `Legal` page. */
export const privacy: LegalDoc = {
  slug: 'privacy',
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  intro: 'This page explains what happens to information you send through this website.',
  draft: true,
  sections: [
    {
      heading: 'What we collect',
      paragraphs: [
        'When you submit an enquiry we collect the details you type into the form: your name, phone or WhatsApp number, email address, business name, business type, what you need and any message you include. We do not ask for sensitive personal information through this website.',
        'If you contact us on WhatsApp or by phone, we also hold whatever you tell us in that conversation, because we cannot reply without it.',
        'Enquiries sent through the form are opened as a message to us. The site itself has no account system, no login and no database, and it cannot complete a registration or produce a document.',
      ],
    },
    {
      heading: 'Why we collect it',
      paragraphs: [
        'We use these details only to respond to your enquiry, understand what you need, and discuss scope, timeline and pricing. We do not sell your details, and we do not use them for unrelated marketing without your agreement.',
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'Enquiry details are kept only as long as needed to respond and to maintain a record of the business relationship, after which they are deleted.',
      ],
    },
    {
      heading: 'Analytics and advertising',
      paragraphs: [
        'If analytics are enabled on this site, they are used to understand which pages are visited and which buttons are used, in aggregate. No analytics script is loaded at all until a tracking ID is configured, and nothing is requested from a third party while that ID is empty.',
        'Advertising and analytics identifiers are what make a campaign measurable. They do not give anyone access to the content of your messages, and the identity attached to them is not verified by us.',
      ],
    },
    {
      heading: 'Third parties',
      paragraphs: [
        'Where a project requires it, work may be carried out by professional partners such as chartered accountants, company secretaries, lawyers or IP professionals. Only the details relevant to that work are shared, and only with your consent.',
      ],
    },
    {
      heading: 'Your choices',
      paragraphs: [
        'You can ask us to correct or delete the information you have shared with us, or to stop contacting you, at any time.',
      ],
    },
    {
      heading: 'Updates',
      paragraphs: [
        'This policy may be updated as the website and our tools change. The version on this page is the one that applies.',
      ],
    },
  ],
}
export const legalDocs: Record<LegalDoc['slug'], LegalDoc> = { privacy, terms, disclaimer }
