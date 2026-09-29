import { useId, useState, type FormEvent } from 'react'
import { businessTypeOptions, serviceOptions } from '../content/services'
import { onFormSubmit } from '../lib/contactLinks'
import { submitEnquiry, type Enquiry } from '../lib/enquiry'
import { useLocale } from '../i18n/LocaleProvider'
import { Button } from './Button'
import { IconCheck } from './icons'

type Errors = Partial<Record<keyof Enquiry, string>>

const inputClass =
  'mt-2 min-h-11 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-base text-ink-900 shadow-xs transition-colors placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/25'

const labelClass = 'block text-sm font-medium text-ink-800'

/**
 * ---------------------------------------------------------------------------
 * CONTACT FORM — the secondary CTA
 * ---------------------------------------------------------------------------
 * Deliberately short, and deliberately second. Most people who are ready will
 * message on WhatsApp or call, which is faster for them and cheaper for us. This
 * exists for the people who would rather not start a conversation yet, and it
 * captures enough to route the enquiry without asking for anything they do not
 * need to give.
 *
 * Three fields are required — name, phone and service. Everything else is
 * optional, and the optional ones say so.
 *
 * The service dropdown is generated from the services themselves, so a new
 * service cannot be added to the site without appearing here.
 */
/**
 * `defaultService` is passed by the service landing pages, so a visitor who has
 * already chosen GST and only then filled in the form does not choose it twice.
 */
export function ContactForm({ defaultService = '' }: { defaultService?: string }) {
  const id = useId()
  const { t } = useLocale()
  const [values, setValues] = useState<Enquiry>({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    businessType: '',
    need: defaultService,
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [resultMessage, setResultMessage] = useState('')

  const field = (key: keyof Enquiry) => `${id}-${String(key)}`
  const errorFor = (key: keyof Enquiry) => errors[key]

  const validate = (input: Enquiry): Errors => {
    const found: Errors = {}

    if (!input.name.trim()) found.name = t('form.err.name')
    if (!input.phone.trim()) {
      found.phone = t('form.err.phone')
    } else if (input.phone.replace(/\D/g, '').length < 10) {
      found.phone = t('form.err.phoneInvalid')
    }
    if (input.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email.trim())) {
      found.email = t('form.err.email')
    }
    if (!input.need) found.need = t('form.err.service')

    return found
  }

  const update = (key: keyof Enquiry) => (event: { target: { value: string } }) => {
    setValues((previous: Enquiry) => ({ ...previous, [key]: event.target.value }))
    setErrors((previous: Errors) => ({ ...previous, [key]: undefined }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0]
      document.getElementById(field(firstKey as keyof Enquiry))?.focus()
      return
    }

    setStatus('sending')
    const result = await submitEnquiry(values)
    setResultMessage(result.message)
    setStatus('done')
    onFormSubmit(values.need)()
  }

  if (status === 'done') {
    return (
      <div
        className="rounded-xl border border-ink-200 bg-white p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 ring-inset">
          <IconCheck />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-950">{t('form.sent')}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{resultMessage}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-500">{t('form.fasterCta')}</p>
        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={() => {
              setValues({
                name: '',
                phone: '',
                email: '',
                businessName: '',
                businessType: '',
                need: defaultService,
                message: '',
              })
              setErrors({})
              setResultMessage('')
              setStatus('idle')
            }}
          >
            {t('form.again')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-ink-200 bg-white p-6 text-left sm:p-8"
    >
      {/* Opts out of the justified body copy set in `index.css`. Browsers align
          text inside inputs themselves and do not inherit `text-align` from the
          document, so a justified label over a left-aligned field would look
          broken rather than deliberate. */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={field('name')} className={labelClass}>
            {t('form.name')} <span className="text-ink-400">*</span>
          </label>
          <input
            id={field('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errorFor('name'))}
            aria-describedby={errorFor('name') ? `${field('name')}-error` : undefined}
            placeholder="Your full name"
            className={inputClass}
          />
          {errorFor('name') ? (
            <p id={`${field('name')}-error`} className="mt-1.5 text-xs text-red-600">
              {errorFor('name')}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={field('phone')} className={labelClass}>
            {t('form.phone')} <span className="text-ink-400">*</span>
          </label>
          <input
            id={field('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={Boolean(errorFor('phone'))}
            aria-describedby={errorFor('phone') ? `${field('phone')}-error` : undefined}
            placeholder="+91"
            className={inputClass}
          />
          {errorFor('phone') ? (
            <p id={`${field('phone')}-error`} className="mt-1.5 text-xs text-red-600">
              {errorFor('phone')}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={field('need')} className={labelClass}>
            {t('form.service')} <span className="text-ink-400">*</span>
          </label>
          <select
            id={field('need')}
            name="need"
            required
            value={values.need}
            onChange={update('need')}
            aria-invalid={Boolean(errorFor('need'))}
            aria-describedby={errorFor('need') ? `${field('need')}-error` : undefined}
            className={`${inputClass} select-field`}
          >
            <option value="">{t('form.selectService')}</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errorFor('need') ? (
            <p id={`${field('need')}-error`} className="mt-1.5 text-xs text-red-600">
              {errorFor('need')}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={field('email')} className={labelClass}>
            {t('form.emailOptional')}
          </label>
          <input
            id={field('email')}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errorFor('email'))}
            aria-describedby={errorFor('email') ? `${field('email')}-error` : undefined}
            placeholder="you@business.com"
            className={inputClass}
          />
          {errorFor('email') ? (
            <p id={`${field('email')}-error`} className="mt-1.5 text-xs text-red-600">
              {errorFor('email')}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={field('businessName')} className={labelClass}>
            {t('form.businessNameOptional')}
          </label>
          <input
            id={field('businessName')}
            name="businessName"
            type="text"
            autoComplete="organization"
            value={values.businessName}
            onChange={update('businessName')}
            placeholder="Your business"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={field('businessType')} className={labelClass}>
            {t('form.businessTypeOptional')}
          </label>
          <select
            id={field('businessType')}
            name="businessType"
            value={values.businessType}
            onChange={update('businessType')}
            className={`${inputClass} select-field`}
          >
            <option value="">{t('form.selectType')}</option>
            {businessTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={field('message')} className={labelClass}>
            {t('form.messageOptional')}
          </label>
          <textarea
            id={field('message')}
            name="message"
            rows={4}
            value={values.message}
            onChange={update('message')}
            placeholder="A few lines about your business and what you are trying to do."
            className={`${inputClass} min-h-28 resize-y`}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-500">{t('form.note')}</p>
        <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
          {status === 'sending' ? t('form.sending') : t('form.submit')}
        </Button>
      </div>
    </form>
  )
}
