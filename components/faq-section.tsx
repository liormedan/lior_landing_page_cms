'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { FAQItem } from '@/types/landing-page'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface FAQSectionProps {
  faqItems: FAQItem[]
}

interface FAQAccordionItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

function FAQAccordionItem({ item, isOpen, onToggle }: FAQAccordionItemProps) {
  const itemId = `faq-${item.question.replace(/\s+/g, '-').toLowerCase()}`
  
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900/70">
      <button
        onClick={onToggle}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-right bg-white hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800/70 transition-colors duration-200 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
        aria-expanded={isOpen}
        aria-controls={`${itemId}-content`}
        id={`${itemId}-button`}
      >
        <ChevronDownIcon 
          className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-300 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors text-right">
          {item.question}
        </h3>
      </button>
      
      <div 
        id={`${itemId}-content`}
        role="region"
        aria-labelledby={`${itemId}-button`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 pb-3 sm:pb-4 pt-2 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-right text-sm sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection({ faqItems }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  // Group FAQ items by category for better organization
  const groupedFAQ = faqItems.reduce((acc, item, index) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push({ ...item, originalIndex: index })
    return acc
  }, {} as Record<string, (FAQItem & { originalIndex: number })[]>)

  const categoryTitles = {
    technical: 'שאלות טכניות',
    pricing: 'מחירים ותשלום',
    process: 'תהליך העבודה'
  }

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 
            id="faq-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            שאלות נפוצות
          </h2>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
            מצאו תשובות לשאלות הנפוצות ביותר על השירותים והטכנולוגיות שלנו
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6 sm:space-y-8">
          {Object.entries(groupedFAQ).map(([category, items]) => (
            <div key={category} className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 text-right border-b border-slate-200 dark:border-slate-800 pb-2">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h3>
              
              <div className="space-y-2 sm:space-y-3" role="group" aria-labelledby={`category-${category}`}>
                {items.map((item) => (
                  <FAQAccordionItem
                    key={item.originalIndex}
                    item={item}
                    isOpen={openItems.has(item.originalIndex)}
                    onToggle={() => toggleItem(item.originalIndex)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-slate-50 dark:from-slate-900/80 dark:to-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200/70 dark:border-slate-800/70">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              לא מצאתם את התשובה שחיפשתם?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">
              צרו איתנו קשר ונשמח לענות על כל שאלה נוספת
            </p>
            <button 
              className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
              aria-label="פתח טופס יצירת קשר לשאלות נוספות"
            >
              יצירת קשר
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
