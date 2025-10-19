"use client"

import { useState } from "react"

type Tab = {
  id: string
  label: string
}

export default function ExplainerTabs() {
  const tabs: Tab[] = [
    { id: "why-cms", label: "למה לבחור ב-CMS חכם?" },
    { id: "process", label: "איך נראה התהליך המלא?" },
  ]

  const [active, setActive] = useState<string>(tabs[0].id)

  return (
    <section aria-labelledby="explainer-heading" className="py-16" lang="he" dir="rtl">
      <div className="lp-container">
        <header className="mb-8 text-center">
          <h2 id="explainer-heading" className="text-3xl font-bold text-slate-900 dark:text-white">
            להבין את הערך לפני שמתחילים
          </h2>
          <p className="mt-2 text-slate-600 dark:text-white/80">
            שני טאבס זריזים שמסבירים מה מקבלים ולמה התהליך שלנו מאפשר ללקוחות לפעול מהר.
          </p>
        </header>

        <div className="mx-auto max-w-4xl text-right">
          <div role="tablist" aria-label="Explainer tabs" className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const selected = tab.id === active
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActive(tab.id)}
                  className={`rounded-lg border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-slate-700/40 md:text-base ${
                    selected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-white/30 dark:bg-slate-900 dark:text-white dark:hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="mt-6 space-y-6">
            <ExplainerPanel active={active === "why-cms"} id="why-cms">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">למה לבחור ב-CMS חכם?</h3>
              <ul className="mt-4 space-y-2 text-slate-700 dark:text-white/90" role="list">
                <li>
                  <strong>עדכונים בלייב:</strong> השקות מוצרים, מבצעים ותוכן חדש בתוך דקות, כולל גרסאות וטפסים מותאמים.
                </li>
                <li>
                  <strong>מדידה מלאה:</strong> כל פעולה מסומנת באנליטיקה, תיוגי המרות והזרמה ל-CRM – אין יותר אקסלים ידניים.
                </li>
                <li>
                  <strong>חוויית משתמש עברית:</strong> RTL מוקפד, טיפוגרפיה מותאמת ונגישות כדי שכל מבקר יבין את ההצעה במהירות.
                </li>
                <li>
                  <strong>גמישות אמיתית:</strong> בונים וריאציות A/B, טפסים ותסריטים שיווקיים בלי לערב מתכנת בכל שינוי.
                </li>
              </ul>
            </ExplainerPanel>

            <ExplainerPanel active={active === "process"} id="process">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">איך נראה התהליך המלא?</h3>
              <ol className="mt-4 list-decimal space-y-2 pr-5 text-slate-700 dark:text-white/90">
                <li>
                  <strong>פגישת אפיון קצרה:</strong> מגדירים מסר חד, הצעת ערך, קהלים ויעדי מדידה. תוך יומיים מקבלים קופי ראשוני.
                </li>
                <li>
                  <strong>עיצוב ו-UX:</strong> סטודיו הבית מייצר ויז׳ואל מלא + התאמות מובייל. מקבלים לינק Figma לאישור.
                </li>
                <li>
                  <strong>פיתוח ואוטומציות:</strong> בונים ב-Next.js, מקימים את Sanity ומחברים ל-CRM, דיוור ופייסבוק פיקסל.
                </li>
                <li>
                  <strong>השקה ותמיכה:</strong> הדרכות מוקלטות, QA, בדיקות Lighthouse ו-Analytics. ליווי לשבועיים אחרי העלייה.
                </li>
              </ol>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#demo"
                  className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  צפו בדמו של ניהול התוכן
                </a>
                <a
                  href="#contact"
                  className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                >
                  דברו איתנו על התהליך
                </a>
              </div>
            </ExplainerPanel>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExplainerPanel({
  children,
  active,
  id,
}: {
  children: React.ReactNode
  active: boolean
  id: string
}) {
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      hidden={!active}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
    >
      {children}
    </div>
  )
}

