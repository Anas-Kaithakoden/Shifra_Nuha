import { useRef } from 'react'
import { hero } from '../content/site'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { onWhatsappClick, whatsappLink } from '../lib/contactLinks'
import { gsap, useGSAP } from '../lib/gsap'
import { IconArrowRight, IconCheck, IconWhatsApp } from './icons'

/**
 * ---------------------------------------------------------------------------
 * HERO — A LIVING CASE FILE
 * ---------------------------------------------------------------------------
 * Left: the promise in three display lines, the two actions, and the quiet
 * commitments that answer "what is it like to work with them".
 *
 * Right: four cards from the same client file — registration, tax, website,
 * identity — sliding into place one after another. The stack is deliberately
 * not a dashboard: it is a column of paper on a warm page, with a single
 * hairline rail joining the four pieces. The motion says the same thing the
 * copy does: these needs arrive separately and end up in one place.
 *
 * Every animation is transform/opacity only, runs once on mount, and is skipped
 * entirely for visitors who prefer reduced motion. Nothing depends on the
 * animation to become readable.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope)

      // When the preference changes at runtime, the previous context is
      // reverted and the elements are put back to their pre-animation state.
      // That state is the animation's first frame for anything GSAP touched, so
      // the final values have to be written explicitly rather than left to CSS.
      if (reducedMotion) {
        gsap.set(q('[data-hero-line] > span'), { yPercent: 0, clearProps: 'transform' })
        gsap.set(q('[data-hero-fade], [data-hero-card], [data-hero-node]'), {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
        })
        gsap.set(q('[data-hero-rail]'), { scaleY: 1, clearProps: 'transform' })
        return
      }

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .from(q('[data-hero-line] > span'), { yPercent: 112, duration: 0.9, stagger: 0.12 }, 0.08)
        .from(q('[data-hero-fade]'), { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.32)
        .from(q('[data-hero-rail]'), { scaleY: 0, duration: 1.1, transformOrigin: 'top' }, 0.3)
        .from(
          q('[data-hero-card]'),
          { x: 54, y: 24, opacity: 0, rotate: 1.1, duration: 0.85, stagger: 0.13 },
          0.42,
        )
        .from(q('[data-hero-node]'), { scale: 0, opacity: 0, duration: 0.35, stagger: 0.13 }, 0.62)
    },
    { scope, dependencies: [reducedMotion] },
  )

  const whatsapp = whatsappLink()

  return (
    <section
      ref={scope}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-paper-200 bg-paper-50"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 py-14 sm:py-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 lg:py-20 xl:gap-20">
          {/* ---------------------------------------------------------------- */}
          {/* The argument                                                      */}
          {/* ---------------------------------------------------------------- */}
          <div className="max-w-2xl">
            <div data-hero-fade className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
              <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-700 uppercase">
                {hero.eyebrow}
              </p>
            </div>

            <h1
              id="hero-heading"
              className="mt-7 font-display text-[clamp(2.65rem,5.5vw,4.9rem)] leading-[0.98] font-normal tracking-[-0.03em] text-ink-950"
            >
              <span data-hero-line className="block overflow-hidden pb-[0.08em]">
                {/*
                  The trailing space keeps the two display lines from running
                  together in the heading's accessible name and in the text a
                  crawler extracts, while block layout still renders them as
                  separate lines.
                */}
                <span className="block">{hero.headingTop}{' '}</span>
              </span>
              <span data-hero-line className="mt-1 block overflow-hidden pb-[0.1em]">
                <span className="block">
                  {hero.headingBottom}{' '}
                  <em className="font-normal text-brand-700 italic">{hero.headingAccent}</em>
                </span>
              </span>
            </h1>

            <p
              data-hero-fade
              className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-ink-600 sm:text-lg"
            >
              {hero.supporting}
            </p>

            <div data-hero-fade className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsapp.href}
                {...(whatsapp.ready ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                onClick={onWhatsappClick('hero')}
                title={whatsapp.ready ? undefined : 'Opens the contact page until this number is added.'}
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 border border-ink-950 bg-ink-950 px-6 text-[15px] font-semibold text-white transition-colors duration-200 hover:border-brand-700 hover:bg-brand-700"
              >
                <IconWhatsApp width={18} height={18} className="shrink-0" />
                {hero.primaryCta}
                <IconArrowRight
                  width={17}
                  height={17}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#journey"
                className="group inline-flex min-h-12 items-center justify-center gap-2 border border-paper-300 bg-transparent px-6 text-[15px] font-semibold text-ink-800 transition-colors duration-200 hover:border-ink-400 hover:bg-white"
              >
                {hero.secondaryCta}
                <IconArrowRight
                  width={17}
                  height={17}
                  className="shrink-0 text-brand-700 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <ul
              data-hero-fade
              className="mt-10 flex flex-col gap-2.5 border-t border-paper-200 pt-5 sm:flex-row sm:flex-wrap sm:gap-x-6"
            >
              {hero.points.map((point) => (
                <li key={point} className="flex items-center gap-2 text-[13px] text-ink-600">
                  <IconCheck width={14} height={14} className="shrink-0 text-brand-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* The client file                                                   */}
          {/* ---------------------------------------------------------------- */}
          <div className="relative" aria-hidden="true">
            <div className="mb-5 flex items-end justify-between gap-6 border-b border-paper-300 pb-3">
              <p className="font-display text-lg leading-none text-ink-700 italic">
                Everything moves together.
              </p>
              <p className="shrink-0 text-[10px] font-semibold tracking-[0.18em] text-ink-500 uppercase">
                Client file / 01—04
              </p>
            </div>

            <div className="relative pl-7 sm:pl-9">
              <span
                data-hero-rail
                className="absolute top-3 bottom-3 left-[3px] w-px bg-paper-300 sm:left-[5px]"
              />

              <ol className="space-y-3 sm:space-y-4">
                {hero.cards.map((card, index) => (
                  <li
                    key={card.title}
                    data-hero-card
                    className="relative"
                    style={{ marginLeft: `${index * 6}px` }}
                  >
                    <span
                      data-hero-node
                      className={`absolute top-8 -left-[28px] size-[7px] sm:-left-[36px] ${
                        card.status === 'Completed'
                          ? 'bg-brand-600'
                          : card.status === 'In Progress'
                            ? 'bg-[#a56b1f]'
                            : 'border border-ink-300 bg-paper-50'
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-8 -left-[22px] h-px w-[22px] bg-paper-300 sm:-left-[30px] sm:w-[30px]"
                    />

                    <article className="border border-paper-200 bg-white px-5 py-4 shadow-[0_1px_0_rgba(7,29,43,0.04)] transition-colors duration-200 hover:border-ink-300 sm:px-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[10px] font-semibold tracking-[0.18em] text-ink-400 uppercase tabular-nums">
                          {card.index}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase ${
                            card.status === 'Completed'
                              ? 'text-brand-700'
                              : card.status === 'In Progress'
                                ? 'text-[#8a5a12]'
                                : 'text-ink-500'
                          }`}
                        >
                          <span
                            className={`size-1.5 ${
                              card.status === 'Completed'
                                ? 'bg-brand-600'
                                : card.status === 'In Progress'
                                  ? 'bg-[#a56b1f]'
                                  : 'border border-ink-300'
                            }`}
                          />
                          {card.status}
                        </span>
                      </div>

                      <p className="mt-2 font-display text-xl leading-tight text-ink-950 sm:text-[1.35rem]">
                        {card.title}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-4 border-t border-paper-200 pt-2.5">
                        <span className="text-[11px] tracking-[0.04em] text-ink-500">{card.note}</span>
                        <span className="h-px w-8 bg-paper-300" aria-hidden="true" />
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
