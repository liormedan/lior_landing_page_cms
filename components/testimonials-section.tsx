'use client'

import Image from 'next/image'
import Link from 'next/link'
import { TestimonialsContent } from '@/types/landing-page'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

interface TestimonialsSectionProps {
  testimonials: TestimonialsContent
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 })
  const { containerRef, visibleItems } = useStaggeredAnimation(testimonials.items.length, 160)

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-slate-50 py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="lp-container">
        <div
          className={`mx-auto max-w-3xl text-right transition-all	duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center justify-center rounded-full sky-chip px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            מה הלקוחות שלנו אומרים
          </span>
          <h2
            id="testimonials-heading"
            className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
          >
            {testimonials.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{testimonials.subtitle}</p>
          {testimonials.supportingText && (
            <p className="mt-4 text-sm leading-relaxed text-slate-500">{testimonials.supportingText}</p>
          )}
        </div>

        <div
          ref={containerRef}
          className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.items.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className={`sky-card flex h-full flex-col rounded-3xl p-6 text-right transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)] ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 160}ms` }}
              aria-label={`עדות לקוח: ${item.name}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    {item.avatar ? (
                      <Image
                        src={item.avatar}
                        alt={`תמונת פרופיל של ${item.name}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-base font-semibold text-slate-500">
                        {item.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                    {item.company && (
                      <p className="text-xs text-slate-400">{item.company}</p>
                    )}
                  </div>
                </div>
                {item.highlight && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-200/40 px-3 py-1 text-xs font-semibold text-sky-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-sky-500" aria-hidden="true" />
                    {item.highlight}
                  </span>
                )}
              </div>

              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">
                {item.quote}
              </blockquote>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-right">
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 text-right">
            רוצים לשמוע איך נראה התהליך מאחורי הקלעים? נשמח לחבר אתכם ללקוחות קיימים ולשתף
            לוחות זמנים, תוצרים ותובנות מפתח.
          </p>
          <Link
            href="#contact"
            className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            לתאם שיחת היכרות
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
          </Link>
        </div>
      </div>
    </section>
  )
}
