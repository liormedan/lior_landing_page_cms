'use client'

import { useState } from 'react'
import { Service } from '@/types/landing-page'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

interface ServicesCardsProps {
  services: Service[]
}

export default function ServicesCards({ services }: ServicesCardsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })
  const { containerRef, visibleItems } = useStaggeredAnimation(services.length, 120)

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleCard(index)
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 
            id="services-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl mb-4"
          >
            השירותים הטכניים שלנו
          </h2>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4">
            פתרון טכנולוגי מלא שכולל כל מה שאתם צריכים לנוכחות דיגיטלית מקצועית
          </p>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <article
              key={index}
              className={`
                relative bg-white dark:bg-slate-900/70 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800/70
                transition-all duration-500 ease-in-out
                hover:shadow-xl hover:scale-105 hover:-translate-y-2
                cursor-pointer group focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-950
                ${expandedCard === index ? 'ring-2 ring-sky-500 shadow-xl scale-105' : ''}
                ${visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }
              `}
              style={{ 
                transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 120}ms` 
              }}
              onClick={() => toggleCard(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="button"
              aria-expanded={expandedCard === index}
              aria-controls={`service-${index}-details`}
              aria-labelledby={`service-${index}-title`}
              aria-describedby={`service-${index}-description`}
            >
              {/* Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full group-hover:from-sky-200 group-hover:to-sky-300 transition-colors duration-300 dark:from-sky-500/20 dark:to-sky-600/20 dark:group-hover:from-sky-400/30 dark:group-hover:to-sky-500/30">
                  {/* Icon placeholder - using SVG icons */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 text-sky-600 dark:text-sky-300" aria-hidden="true">
                    {getServiceIcon(service.title)}
                  </div>
                </div>
                
                <h3 
                  id={`service-${index}-title`}
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 text-center mb-3"
                >
                  {service.title}
                </h3>
                
                <p 
                  id={`service-${index}-description`}
                  className="text-slate-600 dark:text-slate-300 text-center leading-relaxed text-sm sm:text-base"
                >
                  {service.description}
                </p>
              </div>

              {/* Expandable Content */}
              <div 
                id={`service-${index}-details`}
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
                role="region"
                aria-label={`פרטים נוספים עבור ${service.title}`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 mt-4 text-sm sm:text-base">
                    מה אתם מקבלים:
                  </h4>
                  <ul className="space-y-2" role="list">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start" role="listitem">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 dark:text-sky-400 mt-0.5 ml-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expand/Collapse Indicator */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2">
                <div className={`
                  w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 dark:bg-slate-800/70 flex items-center justify-center
                  transition-all duration-300 group-hover:bg-sky-200 dark:group-hover:bg-sky-500/30
                  ${expandedCard === index ? 'bg-sky-500 text-white dark:bg-sky-500 dark:text-white' : 'text-slate-500 dark:text-slate-300'}
                `}>
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                      expandedCard === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 px-4">
            מעוניינים לשמוע עוד על השירותים שלנו?
          </p>
          <button 
            className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-400 dark:hover:to-sky-300"
            aria-label="פתח טופס יצירת קשר לקבלת מידע נוסף על השירותים"
          >
            בואו נדבר
          </button>
        </div>
      </div>
    </section>
  )
}

// Helper function to get appropriate icons for each service
function getServiceIcon(serviceTitle: string) {
  switch (serviceTitle) {
    case 'מערכת ניהול מתקדמת':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    case 'עיצוב מותאם אישית':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    case 'אחסון ענן מאובטח':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
      )
    case 'אינטגרציות חיצוניות':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      )
    case 'תמיכה טכנית מלאה':
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
        </svg>
      )
    default:
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
  }
}
