import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/**
 * ---------------------------------------------------------------------------
 * GSAP
 * ---------------------------------------------------------------------------
 * One registration point for the two plugins the site uses. Importing from
 * here rather than from `gsap` directly means a component can never animate
 * with an unregistered ScrollTrigger, and the plugin is registered once rather
 * than once per module.
 *
 * `useGSAP` is registered too: it extends gsap's context so selectors inside a
 * scoped callback resolve against the component, and it reverts everything it
 * created when the component unmounts. That is what keeps React Strict Mode
 * from leaving a second pinned ScrollTrigger behind on the same section.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
