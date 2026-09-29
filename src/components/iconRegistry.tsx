import type { ComponentType, SVGProps } from 'react'
import type { ServiceIconKey } from '../content/services'
import {
  IconAutomation,
  IconBook,
  IconBuilding,
  IconCalculator,
  IconChat,
  IconClipboard,
  IconDocument,
  IconHandshake,
  IconLayers,
  IconMail,
  IconMegaphone,
  IconMonitor,
  IconPalette,
  IconPartner,
  IconPercent,
  IconPen,
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

/** Secondary digital and technology services. */
export type DigitalIconKey = keyof typeof digitalIcons

export const digitalIcons = {
  branding: IconPalette,
  website: IconMonitor,
  email: IconMail,
  marketing: IconMegaphone,
  crm: IconChat,
  automation: IconAutomation,
  content: IconPen,
  whatsapp: IconWhatsApp,
} satisfies Record<string, IconComponent>

/** Supporting reasons on the homepage. */
export type ReasonIconKey = keyof typeof reasonIcons

export const reasonIcons = {
  steps: IconSteps,
  partner: IconPartner,
  shield: IconShield,
  layers: IconLayers,
  users: IconUsers,
  target: IconTarget,
  wallet: IconWallet,
  scale: IconScale,
  book: IconBook,
  calculator: IconCalculator,
  document: IconDocument,
} satisfies Record<string, IconComponent>
