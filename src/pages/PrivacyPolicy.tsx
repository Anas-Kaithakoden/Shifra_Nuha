import { Reveal } from '../components/Reveal'
import { site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

export default function PrivacyPolicy() {
  useDocumentMeta({
    title: `Privacy Policy — ${site.name}`,
    description: `How ${site.name} handles information submitted through this website.`,
    path: '/privacy',
  })

  return (
    <PageShell>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        intro="This page explains what happens to information you send through this website."
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <Reveal>
            <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              <span className="font-semibold">Draft — please review before launch.</span> This is a starting template.
              Replace it with the information that applies to your business, including your registered entity details
              and the service or tool that actually stores enquiry data.
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="space-y-8 text-base leading-relaxed text-ink-600">
              <section>
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">What we collect</h2>
                <p className="mt-3">
                  When you submit an enquiry we collect the details you type into the form: your name, phone or WhatsApp
                  number, email address, business name, business type, what you need and any message you include. We do
                  not ask for sensitive personal information through this website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">Why we collect it</h2>
                <p className="mt-3">
                  We use these details only to respond to your enquiry, understand what you need, and discuss scope,
                  timeline and pricing. We do not sell your details, and we do not use them for unrelated marketing
                  without your agreement.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">How long we keep it</h2>
                <p className="mt-3">
                  Enquiry details are kept only as long as needed to respond and to maintain a record of the business
                  relationship, after which they are deleted.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">Third parties</h2>
                <p className="mt-3">
                  Where a project requires it, work may be carried out by professional partners such as chartered
                  accountants, company secretaries, lawyers or IP professionals. Only the details relevant to that work
                  are shared, and only with your consent.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">Your choices</h2>
                <p className="mt-3">
                  You can ask us to correct or delete the information you have shared with us, or to stop contacting you,
                  at any time.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">Updates</h2>
                <p className="mt-3">
                  This policy may be updated as the website and our tools change. The version on this page is the one
                  that applies.
                </p>
              </section>

              <section className="rounded-xl border border-ink-200 bg-white p-6">
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">Questions</h2>
                <p className="mt-3 text-sm">
                  If you have a question about this policy, use the{' '}
                  <a href="/contact#enquiry" className="font-semibold text-brand-700 hover:text-brand-800">
                    contact form
                  </a>{' '}
                  and we will respond. The contact email address will be published here once confirmed.
                </p>
              </section>
            </div>
          </Reveal>
        </div>
      </div>
    </PageShell>
  )
}
