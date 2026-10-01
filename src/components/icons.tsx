import type { SVGProps } from 'react'
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calculator,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Cpu,
  FileText,
  Globe,
  Handshake,
  Landmark,
  ListOrdered,
  Mail,
  Megaphone,
  Menu,
  MessageSquare,
  Monitor,
  Palette,
  Percent,
  Phone,
  Quote,
  Receipt,
  Scale,
  ShieldCheck,
  Square,
  Tag,
  Target,
  TriangleAlert,
  Users,
  Wallet,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react'

type IconProps = SVGProps<SVGSVGElement>

/**
 * ---------------------------------------------------------------------------
 * ICONS
 * ---------------------------------------------------------------------------
 * Every icon on the site is a `lucide-react` component, re-exported under the
 * site's own `Icon*` names. Two reasons for the indirection:
 *
 *  - Call sites keep reading as `IconBuilding` rather than a long vendor import,
 *    so swapping the icon set later is a one-file change.
 *  - The defaults below are applied once, in one place, instead of at every
 *    call site: a 20px box, a 1.75 stroke, and `aria-hidden` so a decorative
 *    mark is never read out by a screen reader.
 *
 * The stroke weight is deliberately lighter than lucide's default of 2. A 24px
 * corporate navigation icon at 1.75 sits comfortably next to 14–16px body text
 * instead of shouting over it.
 *
 * THE ONE EXCEPTION
 *  `IconWhatsApp` is hand-drawn, and stays that way. The official WhatsApp mark
 *  is a solid filled glyph, not a stroked outline, and there is no lucide icon
 *  that resembles it. Using a generic speech bubble next to a button labelled
 *  "WhatsApp Us" would be a worse signal than no icon at all.
 */
const fromLucide =
  (Icon: LucideIcon) =>
  (props: IconProps) => (
    <Icon
      width={20}
      height={20}
      strokeWidth={1.75}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )

export const IconArrowRight = fromLucide(ArrowRight)
export const IconCheck = fromLucide(Check)
export const IconMenu = fromLucide(Menu)
export const IconClose = fromLucide(X)
export const IconChevron = fromLucide(ChevronDown)
export const IconDocument = fromLucide(FileText)
export const IconPen = fromLucide(Square)
export const IconTarget = fromLucide(Target)
export const IconAutomation = fromLucide(Workflow)
export const IconUsers = fromLucide(Users)
export const IconLayers = fromLucide(Landmark)
export const IconShield = fromLucide(ShieldCheck)
export const IconMail = fromLucide(Mail)
export const IconPhone = fromLucide(Phone)
export const IconPin = fromLucide(Globe)
export const IconClock = fromLucide(Clock)
export const IconPlaceholder = fromLucide(Square)

/** Additional marks used by the professional-services sections. */
export const IconGlobe = fromLucide(Globe)
export const IconCpu = fromLucide(Cpu)
export const IconLandmark = fromLucide(Landmark)

// --- Service and section icons ---------------------------------------------

export const IconBuilding = fromLucide(Building2)
export const IconHandshake = fromLucide(Handshake)
export const IconReceipt = fromLucide(Receipt)
export const IconBook = fromLucide(BookOpen)
export const IconCalculator = fromLucide(Calculator)
export const IconClipboard = fromLucide(ClipboardCheck)
export const IconTag = fromLucide(Tag)
export const IconWallet = fromLucide(Wallet)
export const IconSteps = fromLucide(ListOrdered)
export const IconPartner = fromLucide(Users)
export const IconPalette = fromLucide(Palette)
export const IconMonitor = fromLucide(Monitor)
export const IconMegaphone = fromLucide(Megaphone)

/** Generic speech bubble, for "someone replies" points. */
export const IconChat = fromLucide(MessageSquare)

/** Opening quote mark, for the testimonial block. */
export const IconQuote = fromLucide(Quote)

/** Used for the caveats block, so the warnings are visually distinct. */
export const IconWarning = fromLucide(TriangleAlert)

export const IconScale = fromLucide(Scale)
export const IconPercent = fromLucide(Percent)

/**
 * WhatsApp glyph. Solid and hand-drawn, because the official mark is not a
 * stroke icon and nothing in the lucide set comes close enough to be worth the
 * confusion. Kept as raw path data rather than an import.
 */
export const IconWhatsApp = (props: IconProps) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.83 9.83 0 0 0 4.69 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 18.02a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.14 8.14 0 0 1-1.25-4.34c0-4.5 3.68-8.17 8.19-8.17 2.19 0 4.24.85 5.79 2.4a8.12 8.12 0 0 1 2.39 5.78c0 4.5-3.67 8.17-8.19 8.17Zm4.49-6.11c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.55.12-.17.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.04-.39-1.98-1.23-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.39.1-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.19.87 2.35.99 2.51.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.17-.48-.29Z" />
  </svg>
)
