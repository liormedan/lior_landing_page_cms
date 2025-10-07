'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DemoContent } from '@/types/landing-page'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface DemoSectionProps {
  demo: DemoContent
}

export default function DemoSection({ demo }: DemoSectionProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2, delay: 200 })
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.2, delay: 400 })

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedImage(index)
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-sky-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60"
      aria-labelledby="demo-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 
              id="demo-heading"
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6"
            >
              {demo.title}
            </h2>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              {demo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Features List */}
            <div 
              ref={contentRef}
              className={`space-y-6 sm:space-y-8 order-2 lg:order-1 transition-all duration-1000 ${
                contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
                  מה תוכלו לעשות במערכת:
                </h3>
                <ul className="space-y-3 sm:space-y-4" role="list">
                  {demo.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 sm:gap-4" role="listitem">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-sky-500 rounded-full flex items-center justify-center mt-1">
                        <svg 
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits Highlight */}
              <div className="bg-white dark:bg-slate-900/70 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-800">
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                  💡 למה זה חשוב עבורכם?
                </h4>
                <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  <p><span aria-hidden="true">✨</span> <strong>חסכון בזמן:</strong> עדכון תוכן תוך דקות במקום שעות</p>
                  <p><span aria-hidden="true">🚀</span> <strong>עצמאות מלאה:</strong> אין צורך בתכנת לכל שינוי קטן</p>
                  <p><span aria-hidden="true">⚡</span> <strong>שינויים מיידיים:</strong> התוכן מתעדכן באתר בזמן אמת</p>
                  <p><span aria-hidden="true">🔒</span> <strong>בטיחות מלאה:</strong> גיבויים אוטומטיים של כל שינוי</p>
                </div>
              </div>
            </div>

            {/* Screenshots Gallery */}
            <div 
              ref={imageRef}
              className={`space-y-4 sm:space-y-6 order-1 lg:order-2 transition-all duration-1000 ${
                imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {/* Main Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                  <Image
                    src={demo.screenshots[selectedImage]}
                    alt={`הדגמת מערכת הניהול - תמונה ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                
                {/* Image Navigation */}
                <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 flex justify-center gap-1.5 sm:gap-2">
                  {demo.screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 dark:focus:ring-offset-slate-900 ${
                        selectedImage === index
                          ? 'bg-white shadow-lg'
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                      aria-label={`הצג תמונה ${index + 1} מתוך ${demo.screenshots.length}`}
                      aria-pressed={selectedImage === index}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {demo.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 ${
                      selectedImage === index
                        ? 'ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-950'
                        : 'hover:opacity-80'
                    }`}
                    aria-label={`בחר תמונה ${index + 1} להצגה`}
                    aria-pressed={selectedImage === index}
                  >
                    <Image
                      src={screenshot}
                      alt={`תמונה ממוזערת ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 33vw, 16vw"
                    />
                  </button>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center pt-3 sm:pt-4">
                <p className="text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">
                  רוצים לראות איך זה עובד בפועל?
                </p>
                <button 
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 text-sm sm:text-base"
                  aria-label="פתח טופס יצירת קשר לדיון על הפרויקט"
                >
                  <span>בואו נדבר על הפרויקט שלכם</span>
                  <svg 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
