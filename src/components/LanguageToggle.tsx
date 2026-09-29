import { LOCALES, LOCALE_NAME, LOCALE_SHORT, type Locale } from '../i18n/locales'
import { useLocale } from '../i18n/LocaleProvider'

/**
 * ---------------------------------------------------------------------------
 * EN | മലയാളം
 * ---------------------------------------------------------------------------
 * The advertising runs in Malayalam, so the toggle is present from day one
 * rather than being retrofitted later. The site stays English-first: switching
 * to Malayalam shows the strings that have been translated and falls back to
 * English for the rest, which is stated to the visitor instead of leaving them
 * guessing why part of the page changed and part of it did not.
 *
 * It is a group of buttons, not links, because switching language changes the
 * page in place rather than navigating to a different URL.
 */
export function LanguageToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { locale, setLocale, t } = useLocale()
  const dark = tone === 'dark'

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={`inline-flex items-center rounded-lg p-0.5 ring-1 ${
        dark ? 'bg-white/10 ring-white/20' : 'bg-ink-50 ring-ink-200'
      }`}
    >
      {LOCALES.map((code: Locale) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            lang={code === 'ml' ? 'ml-IN' : 'en-IN'}
            title={LOCALE_NAME[code]}
            className={`inline-flex min-h-9 items-center rounded-[7px] px-2.5 text-xs font-semibold transition-colors ${
              active
                ? dark
                  ? 'bg-white text-ink-950'
                  : 'bg-ink-950 text-white'
                : dark
                  ? 'text-ink-200 hover:bg-white/10'
                  : 'text-ink-600 hover:bg-white hover:text-ink-900'
            }`}
          >
            <span aria-hidden="true">{LOCALE_SHORT[code]}</span>
            <span className="sr-only">
              {code === 'ml' ? t('lang.switchTo') : t('lang.switchToEn')}
            </span>
          </button>
        )
      })}
    </div>
  )
}
