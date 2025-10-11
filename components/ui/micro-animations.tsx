'use client';

import React, { useState, useEffect } from 'react';

// אנימציית הופעה עם עיכוב
export function FadeInUp({ 
  children, 
  delay = 0, 
  duration = 600,
  className = '' 
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all ease-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {children}
    </div>
  );
}

// אנימציית הרחבה
export function ScaleIn({ 
  children, 
  delay = 0,
  className = '' 
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-500 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.9)'
      }}
    >
      {children}
    </div>
  );
}

// אנימציית סיבוב עדין
export function RotateIn({ 
  children, 
  delay = 0,
  className = '' 
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-10deg) scale(0.8)'
      }}
    >
      {children}
    </div>
  );
}

// אנימציית החלקה מהצד
export function SlideInFromSide({ 
  children, 
  direction = 'right',
  delay = 0,
  className = '' 
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const translateX = direction === 'right' ? '30px' : '-30px';

  return (
    <div 
      className={`transition-all duration-600 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : `translateX(${translateX})`
      }}
    >
      {children}
    </div>
  );
}

// אפקט הקלדה מתקדם
type TypewriterEffectProps = {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterEffect({ 
  text, 
  speed = 100,
  className = '',
  onComplete
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-blue-500">|</span>
    </span>
  );
}

// אנימציית מספרים עולים
export function CountUp({ 
  end, 
  duration = 2000,
  className = '' 
}: {
  end: number;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span className={className}>{count.toLocaleString()}</span>;
}
