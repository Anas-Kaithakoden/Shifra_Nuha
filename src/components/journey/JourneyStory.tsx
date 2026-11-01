import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { journeySection, journeyStages, type JourneyStage } from '../../content/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { onWhatsappClick, whatsappLink } from '../../lib/contactLinks'
import { gsap, useGSAP } from '../../lib/gsap'
import { IconArrowRight, IconWhatsApp } from '../icons'
import { Reveal } from '../Reveal'
import { journeyVisuals } from './JourneyVisuals'

/**
 * ---------------------------------------------------------------------------
 * THE IDEA TO LAUNCH JOURNEY
 * ---------------------------------------------------------------------------
 * The centre of the page. On a desktop the stage panel is pinned by GSAP
 * ScrollTrigger while the visitor moves through four stages: register, comply,
 * go digital, brand. The left copy changes under the control of the scrub
 * timeline, the right-hand document assembles, and a hairline progress rail
 * keeps the visitor oriented.
 *
 * WHY ONE TIMELINE. A single scrubbed timeline means every stage has a precise
 * position, the progress rail is its duration, and scrolling backwards runs the
 * story backwards. React state changes only at the four stage boundaries, never
 * on scroll frames; the animation itself is entirely transforms and opacity.
 *
 * WHAT HAPPENS ON A PHONE. The pinned experience is switched off completely and
 * the same four stages are rendered as ordinary stacked sections. Nothing is
 * hidden, no ScrollTrigger is created, and the visuals are the fully assembled
 * versions. That is also the fallback for `prefers-reduced-motion`.
 *
 * No content depends on JavaScript to exist: all four stage panels and every
 * service link are in the markup at first paint.
 */
export function JourneyStory() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="scroll-mt-20 bg-ink-950 text-paper-100"
    >
      <JourneyHeader />

      {reducedMotion ? (
        <JourneyStatic />
      ) : (
        <>
          <div className="hidden lg:block">
            <JourneyPinned />
          </div>
          <div className="lg:hidden">
            <JourneyStatic />
          </div>
        </>
      )}
    </section>
  )
}

function JourneyHeader() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-20 pb-14 sm:px-8 sm:pt-24 sm:pb-16 lg:pt-28">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-brand-400" />
            <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-300 uppercase">
              {journeySection.eyebrow}
            </p>
          </div>
          <h2
            id="journey-heading"
            className="mt-5 max-w-xl font-display text-[clamp(2.15rem,4.1vw,3.7rem)] leading-[1.02] font-normal tracking-[-0.025em] text-paper-50"
          >
            {journeySection.title}
          </h2>
        </div>

        <div className="max-w-xl lg:justify-self-end">
          <p className="text-base leading-relaxed text-pretty text-paper-100/70 sm:text-lg">
            {journeySection.intro}
          </p>
          <p className="mt-6 hidden items-center gap-3 text-[10px] font-semibold tracking-[0.18em] text-paper-100/40 uppercase lg:flex">
            <span aria-hidden="true" className="h-px w-8 bg-white/20" />
            Scroll through four stages
          </p>
        </div>
      </div>
    </div>
  )
}

/** One stage's copy. Used by the pinned panel and by the stacked fallback. */
function StageCopy({
  stage,
  place,
}: {
  stage: JourneyStage
  place: string
}) {
  const whatsapp = whatsappLink(stage.whatsappMessage)

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center gap-3">
        <span className="font-display text-sm leading-none text-brand-300 tabular-nums">
          {stage.number}
        </span>
        <span aria-hidden="true" className="h-px w-7 bg-white/20" />
        <span className="text-[10px] font-semibold tracking-[0.2em] text-paper-100/55 uppercase">
          {stage.label}
        </span>
      </div>

      <h3 className="mt-5 max-w-lg font-display text-[clamp(1.9rem,2.8vw,2.85rem)] leading-[1.05] font-normal tracking-[-0.025em] text-paper-50">
        {stage.headline}
      </h3>

      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-pretty text-paper-100/70">
        {stage.description}
      </p>

      <ul className="mt-6 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {stage.services.map((service) => (
          <li key={service.label}>
            {service.to ? (
              <Link
                to={service.to}
                className="group inline-flex min-h-8 items-center gap-1.5 text-[13px] text-paper-100/80 transition-colors hover:text-white"
              >
                <span aria-hidden="true" className="h-px w-2.5 bg-brand-400/70" />
                <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-brand-300">
                  {service.label}
                </span>
              </Link>
            ) : (
              <span className="inline-flex min-h-8 items-center gap-1.5 text-[13px] text-paper-100/80">
                <span aria-hidden="true" className="h-px w-2.5 bg-brand-400/70" />
                {service.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      <a
        href={whatsapp.href}
        {...(whatsapp.ready ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        onClick={onWhatsappClick(place, stage.whatsappMessage)}
        title={whatsapp.ready ? undefined : 'Opens the contact page until this number is added.'}
        className="group mt-7 inline-flex min-h-12 w-fit items-center gap-2.5 border border-white/25 px-4 text-[13px] font-semibold text-paper-50 transition-colors hover:border-brand-300 hover:bg-white/5 focus-visible:outline-brand-300"
      >
        <IconWhatsApp width={16} height={16} className="shrink-0 text-brand-300" />
        {stage.ctaLabel}
        <IconArrowRight
          width={15}
          height={15}
          className="shrink-0 text-brand-300 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  )
}

function StageVisual({ stage }: { stage: JourneyStage }) {
  const Visual = journeyVisuals[stage.id as keyof typeof journeyVisuals]

  return (
    <div className="relative h-full w-full border border-white/10 bg-white/[0.025] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
        <span className="text-[9px] font-semibold tracking-[0.16em] text-paper-100/45 uppercase">
          {stage.label} / Working file
        </span>
        <span className="text-[9px] font-semibold tracking-[0.14em] text-paper-100/35 uppercase tabular-nums">
          {stage.number} of 04
        </span>
      </div>
      <div className="mt-4 h-[calc(100%-2.15rem)]">
        <Visual />
      </div>
    </div>
  )
}

/** The desktop, scroll-driven panel. Only mounted above the `lg` breakpoint. */
function JourneyPinned() {
  const root = useRef<HTMLDivElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      if (!pin.current || !root.current) return

      const panels = gsap.utils.toArray<HTMLElement>('[data-stage-panel]', root.current)
      const visuals = gsap.utils.toArray<HTMLElement>('[data-stage-visual]', root.current)
      const partSelector = '[data-j-part], [data-j-task], [data-j-brand], [data-j-cal-day]'

      /**
       * Some parts exist in only one of the four documents (the registration
       * stamp, the rule under a heading), so a selector can legitimately return
       * nothing. Handing GSAP an empty NodeList produces a console warning for
       * a target that does not exist, so each lookup returns `null` instead and
       * the timeline simply skips that piece.
       */
      const find = (parent: HTMLElement, selector: string) => {
        const found = parent.querySelectorAll(selector)
        return found.length ? found : null
      }

      // Panels after the first start off-screen. The first panel is readable
      // immediately so a visitor who stops on the section still has the story.
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 16 })
      gsap.set(visuals.slice(1), { autoAlpha: 0 })

      // Hide the internals of the stages that are not shown yet.
      visuals.slice(1).forEach((visual) => {
        const parts = find(visual, partSelector)
        const lines = find(visual, '[data-j-line]')
        const stamps = find(visual, '[data-j-stamp]')

        if (parts) gsap.set(parts, { opacity: 0, y: 14 })
        if (lines) gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })
        if (stamps) gsap.set(stamps, { opacity: 0, scale: 0.8, rotate: -18 })
      })

      // Stage one assembles once, as the section approaches. It is an entrance,
      // not a scrub position, so the certificate is complete when the pin starts.
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: pin.current,
          start: 'top 88%',
          once: true,
        },
      })

      const introParts = find(visuals[0], partSelector)
      const introLines = find(visuals[0], '[data-j-line]')
      const introStamps = find(visuals[0], '[data-j-stamp]')

      if (introParts) {
        intro.from(introParts, {
          opacity: 0,
          y: 14,
          duration: 0.5,
          stagger: 0.045,
          ease: 'power2.out',
        })
      }
      if (introLines) {
        intro.from(
          introLines,
          { scaleX: 0, transformOrigin: 'left center', duration: 0.5, stagger: 0.08 },
          0.1,
        )
      }
      if (introStamps) {
        intro.from(
          introStamps,
          { opacity: 0, scale: 0.8, rotate: -18, duration: 0.45, ease: 'back.out(1.5)' },
          0.3,
        )
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: '+=360%',
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // The rail fills across the whole story. Four stage units keep each
      // quarter of the scroll mapped to one stage.
      timeline.to(fill.current, { scaleY: 1, ease: 'none', duration: 4 }, 0)

      const reveal = (visual: HTMLElement, at: number) => {
        const parts = find(visual, partSelector)
        const lines = find(visual, '[data-j-line]')
        const stamps = find(visual, '[data-j-stamp]')

        if (parts) {
          timeline.to(
            parts,
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
            at,
          )
        }
        if (lines) {
          timeline.to(
            lines,
            { scaleX: 1, duration: 0.45, stagger: 0.07, ease: 'power2.inOut' },
            at + 0.03,
          )
        }
        if (stamps) {
          timeline.to(
            stamps,
            { opacity: 1, scale: 1, rotate: -12, duration: 0.45, ease: 'back.out(1.5)' },
            at + 0.18,
          )
        }
      }

      // Stage changes happen on a narrow band around each unit boundary. The
      // copy and visual cross-fade together; nothing snaps.
      for (let index = 1; index < journeyStages.length; index += 1) {
        const at = index

        timeline.to(
          panels[index - 1],
          { autoAlpha: 0, y: -12, duration: 0.22, ease: 'power1.in' },
          at - 0.2,
        )
        timeline.to(
          visuals[index - 1],
          { autoAlpha: 0, duration: 0.24, ease: 'power1.in' },
          at - 0.2,
        )

        timeline.fromTo(
          panels[index],
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          at - 0.04,
        )
        timeline.fromTo(
          visuals[index],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
          at - 0.04,
        )

        reveal(visuals[index], at + 0.03)
        timeline.call(
          () => setActive((current) => (current === index ? current : index)),
          [],
          at + 0.12,
        )
      }
    },
    { scope: root, dependencies: [] },
  )

  return (
    <div ref={root} className="hidden lg:block">
      <div
        ref={pin}
        className="flex h-screen w-full flex-col px-5 pt-24 pb-8 sm:px-8 lg:px-10"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-4">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-paper-100/45 uppercase">
              Idea to launch / Working file
            </span>
            <p className="flex items-baseline gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-paper-100/55 uppercase tabular-nums">
              <span className="font-display text-base text-paper-50">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span>/ 04</span>
              <span className="ml-2 hidden text-brand-300 xl:inline">{journeyStages[active].label}</span>
            </p>
          </div>

          <div className="mt-8 grid min-h-0 flex-1 grid-cols-[minmax(0,0.82fr)_1px_minmax(0,1.18fr)] gap-8 xl:gap-12">
            <div className="relative min-h-0">
              {journeyStages.map((stage, index) => {
                const isActive = active === index
                return (
                  <div
                    key={stage.id}
                    data-stage-panel
                    aria-hidden={!isActive}
                    {...(!isActive ? { inert: '' } : {})}
                    className="absolute inset-0"
                  >
                    <StageCopy
                      stage={stage}
                      place={`journey-${stage.id}`}
                    />
                  </div>
                )
              })}
            </div>

            {/* The thin vertical progress indicator. */}
            <div className="relative my-2 w-px justify-self-center bg-white/15" aria-hidden="true">
              <span
                ref={fill}
                className="absolute inset-0 origin-top scale-y-0 bg-brand-400"
              />
              {journeyStages.map((stage, index) => (
                <span
                  key={stage.id}
                  className={`absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${
                    index <= active ? 'bg-brand-300' : 'bg-white/25'
                  }`}
                  style={{ top: `${(index / (journeyStages.length - 1)) * 100}%` }}
                />
              ))}
            </div>

            <div className="relative min-h-0">
              {journeyStages.map((stage) => (
                <div key={stage.id} data-stage-visual className="absolute inset-0" aria-hidden="true">
                  <StageVisual stage={stage} />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 hidden text-[10px] tracking-[0.14em] text-paper-100/30 uppercase xl:block">
            Registration / Compliance / Digital / Brand
          </p>
        </div>
      </div>
    </div>
  )
}

/** Stacked, fully accessible version: phones and reduced-motion visitors. */
function JourneyStatic() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8">
      {journeyStages.map((stage) => (
        <article
          key={stage.id}
          aria-labelledby={`journey-stage-${stage.id}`}
          className="border-t border-white/10 py-12 first:border-t-0 first:pt-4 lg:py-16"
        >
          <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm leading-none text-brand-300 tabular-nums">
                    {stage.number}
                  </span>
                  <span aria-hidden="true" className="h-px w-7 bg-white/20" />
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-paper-100/55 uppercase">
                    {stage.label}
                  </span>
                </div>

                <h3
                  id={`journey-stage-${stage.id}`}
                  className="mt-5 max-w-lg font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.05] font-normal tracking-[-0.025em] text-paper-50"
                >
                  {stage.headline}
                </h3>

                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-pretty text-paper-100/70">
                  {stage.description}
                </p>

                <ul className="mt-6 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {stage.services.map((service) => (
                    <li key={service.label}>
                      {service.to ? (
                        <Link
                          to={service.to}
                          className="group inline-flex min-h-8 items-center gap-1.5 text-[13px] text-paper-100/80 transition-colors hover:text-white"
                        >
                          <span aria-hidden="true" className="h-px w-2.5 bg-brand-400/70" />
                          <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-brand-300">
                            {service.label}
                          </span>
                        </Link>
                      ) : (
                        <span className="inline-flex min-h-8 items-center gap-1.5 text-[13px] text-paper-100/80">
                          <span aria-hidden="true" className="h-px w-2.5 bg-brand-400/70" />
                          {service.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <StageCta stage={stage} place={`journey-${stage.id}-static`} />
              </div>
            </Reveal>

            <Reveal delay={80}>
              {/*
                The document sets the height rather than being squeezed into a
                fixed one. The tallest stages (the digital and registration
                mockups) are taller than the frame at narrow widths, and
                centring them in a fixed box made them spill upward over the
                WhatsApp button above. A minimum keeps the short documents
                from collapsing; tall ones grow the frame instead of leaving
                the border.
              */}
              <div className="min-h-[420px] sm:min-h-[460px]">
                <StageVisual stage={stage} />
              </div>
            </Reveal>
          </div>
        </article>
      ))}
    </div>
  )
}

function StageCta({ stage, place }: { stage: JourneyStage; place: string }) {
  const whatsapp = whatsappLink(stage.whatsappMessage)

  return (
    <a
      href={whatsapp.href}
      {...(whatsapp.ready ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      onClick={onWhatsappClick(place, stage.whatsappMessage)}
      title={whatsapp.ready ? undefined : 'Opens the contact page until this number is added.'}
      className="group mt-7 inline-flex min-h-12 w-fit items-center gap-2.5 border border-white/25 px-4 text-[13px] font-semibold text-paper-50 transition-colors hover:border-brand-300 hover:bg-white/5 focus-visible:outline-brand-300"
    >
      <IconWhatsApp width={16} height={16} className="shrink-0 text-brand-300" />
      {stage.ctaLabel}
      <IconArrowRight
        width={15}
        height={15}
        className="shrink-0 text-brand-300 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </a>
  )
}
