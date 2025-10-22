'use client'

import { useEffect, useState } from 'react'

export default function DevResetButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show reset button only in development or when a special query param is present
    const isDev = process.env.NODE_ENV === 'development'
    const hasResetParam = typeof window !== 'undefined' && window.location.search.includes('show-reset=true')
    
    if (isDev || hasResetParam) {
      setIsVisible(true)
    }
  }, [])

  const resetAll = () => {
    if (typeof window !== 'undefined') {
      // Clear all localStorage items related to the app
      window.localStorage.removeItem('cms-accessibility')
      window.localStorage.removeItem('cms-cookie-consent')
      
      // Set reset flags for next load
      window.sessionStorage.setItem('accessibility-reset', 'true')
      window.sessionStorage.setItem('cookie-reset', 'true')
      
      // Reload the page
      window.location.reload()
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed top-4 left-4 z-[110]">
      <button
        type="button"
        onClick={resetAll}
        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-lg hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        title="איפוס מלא של כל ההגדרות (פיתוח בלבד)"
      >
        🔄 איפוס הכל
      </button>
    </div>
  )
}