'use client'

import { useState } from 'react'
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
  const { containerRef, visibleItems } = useStaggeredAnimation(projects.length, 100)

  const toggleExpanded = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExpanded(index)
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 
            id="projects-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            מגוון פתרונות דיגיטליים
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4">
            לא רק בלוגים - אנחנו יוצרים כל סוג של פלטפורמה דיגיטלית שתרצו. 
            כל פרויקט מותאם אישית לצרכים שלכם עם מערכת ניהול פשוטה וחזקה.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => {
            const isExpanded = expandedProject === index
            return (
              <article
                key={index}
                className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:scale-105 hover:-translate-y-2 text-center dark:bg-slate-900/70 dark:border-slate-800/70 dark:focus-within:ring-offset-slate-950 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                role="article"
                aria-labelledby={`project-${index}-title`}
                style={{ 
                  transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 100}ms` 
                }}
              >
                {/* Project Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`תמונה המדגימה ${project.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6 text-center">
                  <h3 
                    id={`project-${index}-title`}
                    className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200"
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm sm:text-base text-center">
                    {project.description}
                  </p>

                  {project.ctaHref && (
                    <div className="mb-4">
                      <Link
                        href={project.ctaHref}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm sm:text-base font-semibold transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-400 dark:focus:ring-offset-slate-950"
                        aria-label={`${project.ctaLabel ?? 'קראו עוד'} עבור ${project.title}`}
                      >
                        {project.ctaLabel ?? 'למידע נוסף'}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  )}

                  {/* Examples Preview */}
                  <div className="mb-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.examples.slice(0, 2).map((example, exampleIndex) => (
                        <span
                          key={exampleIndex}
                          className="inline-block px-2 sm:px-3 py-1 bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200 text-xs sm:text-sm rounded-full"
                        >
                          {example}
                        </span>
                      ))}
                      {project.examples.length > 2 && (
                        <span className="inline-block px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800/70 dark:text-slate-300 text-xs sm:text-sm rounded-full">
                          +{project.examples.length - 2} נוספים
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleExpanded(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full py-2 px-4 bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-sky-500/20 dark:hover:text-sky-200 dark:focus:ring-offset-slate-950 text-sm sm:text-base"
                    aria-expanded={isExpanded}
                    aria-controls={`project-${index}-details`}
                    aria-label={`${isExpanded ? 'הסתר' : 'הצג'} פרטים נוספים עבור ${project.title}`}
                  >
                    {isExpanded ? 'הסתר פרטים' : 'הצג פרטים נוספים'}
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div 
                      id={`project-${index}-details`}
                      className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2 duration-300 text-center"
                      role="region"
                      aria-label={`פרטים נוספים עבור ${project.title}`}
                    >
                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-sm sm:text-base text-center">תכונות עיקריות:</h4>
                        <ul className="space-y-2 flex flex-col items-center" role="list">
                          {project.features.map((feature, featureIndex) => (
                            <li 
                              key={featureIndex} 
                              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-center"
                              role="listitem"
                            >
                              <span className="text-sky-500 dark:text-sky-400" aria-hidden="true">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* All Examples */}
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-sm sm:text-base text-center">דוגמאות:</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                          {project.examples.map((example, exampleIndex) => (
                            <span
                              key={exampleIndex}
                              className="inline-block px-2 sm:px-3 py-1 bg-sky-50 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200 text-xs sm:text-sm rounded-full border border-sky-200 dark:border-sky-500/40"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-sky-200 rounded-xl transition-colors duration-300 pointer-events-none" />
              </article>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 px-4">
            יש לכם רעיון אחר? בואו נדבר על איך נוכל להגשים אותו
          </p>
          <button 
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            aria-label="פתח טופס יצירת קשר לתכנון פרויקט חדש"
          >
            בואו נתחיל לתכנן
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
