'use client'

import { useScrollProgress } from '@/hooks/useScrollAnimation'

interface ScrollProgressProps {
  className?: string
  showPercentage?: boolean
}

export function ScrollProgress({ className = '', showPercentage = false }: ScrollProgressProps) {
  const scrollProgress = useScrollProgress()

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="h-1 bg-slate-200/50 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="absolute top-2 right-4 text-xs text-slate-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
          {Math.round(scrollProgress)}%
        </div>
      )}
    </div>
  )
}

interface ScrollToTopProps {
  className?: string
  threshold?: number
}

export function ScrollToTop({ className = '', threshold = 300 }: ScrollToTopProps) {
  const scrollProgress = useScrollProgress()
  const isVisible = scrollProgress > (threshold / (document.documentElement.scrollHeight - window.innerHeight)) * 100

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-slide-in-up ${className}`}
      aria-label="חזור לראש הדף"
    >
      <svg 
        className="w-6 h-6 mx-auto" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}