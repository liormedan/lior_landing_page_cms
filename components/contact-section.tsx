'use client'

import { useState } from 'react'
import ContactModal from './contact-modal'

interface ContactSectionProps {
  selectedPackage?: string
}

export default function ContactSection({ selectedPackage }: ContactSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <section 
        id="contact"
        className="relative py-16 sm:py-20 section-divider"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-light px-6 sm:px-10 py-12 sm:py-14 text-center shadow-2xl shadow-slate-900/15">
            <div className="mb-8 sm:mb-12">
            <h2 
              id="contact-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              מוכנים להתחיל?
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              בואו נפגש ונבנה יחד את הפתרון הדיגיטלי המושלם עבורכם
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">ייעוץ חינם</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                שיחת ייעוץ ללא התחייבות לבחירת הפתרון המתאים
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">מענה מהיר</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                נחזור אליכם תוך 24 שעות עם הצעת מחיר מפורטת
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">ללא התחייבות</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                אין עלויות נסתרות - מה שמוצע זה מה שתקבלו
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={openModal}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="פתח טופס יצירת קשר"
            >
              בואו נתחיל לעבוד
            </button>
            
            <a
              href="tel:+972-50-123-4567"
              className="w-full sm:w-auto inline-block text-center border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="התקשר למספר 050-123-4567"
            >
              התקשרו עכשיו
            </a>
          </div>

          {selectedPackage && (
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg inline-block">
              <p className="text-blue-800 text-sm sm:text-base">
                <span className="font-medium">חבילה נבחרת:</span> {selectedPackage}
              </p>
            </div>
          )}
        </div>
      </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        selectedPackage={selectedPackage}
      />
    </>
  )
}
