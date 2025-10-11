'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// קומפוננט מעבר בין דפים
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div 
      className={`
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {children}
    </div>
  );
}

// אנימציית טעינה לדף
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex items-center justify-center">
      <div className="relative">
        {/* ספינר מרכזי */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* עיגולים מסביב */}
        <div className="absolute inset-0 w-16 h-16">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping" 
               style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/2 right-0 w-2 h-2 bg-purple-500 rounded-full animate-ping" 
               style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-500 rounded-full animate-ping" 
               style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute top-1/2 left-0 w-2 h-2 bg-indigo-500 rounded-full animate-ping" 
               style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </div>
  );
}

// אנימציית גלילה חלקה
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <>{children}</>;
}

// אנימציית הופעה בגלילה
export function ScrollReveal({ 
  children, 
  threshold = 0.1,
  className = '' 
}: {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return (
    <div 
      ref={setRef}
      className={`
        transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// אנימציית stagger לרשימות
export function StaggeredList({ 
  children, 
  staggerDelay = 100 
}: {
  children: React.ReactNode[];
  staggerDelay?: number;
}) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, index]));
      }, index * staggerDelay);
    });
  }, [children, staggerDelay]);

  return (
    <>
      {children.map((child, index) => (
        <div
          key={index}
          className={`
            transition-all duration-500 ease-out
            ${visibleItems.has(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
        >
          {child}
        </div>
      ))}
    </>
  );
}