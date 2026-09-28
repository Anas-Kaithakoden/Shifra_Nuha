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
