'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cms-accessibility'

type AccessibilityState = {
  highContrast: boolean
  largeText: boolean
  underlineLinks: boolean
  reduceMotion: boolean
}

const defaultState: AccessibilityState = {
  highContrast: false,
  largeText: false,
  underlineLinks: false,
  reduceMotion: false,
}

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<AccessibilityState>(defaultState)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as AccessibilityState
        setState(parsed)
        applyState(parsed)
      }
    } catch (error) {
      console.warn('Failed to read accessibility preferences', error)
    }
  }, [])

  useEffect(() => {
    applyState(state)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  const toggleHighContrast = () => setState((prev) => ({ ...prev, highContrast: !prev.highContrast }))
  const toggleLargeText = () => setState((prev) => ({ ...prev, largeText: !prev.largeText }))
  const toggleUnderlineLinks = () => setState((prev) => ({ ...prev, underlineLinks: !prev.underlineLinks }))
  const toggleReduceMotion = () => setState((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }))
  const resetAccessibility = () => setState(defaultState)

  return (
    <div className="fixed bottom-20 left-6 z-[95] flex flex-col items-stretch gap-2">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="accessibility-toolbar-panel"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-slate-900/90 p-3 text-white shadow-lg shadow-slate-900/40 backdrop-blur transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
      >
        <span className="sr-only">תוסף נגישות</span>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.485 6.485l-2.121-2.121M8.636 9.515 6.515 7.394m0 9.192 2.121-2.121m9.192 0-2.121 2.121" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="accessibility-toolbar-panel"
          className="w-64 rounded-2xl border border-white/15 bg-slate-900/95 p-4 text-sm text-white shadow-xl backdrop-blur-md"
          role="dialog"
          aria-label="תוסף נגישות אתר"
        >
          <h2 className="mb-3 text-base font-semibold">התאמות נגישות</h2>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={toggleHighContrast}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 ${
                state.highContrast ? 'border-sky-400 bg-sky-500/20' : 'border-white/20 hover:bg-white/5'
              }`}
            >
              <span>ניגודיות גבוהה</span>
              <ToggleIndicator active={state.highContrast} />
            </button>

            <button
              type="button"
              onClick={toggleLargeText}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 ${
                state.largeText ? 'border-sky-400 bg-sky-500/20' : 'border-white/20 hover:bg-white/5'
              }`}
            >
              <span>הגדלת גופן</span>
              <ToggleIndicator active={state.largeText} />
            </button>

            <button
              type="button"
              onClick={toggleUnderlineLinks}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 ${
                state.underlineLinks ? 'border-sky-400 bg-sky-500/20' : 'border-white/20 hover:bg-white/5'
              }`}
            >
              <span>הדגשת קישורים</span>
              <ToggleIndicator active={state.underlineLinks} />
            </button>

            <button
              type="button"
              onClick={toggleReduceMotion}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 ${
                state.reduceMotion ? 'border-sky-400 bg-sky-500/20' : 'border-white/20 hover:bg-white/5'
              }`}
            >
              <span>הפחתת אנימציות</span>
              <ToggleIndicator active={state.reduceMotion} />
            </button>

            <button
              type="button"
              onClick={resetAccessibility}
              className="mt-2 rounded-lg border border-white/10 px-3 py-2 text-left text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
            >
              איפוס התאמות
            </button>

            <LinkButton />
          </div>
        </div>
      )}
    </div>
  )
}

function applyState(state: AccessibilityState) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('a11y-high-contrast', state.highContrast)
  root.classList.toggle('a11y-large-text', state.largeText)
  root.classList.toggle('a11y-underline-links', state.underlineLinks)
  root.classList.toggle('a11y-reduce-motion', state.reduceMotion)
}

function ToggleIndicator({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 rounded-full transition ${
        active ? 'bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.35)]' : 'bg-white/40'
      }`}
    />
  )
}

function LinkButton() {
  return (
    <a
      href="/accessibility"
      className="mt-2 inline-flex items-center justify-center rounded-lg border border-white/15 px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
    >
      הצהרת נגישות
    </a>
  )
}
