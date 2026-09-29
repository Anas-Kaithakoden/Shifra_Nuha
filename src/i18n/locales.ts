/**
 * ---------------------------------------------------------------------------
 * LOCALES
 * ---------------------------------------------------------------------------
 * Two locales only, and English is the first one on purpose.
 *
 * The advertising runs in Malayalam, so `ml` has to exist as a real locale from
 * day one rather than being retrofitted once someone has translated everything.
 * But the site is English-first: the long-form copy (the tax and registration
 * explanations) is deliberately English until a person has checked it, because
 * a confidently wrong Malayalam explanation of a statutory process is worse
 * than an honest English one. The `EN | മലയാളം` toggle therefore switches what
 * has been translated and falls back to English for the rest, and the footer
 * tells the visitor that is what is happening rather than leaving them to guess
 * why half the page changed.
 *
 * Keeping the list this small means adding a language later is a two-line
 * change here plus a checked translation, not a refactor.
 */

export const LOCALES = ['en', 'ml'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

/** Button label. Malayalam is written in the script, not transliterated. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
  ml: 'മലയാളം',
}

/** Full name, for the button `title` and the sr-only label. */
export const LOCALE_NAME: Record<Locale, string> = {
  en: 'English',
  ml: 'മലയാളം (Malayalam)',
}

/** BCP 47 tag, for the `lang` attribute on the `<html>` element. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: 'en-IN',
  ml: 'ml-IN',
}

/**
 * Read once on load, then kept in localStorage. A visitor who switches to
 * Malayalam should not have to do it again on the next page they open, and
 * the choice is on their own device so it needs no cookie.
 */
export const LOCALE_STORAGE_KEY = 'shifranuha.locale'
