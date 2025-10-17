export default function PackageCompare() {
  const features: { key: string; label: string; landing?: boolean | string; blog?: boolean | string }[] = [
    { key: 'conv', label: 'עיצוב ממוקד המרה', landing: true, blog: true },
    { key: 'sanity', label: 'ניהול תוכן ב‑Sanity', landing: true, blog: true },
    { key: 'rtl', label: 'RTL ונגישות AA', landing: true, blog: true },
    { key: 'posts', label: 'בלוג/דפי פוסטים', landing: 'אופציונלי', blog: true },
    { key: 'sections', label: 'עמודי מידע/סקשנים', landing: true, blog: true },
    { key: 'leads', label: 'טפסי לידים + שליחת מייל', landing: true, blog: true },
    { key: 'seo', label: 'SEO טכני (Sitemap/OG/Meta)', landing: true, blog: true },
    { key: 'eta', label: 'זמן אספקה משוער', landing: '4–6 שבועות', blog: '6–8 שבועות' },
    { key: 'support', label: 'תמיכה בהשקה', landing: true, blog: true },
  ]

  const Check = () => (
    <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )

  const Cell = ({ value }: { value?: boolean | string }) => {
    if (value === true) return <Check />
    if (value === false || value === undefined) return <span className="text-slate-400">—</span>
    return <span className="text-slate-100">{value}</span>
  }

  return (
    <section className="py-16" aria-labelledby="compare-heading">
      <div className="lp-container">
        <h2 id="compare-heading" className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
          השוואת חבילות — מינימום טקסט, מקסימום תועלת
        </h2>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 shadow-[0_25px_60px_rgba(15,23,42,0.35)]">
          <table className="min-w-[720px] w-full text-right text-sm text-white/90">
            <thead>
              <tr className="text-white/70">
                <th className="px-4 py-3 text-xs font-semibold tracking-wide">מה מקבלים</th>
                <th className="px-4 py-3 text-center text-sm font-bold">דף נחיתה</th>
                <th className="px-4 py-3 text-center text-sm font-bold">בלוג</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {features.map((f) => (
                <tr key={f.key}>
                  <td className="px-4 py-3 text-white/90">{f.label}</td>
                  <td className="px-4 py-3 text-center">
                    <Cell value={f.landing} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell value={f.blog} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-blue-700/90 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-blue-800/90"
              aria-label="קבלת הצעה לדף נחיתה"
            >
              קבלת הצעה — נחיתה
            </a>
            <a
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              aria-label="מדריך לבלוג"
            >
              מדריך — בלוג
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

