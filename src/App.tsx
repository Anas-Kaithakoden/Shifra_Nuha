import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from './components/Analytics'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { StickyCtaBar } from './components/StickyCtaBar'
import { legalDocs } from './content/legal'
import { serviceBySlug } from './content/services'
import { ui } from './content/ui'
import { track } from './lib/tracking'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import { Legal } from './pages/Legal'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { ServicePage } from './pages/ServicePage'
import ServicesPage from './pages/Services'

/**
 * Restores scroll position on navigation, honours in-page hash links such as
 * /contact#enquiry, and reports the page view.
 *
 * Page-view tracking lives here rather than in each page because this is the
 * one place that knows a navigation actually happened. The document title is
 * read after the route has rendered, so the event carries the right title.
 */
function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace(/^#/, ''))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  useEffect(() => {
    // A frame's delay lets each page's useDocumentMeta set the title first.
    const id = window.setTimeout(() => {
      track({ name: 'PageView', path: pathname, title: document.title })
    }, 0)
    return () => window.clearTimeout(id)
  }, [pathname])

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      {ui['nav.skip']}
    </a>
  )
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-paper-50">
      <RouteEffects />

      <Navbar />

      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {Object.values(serviceBySlug).map((service) => (
            <Route key={service.slug} path={service.path} element={<ServicePage service={service} />} />
          ))}
          {/*
            Legal routes are generated from `legalDocs`, so adding one is a
            content change rather than a routing change. `PrivacyPolicy` is the
            same `Legal` component behind a named export, kept because the route
            is the one people have linked to for longest.
          */}
          <Route path={`/${legalDocs.privacy.slug}`} element={<PrivacyPolicy />} />
          <Route path={`/${legalDocs.terms.slug}`} element={<Legal doc={legalDocs.terms} />} />
          <Route path={`/${legalDocs.disclaimer.slug}`} element={<Legal doc={legalDocs.disclaimer} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <StickyCtaBar />
      <Analytics />
    </div>
  )
}
