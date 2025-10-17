'use client'

import Image from 'next/image'
import { Technology } from '@/types/landing-page'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

interface TechnologyShowcaseProps {
  technologies: Technology[]
}

const CATEGORY_STYLES: Record<string, string> = {
  frontend: 'bg-sky-200 text-sky-800',
  cms: 'bg-emerald-100 text-emerald-800',
  deployment: 'bg-indigo-100 text-indigo-800',
}

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'פרונטאנד מודרני',
  cms: 'ניהול תוכן',
  deployment: 'תשתיות ופריסה',
}

export default function TechnologyShowcase({ technologies }: TechnologyShowcaseProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })
  const { containerRef, visibleItems } = useStaggeredAnimation(technologies.length, 150)

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="bg-white dark:bg-slate-900 py-24"
      aria-labelledby="technology-heading"
    >
      <div className="lp-container">
        <div
          className={`mx-auto max-w-3xl text-right transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center justify-center rounded-full bg-sky-200 px-4 py-2 text-sm font-semibold text-sky-700">
            הטכנולוגיות שמחזיקות את האתר שלכם
          </span>
          <h2
            id="technology-heading"
            className="mt-6 text-3xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
          >
            Stack מודרני שמחבר בין עיצוב, תוכן ופריסה
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            כל שכבה נבחרת כדי לאפשר לצוותי התוכן לשחרר חוויות חדשות במהירות, תוך שמירה על קוד
            נקי ומדיד שמאפשר לגדול בלי עיכובים מיותרים.
          </p>
        </div>

        <div ref={containerRef} className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {technologies.map((tech, index) => {
            const style = CATEGORY_STYLES[tech.category] ?? 'bg-slate-100 text-slate-700'
            const label = CATEGORY_LABELS[tech.category] ?? tech.category

            return (
              <article
                key={tech.name}
                className={`sky-card group flex h-full flex-col gap-6 rounded-3xl p-8 text-right transition-all duration-500 hover:-translate-y-1 ${
                  visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                role="article"
                aria-labelledby={`tech-${index}-title`}
                style={{ transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 150}ms` }}
              >
                <div className="ms-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50">
                  <div className="relative h-12 w-12">
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="64px"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-xs font-semibold ${style}`}>
                    {label}
                  </span>
                  <h3
                    id={`tech-${index}-title`}
                    className="text-xl font-semibold text-slate-900 dark:text-slate-100"
                  >
                    {tech.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{tech.description}</p>
                </div>

                <ul className="space-y-3 text-right text-sm text-slate-600 dark:text-slate-300" role="list">
                  {tech.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start justify-start gap-2 text-right" role="listitem">
                      <span className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-700/90" aria-hidden="true" />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="sky-card mt-16 rounded-3xl p-8 text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            איך הכל מתחבר לפרויקט שלכם
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            השילוב של Next.js, Sanity ו-Vercel יוצר בסיס יציב שמאפשר עריכה בזמן אמת, פריסה
            מהירה ומדידה עקבית. כך תוכלו לנהל תוכן, קמפיינים וקצב פיתוח אחיד – ממערכת אחת
            שמרגישה טבעית לצוות.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-slate-500">
            <span className="sky-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-700/90" aria-hidden="true" />
              Edge Ready
            </span>
            <span className="sky-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Content-first
            </span>
            <span className="sky-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700">
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" aria-hidden="true" />
              Fully automated deploys
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

