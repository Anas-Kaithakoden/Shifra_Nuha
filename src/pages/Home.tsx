import { Audience } from '../components/Audience'
import { CtaBand } from '../components/CtaBand'
import { Hero } from '../components/Hero'
import { Process } from '../components/Process'
import { Services } from '../components/Services'
import { WhyUs } from '../components/WhyUs'
import { site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'

export default function Home() {
  useDocumentMeta({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    path: '/',
  })

  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Audience />
      <CtaBand />
    </>
  )
}
