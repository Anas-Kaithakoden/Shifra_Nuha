import { useRef } from 'react'
import { process } from '../content/site'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { gsap, useGSAP } from '../lib/gsap'

/**
 * ---------------------------------------------------------------------------
 * OUR PROCESS
 * ---------------------------------------------------------------------------
 * Four steps on one line, introduced by the promise that matters more than the
 * steps themselves: scope and cost are agreed before work starts.
 *
 * The connecting rule draws itself once as the section enters the viewport —
 * a single transform on a single element, tied to a one-shot ScrollTrigger, so
 * there is no per-frame work and nothing to clean up beyond the GSAP context.
 * On a phone the rule is replaced by a simple stack; the content is identical.
 */
export function Process() {
  const scope = useRef<HTMLElement>(null)
  const line = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion || !line.current) return

      const items = gsap.utils.selector(scope)('[data-process-step]')

      gsap.from(items, {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 72%',
          once: true,
        },
      })

      gsap.from(line.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 72%',
          once: true,
        },
      })
    },
    { scope, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={scope}
      id="how-it-works"
      aria-labelledby="process-heading"
      className="scroll-mt-20 border-t border-paper-200 bg-paper-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
              <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-700 uppercase">
                {process.eyebrow}
              </p>
            </div>
            <h2
              id="process-heading"
              className="mt-4 max-w-md font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.02] font-normal tracking-[-0.025em] text-ink-950"
            >
              {process.title}
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-pretty text-ink-600 lg:justify-self-end">
            {process.intro}
          </p>
        </div>

        <div className="relative mt-12 sm:mt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-px bg-paper-300 lg:block"
          >
            <span ref={line} className="block h-px origin-left bg-brand-600" />
          </div>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.steps.map((step) => (
              <li
                key={step.number}
                data-process-step
                className="relative border-t border-paper-300 pt-5 lg:border-t-0 lg:pt-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-[3px] left-0 hidden size-[5px] bg-brand-600 lg:block"
                />
                <span className="font-display text-[1.7rem] leading-none text-brand-700 tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-ink-950">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-ink-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-12 max-w-3xl border-t border-paper-200 pt-5 text-[12px] leading-relaxed text-ink-500">
          {process.note}
        </p>
      </div>
    </section>
  )
}
