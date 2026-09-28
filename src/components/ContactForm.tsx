import { useId, useState, type FormEvent } from 'react'
import { businessTypes, contactPage, enquiryNeeds } from '../content/site'
import { submitEnquiry, type Enquiry } from '../lib/enquiry'
import { Button } from './Button'
import { IconCheck } from './icons'

type Errors = Partial<Record<keyof Enquiry, string>>

const inputClass =
  'mt-2 min-h-11 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-base text-ink-900 shadow-xs transition-colors placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/25'

const labelClass = 'block text-sm font-medium text-ink-800'

function validate(values: Enquiry): Errors {
  const errors: Errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.phone.trim()) {
    errors.phone = 'Please enter a phone or WhatsApp number.'
  } else if (values.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address, or leave it blank.'
  }
  if (!values.need) errors.need = 'Please choose what you need.'

  return errors
}

const empty: Enquiry = {
  name: '',
  phone: '',
  email: '',
  businessName: '',
  businessType: '',
  need: '',
  message: '',
}

export function ContactForm() {
  const id = useId()
  const [values, setValues] = useState<Enquiry>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [resultMessage, setResultMessage] = useState('')

  const update = (field: keyof Enquiry) => (event: { target: { value: string } }) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  const field = (key: keyof Enquiry) => `${id}-${key}`
  const errorFor = (key: keyof Enquiry) => errors[key]

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
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-950">Thank you — we have your details.</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{resultMessage}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            onClick={() => {
              setValues(empty)
              setErrors({})
              setResultMessage('')
              setStatus('idle')
            }}
          >
            Send another enquiry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-ink-200 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor={field('name')} className={labelClass}>
            Name <span className="text-ink-400">*</span>
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

        <div className="sm:col-span-1">
          <label htmlFor={field('phone')} className={labelClass}>
            Phone / WhatsApp <span className="text-ink-400">*</span>
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

        <div className="sm:col-span-1">
          <label htmlFor={field('email')} className={labelClass}>
            Email <span className="font-normal text-ink-400">(optional)</span>
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

        <div className="sm:col-span-1">
          <label htmlFor={field('businessName')} className={labelClass}>
            Business name <span className="font-normal text-ink-400">(optional)</span>
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

        <div className="sm:col-span-1">
          <label htmlFor={field('businessType')} className={labelClass}>
            Business type <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <select
            id={field('businessType')}
            name="businessType"
            value={values.businessType}
            onChange={update('businessType')}
            className={`${inputClass} select-field`}
          >
            <option value="">Select a type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor={field('need')} className={labelClass}>
            What do you need? <span className="text-ink-400">*</span>
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
            <option value="">Select an option</option>
            {enquiryNeeds.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
          {errorFor('need') ? (
            <p id={`${field('need')}-error`} className="mt-1.5 text-xs text-red-600">
              {errorFor('need')}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={field('message')} className={labelClass}>
            Message <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <textarea
            id={field('message')}
            name="message"
            rows={5}
            value={values.message}
            onChange={update('message')}
            placeholder="A few lines about your business and what you are trying to solve."
            className={`${inputClass} min-h-32 resize-y`}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-500">{contactPage.formNote}</p>
        <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
        </Button>
      </div>
    </form>
  )
}
