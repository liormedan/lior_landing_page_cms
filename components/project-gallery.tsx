'use client'

import { KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectType } from '@/types/landing-page'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

interface ProjectGalleryProps {
  projects: ProjectType[]
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })
  const { containerRef, visibleItems } = useStaggeredAnimation(projects.length, 120)

  const toggleExpanded = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExpanded(index)
    }
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-slate-50 py-24"
      aria-labelledby="projects-heading"
    >
      <div className="lp-container">
        <div
          className={`mx-auto max-w-3xl text-right transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center justify-center rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            סוגי פרויקטים שאנחנו מלווים
          </span>
          <h2
            id="projects-heading"
            className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
          >
            אתרים שמחברים בין תוכן, מוצר ומכירות
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            לכל פרויקט אנחנו מרכיבים ספריית קומפוננטים, חיבורי תוכן ואוטומציה מותאמים. כך תוכלו
            להתרחב במהירות, לשמר את ה-DNA של המותג ולהוסיף דפי נחיתה ללא צורך בקוד חדש.
          </p>
        </div>

        <div
          ref={containerRef}
          className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => {
            const isExpanded = expandedProject === index

            return (
              <article
                key={project.title}
                className={`sky-card group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 ${
                  visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                role="article"
                aria-labelledby={`project-${index}-title`}
                style={{ transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 120}ms` }}
              >
                <div className="relative h-48 sky-card">
                  <Image
                    src={project.image}
                    alt={`איור שמדגים את ${project.title}`}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 320px, 100vw"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 text-right">
                  <h3
                    id={`project-${index}-title`}
                    className="text-xl font-semibold text-slate-900"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {project.description}
                  </p>

                  {project.ctaHref && (
                    <div className="mt-4">
                      <Link
                        href={project.ctaHref}
                        className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-blue-700/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                      >
                        {project.ctaLabel ?? 'לקריאת עוד'}
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
                      </Link>
                    </div>
                  )}

                  <button
                    onClick={() => toggleExpanded(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-700/50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                    aria-expanded={isExpanded}
                    aria-controls={`project-${index}-details`}
                    aria-label={`${isExpanded ? 'סגירת' : 'פתיחת'} פרטי הפרויקט ${project.title}`}
                    type="button"
                  >
                    {isExpanded ? 'סגירת פרטי הפרויקט' : 'לפרטים נוספים'}
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {isExpanded && (
                  <div
                    id={`project-${index}-details`}
                    className="space-y-6 border-t border-slate-200 bg-slate-50 p-6 text-right text-sm leading-relaxed text-slate-600"
                    role="region"
                    aria-label={`מידע נוסף על ${project.title}`}
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">מה מקבלים:</h4>
                      <ul className="mt-3 space-y-2 text-right" role="list">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start justify-start gap-2" role="listitem">
                            <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-700/90" aria-hidden="true" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">דוגמאות מפרויקטים דומים:</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.examples.map((example, exampleIndex) => (
                          <span
                            key={exampleIndex}
                            className="inline-flex items-center rounded-full bg-sky-200/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 sky-card rounded-3xl p-10 text-right">
          <p className="w-full text-lg leading-relaxed text-slate-600">
            רוצים לראות איך זה ייראה אצלכם? נבנה יחד מפת דרכים קצרה המשלבת עיצוב, תוכן ותשתיות,
            ונראה איך ניתן להרחיב את האתר בצורה מודולרית ומהירה.
          </p>
          <Link
            href="#contact"
            className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-blue-700/90 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-blue-800/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            נתחיל לתכנן את הפרויקט
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
          </Link>
        </div>
      </div>
    </section>
  )
}

