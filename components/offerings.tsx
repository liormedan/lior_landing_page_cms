"use client"

import Link from "next/link"
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation"

export default function Offerings() {
  const items = [
    {
      id: "landing",
      title: "דף נחיתה מעוצב",
      summary: "דף ממוקד המרה, מהיר ו‑RTL, עם ניהול תוכן מלא.",
      features: [
        "חיבור מלא ל‑Sanity CMS",
        "עיצוב מותאם לפי בריף הלקוח",
        "טופס לידים + שליחת מייל ללקוח מהאתר",
      ],
      cta: "קבל/י הצעה",
    },
    {
      id: "blog",
      title: "בלוג מעוצב",
      summary: "בלוג מהיר עם SEO מצוין, נגיש וקל לעדכון.",
      features: [
        "ניהול פוסטים ב‑Sanity (טיוטה/פרסום/קטגוריות)",
        "עיצוב קריא + תמונות וכותרות עשירות",
        "טופס יצירת קשר + שליחת מייל ללקוח מהאתר",
      ],
      cta: "פתח/י שיחה",
    },
  ] as const

  const { containerRef, visibleItems } = useStaggeredAnimation(items.length, 120)

  return (
    <section id="offerings" className="py-20" aria-labelledby="offerings-heading">
      <div className="lp-container">
        <header className="mb-10 text-center">
          <h2 id="offerings-heading" className="text-3xl font-bold">מה אני מציע</h2>
          <p className="text-slate-600 dark:text-white/80">שתי החבילות ברורות — נחיתה או בלוג — עם CMS ותמיכה מלאה.</p>
        </header>

        <div ref={containerRef} className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 text-center shadow-sm transition-all duration-500 will-change-transform motion-safe:transform ${
                visibleItems.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } hover:shadow-md hover:-translate-y-0.5`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center">{item.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-white/90 text-center">{item.summary}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-center" role="list">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center justify-center gap-2" role="listitem">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-700/70" aria-hidden="true" />
                    <span className="text-slate-700 dark:text-white">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3 justify-center">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-700/90 px-5 py-2 text-white hover:bg-blue-800/90 transition"
                  aria-label={item.cta}
                >
                  {item.cta}
                </Link>
                {item.id === "blog" && (
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2 text-slate-700 hover:bg-slate-50 transition dark:border-white/40 dark:text-white dark:hover:bg-white/10"
                    aria-label="דוגמאות"
                  >
                    דוגמאות
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
