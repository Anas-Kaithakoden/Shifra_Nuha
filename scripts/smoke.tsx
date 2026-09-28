import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from '../src/App'
import { contact, social, services } from '../src/content/site'

const routes = ['/', '/services', '/about', '/contact', '/privacy', '/this-route-does-not-exist']

let failures = 0

for (const route of routes) {
  try {
    const html = renderToString(
      <StaticRouter location={route}>
        <App />
      </StaticRouter>,
    )
    const issues: string[] = []
    if (html.includes('undefined')) issues.push('contains literal "undefined"')
    if (html.includes('NaN')) issues.push('contains "NaN"')
    if (!html.includes('<h1')) issues.push('missing <h1>')
    if (!html.includes('<footer')) issues.push('missing footer')
    if (!html.includes('type="email"') && route === '/contact') issues.push('missing email input')
    if (issues.length) {
      failures++
      console.log(`FAIL ${route} -> ${issues.join(', ')}`)
    } else {
      console.log(`ok   ${route} (${html.length} chars)`)
    }
  } catch (error) {
    failures++
    console.log(`FAIL ${route} -> ${(error as Error).message}`)
  }
}

// Contact details and socials must stay empty until real values are supplied.
const invented = [
  contact.phone,
  contact.whatsapp,
  contact.email,
  contact.address,
  social.linkedin,
  social.facebook,
  social.instagram,
].filter(Boolean)
console.log(invented.length === 0 ? 'ok   no invented contact/social values' : `FAIL invented values: ${invented}`)
if (invented.length) failures++

// Every service must expose the copy the brief asks for.
for (const service of services) {
  const missing = [service.step, service.title, service.category, service.summary].filter((v) => !v?.trim())
  if (missing.length) {
    failures++
    console.log(`FAIL service ${service.id} is missing required fields`)
  }
}
console.log(`ok   ${services.length} services with complete copy`)

process.exit(failures === 0 ? 0 : 1)
