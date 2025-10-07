import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PricingSection from '@/components/pricing-section'
import { getPricingPackages } from '@/lib/landing-page-content'

// Mock fetch for API calls
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock console.log to capture email logs
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('Full Flow Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    mockConsoleLog.mockClear()
    // Set environment to console mode for testing
    process.env.EMAIL_SERVICE = 'console'
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Complete Pricing to Email Flow', () => {
    it('should complete full flow from pricing selection to email delivery', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      // Mock successful API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'ההודעה נשלחה בהצלחה'
        })
      })

      render(<PricingSection packages={packages} />)

      // Step 1: Select a pricing package
      const proPackageButton = screen.getByRole('button', { name: /החבילה המומלצת/ })
      await user.click(proPackageButton)

      // Step 2: Verify contact form opens with selected package
      await waitFor(() => {
        expect(screen.getByText(/יצירת קשר/)).toBeInTheDocument()
        expect(screen.getByText(/חבילה נבחרת: פרו/)).toBeInTheDocument()
      })

      // Step 3: Fill out the contact form
      await user.type(screen.getByLabelText(/שם מלא/), 'יוסי כהן')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'yossi@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'בלוגים מקצועיים')
      await user.type(
        screen.getByLabelText(/הודעה/), 
        'אני מעוניין בחבילת הפרו לבניית בלוג מקצועי לעסק שלי. אשמח לקבל פרטים נוספים על התהליך והעלויות.'
      )

      // Step 4: Submit the form
      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Step 5: Verify loading state
      expect(screen.getByText(/שולח הודעה/)).toBeInTheDocument()

      // Step 6: Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
      })

      // Step 7: Verify API was called with correct data
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'יוסי כהן',
          email: 'yossi@example.com',
          projectType: 'בלוגים מקצועיים',
          message: 'אני מעוניין בחבילת הפרו לבניית בלוג מקצועי לעסק שלי. אשמח לקבל פרטים נוספים על התהליך והעלויות.',
          selectedPackage: 'פרו'
        })
      })

      // Step 8: Verify success actions are available
      expect(screen.getByRole('button', { name: /שלח הודעה נוספת/ })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /סגור/ })).toBeInTheDocument()
    })

    it('should handle premium package contact flow', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'ההודעה נשלחה בהצלחה'
        })
      })

      render(<PricingSection packages={packages} />)

      // Select premium package (contact pricing)
      const premiumButton = screen.getByRole('button', { name: /בואו נדבר/ })
      await user.click(premiumButton)

      // Verify premium package is selected
      await waitFor(() => {
        expect(screen.getByText(/חבילה נבחרת: פרימיום/)).toBeInTheDocument()
      })

      // Fill form for premium inquiry
      await user.type(screen.getByLabelText(/שם מלא/), 'שרה לוי')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'sara@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'אחר')
      await user.type(
        screen.getByLabelText(/הודעה/), 
        'אני מעוניינת בפתרון מותאם אישית לחברה שלי. הפרויקט כולל מערכת ניהול מורכבת ואינטגרציות מתקדמות.'
      )

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      await waitFor(() => {
        expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
      })

      // Verify premium package was sent
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'שרה לוי',
          email: 'sara@example.com',
          projectType: 'אחר',
          message: 'אני מעוניינת בפתרון מותאם אישית לחברה שלי. הפרויקט כולל מערכת ניהול מורכבת ואינטגרציות מתקדמות.',
          selectedPackage: 'פרימיום'
        })
      })
    })

    it('should handle basic package selection and form submission', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'ההודעה נשלחה בהצלחה'
        })
      })

      render(<PricingSection packages={packages} />)

      // Select basic package
      const basicButton = screen.getByRole('button', { name: /בחירת חבילה/ })
      await user.click(basicButton)

      await waitFor(() => {
        expect(screen.getByText(/חבילה נבחרת: בסיסי/)).toBeInTheDocument()
      })

      // Fill form for basic package
      await user.type(screen.getByLabelText(/שם מלא/), 'דוד כהן')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'david@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'פורטפוליו דיגיטלי')
      await user.type(
        screen.getByLabelText(/הודעה/), 
        'אני מעוניין בחבילה הבסיסית לבניית פורטפוליו דיגיטלי פשוט וקלין.'
      )

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      await waitFor(() => {
        expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'דוד כהן',
          email: 'david@example.com',
          projectType: 'פורטפוליו דיגיטלי',
          message: 'אני מעוניין בחבילה הבסיסית לבניית פורטפוליו דיגיטלי פשוט וקלין.',
          selectedPackage: 'בסיסי'
        })
      })
    })
  })

  describe('Error Handling in Full Flow', () => {
    it('should handle API errors during full flow', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      // Mock API error
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({
          success: false,
          error: 'אירעה שגיאה בשליחת ההודעה'
        })
      })

      render(<PricingSection packages={packages} />)

      // Select package and fill form
      const proButton = screen.getByRole('button', { name: /החבילה המומלצת/ })
      await user.click(proButton)

      await waitFor(() => {
        expect(screen.getByText(/חבילה נבחרת: פרו/)).toBeInTheDocument()
      })

      await user.type(screen.getByLabelText(/שם מלא/), 'רחל אברהם')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'rachel@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'חנויות אונליין')
      await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניינת בחנות אונליין מתקדמת')

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Verify error is displayed
      await waitFor(() => {
        expect(screen.getByText(/שליחת ההודעה נכשלה/)).toBeInTheDocument()
      })

      // Verify form is still usable
      expect(screen.getByLabelText(/שם מלא/)).not.toBeDisabled()
      expect(screen.getByRole('button', { name: /שלח הודעה/ })).not.toBeDisabled()
    })

    it('should handle validation errors during full flow', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      render(<PricingSection packages={packages} />)

      // Select package
      const basicButton = screen.getByRole('button', { name: /בחירת חבילה/ })
      await user.click(basicButton)

      await waitFor(() => {
        expect(screen.getByText(/חבילה נבחרת: בסיסי/)).toBeInTheDocument()
      })

      // Fill form with invalid data
      await user.type(screen.getByLabelText(/שם מלא/), 'א') // Too short
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'invalid-email') // Invalid format
      // Leave project type empty
      await user.type(screen.getByLabelText(/הודעה/), 'קצר') // Too short

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Verify validation errors
      await waitFor(() => {
        expect(screen.getByText(/שם חייב להכיל לפחות 2 תווים/)).toBeInTheDocument()
        expect(screen.getByText(/כתובת אימייל לא תקינה/)).toBeInTheDocument()
        expect(screen.getByText(/יש לבחור סוג פרויקט/)).toBeInTheDocument()
        expect(screen.getByText(/הודעה חייבת להכיל לפחות 10 תווים/)).toBeInTheDocument()
      })

      // Verify API was not called
      expect(mockFetch).not.toHaveBeenCalled()
    })
  })

  describe('Modal Interaction in Full Flow', () => {
    it('should close modal and reset state when clicking close', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      render(<PricingSection packages={packages} />)

      // Open modal
      const proButton = screen.getByRole('button', { name: /החבילה המומלצת/ })
      await user.click(proButton)

      await waitFor(() => {
        expect(screen.getByText(/חבילה נבחרת: פרו/)).toBeInTheDocument()
      })

      // Partially fill form
      await user.type(screen.getByLabelText(/שם מלא/), 'מיכל דוד')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'michal@example.com')

      // Close modal
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      // Verify modal is closed
      await waitFor(() => {
        expect(screen.queryByText(/חבילה נבחרת: פרו/)).not.toBeInTheDocument()
      })

      // Reopen modal and verify form is reset
      await user.click(proButton)

      await waitFor(() => {
        expect(screen.getByText(/חבילה נבחרת: פרו/)).toBeInTheDocument()
        expect(screen.getByLabelText(/שם מלא/)).toHaveValue('')
        expect(screen.getByLabelText(/כתובת אימייל/)).toHaveValue('')
      })
    })

    it('should auto-close modal after successful submission', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'ההודעה נשלחה בהצלחה'
        })
      })

      render(<PricingSection packages={packages} />)

      // Complete successful submission
      const basicButton = screen.getByRole('button', { name: /בחירת חבילה/ })
      await user.click(basicButton)

      await waitFor(() => {
        expect(screen.getByText(/חבילה נבחרת: בסיסי/)).toBeInTheDocument()
      })

      await user.type(screen.getByLabelText(/שם מלא/), 'אבי שמואל')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'avi@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'פלטפורמות חינוכיות')
      await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניין בפלטפורמה חינוכית')

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
      })

      // Wait for auto-close (3 seconds + buffer)
      await waitFor(() => {
        expect(screen.queryByText(/ההודעה נשלחה בהצלחה/)).not.toBeInTheDocument()
      }, { timeout: 4000 })
    })
  })

  describe('Accessibility in Full Flow', () => {
    it('should maintain focus management throughout the flow', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      render(<PricingSection packages={packages} />)

      // Open modal
      const proButton = screen.getByRole('button', { name: /החבילה המומלצת/ })
      await user.click(proButton)

      // Verify focus moves to modal
      await waitFor(() => {
        const modal = screen.getByRole('dialog', { hidden: true }) || screen.getByText(/יצירת קשר/)
        expect(modal).toBeInTheDocument()
      })

      // Tab through form fields
      await user.tab()
      expect(screen.getByLabelText(/שם מלא/)).toHaveFocus()

      await user.tab()
      expect(screen.getByLabelText(/כתובת אימייל/)).toHaveFocus()

      await user.tab()
      expect(screen.getByLabelText(/סוג הפרויקט/)).toHaveFocus()

      await user.tab()
      expect(screen.getByLabelText(/הודעה/)).toHaveFocus()
    })

    it('should provide proper ARIA labels and roles', async () => {
      const user = userEvent.setup()
      const packages = getPricingPackages()
      
      render(<PricingSection packages={packages} />)

      const proButton = screen.getByRole('button', { name: /החבילה המומלצת/ })
      await user.click(proButton)

      await waitFor(() => {
        // Verify form has proper labels
        expect(screen.getByLabelText(/שם מלא/)).toBeInTheDocument()
        expect(screen.getByLabelText(/כתובת אימייל/)).toBeInTheDocument()
        expect(screen.getByLabelText(/סוג הפרויקט/)).toBeInTheDocument()
        expect(screen.getByLabelText(/הודעה/)).toBeInTheDocument()

        // Verify required field indicators
        expect(screen.getByText(/שם מלא \*/)).toBeInTheDocument()
        expect(screen.getByText(/כתובת אימייל \*/)).toBeInTheDocument()
        expect(screen.getByText(/סוג הפרויקט \*/)).toBeInTheDocument()
        expect(screen.getByText(/הודעה \*/)).toBeInTheDocument()
      })
    })
  })
})