import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ui, type UiKey } from '../content/ui'
import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
} from './locales'

/**
 * ---------------------------------------------------------------------------
 * LOCALE PROVIDER
 * ---------------------------------------------------------------------------
 * One provider, two functions, and a deliberate limitation:
 *
 *  - `t(key)` resolves a short interface string — button labels, nav, form
 *    labels, section eyebrows. These are the strings a Malayalam-speaking
 *    visitor navigates by, so they are translated.
 *  - `pick(en, ml)` resolves longer copy, which lives next to the content it
 *    belongs to. Passing both by hand means the English original is always
 *    present in the same file as the translation, and there is no way to ship
 *    a key that is missing from the English side.
 *
 * `pick` falls back to English when the Malayalam slot is empty. That is the
 * whole point: partial translation is expected, and pretending otherwise would
 * mean either shipping nothing in Malayalam or shipping something unchecked.
 *
 * The locale is also written to `<html lang>`, which is what screen readers and
 * search engines use, and it is the one place a language change is visible to
 * anything outside React.
 */

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Resolves a chrome string from `content/ui.ts`. */
  t: (key: UiKey) => string
  /** Resolves paired copy, falling back to English. */
  pick: (en: string, ml?: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(stored) ? stored : DEFAULT_LOCALE
  } catch {
    // Private browsing and blocked storage both throw here. English is a fine
    // answer to "we could not remember your language choice".
    return DEFAULT_LOCALE
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[locale]
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      // Not being able to remember the choice is not worth breaking the page
      // over; the toggle still works for the current visit.
    }
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => ui[key]?.[locale] || ui[key]?.en || '',
      pick: (en, ml) => (locale === 'ml' && ml ? ml : en),
    }),
    [locale, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used inside <LocaleProvider>')
  }
  return context
}
