import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const IconArrowRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const IconCheck = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m5 13 4 4L19 7" />
  </svg>
)

export const IconMenu = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
)

export const IconClose = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
)

export const IconDocument = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6" />
    <path d="M9 17h4" />
  </svg>
)

export const IconPen = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
)

export const IconTarget = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
)

export const IconAutomation = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="8" width="7" height="8" rx="2" />
    <rect x="14" y="3" width="7" height="6" rx="2" />
    <rect x="14" y="15" width="7" height="6" rx="2" />
    <path d="M10 12h2a2 2 0 0 0 2-2V6" />
    <path d="M10 12h2a2 2 0 0 1 2 2v6" />
  </svg>
)

export const IconUsers = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M16 19v-1a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1" />
    <circle cx="9.5" cy="7" r="3" />
    <path d="M21 19v-1a3 3 0 0 0-2.4-2.9" />
    <path d="M15.5 4.2a3 3 0 0 1 0 5.6" />
  </svg>
)

export const IconLayers = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m12 3 9 5-9 5-9-5z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
)

export const IconShield = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const IconMail = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
)

export const IconPhone = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 5c0-.6.4-1 1-1h2.5c.5 0 .9.3 1 .8l.9 3c.1.4 0 .8-.3 1l-1.4 1.1a12 12 0 0 0 5.4 5.4l1.1-1.4c.2-.3.6-.4 1-.3l3 .9c.5.1.8.5.8 1V19c0 .6-.4 1-1 1A15 15 0 0 1 4 5z" />
  </svg>
)

export const IconPin = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const IconClock = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconPlaceholder = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 12h8" />
  </svg>
)

// --- Service and section icons ---------------------------------------------

export const IconBuilding = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 21V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15" />
    <path d="M13 10h6a1 1 0 0 1 1 1v10" />
    <path d="M2 21h20" />
    <path d="M7 9h2M7 13h2M7 17h2M16 14h1M16 17h1" />
  </svg>
)

export const IconHandshake = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m11 17 2 2a2 2 0 0 0 3-3" />
    <path d="m14 16 1.5 1.5a2 2 0 0 0 3-3l-3-3" />
    <path d="M8 13 6.5 14.5a2 2 0 0 1-3-3l3-3 4 4" />
    <path d="m2 9 3-3 4 4" />
    <path d="m11 17-1.5-1.5" />
    <path d="M14.5 9.5 17 7a2 2 0 0 1 3 3l-2 2" />
    <path d="M9 6.5 11.5 4H18a1 1 0 0 1 1 1v2.5" />
  </svg>
)

export const IconReceipt = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21z" />
    <path d="M9 8h6M9 12h6" />
  </svg>
)

export const IconBook = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <path d="M4 19a2 2 0 0 1 2-2h13" />
    <path d="M8 7h7M8 11h5" />
  </svg>
)

export const IconCalculator = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 6h8" />
    <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
  </svg>
)

export const IconClipboard = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="5" y="4" width="14" height="18" rx="2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="m9 13 2 2 4-4" />
  </svg>
)

export const IconTag = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z" />
    <path d="M7.5 7.5h.01" />
  </svg>
)

export const IconWallet = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M3 10h18" />
    <path d="M16.5 14.5h.01" />
  </svg>
)

export const IconSteps = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 6h5M10 6h0M4 12h11M4 18h16" />
    <path d="M8 4v4M14 10v4" />
  </svg>
)

export const IconPartner = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="10" r="2.5" />
    <path d="M2.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M14 20a4.5 4.5 0 0 1 7.5-3.4" />
  </svg>
)

export const IconPalette = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 21a9 9 0 1 1 9-9c0 1.7-1.3 3-3 3h-1.5a2 2 0 0 0-1.4 3.4A2 2 0 0 1 12 21z" />
    <path d="M7.5 11h.01M10 7.5h.01M14.5 7.5h.01" />
  </svg>
)

export const IconMonitor = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="2.5" y="4" width="19" height="12" rx="2" />
    <path d="M9 20h6M12 16v4" />
  </svg>
)

export const IconMegaphone = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 11v2a2 2 0 0 0 2 2h2l8 4V5L7 9H5a2 2 0 0 0-2 2z" />
    <path d="M19 9.5a3 3 0 0 1 0 5" />
  </svg>
)

/** Generic speech bubble, used for the WhatsApp and CRM card. */
export const IconChat = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20 14a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
    <path d="M9 9h6M9 12h4" />
  </svg>
)

export const IconChevron = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

/** Used for the caveats block, so the warnings are visually distinct. */
export const IconWarning = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M10.3 4.3 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9.5v4" />
    <path d="M12 17h.01" />
  </svg>
)

/** WhatsApp glyph. Solid, because the official mark is not a stroke icon. */
export const IconWhatsApp = (props: IconProps) => (
  <svg {...base({ fill: 'currentColor', stroke: 'none', ...props })}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.83 9.83 0 0 0 4.69 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 18.02a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.14 8.14 0 0 1-1.25-4.34c0-4.5 3.68-8.17 8.19-8.17 2.19 0 4.24.85 5.79 2.4a8.12 8.12 0 0 1 2.39 5.78c0 4.5-3.67 8.17-8.19 8.17Zm4.49-6.11c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.55.12-.17.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.04-.39-1.98-1.23-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.39.1-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.19.87 2.35.99 2.51.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.17-.48-.29Z" />
  </svg>
)

export const IconScale = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 4v16" />
    <path d="M7 20h10" />
    <path d="M4 8h16" />
    <path d="M6.5 8 4 14h5L6.5 8Z" />
    <path d="M17.5 8 15 14h5l-2.5-6Z" />
    <path d="M12 4 9 8h6L12 4Z" />
  </svg>
)

export const IconPercent = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M19 5 5 19" />
    <circle cx="7.5" cy="7.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
)

