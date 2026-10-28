path = r"C:\Anas\games\job works\Shifra_Nuha\src\content\site.ts"
with open(path, encoding='utf-8') as f:
    c = f.read()

old = """export const process = {
  eyebrow: 'How we work',
  title: 'Three steps, the same for almost everyone',
  intro:
    'What changes from one client to the next is the content of each step, because it depends on your business and on the authority involved. The shape of it does not.',
  steps: [
    {
      number: '01',
      title: 'Initial Consultation',
      body: 'We talk through what you are trying to do, what structure fits, what needs to be done now, and what can come later. You leave with a shortlist and a clear next action, with no guesswork about cost or documents.',
    },
    {
      number: '02',
      title: 'Scope, Documents & Quote',
      body: 'We list the exact documents you need, say which parts need a qualified professional, and give you a written quote broken into our fee and government fees. If something changes once we see the details, we say so before spending anything on it.',
    },
    {
      number: '03',
      title: 'Filing, Follow-up & Handover',
      body: 'We file with the right authority, track responses, follow up on queries, and hand you the certificates and any post-registration steps in plain language. For ongoing work we put it on a compliance calendar with reminders.',
    },
  ],
} as const"""

new = """export const process = {
  eyebrow: 'How We Work',
  title: 'How We Work',
  intro: '',
  steps: [
    {
      number: '01',
      title: 'Discuss your requirements.',
      body: 'We talk through what you need help with and help identify the right service for your business.',
    },
    {
      number: '02',
      title: 'Review the scope, documents, deliverables, fees, and dependencies.',
      body: 'We agree on the scope, list the documents required, explain deliverables and fees (government fees and professional fees are separate where applicable), and outline any dependencies before we start.',
    },
    {
      number: '03',
      title: 'Proceed with the agreed work.',
      body: 'Work begins after the scope and terms are confirmed. We keep you updated throughout the agreed process.',
    },
  ],
} as const"""

if old not in c:
    print('NOT FOUND')
else:
    c2 = c.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c2)
    print('OK')
