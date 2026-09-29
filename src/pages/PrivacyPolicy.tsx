import { legalDocs } from '../content/legal'
import { Legal } from './Legal'

/**
 * The privacy policy uses the same page as the other legal documents, so all
 * three carry the same draft banner, table of contents and contact footer. The
 * content itself lives in `src/content/legal.ts` alongside the terms and the
 * disclaimer, because the three are written together and reviewed together.
 */
export default function PrivacyPolicy() {
  return <Legal doc={legalDocs.privacy} />
}
