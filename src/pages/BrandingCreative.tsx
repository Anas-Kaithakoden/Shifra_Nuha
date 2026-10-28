import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { WhatsAppButton } from '../components/CtaButtons'
import { brandingSection, site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'
import { digitalIcons } from '../components/iconRegistry'

export default function BrandingCreative() {
  useDocumentMeta({
    title: `Branding & Creative Services | ${site.name}`,
    description: brandingSection.intro,
    path: '/branding-creative',
  })

  return (
    <PageShell>
      <PageIntro eyebrow={brandingSection.eyebrow} title={brandingSection.title} intro={brandingSection.intro}>
        <div className="mt-8">
          <WhatsAppButton place="branding-creative-hero" size="lg" variant="whatsapp" />
        </div>
      </PageIntro>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brandingSection.items.map((item, index) => {
            const Icon = (digitalIcons as any)[item.icon] ?? (digitalIcons as any).branding
            return (
              <Reveal key={item.title} as="article" delay={index * 40} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-paper-200 bg-white p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100 ring-inset">
                    <Icon width={20} height={20} />
                  </span>
                  <h2 className="mt-4 text-lg font-semibold tracking-tight text-ink-950">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                  <ul className="mt-4 space-y-2 text-sm text-ink-700">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <WhatsAppButton
                      place="branding-creative-card"
                      message={item.whatsappMessage}
                      size="md"
                      variant="secondary"
                      className="w-full"
                      label="Enquire on WhatsApp"
                    />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      <CtaBand />
    </PageShell>
  )
}
