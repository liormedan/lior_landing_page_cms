import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ContactForm from '@/components/contact-form'
import PricingSection from '@/components/pricing-section'
import { getPricingPackages } from '@/lib/landing-page-content'

// Mock fetch for API calls
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Contact Form Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Complete Contact Form Flow', () => {
    it('should handle successful form submission with all required fields', async () => {
      const user = userEvent.setup()
      
      // Mock successful API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'ההודעה נשלחה בהצלחה'
        })
      })

      render(<ContactForm />)

      // Fill out all required fields
      await user.type(screen.getByLabelText(/שם מלא/), 'יוסי כהן')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'yossi@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'בלוגים מקצועיים')
      await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניין לבנות בלוג מקצועי לעסק שלי')

      // Submit form
      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Verify loading state
      expect(screen.getByText(/שולח הודעה/)).toBeInTheDocument()

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
      })

      // Verify API was called with correct data
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'יוסי כהן',
          email: 'yossi@example.com',
          projectType: 'בלוגים מקצועיים',
          message: 'אני מעוניין לבנות בלוג מקצועי לעסק שלי',
          selectedPackage: ''
        })
      })
    })

    it('should handle form submission with selected package', async () => {
      const user = userEvent.setup()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'ההודעה נשלחה בהצלחה'
        })
      })

      render(<ContactForm selectedPackage="פרו" />)

      // Verify selected package is displayed
      expect(screen.getByText(/חבילה נבחרת: פרו/)).toBeInTheDocument()

      // Fill out form
      await user.type(screen.getByLabelText(/שם מלא/), 'שרה לוי')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'sara@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'אתרי חברה')
      await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניינת בחבילת הפרו לאתר החברה שלי')

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      await waitFor(() => {
        expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
      })

      // Verify selected package was included in API call
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'שרה לוי',
          email: 'sara@example.com',
          projectType: 'אתרי חברה',
          message: 'אני מעוניינת בחבילת הפרו לאתר החברה שלי',
          selectedPackage: 'פרו'
        })
      })
    })

    it('should handle API errors gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock API error response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({
          success: false,
          error: 'אירעה שגיאה בשליחת ההודעה'
        })
      })

      render(<ContactForm />)

      // Fill out form
      await user.type(screen.getByLabelText(/שם מלא/), 'דוד כהן')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'david@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'פורטפוליו דיגיטלי')
      await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניין בפורטפוליו דיגיטלי')

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText(/שליחת ההודעה נכשלה/)).toBeInTheDocument()
      })

      // Verify form is still editable after error
      expect(screen.getByLabelText(/שם מלא/)).not.toBeDisabled()
      expect(screen.getByRole('button', { name: /שלח הודעה/ })).not.toBeDisabled()
    })

    it('should handle network errors', async () => {
      const user = userEvent.setup()
      
      // Mock network error
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      render(<ContactForm />)

      // Fill out form
      await user.type(screen.getByLabelText(/שם מלא/), 'רחל אברהם')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'rachel@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'חנויות אונליין')
      await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניינת בחנות אונליין')

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText(/אירעה שגיאה בשליחת ההודעה/)).toBeInTheDocument()
      })
    })
  })

  describe('Form Validation Integration', () => {
    it('should prevent submission with missing required fields', async () => {
      const user = userEvent.setup()
      
      render(<ContactForm />)

      // Try to submit empty form
      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Verify validation errors appear
      await waitFor(() => {
        expect(screen.getByText(/שם מלא הוא שדה חובה/)).toBeInTheDocument()
        expect(screen.getByText(/כתובת אימייל היא שדה חובה/)).toBeInTheDocument()
        expect(screen.getByText(/יש לבחור סוג פרויקט/)).toBeInTheDocument()
        expect(screen.getByText(/הודעה היא שדה חובה/)).toBeInTheDocument()
      })

      // Verify API was not called
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('should validate email format', async () => {
      const user = userEvent.setup()
      
      render(<ContactForm />)

      // Enter invalid email
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'invalid-email')
      await user.tab() // Trigger blur event

      await waitFor(() => {
        expect(screen.getByText(/כתובת אימייל לא תקינה/)).toBeInTheDocument()
      })
    })

    it('should validate minimum message length', async () => {
      const user = userEvent.setup()
      
      render(<ContactForm />)

      // Enter short message
      await user.type(screen.getByLabelText(/הודעה/), 'קצר')
      await user.tab() // Trigger blur event

      await waitFor(() => {
        expect(screen.getByText(/הודעה חייבת להכיל לפחות 10 תווים/)).toBeInTheDocument()
      })
    })
  })

  describe('Success State Integration', () => {
    it('should allow sending another message after success', async () => {
      const user = userEvent.setup()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'ההודעה נשלחה בהצלחה'
        })
      })

      render(<ContactForm />)

      // Fill and submit form
      await user.type(screen.getByLabelText(/שם מלא/), 'מיכל דוד')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'michal@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'אתרי אירועים')
      await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניינת באתר לאירועים')

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
      })

      // Click "send another message"
      await user.click(screen.getByRole('button', { name: /שלח הודעה נוספת/ }))

      // Verify form is reset and ready for new input
      expect(screen.getByLabelText(/שם מלא/)).toHaveValue('')
      expect(screen.getByLabelText(/כתובת אימייל/)).toHaveValue('')
      expect(screen.getByLabelText(/סוג הפרויקט/)).toHaveValue('')
      expect(screen.getByLabelText(/הודעה/)).toHaveValue('')
    })

    it('should call onClose callback after success when provided', async () => {
      const user = userEvent.setup()
      const mockOnClose = vi.fn()
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'ההודעה נשלחה בהצלחה'
        })
      })

      render(<ContactForm onClose={mockOnClose} />)

      // Fill and submit form
      await user.type(screen.getByLabelText(/שם מלא/), 'אבי שמואל')
      await user.type(screen.getByLabelText(/כתובת אימייל/), 'avi@example.com')
      await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'פלטפורמות חינוכיות')
      await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניין בפלטפורמה חינוכית')

      await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
      })

      // Wait for auto-close timeout (3 seconds)
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled()
      }, { timeout: 4000 })
    })
  })
})

describe('Pricing Section to Contact Form Integration', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should open contact form with selected package when clicking CTA button', async () => {
    const user = userEvent.setup()
    const packages = getPricingPackages()
    
    render(<PricingSection packages={packages} />)

    // Find and click on a package CTA button
    const proPackageButton = screen.getByRole('button', { name: /החבילה המומלצת/ })
    await user.click(proPackageButton)

    // Verify contact form modal opens
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /יצירת קשר/ })).toBeInTheDocument()
      expect(screen.getByText(/חבילה נבחרת: פרו/)).toBeInTheDocument()
    })
  })

  it('should close contact form modal when clicking close button', async () => {
    const user = userEvent.setup()
    const packages = getPricingPackages()
    
    render(<PricingSection packages={packages} />)

    // Open modal
    const basicPackageButton = screen.getByRole('button', { name: /בחירת חבילה/ })
    await user.click(basicPackageButton)

    // Verify modal is open
    await waitFor(() => {
      expect(screen.getByText(/חבילה נבחרת: בסיסי/)).toBeInTheDocument()
    })

    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)

    // Verify modal is closed
    await waitFor(() => {
      expect(screen.queryByText(/חבילה נבחרת: בסיסי/)).not.toBeInTheDocument()
    })
  })

  it('should submit contact form with selected package from pricing section', async () => {
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

    // Open contact form for Premium package
    const premiumButton = screen.getByRole('button', { name: /בואו נדבר/ })
    await user.click(premiumButton)

    // Fill out the form in the modal
    await user.type(screen.getByLabelText(/שם מלא/), 'עמית רוזן')
    await user.type(screen.getByLabelText(/כתובת אימייל/), 'amit@example.com')
    await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'אחר')
    await user.type(screen.getByLabelText(/הודעה/), 'אני מעוניין בחבילת הפרימיום לפרויקט מורכב')

    // Submit form
    await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))

    // Wait for success
    await waitFor(() => {
      expect(screen.getByText(/ההודעה נשלחה בהצלחה/)).toBeInTheDocument()
    })

    // Verify API was called with Premium package
    expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'עמית רוזן',
        email: 'amit@example.com',
        projectType: 'אחר',
        message: 'אני מעוניין בחבילת הפרימיום לפרויקט מורכב',
        selectedPackage: 'פרימיום'
      })
    })
  })
})