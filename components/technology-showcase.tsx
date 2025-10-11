'use client'

import Image from 'next/image'
import { Technology } from '@/types/landing-page'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'
import AnimatedText from './animated-text'

interface TechnologyShowcaseProps {
  technologies: Technology[]
}

export default function TechnologyShowcase({ technologies }: TechnologyShowcaseProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })
  const { containerRef, visibleItems } = useStaggeredAnimation(technologies.length, 150)
  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60"
      aria-labelledby="technology-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 
            id="technology-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            <AnimatedText variant="gradient">
              הטכנולוגיות שמניעות את הפתרון
            </AnimatedText>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4">
            אנחנו משתמשים בטכנולוגיות המתקדמות ביותר כדי לספק לכם פתרון מהיר, אמין ומתקדם
          </p>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {technologies.map((tech, index) => (
            <article
              key={tech.name}
              className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 sm:p-8 border border-slate-100 hover:border-sky-200 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:scale-105 hover:-translate-y-2 text-center dark:bg-slate-900/70 dark:border-slate-800/70 dark:focus-within:ring-offset-slate-950 ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              role="article"
              aria-labelledby={`tech-${index}-title`}
              style={{ 
                transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 150}ms` 
              }}
            >
              {/* Logo and Name */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 relative">
                  <Image
                    src={tech.logo}
                    alt={`${tech.name} לוגו`}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                </div>
                <h3 
                  id={`tech-${index}-title`}
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2"
                >
                  {tech.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  {tech.description}
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wide">
                  מה זה נותן לכם:
                </h4>
                <ul className="space-y-3" role="list">
                  {tech.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex flex-col items-center gap-2 text-center text-slate-700 dark:text-slate-300"
                      role="listitem"
                    >
                      <div 
                        className="w-2.5 h-2.5 bg-sky-500 rounded-full dark:bg-sky-400" 
                        aria-hidden="true"
                      />
                      <span className="text-sm sm:text-base leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category Badge */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span 
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    tech.category === 'frontend' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200'
                      : tech.category === 'cms'
                      ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-200'
                  }`}
                  role="status"
                  aria-label={`קטגוריה: ${
                    tech.category === 'frontend' ? 'ממשק משתמש' :
                    tech.category === 'cms' ? 'ניהול תוכן' : 'אחסון ופריסה'
                  }`}
                >
                  {tech.category === 'frontend' && 'ממשק משתמש'}
                  {tech.category === 'cms' && 'ניהול תוכן'}
                  {tech.category === 'deployment' && 'אחסון ופריסה'}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 px-4">
            השילוב של שלוש הטכנולוגיות האלה יוצר פתרון מושלם עבור הפרויקט שלכם
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm text-slate-500 dark:text-slate-400 px-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-sky-500 rounded-full dark:bg-sky-400" aria-hidden="true" />
              <span>ביצועים מעולים</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-sky-500 rounded-full dark:bg-sky-400" aria-hidden="true" />
              <span>קלות שימוש</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-sky-500 rounded-full dark:bg-sky-400" aria-hidden="true" />
              <span>אמינות גבוהה</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
