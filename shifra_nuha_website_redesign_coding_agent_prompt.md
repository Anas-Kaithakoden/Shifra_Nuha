# Coding Agent Task: Redesign the Shifra Nuha Technologies Website

## Your role

Act as a senior frontend engineer and product designer. Redesign the
existing Shifra Nuha Technologies website in the current repository.
Implement the changes in the codebase; do not merely describe a design
or provide mock code.

Work carefully within the existing project, inspect the repository
before editing, and preserve working functionality unless a change is
explicitly required below.

## 1. Project context

Shifra Nuha Technologies is a business services firm based in Kerala,
India.

The website currently focuses on professional/business services,
including:

-   Company and LLP registration
-   Partnership registration
-   GST services
-   Accounting and bookkeeping
-   Income tax services
-   Auditing and coordination with qualified professionals
-   Project reports
-   Trademark registration
-   MSME/Udyam registration

The company is expanding its website presentation to include two
secondary divisions:

### Digital Solutions

-   Website design and development
-   ERP and business management software
-   Billing and inventory systems
-   CRM and lead management
-   WhatsApp automation and chatbots
-   AI solutions and workflow automation
-   Cloud hosting and technical support
-   Custom business applications

### Branding & Creative Services

-   Logo design
-   Brand identity and brand guidelines
-   Business cards and letterheads
-   Company profiles and brochures
-   Social media posts and banners
-   Product catalogues and promotional creatives
-   Presentation and pitch deck design

**Do not add Digital Marketing as a service division.** The company is
not offering digital marketing as a service. Branding & Creative is a
separate division from Digital Solutions.

The intended business positioning is:

> Shifra Nuha Technologies helps businesses get established, manage
> essential professional requirements, and build the digital tools and
> visual identity they need.

Business Solutions must remain the primary/core division. Digital
Solutions and Branding & Creative should be presented as secondary
divisions.

## 2. Inspect the existing repository first

Before changing code:

1.  Inspect the current file structure, routes, page components, content
    files, styles, brand assets, and package scripts.
2.  Read the existing implementation of the homepage, navbar, footer,
    service cards, service detail pages, WhatsApp CTA components, SEO
    utilities, analytics, and tests.
3.  Identify existing reusable components and design tokens.
4.  Check the current Git working tree and avoid overwriting or
    discarding unrelated user changes.
5.  Build on the existing implementation. Do not replace the project
    with a new app or introduce a new framework.

The documented stack is:

-   React 18
-   TypeScript
-   Vite
-   React Router DOM
-   Tailwind CSS v4
-   lucide-react
-   Inter font

Verify the actual repository rather than assuming every version or file
is unchanged.

## 3. Primary goals

Implement a cohesive redesign that:

-   Looks professional, trustworthy, established, modern, clear, and
    approachable.
-   Makes Business Solutions the most prominent service division.
-   Clearly introduces Digital Solutions and Branding & Creative as
    secondary divisions.
-   Makes the website's service categories and navigation easier to
    understand.
-   Improves readability, responsive layouts, hierarchy, whitespace, and
    conversion paths.
-   Preserves the current WhatsApp-first lead generation flow.
-   Preserves existing service detail pages and their search-engine
    value.
-   Keeps all content honest and avoids unsupported claims.
-   Maintains performance, accessibility, and maintainability.

Do not perform an unnecessary full rewrite. Prefer incremental
improvements and reusable components.

## 4. Information architecture and navigation

Use this primary navigation structure, adapting it to the existing
component conventions:

-   Home
-   Business Solutions
-   Digital Solutions
-   Branding & Creative
-   About
-   Contact
-   A visually clear WhatsApp CTA

Use dropdowns or accessible expandable menus for service categories if
appropriate. On mobile, navigation must be easy to use with touch and
keyboard.

Recommended page structure:

-   `/` --- Homepage
-   `/services` --- Business Solutions/service hub, preserving its
    current role and URL
-   Existing business service routes --- preserve all existing URLs
-   `/digital-solutions` --- Digital Solutions category page, if it does
    not already exist
-   `/branding-creative` --- Branding & Creative category page, if it
    does not already exist
-   `/about` --- About page
-   `/contact` --- Contact page
-   Existing legal pages --- preserve them

Check for existing routes before adding new ones. Avoid duplicate pages
and duplicate content. If an equivalent route already exists, reuse it.

Do not rename or remove existing service routes without a compelling
technical reason. If a route absolutely must change, implement an
appropriate permanent redirect and update internal links and sitemap
generation.

## 5. Homepage requirements

Reorganize the homepage into a clear hierarchy. Reuse existing
components where possible.

### Section 1: Hero

The hero should communicate the overall company value, not list every
service.

Suggested headline:

> The Right Support to Start and Build Your Business.

Suggested supporting copy:

> From business registration and tax compliance to digital solutions and
> professional branding, we help you navigate essential business needs
> with one point of contact.

Suggested CTAs:

-   Primary: "Explore Our Services"
-   Secondary: "Chat on WhatsApp"

Requirements: - Strong typographic hierarchy. - A restrained,
professional layout. - Clear contrast and readable line lengths. - A
complementary visual only if it genuinely improves the layout. -
Mobile-first stacking and spacing. - Do not use carousels or rotating
hero banners. - Do not make the hero excessively tall or bury the CTA.

Copy may be improved for clarity, but preserve the intended meaning and
do not make unsupported promises.

### Section 2: Business Solutions --- primary division

Place this section immediately after the hero, before the other
divisions.

Suggested heading:

> Everything You Need to Get Your Business Started.

Suggested introduction:

> Get support with registration, taxation, accounting and other
> essential professional requirements.

Feature the most important business services using a consistent card
layout. Include the existing core services, such as:

-   Company Registration
-   LLP Registration
-   GST Services
-   Accounting & Bookkeeping
-   Income Tax
-   Auditing
-   Project Reports
-   Trademark Registration
-   MSME/Udyam Registration

Partnership Registration should remain available, but preserve its
existing decision to be less prominent in the main featured grid unless
the current business owner has changed that requirement.

Requirements: - Business Solutions must receive the strongest visual
prominence after the hero. - Each card needs a concise, accurate
description and a clear link to its existing service detail page. -
Avoid filling every card with multiple buttons. - Do not remove existing
service content or caveats.

### Section 3: Why Choose Shifra Nuha

Use specific, supportable benefits, such as:

-   One Point of Contact
-   Clear Process
-   Professional Oversight
-   Personalized Assistance

Only state claims that match actual operations. For regulated services
such as tax, accounting, auditing, incorporation, or intellectual
property filing, retain appropriate qualifications and explain
professional involvement accurately. Do not imply that Shifra Nuha
itself holds a qualification or authorization unless the existing
verified content establishes this.

### Section 4: Digital Solutions --- secondary division

Suggested heading:

> Make Your Business Work Smarter.

Suggested introduction:

> Websites, custom applications and workflow automation to help
> businesses organize their work.

Present the existing digital offerings, grouped sensibly:

-   Website Design & Development
-   ERP & Business Management Software
-   Billing & Inventory Systems
-   CRM & Lead Management
-   WhatsApp Automation & Chatbots
-   AI Solutions & Workflow Automation
-   Cloud Hosting & Technical Support
-   Custom Business Applications

Give special emphasis to website development, business software,
billing/inventory, and CRM. Do not suggest that every listed product is
already built or available as an off-the-shelf product. Use accurate
service language such as "custom development," "available based on
requirements," or "discuss your requirements" where appropriate.

Keep this section visually clear but less dominant than Business
Solutions.

### Section 5: Branding & Creative --- secondary division

Suggested heading:

> Give Your Business a Professional Identity.

Suggested introduction:

> From your first logo to a consistent brand identity, create the visual
> materials your business needs.

Include: - Logo & Brand Identity - Business Cards & Letterheads -
Company Profiles & Brochures - Product Catalogues - Presentation & Pitch
Deck Design - Other existing creative offerings that the company can
deliver

Use a more visual layout for this section. Prefer real portfolio assets
if available and approved for public use. Do not invent client projects
or present stock imagery as Shifra Nuha's own work.

### Section 6: How We Work

Use a concise three-step process:

1.  Discuss your requirements.
2.  Review the scope, documents, deliverables, fees, and dependencies.
3.  Proceed with the agreed work.

Make clear that work begins after the scope and terms are confirmed. Do
not guarantee regulatory processing times or outcomes.

### Section 7: FAQs

Reuse relevant existing FAQs and add only useful questions supported by
the actual service offering, such as:

-   What services does Shifra Nuha provide?
-   What documents are needed for a particular registration?
-   How can I request a quotation?
-   How do I enquire about website development or custom software?
-   How are professional fees and government fees handled?
-   How long can a service take?

Avoid generic or fabricated answers. Preserve service-specific caveats.

### Section 8: Final CTA

Suggested heading:

> Let's Discuss Your Business Requirements.

Supporting copy:

> Tell us what you need help with, and our team can guide you through
> the next steps.

CTA: "Talk to Us on WhatsApp"

Use the existing WhatsApp CTA implementation and correct contextual
message for the page or service.

## 6. Visual design system

Inspect the existing logo and brand assets before finalizing colors. The
palette below is a suggested direction, not permission to disregard
established brand colors.

Suggested palette: - Deep navy: `#142F3C` - White: `#FFFFFF` - Warm
paper/off-white: `#F5F6F3` - Soft teal accent: `#DCECE8` - Dark charcoal
for body text

Use the existing brand palette if it materially differs and is clearly
intentional. Maintain a coherent palette throughout the site.

Design direction: - Professional, minimal, corporate, trustworthy. -
Alternate white and subtle off-white section backgrounds. - Use fine
borders, restrained corner radii, subtle hover states, and generous
whitespace. - Avoid unnecessary gradients, glows, decorative blobs,
excessive shadows, excessive rounded cards, and over-animated
interactions. - Use lucide-react icons consistently, with a consistent
size and stroke style. - Use Inter if it is already configured and
performing well; avoid adding font libraries without need. - Avoid
stock-photo-heavy layouts. Optimize any imagery used. - Do not make
every section look like a separate visual theme.

Suggested responsive typography: - Hero heading: about 48--60px desktop,
34--42px mobile. - Section heading: about 32--40px desktop, 27--32px
mobile. - Card headings: about 18--22px. - Body text: about 16--18px. -
Supporting text: about 14--15px.

Suggested layout: - Main content max width around 1120--1200px. -
Desktop section vertical padding around 80--104px. - Mobile section
vertical padding around 48--64px. - Card gaps around 16--24px.

Treat these values as guidelines, not rigid requirements. Follow the
existing design system where it is already coherent.

## 7. Service detail pages

Preserve the current dynamic service-page architecture and existing
service detail URLs.

For business service pages, retain and improve the appropriate sections:

1.  Breadcrumbs
2.  Service title and introduction
3.  Contextual WhatsApp CTA
4.  Explanation of the service
5.  Who may need it
6.  What the service includes
7.  Documents required, if applicable
8.  Process
9.  Fees and limitations
10. FAQs
11. Related services
12. Final WhatsApp CTA

For Digital Solutions pages, use a suitable variation that explains: -
The business problem - The proposed solution - Deliverables and
features - Implementation process - Dependencies and third-party
charges, where relevant - Maintenance/support scope - How to request a
quotation

For Branding & Creative pages, explain: - The deliverables - What assets
or information the client needs to provide - The design/review process -
Revision arrangements, only if these are defined - How to request a
quotation

Do not force all divisions into exactly the same content layout if it
harms usability. Shared components should remain reusable, but page
content should fit the service.

## 8. WhatsApp-first lead generation

WhatsApp is the primary conversion channel. Do not add contact forms as
a replacement for the current approach.

Requirements: - Reuse the existing WhatsAppButton or equivalent CTA
component. - Preserve the existing phone number and message URL
construction logic. - Each service should have a relevant prefilled
message. - Ensure links encode message text correctly. - Confirm that
buttons open the intended WhatsApp conversation. - Do not hardcode a
second phone number or create inconsistent CTA logic. - Keep CTAs
clearly visible without allowing sticky elements to cover page
content. - Review whether the sticky CTA bar is helpful on both mobile
and desktop; retain or adjust it without disrupting usability.

Do not claim that a message was sent automatically. The visitor must
choose to send it in WhatsApp.

## 9. Footer

Create or refine a compact, organized footer with: - Company logo and a
short, accurate company description - Business Solutions links - Digital
Solutions and Branding & Creative links - About and Contact links -
Actual contact information and business location, if already verified in
the project - Privacy Policy, Terms & Conditions, and Disclaimer -
Copyright notice

Do not invent addresses, phone numbers, email addresses, social
profiles, registrations, or credentials. Reuse verified existing
content.

## 10. SEO, routing, analytics, and technical requirements

Preserve and verify existing functionality.

### SEO

-   Preserve existing URLs wherever possible.
-   Keep unique page titles and meta descriptions.
-   Maintain canonical URLs.
-   Preserve Open Graph/Twitter metadata.
-   Preserve the sitemap generation approach and ensure new public
    category pages are included appropriately.
-   Preserve robots directives and deployment-domain behavior.
-   Maintain appropriate organization structured data.
-   Add relevant structured data only when accurate and appropriate.
-   Use descriptive headings and image alt text.
-   Do not keyword-stuff copy or create thin, duplicate pages.

### Analytics

-   Preserve existing GA4 and Meta tracking if configured.
-   Ensure route changes still produce correct page views.
-   Do not add duplicate tracking scripts or duplicate events.
-   Validate tracking after implementation where possible.
-   Do not expose secrets or private credentials.

### Technical

-   Preserve React, TypeScript, Vite, React Router, Tailwind CSS, and
    existing project conventions.
-   Keep service content data-driven in the existing content files where
    appropriate.
-   Reuse current components rather than duplicating similar markup.
-   Avoid unnecessary dependencies.
-   Do not introduce a backend or database if the redesign does not need
    one.
-   Keep environment variables out of source control.
-   Preserve legal pages and route handling.
-   Ensure the not-found page still works.

## 11. Accessibility, responsiveness, and performance

Verify the redesign at: - Small mobile widths (around 320--375px) -
Standard mobile widths (around 390--430px) - Tablet widths - Desktop
widths - Wide desktop widths

Requirements: - No horizontal overflow. - No clipped text or overlapping
navigation. - Interactive elements are keyboard accessible. - Visible
focus states. - Semantic heading hierarchy. - Accessible names for
buttons and links. - Decorative icons hidden from assistive technology
where appropriate. - Sufficient color contrast. - Images have suitable
alt text or empty alt text if purely decorative. - Reduced-motion
preferences are respected if animations exist. - Avoid layout shifts and
unnecessary client-side JavaScript. - Lazy-load below-the-fold images
where appropriate.

## 12. Content and business constraints --- must not be violated

These requirements are mandatory:

1.  **No published pricing.** Do not add "starting from" amounts, public
    price lists, or fixed prices. Use "Request a quotation" or an
    equivalent CTA. Explain that government fees and
    professional/service fees may be separate where applicable.
2.  **No guaranteed timelines.** Processing depends on authorities,
    workload, and case details. Do not promise fixed completion times or
    guaranteed outcomes.
3.  **Qualified professionals.** For regulated services, accurately
    state that appropriate qualified professionals are involved where
    applicable. Do not imply credentials or authorizations that are not
    verified.
4.  **No fake social proof.** Do not invent testimonials, client logos,
    customer counts, success rates, awards, certifications, or project
    case studies.
5.  **Honest product descriptions.** Do not present custom software as
    an already available product unless it actually exists.
6.  **No Digital Marketing division.** Do not add digital marketing, SEO
    services, ad management, social media management, or marketing
    campaigns as offered services. Existing creative design work such as
    social media post/banner design may remain under Branding &
    Creative.
7.  **Business Solutions stays primary.** Do not give all three
    divisions equal prominence if it weakens the core business focus.
8.  **WhatsApp-first.** Keep WhatsApp as the primary enquiry method; do
    not replace it with a new contact-form-first strategy.
9.  **No unsupported claims.** Prefer clear, factual language over
    exaggerated marketing copy.
10. **Do not discard unrelated user changes.** Avoid destructive Git
    operations and do not overwrite work unrelated to this task.

## 13. Suggested implementation sequence

Follow this order:

### Phase 1: Audit

-   Inspect existing code, working tree, routes, content, components,
    assets, SEO, analytics, and tests.
-   Identify exactly which changes are needed.
-   Keep a concise implementation checklist.

### Phase 2: Shared design and navigation

-   Refine design tokens and shared components.
-   Update the navbar and mobile navigation.
-   Improve buttons, service cards, section spacing, and footer.

### Phase 3: Homepage

-   Implement the hierarchy and sections defined in this document.
-   Make Business Solutions the first and strongest service section
    after the hero.
-   Add secondary Digital Solutions and Branding & Creative sections.

### Phase 4: Category and service pages

-   Reuse or create category pages without duplicating existing routes.
-   Refine the existing business service-page template.
-   Ensure all cards and internal links point to valid routes.
-   Keep contextual WhatsApp messages working.

### Phase 5: Verification

Run the available checks, including: - `npm run typecheck` -
`npm run build` - `npm run test:smoke` - `npm run test:a11y` -
`npm test`, if configured and appropriate

Inspect `package.json` before relying on these exact commands. If a
command is unavailable or fails due to an existing unrelated issue,
report it accurately and do not claim success.

Manually or programmatically verify: - Navigation and dropdowns - Every
important CTA - WhatsApp links and contextual messages - All existing
service routes - New category routes - Mobile layouts - SEO metadata and
sitemap - Legal pages and not-found route - Analytics behavior if
testable

### Phase 6: Final report

At completion, report: - What was changed - Which files/components were
changed - Routes added or preserved - Tests and builds run, including
pass/fail results - Any remaining issues or decisions requiring the
owner's input

Do not claim to have tested the live deployment unless you actually did
so.

## 14. Definition of done

The task is complete only when:

-   The homepage clearly positions Shifra Nuha as a business-services
    firm with complementary digital and creative divisions.
-   Business Solutions remains the primary offering.
-   Digital Solutions and Branding & Creative are distinct and
    accurately represented.
-   No Digital Marketing service division has been introduced.
-   Existing business-service pages, routes, caveats, and WhatsApp-first
    conversion flow remain intact.
-   The site is responsive and accessible.
-   SEO, analytics, legal pages, and route handling have been preserved
    and checked.
-   Available type, build, smoke, and accessibility checks have been run
    and their outcomes reported.
-   No unsupported claims, fake testimonials, public prices, or
    guaranteed timelines have been added.

## Final instruction

Make the changes directly in the existing repository. Inspect first,
implement incrementally, test the result, and summarize what you
actually changed. If a requirement conflicts with the current code or
cannot be verified, inspect the relevant implementation and make the
safest minimal change; document unresolved issues instead of guessing.
