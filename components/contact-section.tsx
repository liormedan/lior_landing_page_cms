'use client'

import { useState } from 'react'
import ContactModal from './contact-modal'

interface ContactSectionProps {
  selectedPackage?: string
}

export default function ContactSection({ selectedPackage }: ContactSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <section id="contact" className="py-24" aria-labelledby="contact-heading" lang="he" dir="rtl">
        <div className="lp-container">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-[0_40px_80px_rgba(15,23,42,0.4)]">
            <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6 text-right">
                <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
                  מתחילים שיחה קלה
                </span>
                <h2 id="contact-heading" className="text-3xl font-bold leading-tight sm:text-4xl">
                  נבנה יחד דף נחיתה שמייצר פעולה
                </h2>
                <p className="text-base leading-relaxed text-slate-200">
                  השאירו פרטים ונחזור אליכם תוך יום עסקים אחד עם חומרים להצעת מחיר או תיאום פגישה. אין התחייבות, רק בדיקה אם יש התאמה.
                </p>

                <ul className="space-y-3 text-sm leading-relaxed text-slate-200" role="list">
                  <li className="flex items-start justify-start gap-2" role="listitem">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-slate-900/70" aria-hidden="true" />
                    <span>תהליך קצר: שיחת היכרות, אפיון ממוקד, עיצוב ופיתוח תוך שבועיים.</span>
                  </li>
                  <li className="flex items-start justify-start gap-2" role="listitem">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-slate-900/70" aria-hidden="true" />
                    <span>כולל חיבור ל-CRM, מסעות דיוור, אנליטיקה, SEO ו-A/B Testing לפי הצורך.</span>
                  </li>
                  <li className="flex items-start justify-start gap-2" role="listitem">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-slate-900/70" aria-hidden="true" />
                    <span>מסירת תוצרים מלאה: תסריטים, עיצוב, טופס לידים, הדרכה ומסמכי hand-off.</span>
                  </li>
                </ul>

                {selectedPackage && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                    חבילת עניין: {selectedPackage}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-4 sm:flex-row-reverse sm:items-center sm:justify-center">
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    שלחו לי פרטים
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5l8 7-8 7" />
                    </svg>
                  </button>
                  <a
                    href="tel:+972501234567"
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    050-123-4567
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-right backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white text-center">מה קורה בשיחת ההיכרות?</h3>
                <p className="mt-2 text-center text-slate-200">
                  שיחה של כ-30 דקות שבה נבחן התאמה, נעבור על היעדים ונראה דפי נחיתה רלוונטיים.
                </p>
                <div className="mt-4 space-y-2 text-center text-slate-200">
                  <p>הגדרת קהל ומסר חד שמוביל לפעולה.</p>
                  <p>סקירה של פתרונות RTL, חיבורים ו-A/B Testing.</p>
                  <p>שאלות פתוחות על תקציב, לוחות זמנים ותמיכה לאחר ההשקה.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} selectedPackage={selectedPackage} />
    </>
  )
}

