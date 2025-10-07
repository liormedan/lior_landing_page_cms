'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface AnimatedWrapperProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'float'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  triggerOnce?: boolean
}

export function AnimatedWrapper({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  triggerOnce = true
}: AnimatedWrapperProps) {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold, 
    triggerOnce, 
    delay 
  })

  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-${duration}`
    
    switch (animation) {
      case 'slideUp':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
      case 'slideLeft':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`
      case 'slideRight':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`
      case 'scaleIn':
        return `${baseClasses} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`
      case 'float':
        return `${baseClasses} ${isVisible ? 'opacity-100 animate-float' : 'opacity-0'}`
      default: // fadeIn
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`
    }
  }

  return (
    <div 
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

interface StaggeredAnimationProps {
  children: ReactNode[]
  staggerDelay?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn'
  className?: string
}

export function StaggeredAnimation({
  children,
  staggerDelay = 100,
  animation = 'slideUp',
  className = ''
}: StaggeredAnimationProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedWrapper
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          className="mb-4"
        >
          {child}
        </AnimatedWrapper>
      ))}
    </div>
  )
}

interface HoverEffectProps {
  children: ReactNode
  effect?: 'lift' | 'scale' | 'glow' | 'rotate' | 'bounce'
  className?: string
}

export function HoverEffect({ children, effect = 'lift', className = '' }: HoverEffectProps) {
  const getHoverClasses = () => {
    switch (effect) {
      case 'scale':
        return 'transition-transform duration-300 hover:scale-105'
      case 'glow':
        return 'transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25'
      case 'rotate':
        return 'transition-transform duration-300 hover:rotate-3'
      case 'bounce':
        return 'transition-transform duration-300 hover:animate-bounce'
      default: // lift
        return 'transition-all duration-300 hover:-translate-y-2 hover:shadow-lg'
    }
  }

  return (
    <div className={`${getHoverClasses()} ${className}`}>
      {children}
    </div>
  )
}

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0 })

  return (
    <div 
      ref={ref}
      className={`transform transition-transform duration-300 ${className}`}
      style={{
        transform: isVisible ? `translateY(${window.scrollY * speed}px)` : 'translateY(0)'
      }}
    >
      {children}
    </div>
  )
}