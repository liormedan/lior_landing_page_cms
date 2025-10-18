"use client"

import { useState } from "react"

type Tab = {
  id: string
  label: string
}

export default function ExplainerTabs() {
  const tabs: Tab[] = [
    { id: "why-cms", label: "למה CMS לעסק שלך?" },
    { id: "platforms", label: "פלטפורמות מומלצות" },
  ]

  const [active, setActive] = useState<string>(tabs[0].id)

  return (
    <section aria-labelledby="explainer-heading" className="py-16" lang="he" dir="rtl">
      <div className="lp-container">
        <header className="mb-8 text-center">
          <h2 id="explainer-heading" className="text-3xl font-bold">
            כל מה שצריך לדעת על CMS לעסק
          </h2>
          <p className="mt-2 text-slate-600 dark:text-white/80">
            סקירה קצרה על יתרונות ופלטפורמות נפוצות
          </p>
        </header>

        <div className="mx-auto max-w-4xl text-right">
          <div
            role="tablist"
            aria-label="Explainer tabs"
            className="flex flex-wrap gap-2 justify-center"
          >
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
                  className={`px-4 py-2 rounded-lg border transition text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-slate-700/40 ${
                    selected
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-slate-300 dark:border-white/30 hover:bg-slate-50 dark:hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="mt-6 space-y-6">
            {/* למה CMS לעסק שלך? */}
            <div
              role="tabpanel"
              id="panel-why-cms"
              aria-labelledby="tab-why-cms"
              hidden={active !== "why-cms"}
              className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">למה CMS לעסק שלך?</h3>
              <ul className="list-disc pr-5 space-y-2 text-slate-700 dark:text-white/90">
                <li>שליטה מלאה — עדכנו דפים, בלוג, מוצרים ונכסים דיגיטליים ללא קוד.</li>
                <li>גמישות בזמן אמת — מבני תוכן מודולריים, קומפוננטות ניתנות לשילוב ושינוי מהיר.</li>
                <li>התאמה אישית — UI/UX לפי המותג, קומפוננטות תוכן ותבניות לעורכים.</li>
                <li>ניהול מכל מקום — ממשק ענן מאובטח, הרשאות צוות וזרימות אישור.</li>
                <li>SEO מובנה — מטא-דאטה, סלאגים, סכמה ופרוויו חברתי — מוכנים לקידום.</li>
              </ul>

              <div className="mt-6 flex gap-3 justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2 text-white hover:bg-slate-800 transition"
                >
                  צור/י קשר לייעוץ חינם
                </a>
              </div>
            </div>

            {/* פלטפורמות מומלצות */}
            <div
              role="tabpanel"
              id="panel-platforms"
              aria-labelledby="tab-platforms"
              hidden={active !== "platforms"}
              className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">פלטפורמות מומלצות</h3>
              <ul className="space-y-3 text-slate-700 dark:text-white/90">
                <li>
                  <span className="font-semibold">Sanity</span> — Headless גמיש במיוחד, תוכן כשירות, סכמות TypeScript ואינטגרציות עשירות.
                </li>
                <li>
                  <span className="font-semibold">WordPress</span> — אקוסיסטם עצום, מאות תוספים, מתאים לבלוגים ואתרי תוכן קלאסיים.
                </li>
                <li>
                  <span className="font-semibold">Wix</span> — הקמה מהירה, עורך ויזואלי נוח, פתרון כולל לעסקים קטנים.
                </li>
                <li>
                  <span className="font-semibold">Drupal</span> — יציב ומאובטח לארגונים, מבני תוכן מורכבים והרשאות מתקדמות.
                </li>
              </ul>

              <div className="mt-6 flex gap-3 justify-start">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2 text-slate-700 hover:bg-slate-50 transition dark:border-white/40 dark:text-white dark:hover:bg-white/10"
                >
                  קבל/י הצעה לפרויקט מותאם
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
