'use client'

import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'cms-accessibility'

type AccessibilityState = {
  highContrast: number
  largeText: number
  underlineLinks: number
  reduceMotion: number
}

const defaultState: AccessibilityState = {
  highContrast: 0,
  largeText: 0,
  underlineLinks: 0,
  reduceMotion: 0,
}

const clamp = (value: unknown, min = 0, max = 100): number => {
  const n = Number(value)
  if (Number.isNaN(n)) return min
  return Math.min(Math.max(n, min), max)
}

const sanitizeState = (value: unknown): AccessibilityState => {
  if (!value || typeof value !== 'object') {
    return defaultState
  }
  const record = value as Partial<Record<keyof AccessibilityState, unknown>>
  return {
    highContrast: clamp(record.highContrast),
    largeText: clamp(record.largeText),
    underlineLinks: clamp(record.underlineLinks),
    reduceMotion: clamp(record.reduceMotion),
  }
}

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<AccessibilityState>(defaultState)
  const highContrastActive = state.highContrast > 0

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const sanitized = sanitizeState(parsed)
        setState(sanitized)
        applyState(sanitized)
      } else {
        applyState(defaultState)
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

  const controls = useMemo(
    () => [
      {
        id: 'highContrast',
        label: 'ניגודיות',
        description: 'שינוי עוצמת הניגודיות',
        value: state.highContrast,
        onChange: (value: number) => setState((prev) => ({ ...prev, highContrast: value })),
      },
      {
        id: 'largeText',
        label: 'גודל טקסט',
        description: 'הגדלת גופנים באתר',
        value: state.largeText,
        onChange: (value: number) => setState((prev) => ({ ...prev, largeText: value })),
      },
      {
        id: 'underlineLinks',
        label: 'הדגשת קישורים',
        description: 'עוצמת הקו התחתון בקישורים',
        value: state.underlineLinks,
        onChange: (value: number) => setState((prev) => ({ ...prev, underlineLinks: value })),
      },
      {
        id: 'reduceMotion',
        label: 'הפחתת אנימציות',
        description: 'קביעת עוצמת האנימציה',
        value: state.reduceMotion,
        onChange: (value: number) => setState((prev) => ({ ...prev, reduceMotion: value })),
      },
    ],
    [state],
  )

  const resetAccessibility = () => {
    setState(defaultState)
  }

  return (
    <div className="fixed bottom-20 left-6 z-[95] flex flex-col items-stretch gap-2">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="accessibility-toolbar-panel"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-full p-3 shadow-lg shadow-slate-900/40 backdrop-blur transition focus:outline-none focus-visible:ring-2 ${
          highContrastActive
            ? 'bg-sky-400 text-slate-900 hover:bg-sky-300 focus-visible:ring-sky-200'
            : 'bg-slate-900/90 text-white hover:bg-slate-800 focus-visible:ring-slate-200'
        }`}
      >
        <span className="sr-only">תוסף נגישות</span>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.485 6.485-2.121-2.121M8.636 9.515 6.515 7.394m0 9.192 2.121-2.121m9.192 0-2.121 2.121" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="accessibility-toolbar-panel"
          className={`w-72 rounded-2xl border p-4 text-sm shadow-xl backdrop-blur-md ${
            highContrastActive ? 'border-sky-300 bg-slate-800 text-white' : 'border-white/15 bg-slate-900/95 text-white'
          }`}
          role="dialog"
          aria-label="תוסף נגישות אתר"
        >
          <h2 className="mb-3 text-base font-semibold">התאמות נגישות</h2>
          <div className="flex flex-col gap-4">
            {controls.map(({ id, label, description, value, onChange }) => (
              <SliderControl
                key={id}
                id={id}
                label={label}
                description={description}
                value={value}
                onChange={onChange}
              />
            ))}

            <button
              type="button"
              onClick={resetAccessibility}
              className="mt-1 rounded-lg border border-white/10 px-3 py-2 text-right text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
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

function SliderControl({
  id,
  label,
  description,
  value,
  onChange,
}: {
  id: string
  label: string
  description: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`slider-${id}`} className="flex items-center justify-between gap-2">
        <div>
          <span className="text-sm font-medium text-white">{label}</span>
          <p className="text-xs text-white/70">{description}</p>
        </div>
        <span className="text-xs font-semibold text-white/70">{value}%</span>
      </label>
      <input
        id={`slider-${id}`}
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        className="accent-sky-400"
      />
    </div>
  )
}

function applyState(state: AccessibilityState) {
  if (typeof document === 'undefined') return
  const root = document.documentElement

  const contrastActive = state.highContrast > 0
  const fontScale = 1 + state.largeText / 100
  const underlineActive = state.underlineLinks > 0
  const underlineFactor = state.underlineLinks / 100
  const motionActive = state.reduceMotion > 0
  const motionScale = Math.max(0.05, 1 - state.reduceMotion / 100)

  root.classList.toggle('a11y-high-contrast', contrastActive)
  root.classList.toggle('a11y-large-text', state.largeText > 0)
  root.classList.toggle('a11y-underline-links', underlineActive)
  root.classList.toggle('a11y-reduce-motion', motionActive)

  root.style.setProperty('--a11y-contrast-filter', contrastActive ? `contrast(${1 + state.highContrast / 100})` : 'none')
  root.style.setProperty('--a11y-font-scale', fontScale.toString())
  root.style.setProperty('--a11y-underline-factor', underlineFactor.toString())
  root.style.setProperty('--a11y-motion-scale', motionScale.toString())
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
