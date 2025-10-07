'use client'

import { HeroContent } from '@/types/landing-page'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  hero: HeroContent
  onContactClick?: () => void
}

export function HeroSection({ hero, onContactClick }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="דף נחיתה ראשי"
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
          {/* Subtitle */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-sky-700 bg-sky-100/80 rounded-full backdrop-blur-sm dark:text-sky-300 dark:bg-sky-900/50">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" aria-hidden="true" />
            {hero.subtitle}
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6 leading-tight px-2">
            <span className="bg-gradient-to-r from-slate-900 via-sky-800 to-slate-900 bg-clip-text text-transparent dark:from-slate-100 dark:via-sky-300 dark:to-slate-100">
              {hero.title}
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            {hero.description}
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

