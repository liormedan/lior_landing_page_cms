const plans = ['Essential', 'Growth', 'Scale'] as const

const rows = [
  { label: 'מספר המקטעים הכלולים', values: ['עד 5', 'עד 10', 'מותאם אישית'] },
  { label: 'עיצוב מותאם מותג ו-RTL מוקפד', values: ['כלול', 'כלול', 'כלול + מותאם למספר מותגים'] },
  { label: 'ספריית רכיבים חוזרים', values: ['בסיסית', 'מורחבת לפי קמפיינים', 'מותאמת אישית'] },
  { label: 'חיבורי CRM ודיוור', values: ['חיבור אחד', 'עד שלושה חיבורים + אוטומציות', 'חיבורים ללא הגבלה + API ייעודי'] },
  { label: 'A/B Testing', values: ['לא כלול', 'כלול', 'כלול עם ליווי מתמשך'] },
  { label: 'Headless CMS מלא', values: ['Partial Sanity', 'Sanity עם הרשאות וצוותים', 'תשתית Headless מלאה + Workflows'] },
  { label: 'דוחות אנליטיקה ותיוג המרות', values: ['Google Analytics בסיסי', 'GA4 + Looker Studio', 'BI מותאם + Data Warehouse'] },
  { label: 'ליווי ותמיכה לאחר ההשקה', values: ['שבועיים', 'חודש כולל QA מתמשך', 'ריטיינר ושעות DevOps'] },
  { label: 'נגישות ועמידה ב-WCAG', values: ['AA בסיסי', 'AA עם בדיקות נגיעות', 'AAA מותאם וברמת ארגון'] },
]

const callToActions = [
  { plan: 'Essential', label: 'דברו איתי על Essential' },
  { plan: 'Growth', label: 'הציגו לי את Growth' },
  { plan: 'Scale', label: 'נקבע פגישה ל-Scale' },
]

export default function PackageCompare() {
  return (
    <section className="py-16" aria-labelledby="compare-heading" lang="he" dir="rtl">
      <div className="lp-container">
        <h2 id="compare-heading" className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
          השוואת יכולות החבילות
        </h2>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_16px_32px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <table className="w-full min-w-[860px] text-right text-sm text-slate-800 dark:text-white/85">
            <thead className="bg-slate-50 dark:bg-transparent">
              <tr className="text-slate-700 dark:text-white/70">
                <th className="px-4 py-3 text-xs font-semibold tracking-wide">מאפיין</th>
                {plans.map((plan) => (
                  <th key={plan} className="px-4 py-3 text-center text-sm font-bold">
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {rows.map((row, index) => (
                <tr key={row.label} className={index % 2 === 0 ? 'bg-slate-50/40 dark:bg-transparent' : ''}>
                  <td className="px-4 py-3 text-slate-800 dark:text-white">{row.label}</td>
                  {row.values.map((value, valueIndex) => (
                    <td key={`${row.label}-${plans[valueIndex]}`} className="px-4 py-3 text-center">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {callToActions.map((cta) => (
              <a
                key={cta.plan}
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700"
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

