'use client'

import { KeyboardEvent, useState } from 'react'
import { Service } from '@/types/landing-page'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

interface ServicesCardsProps {
  services: Service[]
}

export default function ServicesCards({ services }: ServicesCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })
  const { containerRef, visibleItems } = useStaggeredAnimation(services.length, 120)

  const toggleCard = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleCard(index)
    }
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-white dark:bg-slate-900 py-24"
      aria-labelledby="services-heading"
    >
      <div className="lp-container">
        <div
          className={`mx-auto max-w-3xl text-right transition-all	duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="sky-chip inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-sky-800">
            מה כולל תהליך העבודה שלנו
          </span>
          <h2
            id="services-heading"
            className="mt-6 text-3xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
          >
            שירותים שמרכזים עבורכם אסטרטגיה, פיתוח ותמיכה
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            אנחנו מלווים אתכם משלב האפיון ועד לתחזוקה השוטפת: UX, פיתוח Next.js + Sanity,
            אינטגרציות, DevOps וליווי מתמשך של צוות התוכן. כל שלב מתועד ומדיד.
          </p>
        </div>

        <div
          ref={containerRef}
          className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index

            return (
              <article
                key={service.title}
                className={`sky-card flex h-full flex-col rounded-3xl p-6 text-right transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)] ${
                  visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleCard(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="flex flex-1 flex-col gap-4 text-right"
                  aria-expanded={isExpanded}
                  aria-controls={`service-${index}-details`}
                  aria-labelledby={`service-${index}-title`}
                  aria-describedby={`service-${index}-description`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="sky-card flex h-12 w-12 items-center justify-center rounded-2xl text-sky-800">
                        {getServiceIcon(service.title)}
                      </span>
                      <div>
                        <h3
                          id={`service-${index}-title`}
                          className="text-lg font-semibold text-slate-900 dark:text-slate-100"
                        >
                          {service.title}
                        </h3>
                        {service.price && (
                          <p className="mt-1 text-sm font-medium text-blue-700">{service.price}</p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 border-blue-700/50 text-blue-700' : ''
                      }`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>

                  <p
                    id={`service-${index}-description`}
                    className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                  >
                    {service.description}
                  </p>
                </button>

                <div
                  id={`service-${index}-details`}
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  role="region"
                  aria-label={`מידע נוסף על השירות ${service.title}`}
                >
                  <ul className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-right" role="list">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start justify-start gap-2" role="listitem">
                        <span
                          className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-700/90"
                          aria-hidden="true"
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 sky-card rounded-3xl p-8 text-right sm:flex-row sm:items-center sm:justify-center">
          <p className="w-full text-base leading-relaxed text-slate-600 sm:max-w-xl text-right">
            רוצים לשלב אותנו בתהליך? בואו נקבע שיחה קצרה, נבין את הצרכים ונבנה הצעה שמותאמת
            לצוות, לתקציב וליעדים שלכם.
          </p>
          <a
            href="#pricing"
            className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-blue-700/90 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-blue-800/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            להשוות בין החבילות
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
          </a>
        </div>
      </div>
    </section>
  )
}

function getServiceIcon(title: string) {
  const iconClass = 'h-6 w-6'

  if (title.toLowerCase().includes('ux') || title.toLowerCase().includes('ui')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}>
        <path d="M4 6h16M4 12h16M4 18h7" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (title.toLowerCase().includes('cms')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}>
        <path d="M4 5h16v6H4zM4 13h16v6H4z" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 17h6" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    )
  }

  if (title.toLowerCase().includes('seo')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}>
        <path
          d="M11 5h-3a4 4 0 100 8h3V5zM13 5h3a4 4 0 110 8h-3V5zM11 13h2v6h-2z"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (title.toLowerCase().includes('automation') || title.toLowerCase().includes('devops')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}>
        <path
          d="M12 6.5l1.09 2.21 2.43.35-1.76 1.72.42 2.42L12 12.75l-2.18 1.15.42-2.42-1.76-1.72 2.43-.35L12 6.5z"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 12a8 8 0 0114.23-4.49M20 12a8 8 0 01-14.23 4.49"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClass}>
      <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
      <path d="M9.75 9.75L14.25 14.25" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M9.75 14.25L14.25 9.75" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  )
}

