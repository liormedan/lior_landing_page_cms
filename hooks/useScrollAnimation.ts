'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
              if (triggerOnce) {
                setHasTriggered(true)
              }
            }, delay)
          } else {
            setIsVisible(true)
            if (triggerOnce) {
              setHasTriggered(true)
            }
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered])

  return { ref: elementRef, isVisible }
}

// Hook for staggered animations (multiple elements)
export function useStaggeredAnimation(itemCount: number, staggerDelay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animations with stagger
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]))
            }, i * staggerDelay)
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [itemCount, staggerDelay])

  return { containerRef, visibleItems }
}

// Hook for scroll progress
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollProgress
}