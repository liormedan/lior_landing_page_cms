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
      <section id="contact" className="py-24" aria-labelledby="contact-heading">
        <div className="lp-container">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-[0_40px_80px_rgba(15,23,42,0.4)]">
            <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6 text-right">
                <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-200">
                  ׳©׳™׳—׳× ׳”׳×׳׳׳” ׳¨׳׳©׳•׳ ׳™׳× ג€“ ׳׳׳ ׳¢׳׳•׳× ׳•׳׳׳ ׳”׳×׳—׳™׳™׳‘׳•׳×
                </span>
                <h2
                  id="contact-heading"
                  className="text-3xl font-bold leading-tight sm:text-4xl"
                >
                  ׳‘׳•׳׳• ׳ ׳©׳¨׳˜׳˜ ׳™׳—׳“ ׳׳× ׳”׳¦׳¢׳“ ׳”׳‘׳ ׳©׳ ׳”׳׳×׳¨ ׳©׳׳›׳
                </h2>
                <p className="text-base leading-relaxed text-slate-200">
                  ׳”׳©׳™׳—׳” ׳”׳¨׳׳©׳•׳ ׳” ׳ ׳׳©׳›׳× ׳›-30 ׳“׳§׳•׳×. ׳ ׳‘׳™׳ ׳׳× ׳”׳™׳¢׳“׳™׳, ׳ ׳‘׳“׳•׳§ ׳׳™׳׳• ׳×׳›׳ ׳™׳ ׳§׳™׳™׳׳™׳, ׳׳™׳׳• ׳—׳™׳‘׳•׳¨׳™׳ ׳ ׳“׳¨׳©׳™׳ ׳•׳ ׳¨׳׳” ׳׳ ׳׳ ׳—׳ ׳• ׳”׳¦׳•׳•׳× ׳”׳ ׳›׳•׳ ׳׳׳©׳™׳׳”. ׳׳׳—׳¨ ׳׳›׳ ׳ ׳§׳‘׳ ׳׳›׳
                  ׳—׳•׳׳¨׳™ ׳¨׳§׳¢ ׳׳‘׳ ׳™׳™׳× ׳”׳¦׳¢׳” ׳׳₪׳•׳¨׳˜׳×.
                </p>

                <ul className="space-y-3 text-sm leading-relaxed text-slate-200" role="list">
                  <li className="flex items-start gap-2 justify-start" role="listitem">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-blue-700/70" aria-hidden="true" />
                    <span>׳¡׳§׳™׳¨׳” ׳§׳¦׳¨׳” ׳©׳ ׳”׳׳¦׳‘ ׳”׳ ׳•׳›׳—׳™, ׳׳¢׳¨׳›׳•׳× ׳§׳™׳™׳׳•׳× ׳•׳׳•׳—׳•׳× ׳–׳׳ ׳™׳.</span>
                  </li>
                  <li className="flex items-start gap-2 justify-start" role="listitem">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-blue-700/70" aria-hidden="true" />
                    <span>׳”׳“׳’׳׳× Sanity ׳•-Next.js ׳¢׳ ׳׳§׳¨׳™ ׳‘׳•׳—׳ ׳“׳•׳׳™׳ ׳׳₪׳¨׳•׳™׳§׳˜ ׳©׳׳›׳.</span>
                  </li>
                  <li className="flex items-start gap-2 justify-start" role="listitem">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-blue-700/70" aria-hidden="true" />
                    <span>׳”׳×׳׳׳” ׳׳׳¡׳׳•׳ ׳”׳¢׳‘׳•׳“׳” ׳•׳”׳—׳‘׳™׳׳” ׳©׳”׳›׳™ ׳׳×׳׳™׳׳™׳ ׳׳¦׳•׳•׳× ׳©׳׳›׳.</span>
                  </li>
                </ul>

                {selectedPackage && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                    ׳”׳—׳‘׳™׳׳” ׳©׳ ׳‘׳—׳¨׳”: {selectedPackage}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-4 sm:flex-row-reverse sm:justify-center sm:items-center">
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    ׳§׳‘׳™׳¢׳× ׳©׳™׳—׳× ׳”׳™׳›׳¨׳•׳×
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

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
  <h3 className="text-lg font-semibold text-white text-center">שיחת התאמה ראשונית – ללא עלות וללא התחייבות</h3>
  <p className="mt-2 text-center text-slate-200">בואו נשרטט יחד את הצעד הבא של האתר שלכם</p>
  <p className="mt-2 text-center text-slate-200">
    השיחה הראשונה נמשכת כ-30 דקות. נבין את היעדים, נבדוק אילו תכנים קיימים, אילו חיבורים נדרשים
    ונראה אם אנחנו הצוות הנכון למשימה. לאחר מכן נקבל מכם חומרי רקע לבניית הצעה מפורטת.
  </p>
  <div className="mt-4 space-y-2 text-center text-slate-200">
    <p>סקירה קצרה של המצב הנוכחי, מערכות קיימות ולוחות זמנים.</p>
    <p>הדגמת Sanity ו‑Next.js עם מקרי בוחן דומים לפרויקט שלכם.</p>
    <p>התאמה למסלול העבודה והחבילה שהכי מתאימים לצוות שלכם.</p>
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


