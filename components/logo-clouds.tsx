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
  ] as const

  return (
    <section aria-labelledby="logo-clouds-heading" className="py-12">
      <div className="lp-container">
        <h2 id="logo-clouds-heading" className="sr-only">
          הטכנולוגיות בהן האתר נבנה
        </h2>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.35)]">
          <div className="grid items-center gap-8 text-center text-white/90 sm:grid-cols-3">
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

