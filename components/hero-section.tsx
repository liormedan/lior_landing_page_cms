'use client'

import { HeroContent } from '@/types/landing-page'
import { useState, useEffect } from 'react'
import AnimatedText from './animated-text'
import SimplePlus from './spinning-plus-3d'

interface HeroSectionProps {
  hero: HeroContent
}

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
  const descriptionLines = hero.description
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label={normalizedTitle || hero.subtitle}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl animate-pulse dark:bg-sky-800/20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-slate-700/20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-100/40 rounded-full blur-2xl animate-pulse delay-500 dark:bg-sky-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 leading-[1.05] tracking-tight px-2">
            {showSplitTitle ? (
              <span className="inline-flex flex-col items-center gap-5 sm:gap-6">
                <span className="relative inline-flex">
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400/40 via-blue-500/30 to-cyan-400/40 blur-3xl opacity-70 dark:from-sky-500/30 dark:via-indigo-500/20 dark:to-cyan-400/30"
                    aria-hidden="true"
                  />
                  <AnimatedText
                    variant="gradient"
                    className="relative px-4 sm:px-6 py-1 sm:py-2 drop-shadow-[0_12px_30px_rgba(14,165,233,0.35)]"
                  >
                    {titlePrimary}
                  </AnimatedText>
                </span>
                <div className="flex items-center justify-center">
                  <SimplePlus />
                </div>
                <span className="relative inline-flex">
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/40 via-blue-500/30 to-sky-400/40 blur-3xl opacity-70 dark:from-cyan-500/25 dark:via-indigo-500/20 dark:to-sky-400/25"
                    aria-hidden="true"
                  />
                  <AnimatedText
                    variant="wave"
                    className="relative px-4 sm:px-6 py-1 sm:py-2 drop-shadow-[0_12px_30px_rgba(14,165,233,0.35)]"
                  >
                    {titleSecondary}
                  </AnimatedText>
                </span>
              </span>
            ) : (
              <span className="relative inline-flex">
                <span
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400/40 via-blue-500/30 to-cyan-400/40 blur-3xl opacity-70 dark:from-sky-500/25 dark:via-indigo-500/20 dark:to-cyan-400/25"
                  aria-hidden="true"
                />
                <AnimatedText
                  variant="gradient"
                  className="relative px-4 sm:px-6 py-1 sm:py-2 drop-shadow-[0_12px_30px_rgba(14,165,233,0.35)]"
                >
                  {hero.title}
                </AnimatedText>
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            {descriptionLines.map((line, index) => (
              <span key={index}>
                {line}
                {index < descriptionLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-sky-400/30 rounded-full animate-ping delay-700" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-slate-400/30 rounded-full animate-ping delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-sky-300/40 rounded-full animate-ping delay-300" />
      </div>
    </section>
  )
}
