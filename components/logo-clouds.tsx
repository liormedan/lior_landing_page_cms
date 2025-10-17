export default function LogoClouds() {
  const items = [
    {
      name: 'Next.js',
      aria: 'Next.js logo',
      render: (
        <div className="flex items-center justify-center gap-3">
          <span className="sr-only">Next.js</span>
          <span className="text-xl font-black tracking-widest">NEXT</span>
          <span className="text-xl font-black">.JS</span>
        </div>
      ),
    },
    {
      name: 'Sanity',
      aria: 'Sanity logo',
      render: (
        <div className="flex items-center justify-center">
          <span className="sr-only">Sanity</span>
          <span className="text-xl font-extrabold">Sanity</span>
        </div>
      ),
    },
    {
      name: 'Vercel',
      aria: 'Vercel logo',
      render: (
        <div className="flex items-center justify-center gap-3">
          <span className="sr-only">Vercel</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <polygon points="12,3 22,20 2,20" className="fill-current" />
          </svg>
          <span className="text-xl font-semibold">Vercel</span>
        </div>
      ),
    },
    {
      name: 'Tailwind CSS',
      aria: 'Tailwind CSS logo',
      render: (
        <div className="flex items-center justify-center gap-3">
          <span className="sr-only">Tailwind CSS</span>
          <svg className="h-5 w-8" viewBox="0 0 48 24" aria-hidden="true">
            <path
              d="M12 6c4 0 5-4 10-4 5 0 6 4 10 4 3 0 4-1 6-2-2 5-5 8-10 8-5 0-6-4-10-4-5 0-6 4-10 4-3 0-4-1-6-2 2-5 5-8 10-8z"
              className="fill-current"
            />
          </svg>
          <span className="text-xl font-semibold">Tailwind</span>
        </div>
      ),
    },
    {
      name: 'React',
      aria: 'React logo',
      render: (
        <div className="flex items-center justify-center gap-3">
          <span className="sr-only">React</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="2" className="fill-current" />
            <ellipse cx="12" cy="12" rx="9" ry="4" className="fill-none stroke-current" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" className="fill-none stroke-current" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" className="fill-none stroke-current" strokeWidth="1.5" />
          </svg>
          <span className="text-xl font-semibold">React</span>
        </div>
      ),
    },
    {
      name: 'TypeScript',
      aria: 'TypeScript logo',
      render: (
        <div className="flex items-center justify-center gap-2">
          <span className="sr-only">TypeScript</span>
          <span className="inline-flex items-center justify-center rounded bg-white/10 px-2 py-0.5 text-sm font-bold">TS</span>
          <span className="text-xl font-semibold">TypeScript</span>
        </div>
      ),
    },
    {
      name: 'shadcn/ui',
      aria: 'shadcn UI logo',
      render: (
        <div className="flex items-center justify-center">
          <span className="sr-only">shadcn/ui</span>
          <span className="text-xl font-semibold">shadcn/ui</span>
        </div>
      ),
    },
  ] as const

  return (
    <section aria-labelledby="logo-clouds-heading" className="py-12">
      <div className="lp-container">
        <h2 id="logo-clouds-heading" className="sr-only">
          הטכנולוגיות בהן האתר נבנה
        </h2>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.35)]">
          <div className="grid items-center gap-6 text-center text-white/90 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
            {items.map((logo) => (
              <div
                key={logo.name}
                className="mx-auto flex w-full items-center justify-center rounded-2xl bg-white/5 p-6 text-white/90 shadow-inner ring-1 ring-white/10 hover:bg-white/10 transition"
                aria-label={logo.aria}
              >
                {logo.render}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
