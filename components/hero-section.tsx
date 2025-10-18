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
    () => (hero.description || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean),
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
        className="absolute inset-x-0 -top-64 -z-10 h-[520px] bg-gradient-to-b from-sky-100/70 via-sky-50/30 to-transparent"
        aria-hidden="true"
      />

      <div className="lp-container">
        <div
          className={`grid items-center gap-12 py-24 lg:grid-cols-[minmax(0,1fr),minmax(0,0.9fr)] transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="space-y-6 text-right">
            {hero.badge && (
              <span className="sky-chip inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white">
                {hero.badge}
              </span>
            )}

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                {normalizedTitle || 'דף נחיתה חכם עם CMS מותאם RTL'}
              </h1>
              {(hero.subtitle || descriptionParagraphs.length > 0) && (
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
                  {hero.subtitle || descriptionParagraphs[0]}
                </p>
              )}
            </div>

            {(hero.primaryCtaText || hero.secondaryCtaText) && (
              <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse sm:items-center sm:justify-end sm:gap-4">
                {hero.primaryCtaText && hero.primaryCtaHref && (
                  <a
                    href={hero.primaryCtaHref}
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
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
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl border border-slate-300 px-7 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                  >
                    {hero.secondaryCtaText}
                  </a>
                )}
              </div>
            )}

            {descriptionParagraphs.slice(1).map((paragraph, i) => (
              <p key={i} className="text-right text-slate-600 dark:text-slate-300">
                {paragraph}
              </p>
            ))}

            <TechAccordion />
          </div>

          {/* Right column intentionally empty per design */}
        </div>
      </div>
    </section>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function TechAccordion() {
  const [openId, setOpenId] = useState<string | null>(null)
  const cards = [
    {
      id: 'next',
      title: 'Next.js',
      summary:
        'פריימוורק מודרני מעל React: SSR/SSG, ניתוב ותכן וביצועים גבוהים כברירת מחדל.',
      points: [
        'SEO ידידותי (SSR/SSG, Image Optimization)',
        'שילוב טבעי עם Vercel ו‑Edge',
        'App Router מודולרי ונוח',
      ],
    },
    {
      id: 'sanity',
      title: 'Sanity',
      summary:
        'CMS גמיש לעריכה בזמן אמת: סכמות דינמיות, תצוגות Preview ו‑Portable Text עשיר.',
      points: [
        'טיוטות ו‑Preview בזמן אמת',
        'סכמות תוכן ב‑TypeScript',
        'API חזק + אינטגרציות CRM/BI',
      ],
    },
    {
      id: 'vercel',
      title: 'Vercel',
      summary: 'פריסות מהירות, Preview לכל שינוי ותשתית Edge גלובלית.',
      points: [
        'סביבות Preview לכל פיצ׳ר',
        'רשת Edge/CDN מהירה',
        'Analytics ושילוב CI/CD',
      ],
    },
  ] as const

  return (
    <div className="grid gap-4 pt-8 sm:grid-cols-3">
      {cards.map((card) => {
        const open = openId === card.id
        return (
          <article
            key={card.id}
            className="rounded-3xl border bg-white text-slate-800 shadow-[0_16px_32px_rgba(15,23,42,0.08)] border-slate-200 dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-800/80 dark:via-slate-800/40 dark:to-blue-900/20 dark:text-white"
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : card.id)}
              className="flex w-full items-center justify-between gap-3 px-6 py-4"
              aria-expanded={open}
              aria-controls={`tech-${card.id}`}
            >
              <div className="flex-1 text-center">
                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center">
                  {card.id === 'next' && (
                    <span className="text-[10px] font-black tracking-widest">NEXT</span>
                  )}
                  {card.id === 'sanity' && (
                    <span className="text-[12px] font-extrabold">Sanity</span>
                  )}
                  {card.id === 'vercel' && (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <polygon points="12,3 22,20 2,20" className="fill-current" />
                    </svg>
                  )}
                </div>
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="mt-1 text-sm text-white/80">{card.summary}</p>
              </div>
              <Chevron open={open} />
            </button>
            <div
              id={`tech-${card.id}`}
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
              role="region"
              aria-label={`פרטים על ${card.title}`}
            >
              <div className="min-h-0 px-6 pb-6">
                <ul className="space-y-2 text-sm text-white/90 text-center" role="list">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-center justify-center gap-2" role="listitem">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

