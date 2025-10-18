export default function PackageCompare() {
  const Check = () => (
    <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
  const X = () => <span className="text-slate-400">—</span>

  return (
    <section className="py-16" aria-labelledby="compare-heading">
      <div className="lp-container">
        <h2 id="compare-heading" className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
          השוואת חבילות — פרטים טכניים בקצרה
        </h2>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_16px_32px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <table className="min-w-[820px] w-full text-right text-sm text-slate-800 dark:text-white/90">
            <thead className="bg-slate-50 dark:bg-transparent">
              <tr className="text-slate-700 dark:text-white/70">
                <th className="px-4 py-3 text-xs font-semibold tracking-wide">מה מקבלים</th>
                <th className="px-4 py-3 text-center text-sm font-bold">Starter</th>
                <th className="px-4 py-3 text-center text-sm font-bold">Growth</th>
                <th className="px-4 py-3 text-center text-sm font-bold">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">כמות דפים</td>
                <td className="px-4 py-3 text-center">עד 5</td>
                <td className="px-4 py-3 text-center">עד 12</td>
                <td className="px-4 py-3 text-center">לפי אפיון</td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">בלוג/קטלוג תכנים</td>
                <td className="px-4 py-3 text-center">אופציונלי</td>
                <td className="px-4 py-3 text-center"><Check /></td>
                <td className="px-4 py-3 text-center"><Check /></td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">קומפוננטות תוכן מודולריות</td>
                <td className="px-4 py-3 text-center"><Check /></td>
                <td className="px-4 py-3 text-center"><Check /></td>
                <td className="px-4 py-3 text-center">מותאם אישית</td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">SEO (Meta/OG/Sitemap)</td>
                <td className="px-4 py-3 text-center">בסיסי</td>
                <td className="px-4 py-3 text-center">מתקדם</td>
                <td className="px-4 py-3 text-center">מותאם</td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">ביצועים ו‑Best Practices</td>
                <td className="px-4 py-3 text-center"><Check /></td>
                <td className="px-4 py-3 text-center">טיוב</td>
                <td className="px-4 py-3 text-center">עמידה ביעדים</td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">אינטגרציות (CRM/מייל/טפסים)</td>
                <td className="px-4 py-3 text-center">בסיסיות</td>
                <td className="px-4 py-3 text-center">פופולריות</td>
                <td className="px-4 py-3 text-center">מתקדמות + API</td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">Headless CMS</td>
                <td className="px-4 py-3 text-center"><X /></td>
                <td className="px-4 py-3 text-center">לפי צורך</td>
                <td className="px-4 py-3 text-center"><Check /></td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">הרשאות / Review & Publish</td>
                <td className="px-4 py-3 text-center"><X /></td>
                <td className="px-4 py-3 text-center">בסיסי</td>
                <td className="px-4 py-3 text-center">מלא</td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">לוקליזציה / סקיילינג / אבטחה</td>
                <td className="px-4 py-3 text-center"><X /></td>
                <td className="px-4 py-3 text-center">לפי צורך</td>
                <td className="px-4 py-3 text-center">מוכלל</td>
              </tr>
              <tr className="odd:bg-slate-50/40 dark:odd:bg-transparent">
                <td className="px-4 py-3">RTL ונגישות AA</td>
                <td className="px-4 py-3 text-center"><Check /></td>
                <td className="px-4 py-3 text-center"><Check /></td>
                <td className="px-4 py-3 text-center"><Check /></td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700">
              בקשת הצעה — Starter
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700">
              בחירת Growth
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700">
              שיחה ל‑Pro
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

