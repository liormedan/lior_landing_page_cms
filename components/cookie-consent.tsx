'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cms-cookie-consent'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const existingConsent = window.localStorage.getItem(STORAGE_KEY)
    if (!existingConsent) {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    if (isVisible && typeof document !== 'undefined') {
      const previousPadding = document.body.style.paddingTop
      document.body.style.paddingTop = '72px'
      return () => {
        document.body.style.paddingTop = previousPadding
      }
    }
    if (!isVisible && typeof document !== 'undefined') {
      document.body.style.paddingTop = ''
    }
  }, [isVisible])

  const onAccept = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'accepted')
    }
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] bg-slate-900/95 backdrop-blur border-t border-white/10 text-white">
      <div className="lp-container flex flex-col items-center justify-between gap-3 py-3 text-sm sm:flex-row">
        <p className="text-center leading-relaxed text-white/85 sm:text-right">
          האתר משתמש בעוגיות (Cookies) כדי לשפר את חוויית הגלישה ולנתח שימוש. המשך שימוש באתר מהווה הסכמה למדיניות.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAccept}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
          >
            מאשר/ת
          </button>
          <a
            href="#contact"
            className="text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            למד(י) עוד
          </a>
        </div>
      </div>
    </div>
  )
}
