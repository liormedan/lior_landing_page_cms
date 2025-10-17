'use client'

import Image from 'next/image'
import { HeroContent } from '@/types/landing-page'
import { useEffect, useMemo, useState } from 'react'

interface HeroSectionProps {
  hero: HeroContent
}

const DISPLAY_STATS = [
  { value: '25+', label: 'השקות של אתרי תוכן מחוברים ל-Sanity' },
  { value: '100%', label: 'תמיכה מלאה בעברית, RTL ונגישות ברמה AA' },
  { value: '< 4 שבועות', label: 'זמן ממוצע עד עלייה לאוויר בפרויקטים חוזרים' },
] as const

export function HeroSection({ hero }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const normalizedTitle = hero.title.trim()
  const [titlePrimaryRaw, ...titleSecondaryParts] = normalizedTitle.split('+')
  const titlePrimary = titlePrimaryRaw?.trim() ?? ''
  const titleSecondary = titleSecondaryParts.join('+').trim()
  const showSplitTitle = titlePrimary.length > 0 && titleSecondary.length > 0

  const descriptionParagraphs = useMemo(() => {
    return hero.description
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
  }, [hero.description])

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white dark:bg-slate-900"
      role="banner"
      aria-label={normalizedTitle || hero.subtitle}
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
                {showSplitTitle ? (
                  <>
                    <span className="block text-blue-700">{titlePrimary}</span>
                    <span className="block text-slate-900 dark:text-slate-100">{titleSecondary}</span>
                  </>
                ) : (
                  normalizedTitle
                )}
              </h1>

              {hero.subtitle && (
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
                  {hero.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {(hero.primaryCtaText || hero.secondaryCtaText) && (
              <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse sm:items-center sm:justify-end sm:gap-4">
                {hero.primaryCtaText && hero.primaryCtaHref && (
                  <a
                    href={hero.primaryCtaHref}
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-blue-700/90 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-blue-800/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
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
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl border border-slate-200 px-7 py-3 text-base font-semibold text-slate-700 transition hover:border-blue-700/50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                  >
                    {hero.secondaryCtaText}
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {hero.ctaSupportText && (
              <p className="text-sm text-slate-500 sm:text-base">{hero.ctaSupportText}</p>
            )}

            <dl className="grid gap-4 pt-8 sm:grid-cols-3">
              {DISPLAY_STATS.map((stat) => (
                <div key={stat.value} className="sky-card rounded-2xl p-5 text-right">
                  <dt className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">{stat.label}</dt>
                  <dd className="mt-1 text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div
              className="absolute -top-24 -end-20 h-64 w-64 rounded-full bg-sky-200 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -start-16 h-72 w-72 rounded-full bg-indigo-100 blur-[110px]"
              aria-hidden="true"
            />

            <div className="sky-card rounded-[32px]">
              <div className="absolute top-6 end-6 flex items-center gap-2 rounded-full border border-white/60 bg-white/30 px-4 py-2 text-xs font-medium text-white shadow-sm backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Live preview
              </div>

              <div className="grid gap-6 p-8">
                <div className="relative h-64 rounded-3xl border border-slate-100 bg-slate-50">
                  <Image
                    src="/images/sanity-demo-1.svg"
                    alt="Sanity Studio"
                    fill
                    className="object-contain p-4"
                    sizes="(min-width: 1024px) 480px, 90vw"
                    priority
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative h-36 rounded-3xl border border-slate-100 bg-slate-50">
                    <Image
                      src="/images/sanity-demo-2.svg"
                      alt="Sanity editing"
                      fill
                      className="object-contain p-4"
                      sizes="(min-width: 1024px) 220px, 40vw"
                    />
                  </div>

                  <div className="sky-card rounded-3xl p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      Workflow
                    </p>
                    <p className="mt-3 text-2xl font-bold text-white">Sanity &amp; Next.js</p>
                    <p className="mt-2 text-sm leading-relaxed text-white">
                      תהליכי עבודה מאורגנים, עריכה משותפת ושחרור גרסאות מהיר דרך Vercel.
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm font-medium text-white">
                      <span>צוותי תוכן</span>
                      <span className="text-white">עובדים בזמן אמת</span>
                    </div>
                  </div>
                </div>

                <div className="sky-card rounded-3xl p-6">
                  <div className="flex items-center justify-between text-base sm:text-lg text-white">
                    <span className="font-semibold">Deploy preview</span>
                    <span className="font-semibold">Vercel Edge</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-4/5 rounded-full bg-blue-700/90" />
                  </div>
                  <p className="mt-3 text-base sm:text-lg leading-relaxed text-white">
                    עבודה ישירה עם GitHub, תצוגות מקדימות ושחרורים מהירים בסביבות מבודדות.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

