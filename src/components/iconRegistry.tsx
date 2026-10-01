import type { ComponentType, SVGProps } from 'react'
import type { ServiceIconKey } from '../content/services'
import {
  IconAutomation,
  IconBook,
  IconBuilding,
  IconCalculator,
  IconChat,
  IconClipboard,
  IconCpu,
  IconDocument,
  IconGlobe,
  IconHandshake,
  IconLandmark,
  IconMail,
  IconMegaphone,
  IconMonitor,
  IconPalette,
  IconPartner,
  IconPercent,
  IconReceipt,
  IconScale,
  IconShield,
  IconSteps,
  IconTag,
  IconTarget,
  IconUsers,
  IconWallet,
  IconWhatsApp,
} from './icons'

/**
 * ---------------------------------------------------------------------------
 * ICON REGISTRY
 * ---------------------------------------------------------------------------
 * Content refers to an icon by key; this file is the only place that maps a key
 * to a drawing.
 *
 * That matters for two reasons. Content files stay readable and reviewable —
 * `"icon": 'building'` is obvious to whoever edits the copy, where a JSX blob
 * is not. And adding an icon is a one-line change here rather than an edit in
 * every file that happened to need it.
 *
 * Each registry is fully keyed, and the components that consume them still fall
 * back defensively, so a missing key degrades to a sensible icon instead of
 * crashing the page.
 *
 * Every drawing behind these keys is a `lucide-react` component; see `icons.tsx`
 * for why the indirection exists and for the one hand-drawn exception.
 */

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

/** The nine core services. Keys match `ServiceIconKey` in `content/services.ts`. */
export const serviceIcons: Record<ServiceIconKey, IconComponent> = {
  building: IconBuilding,
  scale: IconScale,
  handshake: IconHandshake,
  receipt: IconReceipt,
  calculator: IconCalculator,
  percent: IconPercent,
  clipboard: IconClipboard,
  document: IconDocument,
  tag: IconTag,
}

/**
 * Secondary digital services. Deliberately a short list: the tier-two offering
 * is two things, not eight, and a registry padded with keys nobody renders is
 * an invitation to put the padding back.
 */
export type DigitalIconKey = keyof typeof digitalIcons

export const digitalIcons = {
  website: IconGlobe,
  automation: IconCpu,
  crm: IconChat,
  branding: IconPalette,
  marketing: IconMegaphone,
  content: IconBook,
  email: IconMail,
  display: IconMonitor,
  whatsapp: IconWhatsApp,
} satisfies Record<string, IconComponent>

/** Supporting points on the homepage and the about page. */
export type ReasonIconKey = keyof typeof reasonIcons

export const reasonIcons = {
  steps: IconSteps,
  partner: IconPartner,
  shield: IconShield,
  users: IconUsers,
  target: IconTarget,
  wallet: IconWallet,
  scale: IconScale,
  book: IconBook,
  calculator: IconCalculator,
  document: IconDocument,
  landmark: IconLandmark,
  cpu: IconCpu,
  globe: IconGlobe,
  automation: IconAutomation,
  /** "Responsive support" — the point is that someone replies, so it gets a bubble. */
  chat: IconChat,
} satisfies Record<string, IconComponent>