"use client"

import { useState } from "react"

type Tab = {
  id: string
  label: string
  summary: string
  points: string[]
}

const TABS: Tab[] = [
  {
    id: "process",
    label: "תהליך קצה‑לקצה",
    summary: "אני מפתח מלווה תהליך מלא: אפיון, עיצוב, פיתוח ופריסה.",
    points: [
      "אפיון צרכים והגדרת מטרות ברורות",
      "עיצוב UI/UX ממוקד המרה",
      "פיתוח Next.js מודרני עם סטנדרטים גבוהים",
      "פריסה מהירה לסביבות ענן (Vercel) ומסירה נקייה",
    ],
  },
  {
    id: "stack",
    label: "Stack מודרני",
    summary:
      "Stack מודרני לגמישות: ניהול תוכן בזמן אמת ואינטגרציות ל‑CRM/BI.",
    points: [
      "Sanity CMS לעריכה בזמן אמת עם טיוטות ופרסום",
      "אינטגרציות ל‑CRM/BI וכלי שיווק (Webhook/API)",
      "סכמה וגידול תוכן גמישים לאורך זמן",
      "תהליכי Preview ו‑Draft מיידיים לצוותי תוכן",
    ],
  },
  {
    id: "go‑to‑market",
    label: "מוכן לשיווק",
    summary: "נגיש, מהיר ומוכן לשיווק מהרגע הראשון.",
    points: [
      "ביצועים גבוהים (Lighthouse/ Core Web Vitals)",
      "RTL ונגישות ברמת AA כברירת מחדל",
      "SEO טכני: Sitemap, OpenGraph, מטא‑דאטה",
      "אוטומציות לידים: טופס + שליחת מייל ללקוח",
    ],
  },
]

export default function ExplainerTabs() {
  const [active, setActive] = useState<Tab["id"]>(TABS[0].id)
  const current = TABS.find((t) => t.id === active) ?? TABS[0]

  return (
    <section className="py-12" aria-labelledby="explainer-heading">
      <div className="lp-container">
        <h2 id="explainer-heading" className="sr-only">
          פירוט יכולות לפי נושאים
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition border focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                active === tab.id
                  ? "bg-blue-700/90 text-white border-blue-700/60"
                  : "bg-transparent text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
              }`}
              aria-pressed={active === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
            {current.summary}
          </p>
          <ul className="mt-6 space-y-2 text-slate-700 dark:text-slate-200" role="list">
            {current.points.map((p) => (
              <li key={p} className="flex items-center justify-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-700/90" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

