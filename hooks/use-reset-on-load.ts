'use client'

import { useEffect } from 'react'

/**
 * Hook שמאפשר איפוס אוטומטי של הגדרות בכל טעינה
 * להפעלה: הוסף ?auto-reset=true לכתובת
 */
export function useResetOnLoad() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const urlParams = new URLSearchParams(window.location.search)
    const shouldAutoReset = urlParams.get('auto-reset') === 'true'

    if (shouldAutoReset) {
      // Clear all app-related localStorage
      const keysToRemove = ['cms-accessibility', 'cms-cookie-consent']
      keysToRemove.forEach(key => {
        window.localStorage.removeItem(key)
      })

      // Set reset flags
      window.sessionStorage.setItem('accessibility-reset', 'true')
      window.sessionStorage.setItem('cookie-reset', 'true')

      // Remove the auto-reset param from URL to prevent infinite reloads
      urlParams.delete('auto-reset')
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '')
      window.history.replaceState({}, '', newUrl)

      console.log('🔄 Auto-reset activated - all settings cleared')
    }
  }, [])
}