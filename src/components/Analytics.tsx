import { useEffect } from 'react'
import { CONFIG } from '../config/site.config'

/**
 * ---------------------------------------------------------------------------
 * ANALYTICS LOADER
 * ---------------------------------------------------------------------------
 * Loads Meta Pixel and Google Analytics 4, and only when an ID has actually
 * been configured. While the IDs are blank this component renders nothing, the
 * snippets are never appended to the document, and no request is made to any
 * third party — which is the point of leaving them blank until the company
 * supplies them.
 *
 * The snippets are injected from JavaScript rather than pasted into
 * `index.html`, because `index.html` cannot read `VITE_*` variables. The result
 * is one `useEffect` and no duplication between the two platforms.
 *
 * `send_page_view: false` on GA4 is deliberate: a single-page app navigates
 * without reloading, so page views are sent from the router in `App.tsx` rather
 * than twice.
 */

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
}

function loadScript(src: string, id: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

export function Analytics() {
  useEffect(() => {
    const win = window as AnalyticsWindow
    const metaId = CONFIG.META_PIXEL_ID
    const gaId = CONFIG.GOOGLE_ANALYTICS_ID

    // --- Meta Pixel --------------------------------------------------------
    if (metaId) {
      if (!win.fbq) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        ;(function fbp(w: any, d: Document, s: string) {
          if (w.fbq) return
          const n: any = (w.fbq = function () {
            // The stub records its arguments on a queue; the real script drains it.
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
          })
          if (!w._fbq) w._fbq = n
          n.push = n
          n.loaded = true
          n.version = '2.0'
          n.queue = []
          const t = d.createElement('script')
          t.async = true
          t.src = s
          const first = d.getElementsByTagName('script')[0]
          first.parentNode?.insertBefore(t, first)
        })(window, document, 'https://connect.facebook.net/en_US/fbevents.js')
        /* eslint-enable @typescript-eslint/no-explicit-any */
      }
      win.fbq?.('init', metaId)
      // The router sends page views, so the pixel's own automatic one is off.
      win.fbq?.('trackCustom', 'PageLoad')
    }

    // --- Google Analytics 4 -----------------------------------------------
    if (gaId) {
      win.dataLayer = win.dataLayer || []
      if (!win.gtag) {
        const gtag = (...args: unknown[]) => {
          win.dataLayer?.push(args)
        }
        win.gtag = gtag
      }
      win.gtag('js', new Date())
      win.gtag('config', gaId, { send_page_view: false })
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, 'ga4-script')
    }
  }, [])

  return null
}
