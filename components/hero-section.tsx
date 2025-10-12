'use client'

import Image from 'next/image'
import { HeroContent } from '@/types/landing-page'
import { useEffect, useMemo, useState } from 'react'

interface HeroSectionProps {
  hero: HeroContent
}

const TRUST_LOGOS = ['Next.js', 'Sanity', 'Vercel', 'Tailwind CSS', 'TypeScript'] as const

const HERO_STATS = [
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
      className="relative overflow-hidden bg-white"
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
              <span className="inline-flex items-center justify-center rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
                {hero.badge}
              </span>
            )}

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {showSplitTitle ? (
                  <>
                    <span className="block text-sky-600">{titlePrimary}</span>
                    <span className="block text-slate-900">{titleSecondary}</span>
                  </>
                ) : (
                  normalizedTitle
                )}
              </h1>

              {hero.subtitle && (
                <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
                  {hero.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {(hero.primaryCtaText || hero.secondaryCtaText) && (
              <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse sm:items-center sm:justify-end sm:gap-4">
                {hero.primaryCtaText && hero.primaryCtaHref && (
                  <a
                    href={hero.primaryCtaHref}
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-sky-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
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
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl border border-slate-200 px-7 py-3 text-base font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
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
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-2xl border border-slate-200 bg-sky-100/80 p-5 backdrop-blur-sm text-right shadow-sm"
                >
                  <dt className="text-sm font-medium text-slate-500">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div
              className="absolute -top-24 -end-20 h-64 w-64 rounded-full bg-sky-100 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -start-16 h-72 w-72 rounded-full bg-indigo-100 blur-[110px]"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-sky-100/70 shadow-[0_40px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <div className="absolute top-6 end-6 flex items-center gap-2 rounded-full border border-white/60 bg-sky-100/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Live preview
              </div>

              <div className="grid gap-6 p-8">
                <div className="relative h-64 rounded-3xl border border-slate-100 bg-slate-50">
                  <Image
                    src="/images/sanity-demo-1.svg"
                    alt="תצוגה מקדימה של Sanity Studio"
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
                      alt="מסכי עבודה מותאמים לצוות התוכן"
                      fill
                      className="object-contain p-4"
                      sizes="(min-width: 1024px) 220px, 40vw"
                    />
                  </div>

                  <div className="rounded-3xl border border-slate-100 bg-sky-100/80 p-6 shadow-inner">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Workflow
                    </p>
                    <p className="mt-3 text-2xl font-bold text-slate-900">Sanity &amp; Next.js</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      תהליכי עבודה מאורגנים, עריכה משותפת ושחרור גרסאות מהיר דרך Vercel.
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm font-medium text-slate-500">
                      <span>צוותי תוכן</span>
                      <span className="text-sky-600">עובדים בזמן אמת</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-sky-50 to-white p-6">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Deploy preview</span>
                    <span className="font-medium text-slate-700">Vercel Edge</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-4/5 rounded-full bg-sky-500" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    סנכרון עם GitHub, בדיקות אוטומטיות ופריסה מאובטחת לכל סביבה.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10 text-right">
          <p className="text-sm font-medium text-slate-500 sm:text-base">
            טכנולוגיות מובילות שאנחנו משלבים בכל פרויקט
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600">
            {TRUST_LOGOS.map((logo) => (
              <span
                key={logo}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-sky-100/80 px-4 py-2 shadow-sm backdrop-blur-sm"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-sky-500" aria-hidden="true" />
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
