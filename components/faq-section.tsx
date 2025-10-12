'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { FAQItem } from '@/types/landing-page'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface FAQSectionProps {
  faqItems: FAQItem[]
}

interface AccordionItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  const itemId = item.question.replace(/\s+/g, '-').toLowerCase()

  return (
    <div className="sky-card rounded-2xl">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-row-reverse items-center justify-between gap-4 rounded-2xl px-4 py-4 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={`${itemId}-content`}
        id={`${itemId}-trigger`}
      >
        <span className="flex-1 text-right text-base font-semibold text-slate-900">{item.question}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`${itemId}-content`}
        role="region"
        aria-labelledby={`${itemId}-trigger`}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-slate-200 px-4 pb-4 pt-3 text-right text-sm leading-relaxed text-slate-600">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQSection({ faqItems }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]))
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const updated = new Set(current)
      if (updated.has(index)) {
        updated.delete(index)
      } else {
        updated.add(index)
      }
      return updated
    })
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="bg-white py-24"
      aria-labelledby="faq-heading"
    >
      <div className="lp-container">
        <div
          className={`mx-auto max-w-3xl text-right transition-all	duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center justify-center rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            שאלות תשובות
          </span>
          <h2
            id="faq-heading"
            className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
          >
            כל מה שרציתם לדעת לפני שמתחילים
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            ריכזנו את השאלות שחוזרות בכל פגישה – על הזמנים, הטכנולוגיה, התמחור והליווי שאחרי
            ההשקה. אם משהו חסר, אנחנו זמינים לשיחה קצרה.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={`${item.question}-${index}`}
              item={item}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        <div className="mt-12 mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-slate-50/70 p-8 text-right shadow-[0_25px_60px_rgba(15,23,42,0.05)] backdrop-blur-sm flex flex-col items-center gap-4">
          <h3 className="w-full text-lg font-semibold text-slate-900">
            יש לכם שאלה נוספת או צורך מיוחד?
          </h3>
          <p className="mt-3 w-full text-base text-right leading-relaxed text-slate-600">
            נשמח לבנות איתכם מסמך דרישות קצר ולהציע פתרון שמתאים למבנה הצוות, הטכנולוגיה
            והתקציב שלכם. שיחת ייעוץ קצרה בדרך כלל מספיקה כדי להבין את התמונה.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            לקבוע שיחה עם הצוות
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5l8 7-8 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
