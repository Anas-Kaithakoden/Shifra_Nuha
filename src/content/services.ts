/**
 * ---------------------------------------------------------------------------
 * CORE SERVICES — one entry per dedicated landing page.
 * ---------------------------------------------------------------------------
 * This is the file to edit when adding or changing a service. The homepage
 * cards, the navbar list, the `/services` hub, the route table, the sitemap and
 * the nine landing pages are all generated from it.
 *
 * Editorial rules that shaped the copy below, and that should be kept when it
 * is updated:
 *
 *  - No invented pricing. Every cost note says what drives the price and
 *    points at a quotation, and `startingFrom` is empty until a real figure is
 *    confirmed. The one figure that is real — the ₹2,999 starting fee for LLP
 *    and Company registration — comes from `offer.ts`, so it reads from the same
 *    place as the hero, the FAQ and the closing CTA rather than being retyped
 *    here.
 *  - No processing times and no guarantee of approval. Requirements, fees and
 *    timelines change, and the visitor is told to confirm them.
 *  - No professional claims that have not been verified. Regulated work is
 *    described as being carried out or supervised by the appropriate qualified
 *    professional.
 *  - No services outside the agreed list. The nine below are the whole
 *    registration and professional-services catalogue.
 */

import { registrationOffer } from './offer'

export type ServiceIconKey =
  | 'building'
  | 'scale'
  | 'handshake'
  | 'receipt'
  | 'calculator'
  | 'percent'
  | 'clipboard'
  | 'document'
  | 'tag'

export type FaqItem = { question: string; answer: string }

export type ProcessStep = { title: string; body: string }

export type ExplanationBlock = { heading: string; paragraphs: string[] }

/**
 * The authored data, kept close to the copy so the file can be read top to
 * bottom. `path`, `seo` and the rest are derived from it further down.
 */
type ServiceSource = {
  /** URL segment. Becomes `/{slug}`. */
  slug: string
  /** Formal name, used as the page heading and on cards. */
  name: string
  /** Shorter label for navigation where the formal name is too long. */
  navLabel: string
  /** One or two sentences. Used on cards and under the page heading. */
  summary: string
  metaTitle: string
  metaDescription: string
  icon: ServiceIconKey
  /** Prefilled WhatsApp message, English. Used by every button on this page. */
  whatsappMessage: string
  /** The "Clear explanation" part of the page. */
  explanation: ExplanationBlock[]
  /** "Who needs this". */
  whoNeeds: string[]
  /** "What the service includes". */
  includes: string[]
  /** "General process" — descriptive, never a promised schedule. */
  process: ProcessStep[]
  /** "Documents and information typically required". */
  documents: string[]
  /** "Important caveats" — the honest limitations, stated up front. */
  caveats: string[]
  /**
   * A genuine fixed "starting from" figure, written as a bare number.
   * Empty until one is confirmed, which renders "Get a personalised quotation"
   * instead. The `₹[PRICE]` token from the brief is never shown to a visitor.
   */
  startingFrom: string
  pricingNote: string
  faqs: FaqItem[]
  /** Slugs of related services, for internal linking. */
  related: string[]
}

/** What every component consumes: the authored data plus its derived fields. */
export type Service = Omit<ServiceSource, 'metaTitle' | 'metaDescription' | 'whatsappMessage'> & {
  /** The full route, `/company-registration` and so on. */
  path: string
  seo: { title: string; description: string }
  whatsapp: string
}

const serviceSources: ServiceSource[] = [
  // ==========================================================================
  {
    slug: 'company-registration',
    name: 'Company Incorporation',
    navLabel: 'Company Registration',
    summary:
      'Professional support to incorporate a private limited company in India — from name approval through to the certificate of incorporation and first filings.',
    metaTitle: 'Company Registration Kerala | Shifra Nuha Technologies',
    metaDescription:
      'Private limited company incorporation support in Kerala. Name approval, MOA and AOA, DIN, PAN and TAN, and Registrar of Companies coordination. Message us for a quotation.',
    icon: 'building',
    whatsappMessage: 'Hi, I am interested in company registration.',
    startingFrom: '',
    explanation: [
      {
        heading: 'What company incorporation actually involves',
        paragraphs: [
          'A private limited company is a legal person in its own right. It owns its assets, owes its own debts, and enters into contracts in its own name. The shareholders are not personally responsible for those debts beyond what they have agreed to contribute. That separation is the main reason founders choose a company over a sole proprietorship or a partnership.',
          'In India, a private limited company is incorporated with the Ministry of Corporate Affairs through the Registrar of Companies. You need at least two members and at least one director, every person involved needs a Director Identification Number, and the company needs its own PAN and TAN along with a registered office address in India where official communication can be received.',
          'We prepare and file the application, and coordinate with the company secretary or chartered accountant who carries out the professional work. You deal with one point of contact instead of a queue of vendors.',
        ],
      },
      {
        heading: 'When a private limited company is the right structure',
        paragraphs: [
          'It suits a founder who wants business liabilities separated from personal assets, who expects to bring in a co-founder or outside investment, or whose customers and procurement processes expect to deal with a registered company. It also gives the business continuity beyond any individual.',
          'It is not always the right choice. A sole proprietorship or a partnership is simpler and cheaper where the business is small, the owners are known to each other, and no outside capital is expected. We will say so during the first conversation rather than sell you a structure you do not need.',
        ],
      },
    ],
    whoNeeds: [
      'You are starting a business and want its liabilities separated from your personal assets.',
      'You plan to bring in a co-founder or outside investment and need a structure that formally accepts shareholders.',
      'You want a business that continues independently of any individual owner.',
      'You are a professional, consultant or freelancer moving from an informal setup to a registered entity.',
      'Your customers, vendors or a tender process expects you to bill from a registered company.',
    ],
    includes: [
      'A short consultation on whether a private limited company is the right structure for your case',
      'Name availability check for your preferred business names',
      'Drafting and review of the Memorandum of Association and Articles of Association',
      'Director Identification Number application for every director',
      'PAN and TAN for the company',
      'Filing the incorporation application with the Registrar of Companies',
      'Certificate of Incorporation and commencement of business support',
      'Registered office address guidance',
      'Post-incorporation help: bank account, GST registration, and a compliance calendar',
      'Guidance on the first round of statutory compliance and annual filings',
    ],
    process: [
      {
        title: 'Tell us about the business',
        body: 'What the business will do, who the directors will be, and how you plan to fund it. This decides whether a company is the right structure and what has to be filed.',
      },
      {
        title: 'Collect the documents',
        body: 'We list exactly what is needed from every director and collect it in one pass, so the application is not returned for something missing.',
      },
      {
        title: 'Name approval',
        body: 'Your preferred names are checked for availability. We suggest alternatives at the same time, because a name being taken is one of the most common reasons an application comes back.',
      },
      {
        title: 'File with the Registrar of Companies',
        body: 'The incorporation application is filed along with the memorandum, articles and the director and tax identifier applications.',
      },
      {
        title: 'Incorporation certificate',
        body: 'Once the Registrar issues the certificate of incorporation and the PAN and TAN, the company legally exists.',
      },
      {
        title: 'Set up and stay compliant',
        body: 'Bank account, GST registration and a compliance calendar, so the company does not fall out of good standing in its first year.',
      },
    ],
    documents: [
      'PAN card and Aadhaar (or passport) of every director',
      'Date of birth of every director',
      'Passport-size photograph and signature of every director',
      'Proof of the current residential address of every director',
      'The proposed registered office address, with proof such as an electricity bill or rent agreement',
      'Email address and mobile number of every director',
      'A short description of the business activity',
      'Two or three preferred company names, in order of preference',
    ],
    caveats: [
      'The company name is not guaranteed. It depends on names already taken and on the Registrar following the naming rules, so alternatives are always suggested.',
      'Government fees are separate. The MCA filing fee, stamp duty and any state-level charges are payable to the government and are not part of the professional fee.',
      'Total cost varies with the number of directors, the authorised share capital, the state, and whether you need extras such as a particular registered office state or an object clause for a regulated activity.',
      'Some businesses need approvals beyond incorporation — a licence, a sector registration, or a No Objection Certificate where the object requires government approval.',
      'We do not promise an approval date. Timelines depend on the workload at the Ministry and on how quickly documents are corrected if something is queried.',
    ],
    pricingNote:
      'The total is the professional fee plus government fees, and both change with the number of directors, the authorised capital and the state. Government fees are always shown separately, never folded into a single headline number.',
    faqs: [
      {
        question: 'What documents are required to register a company?',
        answer:
          'For every director we need PAN and Aadhaar (or passport), date of birth, a passport-size photograph, a signature, proof of current address, an email address and a mobile number. You also need proof of the proposed registered office address, a short description of the business activity, and two or three preferred company names in order of preference. A director living outside India may need additional documents such as a notarised power of attorney, which we will tell you in advance.',
      },
      {
        question: 'How much does company registration cost?',
        answer:
          `Our company registration service starts at ${registrationOffer.price} plus applicable charges. The total is that professional fee plus government fees such as the MCA filing fee, stamp duty and any state charges. Government fees vary with the number of directors, the authorised share capital and the state, and they change from time to time. We prepare a quotation once we know your case, and the government component is always shown separately.`,
      },
      {
        question: 'How long does company registration take?',
        answer:
          'We do not quote a fixed timeline, because the process depends on the workload at the Ministry and on how many queries are raised on an application. In practice three things drive the time: how quickly a name is approved, how complete the documents are, and the queue at the time of filing. We will give you a realistic view once we have seen your specific case, and we will keep you updated rather than going quiet.',
      },
      {
        question: 'Does the company need an address in Kerala?',
        answer:
          'Every company incorporated in India needs a registered office address where official communication can be received, and that address appears on the public register. It does not have to be in Kerala, and it does not have to be where the business actually operates. Because there are practical and cost implications, we discuss the options with you before you decide.',
      },
      {
        question: 'Can you help after the company is registered?',
        answer:
          'Yes. Most companies need GST registration, a bank account, accounting and bookkeeping, income tax filing, and annual filings with the Registrar of Companies. Those are services we already handle, so you can continue with one point of contact instead of finding new vendors for each one.',
      },
    ],
    related: ['gst-services', 'accounting-bookkeeping', 'trademark'],
  },

  // ==========================================================================
  {
    slug: 'llp-registration',
    name: 'LLP Registration',
    navLabel: 'LLP Registration',
    summary:
      'Professional support to register a Limited Liability Partnership — a structure that gives partners limited liability with far less formality than a company.',
    metaTitle: 'LLP Registration Kerala | Shifra Nuha Technologies',
    metaDescription:
      'LLP registration services in Kerala. Name approval, LLP agreement, DPIN, PAN and TAN, and MCA coordination. Talk to us on WhatsApp or call for a quotation.',
    icon: 'scale',
    whatsappMessage: 'Hi, I am interested in LLP registration.',
    startingFrom: '',
    explanation: [
      {
        heading: 'What an LLP is',
        paragraphs: [
          'A Limited Liability Partnership is a partnership in which every partner has limited liability, created under the Limited Liability Partnership Act. The partners share the profits and the management, but each partner is generally not personally liable for the debts and obligations of the firm beyond what they have agreed to contribute.',
          'For a small professional practice, a family business or a small agency, an LLP is often a better fit than a private limited company. It needs fewer formalities, has lower ongoing compliance, and the partners can share profits without dealing with share capital. It also has a real ceiling: an LLP cannot issue shares to raise capital from the public, so it is not suitable if you plan to bring in venture investment.',
        ],
      },
      {
        heading: 'What we handle',
        paragraphs: [
          'An LLP needs at least two partners, and every partner needs a Designated Partner Identification Number. The firm needs a written LLP agreement, its own PAN and TAN, and a registered office address in India.',
          'We prepare the agreement, file the incorporation application with the Ministry of Corporate Affairs, and coordinate with the professional who signs off on the work. The partners get one point of contact and a clear list of what each of them needs to provide.',
        ],
      },
    ],
    whoNeeds: [
      'Two or more people starting a professional practice together with limited liability.',
      'A family business that wants limited liability without the formality of a company.',
      'A small agency, consultancy or studio whose partners share profits directly.',
      'A business that wants limited liability but does not need to raise outside investment.',
      'A partnership that is already running and needs a formal, registered structure.',
    ],
    includes: [
      'A consultation on whether an LLP fits, including the points where a private limited company is the better choice',
      'Name availability check for the firm name',
      'Drafting or reviewing the LLP agreement, including the profit-sharing ratio and management arrangement',
      'Designated Partner Identification Number for every partner',
      'PAN and TAN for the LLP',
      'Filing the incorporation application with the Ministry of Corporate Affairs',
      'Certificate of LLP Registration and the commencement documents',
      'Post-registration help: bank account, GST registration, and a compliance calendar',
      'Guidance on the annual return and ongoing filings',
    ],
    process: [
      {
        title: 'Understand the partnership',
        body: 'How many partners, what each brings, and how profits and work are shared. This shapes the LLP agreement.',
      },
      {
        title: 'Collect partner documents',
        body: 'Identity, address and photograph for every partner, collected together so nothing is missing at filing.',
      },
      {
        title: 'Name approval',
        body: 'The proposed firm name is checked for availability, with alternatives suggested at the same time.',
      },
      {
        title: 'Draft and sign the LLP agreement',
        body: 'The agreement sets out the profit-sharing ratio, management, admission and exit of partners. It is reviewed before filing.',
      },
      {
        title: 'File with the Ministry of Corporate Affairs',
        body: 'The incorporation application is filed with the agreement and the partner identifier applications.',
      },
      {
        title: 'Register and set up',
        body: 'Once the certificate is issued, help with the bank account, GST registration and the compliance calendar.',
      },
    ],
    documents: [
      'PAN card and Aadhaar (or passport) of every partner',
      'Date of birth of every partner',
      'Passport-size photograph and signature of every partner',
      'Proof of the current residential address of every partner',
      'Proof of the proposed registered office address',
      'Email address and mobile number of every partner',
      'Two or three preferred firm names, in order of preference',
      'A clear understanding of the profit-sharing ratio and the management arrangement',
    ],
    caveats: [
      'An LLP is governed by the LLP Act, which limits the number of partners and the amount of specified contribution. Eligibility should be confirmed before filing rather than after.',
      'An LLP cannot issue shares, so it is not a route to raise capital from outside investors. If that is part of the plan, a private limited company is the structure to consider.',
      'Government fees are separate from the professional fee and change over time.',
      'The LLP agreement matters more than the registration. It is what governs profit sharing and what happens if a partner leaves. We do not treat it as a formality.',
      'We do not promise an approval date. The timeline depends on the Ministry and on how complete the filing is.',
    ],
    pricingNote:
      'The total is the professional fee plus government fees, which vary with the number of partners and the state. Government fees are always shown separately.',
    faqs: [
      {
        question: 'Is an LLP better than a private limited company for me?',
        answer:
          'Often, yes, for a small professional practice, family business or agency. An LLP gives partners limited liability with fewer formalities, lower ongoing compliance and direct profit sharing without dealing with share capital. A private limited company is the better fit if you plan to raise outside investment, bring in many investors, or expect to grow quickly. We will walk through the difference for your specific case on a short call.',
      },
      {
        question: 'What is the minimum requirement to register an LLP?',
        answer:
          'An LLP needs at least two partners. Every partner needs a Designated Partner Identification Number, and the firm needs an LLP agreement, its own PAN and TAN, and a registered office address in India. The Act also places limits on the number of partners and on the specified contribution, so please tell us the intended structure before we file.',
      },
      {
        question: 'How much does LLP registration cost?',
        answer:
          `Our LLP registration service starts at ${registrationOffer.price} plus applicable charges. The total is that professional fee plus government fees, which depend on the number of partners, the state and the scope of the LLP agreement, and which change over time. We prepare a quotation once we know your structure, and the government component is always itemised rather than hidden inside a single number.`,
      },
      {
        question: 'Is the LLP agreement really necessary?',
        answer:
          'Yes. The agreement is the document that governs profit sharing, management, and what happens if a partner leaves or a dispute arises. A registration without a clear agreement leaves exactly the questions the LLP was meant to answer. We draft or review it with you and explain the clauses in plain language before it is filed.',
      },
      {
        question: 'Can you help with GST and accounting after registration?',
        answer:
          'Yes. An LLP that supplies goods or services will normally need GST registration once it crosses the applicable threshold, and it needs books of account and income tax filings. Those are services we already handle, so the same contact point continues after the LLP is registered.',
      },
    ],
    related: ['partnership-registration', 'company-registration', 'gst-services'],
  },

  // ==========================================================================
  {
    slug: 'partnership-registration',
    name: 'Partnership Registration',
    navLabel: 'Partnership Registration',
    summary:
      'Registration of a partnership firm with the State Registrar of Firms, along with drafting the partnership deed that actually governs the business.',
    metaTitle: 'Partnership Firm Registration Kerala | Shifra Nuha Technologies',
    metaDescription:
      'Partnership firm registration in Kerala with the Registrar of Firms. Firm name approval, partnership deed drafting, PAN and TAN, and GST coordination. Get a quotation.',
    icon: 'handshake',
    whatsappMessage: 'Hi, I am interested in partnership registration.',
    startingFrom: '',
    explanation: [
      {
        heading: 'How a partnership works in India',
        paragraphs: [
          'A partnership firm is formed when two or more people agree to carry on business together and share its profits. Unlike a company, a partnership is largely a contractual arrangement: the partnership deed is the document that decides how profits are shared, who manages the business, what happens if a partner leaves, and how disputes are settled.',
          'Partnership firms are registered with the Registrar of Firms in the state where the firm is located, not with the central government. Registration gives the firm a place on the public register and makes the firm name and the partners publicly traceable, which matters when you are dealing with banks, landlords or government departments.',
        ],
      },
      {
        heading: 'The main thing to get right',
        paragraphs: [
          'In a general partnership, each partner can be personally liable for the debts of the firm, and in some situations for the debts of a co-partner. That is the trade-off for the simplicity and low cost of the structure, and it is worth understanding before you choose it.',
          'A carefully drafted partnership deed is therefore more important than the registration itself. We draft or review the deed, explain the clauses in plain language, and only then handle the registration. Where a partner wants limited exposure, we will explain when a limited liability partnership is the better structure and what changes.',
        ],
      },
    ],
    whoNeeds: [
      'Two or more people starting a business together and sharing profits.',
      'A family business with more than one owner that needs a written agreement.',
      'An existing unregistered partnership that needs to be formalised for banks, licensing or tenders.',
      'A professional practice, agency or trading firm that operates as a partnership.',
      'Partners who want the responsibility and control of a deed rather than a company structure.',
    ],
    includes: [
      'A consultation on whether a partnership, an LLP or a company is the right structure',
      'Firm name availability check with the Registrar of Firms',
      'Drafting or reviewing the partnership deed, including profit sharing, management, admission and exit',
      'Filing the firm registration application with the State Registrar of Firms',
      'Obtaining the registration certificate for the firm',
      'PAN and TAN for the firm',
      'GST registration coordination once the firm is registered',
      'Support for changes later, such as adding or removing a partner or changing the address',
    ],
    process: [
      {
        title: 'Understand the arrangement',
        body: 'Who the partners are, what each contributes, and how profits are to be shared. This is the basis of the deed.',
      },
      {
        title: 'Collect partner documents',
        body: 'Identity, address and photograph for every partner, together with proof of the firm address.',
      },
      {
        title: 'Check the firm name',
        body: 'The proposed firm name is checked with the Registrar of Firms, with alternatives suggested where it is not available.',
      },
      {
        title: 'Draft and execute the deed',
        body: 'The deed is drafted or reviewed, explained to all partners, and signed. Filing happens only after everyone is clear on the terms.',
      },
      {
        title: 'File for registration',
        body: 'The application is filed with the State Registrar of Firms, along with the executed deed and partner details.',
      },
      {
        title: 'Set up the firm',
        body: 'PAN and TAN for the firm, then GST registration and the compliance calendar.',
      },
    ],
    documents: [
      'PAN card and Aadhaar (or passport) of every partner',
      'Date of birth of every partner',
      'Passport-size photograph and signature of every partner',
      'Proof of the current residential address of every partner',
      'Proof of the address where the firm will operate',
      'Email address and mobile number of every partner',
      'Two or three preferred firm names, in order of preference',
      'The agreed profit-sharing ratio and the capital each partner is contributing',
    ],
    caveats: [
      'In a general partnership, partners can be personally liable for the firm debts. If that exposure is a concern, an LLP is a different structure and we will explain the difference.',
      'Registration is with the State Registrar of Firms where the firm is located, so the process and the documents differ between states.',
      'Government fees and stamp duty are separate from the professional fee and vary by state. They change over time.',
      'The deed, not the registration, is what protects the partners. We do not file a deed that the partners have not read and agreed to.',
      'We do not promise a registration date. The timeline depends on the Registrar and on how quickly queries are cleared.',
    ],
    pricingNote:
      'Get a personalised quotation. Partnership registration cost is the professional fee plus state government fees and stamp duty, which differ from state to state and are always shown separately.',
    faqs: [
      {
        question: 'What is the difference between a partnership and an LLP?',
        answer:
          'A general partnership is a contractual arrangement in which partners typically share management and can be personally liable for the firm debts. An LLP is a separate legal form under the LLP Act where partners have limited liability up to what they have agreed to contribute. If any partner is worried about personal exposure to business debts, an LLP is usually the better fit. We can explain both on a short call.',
      },
      {
        question: 'Is partnership registration compulsory?',
        answer:
          'A partnership is formed by agreement, so the business can technically begin without registration. Registration becomes important in practice when you need the firm to be traceable — for a bank account, a licence, a government tender, a lease, or a GST registration in the firm name. It also puts the firm name and partners on the public register.',
      },
      {
        question: 'How much does partnership registration cost?',
        answer:
          'It depends on the state, the number of partners and whether the deed is being drafted from scratch or reviewed. Government fees and stamp duty differ between states and change over time. We prepare a quotation once we know your case, with the government component itemised separately.',
      },
      {
        question: 'Can you help us draft the partnership deed?',
        answer:
          'Yes, and we would usually recommend it. The deed decides profit sharing, management, and what happens if a partner leaves or there is a disagreement. It is where most partnership disputes are actually settled. We draft or review it and explain the clauses in plain language before anything is filed.',
      },
      {
        question: 'What happens if a partner wants to leave later?',
        answer:
          'That is exactly what the deed is for. It sets out the notice period, the valuation of the leaving partner interest, and the settlement process. If the deed is silent or vague, a departure becomes a dispute. We make sure the exit terms are written down and agreed by all partners at the start, when nobody is leaving yet.',
      },
    ],
    related: ['llp-registration', 'gst-services', 'income-tax'],
  },

  // ==========================================================================
  {
    slug: 'gst-services',
    name: 'GST Services',
    navLabel: 'GST',
    summary:
      'GST registration, return filing and ongoing support, so your business is registered correctly and stays compliant without the work taking over your week.',
    metaTitle: 'GST Registration and Return Services Kerala | Shifra Nuha',
    metaDescription:
      'GST registration, amendment, return filing and notice support for businesses in Kerala. Eligibility check, filing and ongoing compliance. Message us for a quotation.',
    icon: 'receipt',
    whatsappMessage: 'Hi, I need help with GST.',
    startingFrom: '',
    explanation: [
      {
        heading: 'What GST registration involves',
        paragraphs: [
          'Goods and Services Tax replaced a pile of state and central taxes with one system administered by the GST Council through the GST Network. Registration gives a business a GSTIN, which most customers, marketplaces and vendors will ask for before they will deal with you.',
          'Registration is not always optional. A business supplying goods or services must register once it crosses the threshold notified for its category, and the threshold differs between goods, services and services provided in a restaurant or hospitality setting. Registration may also be required voluntarily, to supply into other states, to deal with certain customers, or to export. We check where you stand before recommending anything.',
        ],
      },
      {
        heading: 'Registration is the easy part',
        paragraphs: [
          'Most of the difficulty with GST comes after registration: monthly or quarterly returns, correct invoicing, input tax credit that is actually allowed, and notices when something is not right. Getting the registration itself correct — the right type, the right business constitution, the right place of supply — saves a lot of trouble later.',
          'We handle the registration, the amendments, the return filing, and the notices. You get reminders and a clear explanation of what was filed and why, in language a business owner can act on.',
        ],
      },
    ],
    whoNeeds: [
      'A new business whose turnover has crossed the GST registration threshold, or which expects to cross it.',
      'A business that wants to supply into other states, to export, or to sell through marketplaces.',
      'A business that supplies to larger customers who will not buy without a GSTIN.',
      'An existing business that is registered but not filing returns, or filing them incorrectly.',
      'A business that has received a GST notice and is unsure what it means or what to file.',
    ],
    includes: [
      'An eligibility check, so you register only if you are required to and in the right category',
      'GST registration in the correct type, with the correct business constitution and place of supply',
      'Guidance on invoicing, e-invoicing and e-way bills where they apply',
      'Registration amendments: address, bank account, authorised signatory, business activity',
      'Periodic return filing, monthly or quarterly as applicable',
      'Annual return where it applies to you',
      'Reconciliation of input tax credit and sales data',
      'Notice handling and replies',
      'Cancellation or suspension support when a registration is no longer needed',
    ],
    process: [
      {
        title: 'Check where you stand',
        body: 'Your turnover, what you sell or supply, who you supply it to, and whether you cross the threshold or need to register voluntarily.',
      },
      {
        title: 'Collect documents',
        body: 'Identity and address proof, place-of-business proof, bank details and photograph, collected in one pass.',
      },
      {
        title: 'File the application',
        body: 'The registration application is filed with the correct constitution, jurisdiction and business activity.',
      },
      {
        title: 'Receive the GSTIN',
        body: 'Once issued, we help you set up invoicing correctly so the first return is right from the start.',
      },
      {
        title: 'File on time, every cycle',
        body: 'Returns are prepared and filed each cycle, with the details explained so you know what was submitted.',
      },
      {
        title: 'Handle notices and changes',
        body: 'If a notice is issued, or if your business changes, we deal with it rather than leaving it to become a penalty.',
      },
    ],
    documents: [
      'PAN card of the proprietor, partners or directors, and of the authorised signatory',
      'Aadhaar of the proprietor, partners or directors, and of the authorised signatory',
      'Photograph of the proprietor, partners or directors and the authorised signatory',
      'Proof of the principal place of business, such as an electricity bill or rent agreement',
      'Proof of any additional place of business',
      'Bank account details, with a cancelled cheque or statement',
      'A description of the goods supplied or the services provided',
      'Lease agreement or ownership document if the premises is not owned',
    ],
    caveats: [
      'Registration is mandatory once the threshold is crossed, and continuing to supply without registering is not a position you want to be in. We check your numbers first.',
      'The threshold, the return frequency and the rules differ by category, state and business type, and they are revised. We confirm what applies to you rather than quoting a generic rule.',
      'A composition taxpayer cannot claim input tax credit. That is a real trade-off and it should be a deliberate choice, not a default.',
      'Penalty and interest apply to late filing, non-filing and incorrect reporting, and the amount depends on the situation. Filing on time is the cheapest control there is.',
      'Prices quoted for return filing usually depend on the number of returns, the number of documents, and whether reconciliation and notice work are included. We state what is covered.',
    ],
    pricingNote:
      'Get a personalised quotation. GST work is usually priced per return or as a monthly package, and the price depends on transaction volume and how much reconciliation is included. Registration fees payable to the government are separate.',
    faqs: [
      {
        question: 'Do I need to register for GST?',
        answer:
          'Most likely yes, once your annual turnover crosses the threshold notified for your category, and the threshold differs for goods, services and hospitality. Registration can also be needed voluntarily — to supply into other states, to export, or because your customers or marketplaces require a GSTIN. Send us your approximate turnover and what you supply, and we will tell you where you stand.',
      },
      {
        question: 'What documents are needed for GST registration?',
        answer:
          'Usually PAN and Aadhaar for the proprietor, partners or directors and the authorised signatory, a photograph, proof of the principal place of business such as an electricity bill or rent agreement, bank account details, and a description of what you supply. Additional places of business need their own proof. We send you an exact checklist for your case before you gather anything.',
      },
      {
        question: 'How much does GST registration cost?',
        answer:
          'The professional fee depends on the work involved, and the government fee is payable separately. For ongoing return filing, the price usually depends on the number of returns, the number of invoices and how much reconciliation is included. We itemise what is covered in the quotation so you can see what you are paying for.',
      },
      {
        question: 'Can you help if I am already registered but not filing returns?',
        answer:
          'Yes, and it is a common situation. We will first understand where things stand, check whether returns are pending, and look at any notice or demand that has been issued. From there we can bring the registration up to date, file what is outstanding, and set up a regular cycle. Bringing it current is more straightforward than staying silent, so please get in touch rather than leaving it.',
      },
      {
        question: 'Do you file returns for composition taxpayers and regular taxpayers?',
        answer:
          'Yes, we work with both. They are different in several important ways, particularly around input tax credit, so we will confirm which category you are in and what it means for your business before advising. If you are not sure, that is a good first question for the call.',
      },
    ],
    related: ['accounting-bookkeeping', 'income-tax', 'company-registration'],
  },

  // ==========================================================================
  {
    slug: 'accounting-bookkeeping',
    name: 'Accounting & Bookkeeping',
    navLabel: 'Accounting & Bookkeeping',
    summary:
      'Day-to-day bookkeeping and monthly accounting support, so you always know what your business actually earned, spent and owes.',
    metaTitle: 'Accounting and Bookkeeping Services Kerala | Shifra Nuha',
    metaDescription:
      'Outsourced bookkeeping and business accounting services in Kerala. Books maintained monthly, reconciliations, financial statements and management reports. Talk to us.',
    icon: 'calculator',
    whatsappMessage: 'Hi, I need help with accounting and bookkeeping.',
    startingFrom: '',
    explanation: [
      {
        heading: 'Bookkeeping and accounting are different jobs',
        paragraphs: [
          'Bookkeeping is the recording: entering invoices, receipts and payments, keeping ledgers up to date, and reconciling the bank. Accounting is the interpretation: classifying transactions correctly, applying the right treatment, and turning the records into financial statements and a view of how the business is doing.',
          'Most small businesses need both, and most small businesses fail at bookkeeping first. If the bank is not reconciled and the sales register is incomplete, no amount of accounting expertise can produce a reliable result. That is why we treat the daily records as the foundation rather than as admin work.',
        ],
      },
      {
        heading: 'How we work',
        paragraphs: [
          'We maintain the books on a monthly cycle, reconcile them against the bank, and give you a short report in plain language: what came in, what went out, what is owed to you and by whom, what you owe, and what changed since last month.',
          'We work with the accounting software you already use, or recommend one if you have nothing. Either way the records stay in your name and under your control, because statutory books and records are the business own property, not ours. You get login access and can see everything at any time.',
        ],
      },
    ],
    whoNeeds: [
      'A business that is trading but has nobody maintaining the books.',
      'A founder who is doing the accounts themselves and has run out of time.',
      'A business whose bank and sales records no longer match and needs to be brought current.',
      'A business that needs monthly numbers to make decisions, not just at year end.',
      'A business that needs a partner to handle the accounting while it prepares for growth.',
    ],
    includes: [
      'A review of the current position before anything is changed',
      'Daily bookkeeping: sales, purchases, expenses, receipts and payments',
      'Bank reconciliation every month, with differences explained',
      'Maintenance in your accounting software, with access shared with you',
      'Preparation of the financial statements for the year',
      'Management information: profitability by product or service, receivables ageing, payables ageing',
      'A fixed asset register',
      'Payroll recording and coordination where you have staff',
      'Support and handover for audits and income tax filing',
    ],
    process: [
      {
        title: 'Look at where the books are',
        body: 'What exists today, in what software, and how far behind they are. Nothing is changed before this is understood.',
      },
      {
        title: 'Set up the routine',
        body: 'A monthly cycle is agreed: which documents you share, by when, and what we produce in return.',
      },
      {
        title: 'Bring the records up to date',
        body: 'Outstanding entries, bank reconciliations and any gaps are cleared so the numbers can be trusted.',
      },
      {
        title: 'Run the monthly cycle',
        body: 'Books maintained, reconciled and reported on every month, so nothing accumulates into a backlog.',
      },
      {
        title: 'Close the year',
        body: 'Financial statements prepared, and the records handed over in a form that is ready for tax filing and any audit.',
      },
    ],
    documents: [
      'Bank statements, ideally as a PDF or spreadsheet from the bank itself',
      'Sales invoices or a sales register',
      'Purchase invoices and expense vouchers',
      'Details of any loans, and the loan agreements',
      'Stock or inventory reports',
      'Records of assets purchased during the year',
      'Payroll details and salary records if you have staff',
      'Access to the current accounting software, if one is in use',
    ],
    caveats: [
      'Statutory books and records remain the property and responsibility of the business. We maintain them for you, but ownership does not transfer to us.',
      'Bank account access needs a mandate or a statement shared directly. Without that, reconciliation is slower and less reliable.',
      'Accuracy depends on the volume and quality of the information you share. Vouchers shared promptly make a measurable difference; a year of unfiled receipts is a problem to be solved, not a clerical one.',
      'Price depends on the number of transactions, the number of bank accounts and locations, and whether payroll and inventory are included. We state the assumptions in the quotation.',
      'This is accounting support, not a statutory audit. Where an audit is legally required, that is a separate engagement with a practising chartered accountant.',
    ],
    pricingNote:
      'Get a personalised quotation. Bookkeeping and accounting are usually priced monthly, based on transaction volume, the number of accounts and the reports you need. A one-time catch-up of records already in arrears may be quoted separately.',
    faqs: [
      {
        question: 'What is the difference between bookkeeping and accounting?',
        answer:
          'Bookkeeping is the recording: entering transactions, keeping ledgers current and reconciling the bank. Accounting is the interpretation: classifying transactions correctly and turning the records into financial statements and a view of performance. Small businesses need the recording done properly first, because everything else depends on it. We handle both.',
      },
      {
        question: 'How much do accounting and bookkeeping services cost?',
        answer:
          'It depends on the volume of transactions, the number of bank accounts and locations, whether you keep inventory, and whether you have payroll. Those are the four things that change the workload most. We look at your actual numbers before quoting, and we set out what is included so there is no surprise at month end.',
      },
      {
        question: 'My books are badly behind. Can you catch up?',
        answer:
          'Usually yes, and it is a common starting point. We review what exists, identify what is missing, and quote the catch-up separately from the ongoing monthly work, because the two are different in effort. Bringing the books current first makes everything afterwards — tax filing, any audit, and your own decisions — far easier.',
      },
      {
        question: 'Do I have to give you access to my bank account?',
        answer:
          'Not bank login access. Most people share a bank statement or a bank-issued spreadsheet, which is enough for us to reconcile. A mandate is more convenient and faster, but it is not required. The books and records stay in your name and under your control, and you have login access to the accounting software at all times.',
      },
      {
        question: 'Can you work with the accounting software I already use?',
        answer:
          'Yes. We work with the common Indian accounting packages and with spreadsheets where that is genuinely enough. If your current software is a poor fit we will say so and explain why, but there is no need to change it just for our convenience.',
      },
    ],
    related: ['income-tax', 'auditing', 'gst-services'],
  },

  // ==========================================================================
  {
    slug: 'income-tax',
    name: 'Income Tax',
    navLabel: 'Income Tax',
    summary:
      'Income tax return preparation and filing, plus help with notices, TDS and advance tax, handled by a qualified professional.',
    metaTitle: 'Income Tax Services Kerala | Shifra Nuha Technologies',
    metaDescription:
      'Income tax return preparation and filing, TDS and advance tax support, and notice replies for businesses and individuals in Kerala. Talk to us on WhatsApp or call.',
    icon: 'percent',
    whatsappMessage: 'Hi, I need help with income tax.',
    startingFrom: '',
    explanation: [
      {
        heading: 'What we do',
        paragraphs: [
          'We review the income you have actually received across every head — salary, house property, business or profession, capital gains, interest and other sources — work out the tax that applies for the year, and prepare and file the return.',
          'The part most people get wrong is not the arithmetic. It is missing an income stream, forgetting a deduction that applies to them, or not reconciling the tax already deducted at source with what is actually due. We look for those, and we tell you where the numbers do not add up before the return is filed.',
        ],
      },
      {
        heading: 'Beyond the return',
        paragraphs: [
          'A large share of our income tax work is not the return at all. It is the notice: a mismatch between what you declared and what a third party has reported, a query about a transaction, a demand notice, or a mismatch between the tax deducted at source and the credit available. These are common and they are usually resolvable — but they need someone who knows the rules for that assessment year to respond properly.',
          'We also help with advance tax planning so that a large bill in March is not a surprise, and with correcting errors in earlier years where the time to revise has not run out.',
        ],
      },
    ],
    whoNeeds: [
      'A business or professional with income to declare and a return to file.',
      'A salaried person with income from more than one source, or deductions they have not claimed.',
      'Someone who has received an intimation or notice from the tax department.',
      'A business whose tax deducted at source does not match what is reflected in the return.',
      'A new business that wants to understand what it will owe and when.',
    ],
    includes: [
      'A review of income sources, so nothing is missed',
      'Computation of total income and the tax payable',
      'Preparation and filing of the return',
      'Verification and acknowledgement tracking',
      'Refund or response tracking after filing',
      'Reply to notices, intimation queries and demand notices',
      'TDS and TCS reconciliation, and correction of incorrect deduction certificates',
      'Advance tax estimation and planning through the year',
      'Reopening or revising a return where the time limit allows',
    ],
    process: [
      {
        title: 'Collect the facts',
        body: 'Bank statements, salary details, investment proofs, property information, and details of any other income. Most mistakes come from what was never collected.',
      },
      {
        title: 'Reconcile before computing',
        body: 'Salary, interest and TDS figures are matched against the information available with banks and other sources, so the return does not arrive with a surprise already attached.',
      },
      {
        title: 'Compute and review with you',
        body: 'The total income, the tax and the refund or payable amount are explained before anything is filed, in plain language.',
      },
      {
        title: 'File and verify',
        body: 'The return is filed, verified where required, and the acknowledgement is tracked.',
      },
      {
        title: 'Respond, if needed',
        body: 'If a query or notice follows, we respond and keep you informed of the position and the options available.',
      },
    ],
    documents: [
      'PAN card of every person whose income is being declared',
      'Pan and bank statements for the full financial year',
      'Form 16 or salary details from every employer',
      'Details of interest, dividends and other sources of income',
      'Property details, including rent paid or received and any loan',
      'Details of capital gains, including purchase and sale documents',
      'TDS details and any Form 16A',
      'Details of foreign income or foreign assets, if any',
      'Details of agricultural income, if any',
    ],
    caveats: [
      'The tax law changes every year. The rates, slabs, deductions and exemptions that apply are those for the relevant assessment year, and they must be confirmed rather than assumed.',
      'We do not give a figure over the phone before seeing the facts. Tax payable depends on the complete picture, and a number given early is usually a number that has to be corrected.',
      'Late filing and under-reporting carry interest and penalties under the Income Tax Act, and the amount depends on the circumstances.',
      'Working out your tax is not the same as advice on which structure is best for you. Where a genuine planning decision is needed, that is a separate, explicit discussion.',
      'Return preparation is carried out by a qualified professional, and information shared with the tax authorities is done under that professional responsibility.',
    ],
    pricingNote:
      'Get a personalised quotation. Income tax work is usually priced per return and depends on the number of income heads, the complexity of the computation, and whether notices or reassessment are involved. Those are quoted separately.',
    faqs: [
      {
        question: 'What documents do I need for income tax filing?',
        answer:
          'Usually your PAN, bank statements for the full financial year, Form 16 or salary details from every employer, details of interest and dividends, property and loan details, and any capital gains documents with their purchase and sale records. If you have foreign income or agricultural income, that needs to be included too. Send us what you have and we will tell you exactly what is missing.',
      },
      {
        question: 'How much does income tax filing cost?',
        answer:
          'It depends on how many income heads there are and how complex the computation turns out to be. A straightforward salaried return and a business with rental, capital gains and foreign income are very different pieces of work. We review your facts first, then quote, and we keep notice handling or reassessment as a separate line so you know what you are paying for.',
      },
      {
        question: 'I got a notice from the Income Tax Department. What should I do?',
        answer:
          'Do not ignore it, and do not reply to it yourself without reading it properly. A notice asking for clarification is not the same as a demand, and the response window matters. Share it with us and we will explain what it says, what the realistic options are, and what happens if nothing is filed by the due date.',
      },
      {
        question: 'How do I know if I have a refund or have to pay more?',
        answer:
          'That depends on the complete picture for the year: every income head, every deduction that applies to you, and the tax already deducted at source. Most surprises come from a mismatch between what a bank or employer has reported and what was declared. We reconcile those before filing, and we show you the computation, so the number is not a guess.',
      },
      {
        question: 'Do you help with advance tax?',
        answer:
          'Yes. Advance tax is about paying the right amount on the right dates so that a large bill in March is not a shock, and it is far more comfortable when planned through the year. We estimate what is likely to apply, flag the instalment dates, and tell you when a revised estimate is worthwhile.',
      },
    ],
    related: ['accounting-bookkeeping', 'auditing', 'gst-services'],
  },

  // ==========================================================================
  {
    slug: 'auditing',
    name: 'Auditing',
    navLabel: 'Auditing',
    summary:
      'Audit coordination and support for businesses that need a statutory or tax audit, carried out through a practising chartered accountant.',
    metaTitle: 'Audit Services Kerala | Shifra Nuha Technologies',
    metaDescription:
      'Business audit coordination in Kerala, including tax audit support, book audit and financial statement preparation, through a practising chartered accountant.',
    icon: 'clipboard',
    whatsappMessage: 'Hi, I need help with auditing.',
    startingFrom: '',
    explanation: [
      {
        heading: 'When an audit is required',
        paragraphs: [
          'An audit is an independent examination of the financial statements. It is not the same as accounting, and it is not optional where the law requires it.',
          'The most common trigger for a business is the tax audit under the Income Tax Act, which applies where total business turnover or gross receipts exceed the prescribed thresholds, or where turnover exceeds a higher threshold and aggregate transactions exceed a further threshold. The thresholds are set by notification and are revised, so your current numbers have to be checked against the rules for the relevant year rather than against an old figure. Companies and limited liability partnerships also have their own audit requirements under company law, which are separate from the tax audit.',
          'A new business, or one closing down, can also be required to have accounts audited even where no general threshold is crossed.',
        ],
      },
      {
        heading: 'How we help',
        paragraphs: [
          'We prepare and organise the records the auditor needs, answer the queries that come up during the audit, make the adjustments that are agreed, and help prepare the financial statements. A statutory audit report can only be issued by a practising chartered accountant, so that part is carried out by the qualified professional, and we coordinate the work end to end.',
          'The single biggest factor in how smoothly an audit goes is how complete the books are at the end of the year, not how hard people work in February. Businesses that keep their books monthly generally have a considerably easier audit than those that do not, and we would rather tell you that now than after the estimate.',
        ],
      },
    ],
    whoNeeds: [
      'A business whose turnover or gross receipts have crossed the tax audit thresholds.',
      'A company or LLP that is required to have its accounts audited under company law.',
      'A new business that needs a project report or a loan and is asked for audited accounts.',
      'A business that is closing down and needs accounts audited for the final year.',
      'A business whose books need to be brought current before an audit can proceed.',
    ],
    includes: [
      'A preliminary review of whether an audit is required, and which kind',
      'Preparation and organisation of the books and records for the audit',
      'Coordination with the practising chartered accountant who signs the report',
      'Book audit and verification support, including reconciliations and confirmations',
      'Adjustment of entries identified during the audit',
      'Preparation of the financial statements and schedules',
      'Tax audit report coordination where a tax audit is required',
      'Discussion of the findings and what they mean for the business',
    ],
    process: [
      {
        title: 'Establish whether an audit applies',
        body: 'Turnover, gross receipts, transaction volumes and entity type are checked against the rules for the relevant year.',
      },
      {
        title: 'Get the books ready',
        body: 'Records are brought up to date, reconciliations completed and supporting documents collected. This is the part that determines how the rest goes.',
      },
      {
        title: 'Fieldwork and queries',
        body: 'The auditor examines the records, and we respond to queries and gather any further information requested.',
      },
      {
        title: 'Adjustments and finalisation',
        body: 'Agreed adjustments are posted and the financial statements are finalised for reporting.',
      },
      {
        title: 'Report and explain',
        body: 'The report is issued by the chartered accountant, and we explain the findings and any actions you should take.',
      },
    ],
    documents: [
      'Complete books of account for the year, maintained up to date',
      'Bank statements for all bank accounts, for the full year',
      'Sales and purchase registers, and the underlying invoices',
      'Fixed asset register with purchase invoices and depreciation details',
      'Loan agreements and repayment schedules',
      'Inventory or stock statements as at the year end',
      'Payroll records and statutory deductions, if applicable',
      'Details of related parties and any transactions with them',
    ],
    caveats: [
      'A statutory audit report can only be issued by a practising chartered accountant. We coordinate and prepare; the report itself comes from the qualified professional.',
      'Audit thresholds and their interaction with company law requirements are revised by notification, so last year numbers are not a safe guide. Your current numbers have to be checked.',
      'The cost depends on the volume of transactions, the number of locations and branches, the condition of the records, and how much work is needed to bring the books current.',
      'If the books are incomplete, the audit cannot compensate for it. Missing records usually mean more time and higher cost, and that is worth knowing early.',
      'We do not give a fixed audit completion date, because a large part of it depends on how quickly queries are answered and records are produced.',
    ],
    pricingNote:
      'Get a personalised quotation. Audit fees depend on transaction volume, the number of branches, and how much work is needed to bring the books up to date. Fees are quoted by the chartered accountant carrying out the work.',
    faqs: [
      {
        question: 'Do I need an audit?',
        answer:
          'It depends on your entity type, your turnover and gross receipts, and your transaction volumes. Businesses and companies can be required to have accounts audited under both company law and the Income Tax Act, and a new or closing business can be asked for audited accounts by a bank or investor. The thresholds are revised from time to time, so send us your current numbers and we will confirm what applies to you.',
      },
      {
        question: 'Who can sign an audit report?',
        answer:
          'A statutory audit report has to be issued by a practising chartered accountant. We prepare the records, organise the work and explain the outcome; the report itself comes from the qualified professional. We will tell you clearly which parts are being done by our team and which by the auditor.',
      },
      {
        question: 'How much does an audit cost?',
        answer:
          'It depends on the number of transactions, the number of locations, the state of the records, and how much catch-up work is needed before the audit can start. An audit of a business with complete monthly books is a different job from an audit of one where everything is in a pile. We review the records first and then quote, with the professional fee itemised separately from the catch-up work.',
      },
      {
        question: 'How can I make the audit easier?',
        answer:
          'Keep the books current every month rather than in the last month of the year. Reconcile the bank regularly, collect invoices as they come, and maintain a fixed asset register. Businesses that do this generally need fewer queries, less adjustment work and less time from the auditor. If your books are not in that state, that is fixable — we can help bring them current before the audit begins.',
      },
      {
        question: 'Can you help with a tax audit specifically?',
        answer:
          'Yes. A tax audit under the Income Tax Act has its own requirements in addition to the financial statements. We prepare the records, assist with the audit under the Income Tax Act, and coordinate with the chartered accountant who issues the tax audit report.',
      },
    ],
    related: ['accounting-bookkeeping', 'income-tax', 'project-report'],
  },

  // ==========================================================================
  {
    slug: 'project-report',
    name: 'Project Reports',
    navLabel: 'Project Report',
    summary:
      'Bank-ready project reports with financial projections, prepared in the format the lender actually asks for.',
    metaTitle: 'Project Report Preparation Kerala | Shifra Nuha',
    metaDescription:
      'Business project report and CMA data preparation for banks, DICs and institutions in Kerala. Projections, break-even, means of finance and lender-format submission.',
    icon: 'document',
    whatsappMessage: 'Hi, I need help with a project report.',
    startingFrom: '',
    explanation: [
      {
        heading: 'What a project report is for',
        paragraphs: [
          'A project report is the document a bank or financial institution reads before deciding whether to sanction a loan or working capital facility. Its job is to convince a lender that the business is viable, that the numbers are realistic, and that the repayments can be made from the cash the business actually generates.',
          'Because the report is written for a lender, the format matters as much as the content. Banks and institutions have their own templates, and a well-constructed report in the wrong format gets sent back. Ask your lender for their format before we start, and we will build the report into it.',
        ],
      },
      {
        heading: 'What goes into it',
        paragraphs: [
          'The promoter profile and the concept of the business, the market and the competitive picture, the organisation, the operating plan, and the implementation schedule. Then the numbers: the cost of the project, the means of finance, revenue and cost projections, profit and loss, a balance sheet, a cash flow statement, break-even analysis, and debt service coverage.',
          'The projections are built from assumptions, and the assumptions should be visible and defensible. If a number is a guess, it is better to say so and to show what happens if it is wrong. A report that is optimistic in a way the promoter cannot defend is worse than useless in front of a credit committee.',
        ],
      },
    ],
    whoNeeds: [
      'A new business applying for a term loan, working capital or a loan against collateral.',
      'A business expanding into a new unit, branch, equipment line or capacity.',
      'An applicant for a government scheme that requires a project report.',
      'A startup applying for funding that expects a detailed financial model.',
      'A business whose loan proposal was rejected for want of a proper report.',
    ],
    includes: [
      'A discussion of the business concept and the promoter’s experience',
      'Market and competition overview for the proposed activity',
      'Technical and operational plan, including the unit size, capacity and process',
      'Organisation and human resource plan',
      'Implementation schedule, described as a sequence rather than a guaranteed date',
      'Detailed cost of project, split into capital items and working capital',
      'Means of finance: own contribution, term loan, working capital and other sources',
      'Financial projections: revenue, cost of production, profit and loss, balance sheet and cash flow',
      'Break-even analysis and debt service coverage ratio',
      'A lender-ready document in the format your bank asks for',
    ],
    process: [
      {
        title: 'Get the lender format',
        body: 'Ask the bank or institution for its project report template. We build into their format from the start, which is how reports avoid being sent back.',
      },
      {
        title: 'Understand the business',
        body: 'The concept, the promoters, the market, the unit size, the equipment and the funding requirement. Nothing is estimated that can simply be asked.',
      },
      {
        title: 'Build the assumptions',
        body: 'Prices, quantities, costs and salaries are gathered and the assumptions are written down, because the projections are only as credible as these.',
      },
      {
        title: 'Prepare the financials',
        body: 'Cost of project, means of finance, projections, break-even and debt service coverage are prepared and checked for internal consistency.',
      },
      {
        title: 'Write and review',
        body: 'The report is written, and every number is checked to agree with the others — a report that contradicts itself is rejected on that alone.',
      },
      {
        title: 'Submit and support',
        body: 'You receive the report in a format ready to submit, and we are available if the lender asks questions about the numbers.',
      },
    ],
    documents: [
      'A clear description of the business idea and what it sells or does',
      'Details of the promoters or directors, including experience and qualifications',
      'Existing financial statements, if the business is already trading',
      'Bank statements and existing loan details, if applicable',
      'Details of the capital you can bring in yourself',
      'Quotations or estimates for major equipment and capital items',
      'Details of premises — owned, leased or to be taken on rent',
      'Market information: expected prices, quantities and customers',
      'Details of any collateral being offered',
    ],
    caveats: [
      'Projections are assumptions, not promises. A report is a reasoned expectation, and a lender will test it against their own view of the market.',
      'We do not control the sanction decision. A properly prepared report improves the quality of the application; it does not guarantee that a loan is approved.',
      'The report must match the lender format. Sending a good report in the wrong template means starting again, so please share your lender’s template before we begin.',
      'Cost and fees depend on the activity, the size of the project, the level of detail required and the number of scenarios asked for.',
      'Timelines depend on how quickly the required information is available. Incomplete information is the most common cause of delay.',
    ],
    pricingNote:
      'Get a personalised quotation. Project report fees depend on the activity, the size of the project and the depth of the financial modelling required. We will quote after understanding the concept and the lender’s requirement.',
    faqs: [
      {
        question: 'What is a project report?',
        answer:
          'It is the document a bank or financial institution reads before sanctioning a loan. It describes the business, the market, the operating plan, the cost of the project, how it will be financed, and the financial projections — including break-even and debt service coverage. Its purpose is to show the lender that the business is viable and that repayments can be made from real cash flow.',
      },
      {
        question: 'Who prepares a project report?',
        answer:
          'In practice it is prepared with a qualified professional, because the financial projections and the CMA data have to stand up to a credit committee. We prepare the report and coordinate with the chartered accountant. Some lenders and schemes also require the report to be certified, and we will tell you early if that applies to your case.',
      },
      {
        question: 'How much does a project report cost?',
        answer:
          'It depends on the activity, the size of the project and how much financial modelling is required. A simple report on an existing trading business is a smaller piece of work than a report for a new manufacturing unit with three years of projections and a lender-specific format. We understand the requirement first and then quote.',
      },
      {
        question: 'Can you help with a project report for an existing business?',
        answer:
          'Yes, and it is often the more straightforward case, because there is actual trading history to work from rather than assumptions alone. We use your existing financial records, add the expansion or addition being financed, and prepare the projections on top of real data. That tends to be received better than a report based on estimates alone.',
      },
      {
        question: 'How long will the report take?',
        answer:
          'It depends almost entirely on how quickly the information reaches us — quotations, promoter details, premises documents and market inputs. Most of the time in these projects is spent gathering and checking numbers, not writing. We will agree a submission date with you once we have the material, and we will tell you early if something is missing rather than at the end.',
      },
    ],
    related: ['auditing', 'accounting-bookkeeping', 'company-registration'],
  },

  // ==========================================================================
  {
    slug: 'trademark',
    name: 'Trademark',
    navLabel: 'Trademark',
    summary:
      'Trademark search, class selection and filing support, coordinated with the appropriate IP professional.',
    metaTitle: 'Trademark Registration Services Kerala | Shifra Nuha',
    metaDescription:
      'Trademark search, class selection and filing support in Kerala. Word mark and logo registration coordination with an IP professional. Message us on WhatsApp.',
    icon: 'tag',
    whatsappMessage: 'Hi, I am interested in trademark registration.',
    startingFrom: '',
    explanation: [
      {
        heading: 'What a trademark does',
        paragraphs: [
          'A trademark protects the name, logo or other sign that identifies your goods or services. Once registered, it gives you the right to stop others in the same classes from using a confusingly similar mark for the same or similar goods, and it becomes an asset that can be licensed, assigned or sold with the business.',
          'Registration is by class. There are 45 classes, and a business usually needs registration in the classes that match what it actually sells or provides — not all of them. Choosing the wrong classes is expensive to fix later, because a mark that is not registered in a class you trade in does not protect that activity.',
        ],
      },
      {
        heading: 'What we do',
        paragraphs: [
          'We run an availability search on the proposed name and logo, help you pick the classes that match your actual business, prepare the application and coordinate the filing, and follow it through examination, publication and registration.',
          'A trademark application has to be filed by a practitioner authorised to do so. We prepare everything and coordinate with the IP professional who files and appears on the application, and we keep you informed at each stage rather than leaving you to chase.',
        ],
      },
    ],
    whoNeeds: [
      'A new business that wants to protect its name before it becomes widely known.',
      'A brand that is being used and is at risk of being copied or imitated.',
      'A business that is rebranding and wants the new name protected.',
      'A franchise, a chain or a service brand that trades on its name across locations.',
      'A business that is exporting and wants protection in its markets of interest.',
    ],
    includes: [
      'An availability search on the proposed word mark and logo',
      'Advice on which classes match what you actually sell or provide',
      'Preparation of the application, including the description of goods and services',
      'Filing through an authorised trademark practitioner',
      'Follow-up through examination and any query raised',
      'Monitoring of the publication period and advice on any objection or opposition',
      'Guidance on how to use the registered mark and how long protection lasts',
      'Renewal reminders and support for modifications',
    ],
    process: [
      {
        title: 'Search the name',
        body: 'An availability search is run on the proposed mark, and if it is close to an existing mark we tell you before you spend anything on a filing.',
      },
      {
        title: 'Choose the classes',
        body: 'Classes are selected to match the goods and services you actually deal in, so the protection covers the business you run.',
      },
      {
        title: 'Prepare and file the application',
        body: 'The application is prepared, reviewed with you, and filed by the authorised practitioner.',
      },
      {
        title: 'Examination and publication',
        body: 'The application is examined. If accepted, it is published for opposition, during which third parties can object.',
      },
      {
        title: 'Registration',
        body: 'If no objection is raised within the period, the mark proceeds to registration and the certificate is issued.',
      },
      {
        title: 'Use and maintain',
        body: 'We explain how to use the registered mark correctly and when renewal falls due, because a registration can be lost if it is not maintained.',
      },
    ],
    documents: [
      'Name of the applicant, in the exact form it should be registered',
      'Address and nationality of the applicant',
      'A clear image of the logo if the mark is being registered as a device',
      'A description of the goods or services the mark will be used for',
      'Details of the proprietor, partners or directors, depending on the applicant type',
      'Email address and phone number of the applicant',
      'If the mark has already been used, the date from which it has been in use',
    ],
    caveats: [
      'Registration is not automatic. The examiner and the public can both object, and a mark that is identical or confusingly similar to an existing one can be refused.',
      'The Indian law does not permit the use of a ™ or ® symbol before the mark is registered, so please do not use one on your branding in the meantime.',
      'A trademark is registered for specific classes. If your business moves into a class you did not register, that part of the business is not protected.',
      'The application is filed by an authorised practitioner. We prepare and coordinate the work; the filing and representation are theirs.',
      'We do not promise registration or a date. The outcome depends on the search results, the examination and whether anyone objects during publication.',
    ],
    pricingNote:
      'Get a personalised quotation. Trademark cost depends on the number of classes, whether it is a word mark or a logo, and whether objections need to be handled. Government fees for each class are payable separately and change over time.',
    faqs: [
      {
        question: 'How much does trademark registration cost?',
        answer:
          'It depends on the number of classes you register in, whether it is a word mark or a logo, and whether any objection has to be dealt with. Government fees are charged per class and change over time, so they are always shown separately from the professional fee. Send us the name and what your business does, and we will quote for the classes that actually apply to you.',
      },
      {
        question: 'How long does trademark registration take?',
        answer:
          'We do not quote a fixed duration, because the process moves through examination, publication and possible opposition, and the pace varies. What we can tell you is what the stages are and which of them depend on other parties — the publication period in particular can be delayed if someone objects. We will keep you informed at each stage rather than going quiet after filing.',
      },
      {
        question: 'What is a trademark class?',
        answer:
          'Trademarks are registered class by class, and there are 45 classes covering different types of goods and services. Registration only protects the mark in the classes you registered, so choosing the right ones matters. A business usually needs fewer classes than people assume, but exactly the right ones. We look at what you actually sell or provide and recommend accordingly.',
      },
      {
        question: 'Can I use ™ before the trademark is registered?',
        answer:
          'In India, no. The law does not permit the use of a ™ or ® symbol before a mark is registered, so please do not add it to your branding, packaging or website in the meantime. You can describe the name as your business name, but the symbol should wait until the certificate is issued.',
      },
      {
        question: 'Should I register a trademark before I start the business?',
        answer:
          'It is usually worth doing early. A name that becomes well known can be difficult to register later if someone else has already filed it, and the cost of a dispute is far higher than the cost of a search and a filing. We would still suggest starting an availability search before you commit to the name on signage, packaging and your website.',
      },
    ],
    related: ['company-registration', 'llp-registration', 'gst-services'],
  },
]

/**
 * The nine services, with the derived fields every component uses. This array is
 * the single source for the homepage cards, the navbar, the `/services` hub, the
 * route table, the sitemap, the enquiry form options and the landing pages.
 */
export const services: Service[] = serviceSources.map((source) => ({
  ...source,
  path: `/${source.slug}`,
  seo: { title: source.metaTitle, description: source.metaDescription },
  whatsapp: source.whatsappMessage,
}))

/** Slug → service, for routing and internal linking. */
export const serviceBySlug: Record<string, Service> = Object.fromEntries(
  services.map((service) => [service.slug, service]),
)

export const findService = (slug: string): Service | undefined => serviceBySlug[slug]

/** Route path → service, used by the router in `App.tsx`. */
export const serviceByPath: Record<string, Service> = Object.fromEntries(
  services.map((service) => [service.path, service]),
)

/**
 * The enquiry form's "service required" options, in the order the brief lists
 * them. Derived from the services themselves so a new service cannot be added
 * to the site without appearing in the form.
 */
export const serviceOptions: string[] = [...services.map((service) => service.name), 'Other']

/** Business types, used by the enquiry form. */
export const businessTypeOptions: string[] = [
  'Retail / Trading',
  'Restaurant / Food',
  'Clinic / Healthcare',
  'Tuition / Coaching centre',
  'Manufacturing / Small industry',
  'Construction / Contracting',
  'Real estate',
  'Professional services',
  'Agency / Marketing',
  'E-commerce / Online business',
  'Technology / Software',
  'NGO / Trust',
  'Other',
]

/**
 * The nine core services, under the name the components and the brief use.
 * `services` is the data; `coreServices` is the same array, named for what it
 * represents on the site. Both exist so the intent reads at the call site and
 * so the file stays the single source either way.
 */
export type CoreService = Service

export const coreServices: CoreService[] = services

/** Slug to core service. Alias of `serviceBySlug`, for the same reason. */
export const coreServiceBySlug: Record<string, CoreService> = serviceBySlug
