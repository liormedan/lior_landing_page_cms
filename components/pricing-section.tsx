'use client'

import { useState } from 'react'
import { landingPageContent } from '@/lib/landing-page-content'
import ContactForm from './contact-form'

export default function PricingSection() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)

  const { heading, note, plans } = landingPageContent.pricing

  const onSelect = (name: string) => {
    setSelectedPackage(name)
    setShowContactForm(true)
  }

  const onClose = () => {
    setSelectedPackage(null)
    setShowContactForm(false)
  }

  return (
    <section id="pricing" className="bg-slate-50 py-24 dark:bg-slate-900" aria-labelledby="pricing-heading">
      <div className="lp-container">
        <div className="mx-auto max-w-3xl text-right">
          <span className="sky-chip inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700">
            {note}
          </span>
          <h2 id="pricing-heading" className="mt-6 text-3xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            {heading}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((pkg) => (
            <article
              key={pkg.id}
              className={`sky-card flex h-full flex-col rounded-3xl p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)] ${
                pkg.id === 'growth' ? 'ring-2 ring-slate-700' : ''
              }`}
              aria-labelledby={`${pkg.id}-title`}
            >
              <div className="flex items-center justify-between">
                <h3 id={`${pkg.id}-title`} className="text-xl font-semibold text-slate-900 dark:text-white">
                  {pkg.name}
                </h3>
                {pkg.id === 'growth' && (
                  <span className="rounded-full bg-sky-300/40 px-3 py-1 text-xs font-semibold text-slate-800">
                    החבילה הפופולרית
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{pkg.tagline}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{pkg.price}</p>

              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300" role="list">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start justify-start gap-2" role="listitem">
                    <span className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-slate-900" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect(pkg.name)}
                className="mt-8 inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
                type="button"
              >
                {pkg.cta}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5l8 7-8 7" />
                </svg>
              </button>
            </article>
          ))}
        </div>

        {showContactForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">טופס יצירת קשר</h3>
                <button onClick={onClose} className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700" type="button">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-4">
                <ContactForm selectedPackage={selectedPackage || undefined} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

