import { Link } from 'react-router-dom'
import { brand, site } from '../content/site'

/**
 * The real brand lockup: the "SN" monogram plus the Shifra Nuha wordmark, as a
 * tight transparent PNG. The supplied artwork already contains the wordmark, so
 * nothing is typeset here and no text is duplicated.
 *
 * The intrinsic ratio is 3.385:1, and the artwork is 640px wide, which is around
 * 2.5x the size it renders at — crisp on retina without a heavy payload.
 *
 * `tone="dark"` swaps in the white knockout, for dark backgrounds.
 */
export function Logo({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const dark = tone === 'dark'

  return (
    <Link to="/" className={`group inline-flex min-h-11 items-center ${className}`} aria-label={`${site.name} — home`}>
      <img
        src={dark ? brand.logoOnDark : brand.logo}
        alt={site.name}
        width={122}
        height={36}
        className="h-8 w-auto sm:h-9"
        decoding="async"
      />
    </Link>
  )
}
