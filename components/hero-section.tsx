'use client'

import { useEffect, useMemo, useState } from 'react'
import type { HeroContent } from '@/types/landing-page'

interface HeroSectionProps {
  hero: HeroContent
}

export function HeroSection({ hero }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => setIsVisible(true), [])

  const normalizedTitle = (hero.title || '').trim()
  const descriptionParagraphs = useMemo(
    () =>
      (hero.description || '')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
    [hero.description]
  )

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white dark:bg-slate-900"
      role="banner"
      aria-label={normalizedTitle || hero.subtitle}
      lang="he"
      dir="rtl"
    >
      <div
        className="absolute inset-x-0 -top-64 -z-10 h-[520px] bg-gradient-to-b from-sky-100/70 via-sky-50/30 to-transparent dark:from-slate-800/80 dark:via-slate-900/50"
        aria-hidden="true"
      />

      <div className="lp-container">
        <div
          className={`mx-auto flex max-w-5xl flex-col items-center gap-10 py-24 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {hero.badge && (
            <span className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 dark:bg-slate-100 dark:text-slate-900">
              {hero.badge}
            </span>
          )}

          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-7xl">
              {normalizedTitle || 'ניהול מערכת תוכן חכמה עם CMS'}
            </h1>
            {(hero.subtitle || descriptionParagraphs.length > 0) && (
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
                {hero.subtitle || descriptionParagraphs[0]}
              </p>
            )}
          </div>

          {descriptionParagraphs.slice(1).length > 0 && (
            <div className="space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {descriptionParagraphs.slice(1).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          {(hero.primaryCtaText || hero.secondaryCtaText) && (
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row-reverse sm:gap-4">
              {hero.primaryCtaText && hero.primaryCtaHref && (
                <a
                  href={hero.primaryCtaHref}
                  className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
                >
                  {hero.primaryCtaText}
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
              )}
              {hero.secondaryCtaText && hero.secondaryCtaHref && (
                <a
                  href={hero.secondaryCtaHref}
                  className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-2xl border border-slate-300 px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                >
                  {hero.secondaryCtaText}
                </a>
              )}
            </div>
          )}

          {hero.ctaSupportText && (
            <p className="text-sm font-medium text-slate-500 dark:text-slate-300">{hero.ctaSupportText}</p>
          )}

          <div className="w-full">
            <TechAccordion />
          </div>
        </div>
      </div>
    </section>
  )
}

function TechAccordion() {
    const tabs = [
    {
      id: 'next',
      title: 'Next.js',
      badge: 'NEXT',
      summary: 'תשתית React מודרנית לדפי נחיתה מהירים עם SEO מצוין ויכולות Edge.',
      points: [
        'טעינה מיידית בזכות ISR ו-Static Generation.',
        'גישה ל-Edge Functions ולפיצ׳רים מתקדמים של Vercel.',
        'קומפוננטות גמישות שמאפשרות לייצר וריאציות במהירות.',
      ],
    },
    {
      id: 'sanity',
      title: 'Sanity CMS',
      badge: 'Sanity',
      summary: 'ממשק עריכה בעברית עם Preview חי וגרסאות תוכן לייב.',
      points: [
        'עריכה בזמן אמת כולל טיוטות והרשאות לצוותים שונים.',
        'Portable Text גמיש שמאפשר לכלול טפסים, וידאו וגיפים.',
        'API פתוח לאינטגרציות מותאמות אישית ו-Automations.',
      ],
    },
    {
      id: 'vercel',
      title: 'Vercel',
      badge: '▲',
      summary: 'תשתית פריסה מאובטחת עם CDN עולמי ומדידות זמן אמת.',
      points: [
        'Preview לכל Pull Request כדי לקבל פידבק מהיר.',
        'Analytics, Error Tracking והתראות ביצועים מובנות.',
        'Rollbacks בלחיצה אחת בלי להפריע לקמפיינים רצים.',
      ],
    },
  ] as const

  const [activeId, setActiveId] = useState<(typeof tabs)[number]['id']>('next')
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  return (
    <div className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-[0_35px_80px_rgba(15,23,42,0.35)]">
      <div
        role="tablist"
        aria-label="סוגי הטכנולוגיות"
        className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeId
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`tech-panel-${tab.id}`}
              id={`tech-tab-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition sm:flex-none sm:min-w-[140px] ${
                selected
                  ? 'border-white/30 bg-white/10 text-white shadow-lg'
                  : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <span>{tab.badge}</span>
              <span>{tab.title}</span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`tech-panel-${activeTab.id}`}
        aria-labelledby={`tech-tab-${activeTab.id}`}
        className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-center"
      >
        <h3 className="text-xl font-semibold text-white">{activeTab.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/80">{activeTab.summary}</p>
        <ul className="mt-6 space-y-3 text-sm text-white/90" role="list">
          {activeTab.points.map((point) => (
            <li key={point} className="flex items-center justify-center gap-2" role="listitem">
              <span className="inline-block h-2 w-2 rounded-full bg-sky-400" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


