'use client'

import { KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import { DemoContent } from '@/types/landing-page'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface DemoSectionProps {
  demo: DemoContent
}

export default function DemoSection({ demo }: DemoSectionProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2, delay: 120 })
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation({ threshold: 0.2, delay: 240 })

  const handleThumbnailKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedImage(index)
    }
  }

  return (
    <section id="demo" ref={sectionRef} className="bg-white py-24" aria-labelledby="demo-heading">
      <div className="lp-container">
        <div
          className={`mx-auto max-w-3xl text-right transition-all	duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center justify-center rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            הצצה לאולפן Sanity שלנו
          </span>
          <h2
            id="demo-heading"
            className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
          >
            {demo.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{demo.description}</p>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
          <div
            ref={contentRef}
            className={`space-y-8 transition-all	duration-700 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 text-right">
              <h3 className="text-xl font-semibold text-slate-900">מה תראו בהדגמה?</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                נעבור על מבני התוכן שחיברנו ללקוחות אמיתיים, נציג איך עובדת תצוגת ה-Preview, ונראה כיצד מזרימים את השינויים לאתר ה-Next.js בלחיצת כפתור.
              </p>
            </div>

            <ul className="space-y-4 text-right text-sm leading-relaxed text-slate-600" role="list">
              {demo.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3" role="listitem">
                  <span
                    className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sky-500"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-3xl border border-slate-200 bg-sky-100/80 p-6 backdrop-blur-sm shadow-[0_25px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                למה זה חשוב
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                הדגמה מעשית מאפשרת לצוות שלכם להבין כיצד כל שינוי משפיע על האתר, לראות את ה-Preview בזמן אמת, ולבדוק תהליכים כמו אישורים, Workflow ואינטגרציות לפני שמתחייבים.
              </p>
            </div>
          </div>

          <div
            ref={galleryRef}
            className={`space-y-4 transition-all	duration-700 ${
              galleryVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-sky-100/70 backdrop-blur-sm shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <Image
                src={demo.screenshots[selectedImage]}
                alt={`צילום מסך מהדגמה – שקופית ${selectedImage + 1}`}
                width={960}
                height={720}
                className="w-full rounded-[32px] object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
              />

              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-2xl bg-sky-100/80 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
                <span>שקופית {selectedImage + 1} מתוך {demo.screenshots.length}</span>
                <span className="flex items-center gap-2 text-xs">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  Live sync
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {demo.screenshots.map((screenshot, index) => (
                <button
                  key={screenshot}
                  onClick={() => setSelectedImage(index)}
                  onKeyDown={(event) => handleThumbnailKeyDown(event, index)}
                  className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-sky-100/80 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                    selectedImage === index ? 'ring-2 ring-sky-500' : 'hover:-translate-y-1'
                  }`}
                  aria-label={`בחירת תצוגה מספר ${index + 1} מתוך ${demo.screenshots.length}`}
                  aria-pressed={selectedImage === index}
                  type="button"
                >
                  <Image
                    src={screenshot}
                    alt={`תצוגה ממוזערת מספר ${index + 1}`}
                    width={320}
                    height={240}
                    className="w-full object-cover"
                    sizes="(min-width: 1024px) 160px, 33vw"
                  />
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 text-right shadow-[0_25px_60px_rgba(15,23,42,0.05)] backdrop-blur-sm flex flex-col items-center gap-4">
              <p className="w-full text-base leading-relaxed text-slate-600">
                רוצים לראות את Sanity עם הנתונים שלכם? נבנה סביבת דמו מותאמת, נחבר אותנטיקציה
                בסיסית ונעבור על התהליכים בלייב.
              </p>
              <a
                href="#contact"
                className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                לקביעת הדגמה אישית
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
        </div>
      </div>
    </section>
  )
}
