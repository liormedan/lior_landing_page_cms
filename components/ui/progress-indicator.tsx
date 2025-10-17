'use client'

import { useEffect, useState } from 'react'

interface ProgressIndicatorProps {
  duration?: number
  className?: string
}

export function ProgressIndicator({ duration = 3000, className = '' }: ProgressIndicatorProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + (100 / (duration / 100))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [duration])

  return (
    <div className={`w-full bg-slate-200 rounded-full h-2 overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-700/90 to-blue-600 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-slate-300 border-t-sky-600 h-full w-full" />
    </div>
  )
}

interface PulsingDotsProps {
  className?: string
}

export function PulsingDots({ className = '' }: PulsingDotsProps) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      <div className="w-2 h-2 bg-blue-700/90 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="w-2 h-2 bg-blue-700/90 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="w-2 h-2 bg-blue-700/90 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
    </div>
  )
}

interface FloatingElementsProps {
  count?: number
  className?: string
}

export function FloatingElements({ count = 6, className = '' }: FloatingElementsProps) {
  const [elements, setElements] = useState<Array<{
    id: number
    width: number
    height: number
    top: number
    left: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    // Generate random values only on client side to avoid hydration mismatch
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      width: Math.random() * 20 + 10,
      height: Math.random() * 20 + 10,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 3
    }))
    setElements(newElements)
  }, [count])

  // Don't render anything on server to avoid hydration mismatch
  if (elements.length === 0) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true" />
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute rounded-full bg-gradient-to-r from-sky-400/20 to-blue-400/20 animate-float`}
          style={{
            width: `${element.width}px`,
            height: `${element.height}px`,
            top: `${element.top}%`,
            left: `${element.left}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`
          }}
        />
      ))}
    </div>
  )
}
