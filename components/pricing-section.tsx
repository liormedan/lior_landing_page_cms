'use client'

import { useState } from 'react'
import { PricingPackage } from '@/types/landing-page'
import ContactForm from './contact-form'

interface PricingSectionProps {
  packages: PricingPackage[]
}

export default function PricingSection({ packages }: PricingSectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName)
    setShowContactForm(true)
  }

  const handleCloseContactForm = () => {
    setSelectedPackage(null)
    setShowContactForm(false)
  }

  return (
    <section id="pricing" className="bg-slate-50 py-24" aria-labelledby="pricing-heading">
      <div className="lp-container">
        <div className="mx-auto max-w-3xl text-right">
          <span className="inline-flex items-center justify-center rounded-full bg-sky-100/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            מסלולים גמישים שמתאימים לגודל הצוות שלכם
          </span>
          <h2
            id="pricing-heading"
            className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
          >
            בחרו את ההיקף שמתאים לפרויקט וליעדים שלכם
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            כל חבילה כוללת אפיון, פיתוח, חיבורי תוכן ופריסה ל-Vercel. נוסיף עליה שכבות של
            אוטומציה, DevOps וליווי שוטף לפי הצורך של הצוות ושל לוחות הזמנים שלכם.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`flex h-full flex-col rounded-3xl border border-slate-200 bg-sky-100/80 p-6 text-right shadow-[0_25px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)] ${
                pkg.highlighted ? 'ring-2 ring-sky-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">{pkg.name}</h3>
                {pkg.highlighted && (
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    החבילה הפופולרית ביותר
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-3xl font-bold text-slate-900">{pkg.price}</p>
              </div>

              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-600" role="list">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2" role="listitem">
                    <span
                      className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sky-500"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePackageSelect(pkg.name)}
                className="mt-8 inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                type="button"
              >
                {pkg.ctaText}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5l8 7-8 7" />
                </svg>
              </button>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl border border-slate-200 bg-sky-100/70 p-8 text-right shadow-[0_25px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm md:grid-cols-2">
          <div className="space-y-3 text-sm leading-relaxed text-slate-600">
            <h3 className="text-lg font-semibold text-slate-900">מה תמיד כלול?</h3>
            <p>תכנון UX, ספריית קומפוננטים מעוצבת ותשתית Next.js מבוססת TypeScript.</p>
            <p>סטודיו Sanity מותאם אישית, תהליכי אישור, הרשאות ו-Preview מלא.</p>
            <p>פריסה ל-Vercel עם CI/CD, אנליטיקה, נגישות ו-SEO טכני.</p>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-slate-600">
            <h3 className="text-lg font-semibold text-slate-900">מה ניתן להוסיף?</h3>
            <p>אינטגרציות ל-CRM, Marketing Automation, BI וכלי נתונים פנימיים.</p>
            <p>פיתוח מודולים ייעודיים, אזורי חברים והרחבות Headless נוספות.</p>
            <p>ליווי growth, בדיקות A/B, אנליטיקה מתקדמת ותמיכה נרחבת ב-DevOps.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-right">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            ניתן לעצור או לשנות מסלול אחרי הספרינט הראשון – בלי קנס ובלי מחויבות
          </div>
          <p className="max-w-2xl text-right text-base leading-relaxed text-slate-600">
            בואו נקבע שיחת היכרות, נעבור על הצרכים, נבין את האינטגרציות הדרושות ונבנה הצעה
            מסודרת הכוללת לוחות זמנים ואבני דרך.
          </p>
        </div>
      </div>

      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">תיאום פגישה</h3>
              <button
                onClick={handleCloseContactForm}
                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                type="button"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <ContactForm selectedPackage={selectedPackage || undefined} onClose={handleCloseContactForm} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
