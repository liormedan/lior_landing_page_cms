'use client'

import { useEffect, useState } from 'react'

interface SectionNavProps {
  sections: ReadonlyArray<{ id: string; label: string }>
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) {
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: [0.25, 0.5, 0.75],
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  return (
    <nav
      aria-label="ניווט צדדי בין מקטעי הדף"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
      <div className="rounded-full border border-blue-700/20 bg-white/80 px-4 py-6 shadow-xl backdrop-blur">
      <ul className="flex flex-col items-center gap-4">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`group relative flex h-4 w-4 items-center justify-center rounded-full border border-blue-700/50 transition ${
                  isActive ? 'bg-blue-700/90' : 'bg-white hover:bg-blue-700/10'
                }`}
                aria-label={label}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="pointer-events-none absolute right-full mr-3 rounded-full bg-slate-900 px-3 py-1 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                  {label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
      </div>
    </nav>
  )
}
