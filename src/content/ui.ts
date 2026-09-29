/**
 * ---------------------------------------------------------------------------
 * INTERFACE STRINGS
 * ---------------------------------------------------------------------------
 * The short chrome of the site: button labels, navigation, form labels, error
 * messages. They live in one file, keyed by purpose, and are read through
 * `useLocale().t()` so the `EN | മലയാളം` toggle actually changes the things a
 * visitor needs in order to act.
 *
 * These are deliberately separate from `content/site.ts` and `content/services.ts`,
 * which hold the long-form copy. The split is deliberate:
 *
 *  - Interface strings are short, high-traffic and safe to translate, because
 *    mistranslating "Send enquiry" is obvious and harmless.
 *  - Explanations of statutory and tax processes are long and are only
 *    translated once a person has checked them. Those live beside the content
 *    they describe, as `{ en, ml }` pairs, and are read through `pick()`.
 *
 * Every entry has both locales filled in. A key with only English would be a
 * silently half-translated interface, which is worse than an honest fallback.
 */

export const ui = {
  // --- Calls to action ------------------------------------------------------
  'cta.primary': {
    en: 'Message us on WhatsApp',
    ml: 'WhatsApp-ൽ ഞങ്ങളെ സന്ദേശം ചെയ്യൂ',
  },
  'cta.whatsapp': {
    en: 'Chat on WhatsApp',
    ml: 'WhatsApp-ൽ ചാറ്റ് ചെയ്യൂ',
  },
  'cta.call': {
    en: 'Call now',
    ml: 'ഇപ്പോൾ വിളിക്കുക',
  },
  'cta.enquiry': {
    en: 'Send an enquiry',
    ml: 'എൻക്വയറി അയയ്ക്കുക',
  },
  'cta.viewServices': {
    en: 'See all services',
    ml: 'എല്ലാ സേവനങ്ങളും കാണുക',
  },
  'cta.learnMore': {
    en: 'Learn more',
    ml: 'കൂടുതൽ വിവരങ്ങൾ',
  },
  'cta.notSure': {
    en: 'Not sure which of these applies to you? Message us on WhatsApp and describe your business in a few lines. We will tell you what is actually needed, and which parts you can safely leave for later.',
    ml: 'ഇവയിലെന്താണ് നിങ്ങൾക്ക് ബാധിക്കുന്നത് എന്ന് സംശയമുണ്ടോ? WhatsApp-ൽ ഞങ്ങളെ സന്ദേശം ചെയ്ത് കുറച്ച് വരികളിലെ നിങ്ങളുടെ ബിസിനസ് വിവരിക്കൂ. യഥാർത്ഥത്തിൽ എന്തുകൊണ്ട് ആവശ്യമാണെന്ന് ഞങ്ങൾ പറയും, ഏതുപടി പിന്നീട് വേണ്ടതും ചേർത്തു പറയും.',
  },

  // --- Navigation ----------------------------------------------------------
  'nav.primary': {
    en: 'Primary navigation',
    ml: 'പ്രധാന നാവിഗേഷൻ',
  },
  'nav.servicesList': {
    en: 'All services',
    ml: 'എല്ലാ സേവനങ്ങളും',
  },
  'nav.toggleServices': {
    en: 'Show or hide the service list',
    ml: 'സേവനങ്ങളുടെ പട്ടിക കാണിക്കുക അല്ലെങ്കിൽ മറയ്ക്കുക',
  },
  'nav.openMenu': {
    en: 'Open menu',
    ml: 'മെനു തുറക്കുക',
  },
  'nav.closeMenu': {
    en: 'Close menu',
    ml: 'മെനു അടയ്ക്കുക',
  },
  'nav.contact': {
    en: 'Contact',
    ml: 'ബന്ധപ്പെടുക',
  },
  'nav.skip': {
    en: 'Skip to content',
    ml: 'ഉള്ളടക്കത്തിലേക്ക് പോകുക',
  },

  // --- Language ------------------------------------------------------------
  'lang.label': {
    en: 'Language',
    ml: 'ഭാഷ',
  },
  'lang.switchTo': {
    en: 'Switch to Malayalam',
    ml: 'മലയാളത്തിലേക്ക് മാറ്റുക',
  },
  'lang.switchToEn': {
    en: 'Switch to English',
    ml: 'ഇംഗ്ലീഷിലേക്ക് മാറ്റുക',
  },
  'lang.note': {
    en: 'Malayalam content is still being added. Where a page has not been translated yet, the English text is shown instead — nothing is machine-guessed.',
    ml: 'മലയാളം ഉള്ളടക്കം ഇപ്പോഴും ചേർക്കുന്നതിനിടയിലാണ്. പരിഭാഷപ്പെടുത്തിയിട്ടില്ലാത്ത പേജുകളിൽ ഇംഗ്ലീഷ് ഉള്ളടക്കമാണ് കാണിക്കുക — ഒരുപാട് പറയുന്നതില്ല.',
  },

  // --- Enquiry form --------------------------------------------------------
  'form.name': {
    en: 'Full name',
    ml: 'പൂർണ്ണനാമം',
  },
  'form.phone': {
    en: 'Phone / WhatsApp number',
    ml: 'ഫോൺ / WhatsApp നമ്പർ',
  },
  'form.service': {
    en: 'What do you need?',
    ml: 'നിങ്ങൾക്ക് എന്താണ് വേണ്ടത്?',
  },
  'form.emailOptional': {
    en: 'Email (optional)',
    ml: 'ഇമെയിൽ (ഐച്ഛികം)',
  },
  'form.businessNameOptional': {
    en: 'Business name (optional)',
    ml: 'ബിസിനസ്സിന്റെ പേര് (ഐച്ഛികം)',
  },
  'form.businessTypeOptional': {
    en: 'Type of business (optional)',
    ml: 'ബിസിനസ്സിന്റെ തരം (ഐച്ഛികം)',
  },
  'form.messageOptional': {
    en: 'Tell us what you need (optional)',
    ml: 'എന്താണ് വേണ്ടതെന്ന് പറയൂ (ഐച്ഛികം)',
  },
  'form.selectService': {
    en: 'Select a service',
    ml: 'ഒരു സേവനം തിരഞ്ഞെടുക്കുക',
  },
  'form.selectType': {
    en: 'Select a type',
    ml: 'ഒരു തരം തിരഞ്ഞെടുക്കുക',
  },
  'form.submit': {
    en: 'Send enquiry',
    ml: 'എൻക്വയറി അയയ്ക്കുക',
  },
  'form.sending': {
    en: 'Sending…',
    ml: 'അയയ്ക്കുന്നു…',
  },
  'form.sent': {
    en: 'Thank you — your enquiry has been sent',
    ml: 'നന്ദി — നിങ്ങളുടെ എൻക്വയറി അയച്ചു',
  },
  'form.again': {
    en: 'Send another enquiry',
    ml: 'മറ്റൊരു എൻക്വയറി അയയ്ക്കുക',
  },
  'form.fasterCta': {
    en: 'Faster if you need an answer now: message us on WhatsApp or call. Most people are answered quicker that way, and it saves you typing everything out again.',
    ml: 'ഇപ്പോൾ ഉത്തരം വേണമെങ്കിൽ വേഗത്തിലാണ്: WhatsApp-ൽ സന്ദേശം ചെയ്യൂ അല്ലെങ്കിൽ വിളിക്കൂ. അതാണ് കൂടുതൽ പെട്ടെന്ന് പ്രതികരണം ലഭിക്കുന്നത്.',
  },
  'form.note': {
    en: 'We use these details only to reply to your enquiry. We do not add you to a mailing list.',
    ml: 'നിങ്ങളുടെ എൻക്വയറിയിലേക്ക് പ്രതികരിക്കാൻ മാത്രമാണ് ഈ വിവരങ്ങൾ ഉപയോഗിക്കുന്നത്. ഞങ്ങൾ നിങ്ങളെ മെയിൽ ചെയ്യറ്റിലെന്നില്ല.',
  },

  // --- Enquiry form validation --------------------------------------------
  'form.err.name': {
    en: 'Please tell us your name.',
    ml: 'നിങ്ങളുടെ പേര് പറയൂ.',
  },
  'form.err.phone': {
    en: 'Please enter a phone or WhatsApp number we can reply to.',
    ml: 'ഞങ്ങൾക്ക് പ്രതികരിക്കാവുന്ന ഫോൺ അല്ലെങ്കിൽ WhatsApp നമ്പർ നൽകൂ.',
  },
  'form.err.phoneInvalid': {
    en: 'That number looks too short. Please include the area or country code.',
    ml: 'ആ നമ്പർ വളരെ ചുരുക്കം ആണ്. ഏരിയ കോഡോ രാജ്യ കോഡോ ഉൾപ്പെടുത്തിയിട്ടുണ്ടോ എന്ന് പരിശോധിക്കൂ.',
  },
  'form.err.email': {
    en: 'That email address does not look right. Leave it blank if you prefer.',
    ml: 'ആ ഇമെയിൽ വിലാസം ശരിയല്ല. ആവശ്യമില്ലെങ്കിൽ വിടിച്ച് വെച്ചേരിക്കൂ.',
  },
  'form.err.service': {
    en: 'Please choose what you need, or pick Other and tell us in the message.',
    ml: 'നിങ്ങൾക്ക് എന്താണ് വേണ്ടതെന്ന് തിരഞ്ഞെടുക്കൂ, അല്ലെങ്കിൽ Other തിരഞ്ഞെടുത്ത് സന്ദേശത്തിൽ പറയൂ.',
  },

  // --- Placeholders --------------------------------------------------------
  'placeholder.contact': {
    en: 'Our phone number, WhatsApp number and email address have not been published on this site yet. Use the enquiry form — we read those and we reply.',
    ml: 'ഈ വെബ്‌സൈറ്റിൽ ഞങ്ങളുടെ ഫോൺ നമ്പർ, WhatsApp നമ്പർ, ഇമെയിൽ വിലാസം ഇതുവരെ പ്രസിദ്ധീകരിച്ചിട്ടില്ല. എൻക്വയറി ഫോം ഉപയോഗിക്കൂ — അത് ഞങ്ങൾ വായിക്കുകയും പ്രതികരിക്കുകയും ചെയ്യും.',
  },
  'placeholder.ctaFallback': {
    en: 'Opens the enquiry form until this number is added.',
    ml: 'ഈ നമ്പർ ചേർക്കുന്നതുവരെ എൻക്വയറി ഫോം തുറക്കും.',
  },

  // --- Section headings used on inner pages --------------------------------
  'section.whoNeeds': {
    en: 'Who needs this',
    ml: 'ആരാണ് ഇതിന് ആവശ്യമാകുക',
  },
  'section.includes': {
    en: 'What the service includes',
    ml: 'സേവനത്തിൽ ഉൾപ്പെടുന്നത്',
  },
  'section.process': {
    en: 'How the work is done',
    ml: 'ജോലി എങ്ങനെ ചെയ്യുന്നു',
  },
  'section.documents': {
    en: 'Documents and information you will need',
    ml: 'വേണ്ടിയ രേഖകളും വിവരങ്ങളും',
  },
  'section.caveats': {
    en: 'Important to know before you start',
    ml: 'തുടങ്ങുന്നതിനു മുമ്പ് അറിഞ്ഞിരിക്കുക',
  },
  'section.related': {
    en: 'Related services',
    ml: 'ബന്ധപ്പെട്ട സേവനങ്ങൾ',
  },
  'section.faq': {
    en: 'Questions people ask',
    ml: 'സമൂഹം ചോദിക്കുന്ന ചോദ്യങ്ങൾ',
  },
  'section.form': {
    en: 'Send an enquiry',
    ml: 'എൻക്വയറി അയയ്ക്കുക',
  },
  'section.direct': {
    en: 'Direct contact',
    ml: 'നേരിട്ടുള്ള ബന്ധപ്പെടുക',
  },
  'section.whatsapp': {
    en: 'WhatsApp',
    ml: 'WhatsApp',
  },
  'section.phone': {
    en: 'Phone',
    ml: 'ഫോൺ',
  },
  'section.email': {
    en: 'Email',
    ml: 'ഇമെയിൽ',
  },
  'section.hours': {
    en: 'Working hours',
    ml: 'പ്രവൃത്തി സമയം',
  },
  'section.address': {
    en: 'Address',
    ml: 'വിലാസം',
  },
  'section.area': {
    en: 'Where we work',
    ml: 'ഞങ്ങൾ പ്രവർത്തിക്കുന്ന സ്ഥലം',
  },
  'section.next': {
    en: 'What happens after you get in touch',
    ml: 'നിങ്ങൾ ബന്ധപ്പെട്ടതിനു ശേഷം എന്ത് സംഭവിക്കും',
  },

  // --- Legal pages ---------------------------------------------------------
  'legal.draft': {
    en: 'Draft — please review before launch.',
    ml: 'ഡ്രാഫ്റ്റ് — തുടങ്ങുന്നതിനു മുമ്പ് പരിശോധിക്കൂ.',
  },
  'legal.draftBody': {
    en: 'This is a starting template. Replace it with the information that applies to your business, including your registered entity details and whichever service actually stores enquiry data.',
    ml: 'ഇത് ഒരു തുടക്കക്കുള്ള ടെംപ്ലേറ്റാണ്. നിങ്ങളുടെ ബിസിനസിന് ബാധിക്കുന്ന വിവരങ്ങളാണ് ഇതിന് പകരം വേണ്ടത് — രജിസ്റ്റർഡ് എന്റിറ്റിയുടെ വിവരങ്ങളും എൻക്വയറി ഡാറ്റ സംഭരിക്കുന്ന സേവനവും ഉൾപ്പെടുത്തിയിട്ടുണ്ടായിരിക്കണം.',
  },
} as const

export type UiKey = keyof typeof ui
