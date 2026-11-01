/**
 * ---------------------------------------------------------------------------
 * JOURNEY VISUALS
 * ---------------------------------------------------------------------------
 * Four documents, not four illustrations. Each one is built from ordinary
 * interface furniture — rules, labels, fields, a calendar, a browser frame, a
 * type specimen — because the section is about real work being assembled, not
 * about a fictional product.
 *
 * Everything here is plain markup and CSS shapes. There are no images, no
 * canvas and no SVG illustrations beyond the type itself, which keeps the
 * section sharp at every size and adds nothing to the page weight.
 *
 * The `data-j-*` attributes are hooks for the desktop timeline in
 * `JourneyStory.tsx`. The same markup is rendered fully visible on mobile and
 * for reduced motion: if the animation never runs, nothing is missing.
 */

export function RegistrationVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative w-full max-w-[355px] bg-paper-50 px-6 py-6 text-ink-900 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.75)] sm:px-8 sm:py-7">
        <div data-j-part className="flex items-center justify-between gap-4">
          <span className="text-[8px] font-semibold tracking-[0.2em] text-ink-500 uppercase">
            Shifra Nuha
          </span>
          <span className="text-[8px] font-semibold tracking-[0.14em] text-ink-400 uppercase tabular-nums">
            Reg / 001
          </span>
        </div>

        <div data-j-line className="mt-4 h-px origin-left bg-ink-900/20" />

        <div data-j-part className="mt-7 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full border border-brand-600/40 text-brand-700">
            <span className="font-display text-xl leading-none">SN</span>
          </div>
        </div>

        <p data-j-part className="mt-5 text-center font-display text-[1.55rem] leading-none text-ink-950">
          Certificate of Registration
        </p>
        <p data-j-part className="mt-2 text-center text-[8px] font-semibold tracking-[0.2em] text-ink-500 uppercase">
          Business established
        </p>

        <div className="mt-7 space-y-3.5">
          {[
            ['Business name', 'Your Company'],
            ['Structure', 'Private Limited'],
            ['Status', 'Registered'],
          ].map(([label, value]) => (
            <div key={label} data-j-part className="grid grid-cols-[82px_1fr] items-end gap-3">
              <span className="text-[8px] font-semibold tracking-[0.13em] text-ink-400 uppercase">
                {label}
              </span>
              <span className="border-b border-ink-900/15 pb-1 font-display text-[13px] text-ink-800">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div data-j-part className="mt-8 flex items-end justify-between gap-5">
          <div className="w-2/3">
            <div className="h-px bg-ink-900/20" />
            <p className="mt-1.5 text-[8px] tracking-[0.12em] text-ink-400 uppercase">
              Authorised signatory
            </p>
          </div>
          <div className="w-1/4">
            <div className="h-px bg-ink-900/20" />
            <p className="mt-1.5 text-[8px] tracking-[0.12em] text-ink-400 uppercase">Date</p>
          </div>
        </div>

        <div data-j-part className="mt-6 flex items-center justify-between gap-3 border-t border-ink-900/10 pt-3">
          <span className="text-[8px] tracking-[0.1em] text-ink-400 uppercase">Documents assembled</span>
          <span className="inline-flex items-center gap-1.5 text-[8px] font-semibold tracking-[0.12em] text-brand-700 uppercase">
            <span className="size-1 bg-brand-600" />
            Complete
          </span>
        </div>

        <div
          data-j-stamp
          aria-hidden="true"
          className="absolute -right-3 bottom-12 flex size-16 -rotate-12 items-center justify-center rounded-full border border-brand-700/50 text-center text-[7px] font-semibold tracking-[0.14em] text-brand-700/80 uppercase"
        >
          Registered
        </div>
      </div>
    </div>
  )
}

const calendarDays = [
  { day: '03', muted: true },
  { day: '04' },
  { day: '05' },
  { day: '06', marked: true },
  { day: '07' },
  { day: '08', muted: true },
  { day: '09', muted: true },
  { day: '10' },
  { day: '11', marked: true },
  { day: '12' },
  { day: '13' },
  { day: '14' },
  { day: '15', muted: true },
  { day: '16', muted: true },
]

export function ComplianceVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[375px] bg-white p-5 text-ink-900 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.75)] sm:p-6">
        <div data-j-part className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[8px] font-semibold tracking-[0.18em] text-brand-700 uppercase">
              Compliance
            </p>
            <p className="mt-1 font-display text-xl leading-none text-ink-950">Calendar</p>
          </div>
          <span className="border border-paper-200 px-2 py-1 text-[8px] font-semibold tracking-[0.12em] text-ink-500 uppercase">
            This month
          </span>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <span
              key={`${day}-${index}`}
              className="pb-1 text-[7px] font-semibold tracking-[0.08em] text-ink-400 uppercase"
            >
              {day}
            </span>
          ))}
          {calendarDays.map((item) => (
            <span
              key={item.day}
              data-j-cal-day
              className={`flex aspect-square items-center justify-center text-[9px] tabular-nums ${
                item.marked
                  ? 'bg-brand-700 font-semibold text-white'
                  : item.muted
                    ? 'text-ink-300'
                    : 'text-ink-600'
              }`}
            >
              {item.day}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-paper-200 pt-1">
          {[
            ['GST return', 'Filed', true],
            ['TDS payment', 'Scheduled', false],
            ['Income tax', 'In review', false],
          ].map(([task, status, done]) => (
            <div
              key={String(task)}
              data-j-task
              className="flex items-center justify-between gap-4 border-b border-paper-200 py-3 last:border-b-0"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`size-1.5 ${done ? 'bg-brand-600' : 'border border-ink-300'}`}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-medium text-ink-800">{task}</span>
              </div>
              <span
                className={`text-[8px] font-semibold tracking-[0.12em] uppercase ${
                  done ? 'text-brand-700' : 'text-ink-400'
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>

        <div data-j-part className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[8px] tracking-[0.1em] text-ink-400 uppercase">Next review</span>
          <span className="text-[8px] font-semibold tracking-[0.12em] text-ink-600 uppercase">
            Agreed with you
          </span>
        </div>
      </div>
    </div>
  )
}

export function DigitalVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[430px] bg-paper-50 text-ink-900 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.75)]">
        {/* Browser chrome stays visible: it is the blank page that gets filled in. */}
        <div className="flex items-center gap-2 border-b border-ink-900/10 bg-white px-3 py-2.5 sm:px-4">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-ink-200" />
            <span className="size-1.5 rounded-full bg-ink-200" />
            <span className="size-1.5 rounded-full bg-ink-200" />
          </span>
          <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 border border-paper-200 bg-paper-50 px-2 py-1">
            <span className="size-1 rounded-full bg-brand-500" aria-hidden="true" />
            <span className="truncate text-[8px] text-ink-400">yourbusiness.com</span>
          </span>
        </div>

        <div className="px-4 py-4 sm:px-5 sm:py-5">
          <div data-j-part className="flex items-center justify-between gap-4">
            <span className="font-display text-sm leading-none text-ink-950">S/N</span>
            <div className="flex items-center gap-3">
              <span className="text-[8px] text-ink-500">Work</span>
              <span className="text-[8px] text-ink-500">Services</span>
              <span className="text-[8px] text-ink-500">Contact</span>
              <span className="bg-ink-950 px-2 py-1 text-[7px] font-semibold text-white">Enquire</span>
            </div>
          </div>

          <div className="mt-5 grid items-end gap-4 sm:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p data-j-part className="text-[7px] font-semibold tracking-[0.18em] text-brand-700 uppercase">
                Built for what comes next
              </p>
              <p
                data-j-part
                className="mt-2 font-display text-[1.55rem] leading-[1.02] tracking-[-0.02em] text-ink-950"
              >
                A business
                <br />
                built to last.
              </p>
              <div data-j-part className="mt-3 space-y-1.5">
                <span className="block h-1 w-full bg-ink-900/10" />
                <span className="block h-1 w-4/5 bg-ink-900/10" />
              </div>
              <div data-j-part className="mt-4 inline-flex items-center gap-2 bg-ink-950 px-3 py-2">
                <span className="text-[7px] font-semibold tracking-[0.1em] text-white uppercase">
                  Start a conversation
                </span>
                <span className="h-px w-3 bg-brand-300" aria-hidden="true" />
              </div>
            </div>

            <div
              data-j-part
              className="relative flex aspect-[4/3] items-end overflow-hidden border border-ink-900/10 bg-brand-800 p-3"
            >
              <span
                aria-hidden="true"
                className="absolute -top-5 -right-2 font-display text-[5rem] leading-none text-brand-300/30 italic"
              >
                S
              </span>
              <div className="relative w-full">
                <span className="block h-px w-full bg-brand-100/30" />
                <div className="mt-2 flex items-end justify-between gap-2">
                  <span className="text-[6px] font-semibold tracking-[0.14em] text-brand-100 uppercase">
                    Digital presence
                  </span>
                  <span className="size-1.5 bg-brand-300" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-900/10 pt-3">
            {['Design', 'Build', 'Grow'].map((item, index) => (
              <div key={item} data-j-part className="flex items-center gap-1.5">
                <span className="text-[7px] text-ink-400 tabular-nums">0{index + 1}</span>
                <span className="text-[8px] font-medium text-ink-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BrandVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid w-full max-w-[400px] grid-cols-2 gap-2.5">
        <div
          data-j-brand
          className="col-span-2 flex aspect-[2.4/1] items-center justify-between gap-4 bg-ink-950 px-5 py-4 text-white"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-white/20 font-display text-base">
              SN
            </span>
            <div>
              <p className="font-display text-[15px] leading-none">Shifra Nuha</p>
              <p className="mt-1.5 text-[7px] tracking-[0.18em] text-white/50 uppercase">
                Technologies
              </p>
            </div>
          </div>
          <span className="font-display text-3xl leading-none text-brand-300 italic" aria-hidden="true">
            S.
          </span>
        </div>

        <div data-j-brand className="border border-ink-900/10 bg-white p-3">
          <p className="text-[7px] font-semibold tracking-[0.16em] text-ink-400 uppercase">Palette</p>
          <div className="mt-3 grid grid-cols-4 gap-1">
            {['bg-ink-950', 'bg-brand-700', 'bg-paper-200', 'bg-white border border-paper-300'].map(
              (tone) => (
                <span key={tone} className={`aspect-square ${tone}`} aria-hidden="true" />
              ),
            )}
          </div>
          <p className="mt-2 text-[7px] text-ink-400">Navy / Teal / Sand / White</p>
        </div>

        <div data-j-brand className="border border-ink-900/10 bg-paper-50 p-3">
          <p className="text-[7px] font-semibold tracking-[0.16em] text-ink-400 uppercase">Type</p>
          <p className="mt-2 font-display text-3xl leading-none text-ink-950">Aa</p>
          <p className="mt-1.5 text-[7px] leading-relaxed text-ink-500">
            Fraunces
            <br />
            Inter
          </p>
        </div>

        <div data-j-brand className="col-span-2 grid grid-cols-[1.25fr_0.75fr] gap-2.5">
          <div className="flex aspect-[1.55/1] flex-col justify-between bg-brand-800 p-3 text-white">
            <div className="flex items-start justify-between gap-2">
              <span className="font-display text-[13px] leading-none">SN</span>
              <span className="text-[6px] tracking-[0.14em] text-white/50 uppercase">Card</span>
            </div>
            <div>
              <p className="font-display text-[11px] leading-none">Shifra Nuha</p>
              <p className="mt-1 text-[6px] text-white/60">shifranuhatech.com</p>
            </div>
          </div>

          <div className="relative aspect-[1.55/1] overflow-hidden border border-ink-900/10 bg-white p-3">
            <span className="block h-1 w-5 bg-brand-700" />
            <p className="mt-2 font-display text-[9px] leading-none text-ink-900">Shifra Nuha</p>
            <div className="mt-3 space-y-1">
              <span className="block h-px w-full bg-ink-900/10" />
              <span className="block h-px w-5/6 bg-ink-900/10" />
              <span className="block h-px w-2/3 bg-ink-900/10" />
            </div>
            <span className="absolute right-2 bottom-2 text-[6px] tracking-[0.12em] text-ink-300 uppercase">
              Letterhead
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const journeyVisuals = {
  register: RegistrationVisual,
  comply: ComplianceVisual,
  'go-digital': DigitalVisual,
  brand: BrandVisual,
} as const
