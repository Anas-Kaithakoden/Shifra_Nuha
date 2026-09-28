export type Enquiry = {
  name: string
  phone: string
  email: string
  businessName: string
  businessType: string
  need: string
  message: string
}

export type SubmitResult = {
  ok: boolean
  /** Message shown to the visitor after submitting. */
  message: string
}

/**
 * ---------------------------------------------------------------------------
 * Enquiry submission — PLACEHOLDER
 * ---------------------------------------------------------------------------
 * No backend or form service has been connected yet, so nothing is actually
 * sent or stored. When one is available, replace the body of this function
 * with a `fetch` call and the form will work without any other changes.
 *
 *   const res = await fetch(ENDPOINT, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(data),
 *   })
 *
 * Options: a hosted form service, your own API route, a CRM/automation webhook
 * (Make / n8n / Zapier), or a Google Apps Script endpoint.
 */
export async function submitEnquiry(data: Enquiry): Promise<SubmitResult> {
  // Visible in the browser console while the site is in preview.
  console.info('[enquiry] not connected to a backend yet — payload:', data)

  return {
    ok: true,
    message:
      'The form is working, but it is not connected to an email or CRM service yet, so nothing has been sent. Please use the contact details on this page, or email us directly.',
  }
}
