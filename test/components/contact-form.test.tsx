import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/contact-form'

// Mock fetch
global.fetch = vi.fn()

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form fields correctly', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/שם מלא/)).toBeInTheDocument()
    expect(screen.getByLabelText(/כתובת אימייל/)).toBeInTheDocument()
    expect(screen.getByLabelText(/סוג הפרויקט/)).toBeInTheDocument()
    expect(screen.getByLabelText(/הודעה/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /שלח הודעה/ })).toBeInTheDocument()
  })

  it('displays selected package when provided', () => {
    render(<ContactForm selectedPackage="חבילה בסיסית" />)
    
    expect(screen.getByText(/חבילה נבחרת:/)).toBeInTheDocument()
    expect(screen.getByText(/חבילה בסיסית/)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /שלח הודעה/ })
    await user.click(submitButton)
    
    expect(screen.getByText(/שם מלא הוא שדה חובה/)).toBeInTheDocument()
    expect(screen.getByText(/כתובת אימייל היא שדה חובה/)).toBeInTheDocument()
    expect(screen.getByText(/יש לבחור סוג פרויקט/)).toBeInTheDocument()
    expect(screen.getByText(/הודעה היא שדה חובה/)).toBeInTheDocument()
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/כתובת אימייל/)
    await user.type(emailInput, 'invalid-email')
    await user.tab() // Trigger blur event
    
    expect(screen.getByText(/כתובת אימייל לא תקינה/)).toBeInTheDocument()
  })

  it('validates name length', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/שם מלא/)
    await user.type(nameInput, 'א')
    await user.tab()
    
    expect(screen.getByText(/שם חייב להכיל לפחות 2 תווים/)).toBeInTheDocument()
  })

  it('validates message length', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const messageInput = screen.getByLabelText(/הודעה/)
    await user.type(messageInput, 'קצר')
    await user.tab()
    
    expect(screen.getByText(/הודעה חייבת להכיל לפחות 10 תווים/)).toBeInTheDocument()
  })

  it('clears validation errors when user fixes input', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/שם מלא/)
    
    // First trigger error
    await user.type(nameInput, 'א')
    await user.tab()
    expect(screen.getByText(/שם חייב להכיל לפחות 2 תווים/)).toBeInTheDocument()
    
    // Then fix it
    await user.clear(nameInput)
    await user.type(nameInput, 'שם תקין')
    
    expect(screen.queryByText(/שם חייב להכיל לפחות 2 תווים/)).not.toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response)
    
    render(<ContactForm />)
    
    // Fill form with valid data
    await user.type(screen.getByLabelText(/שם מלא/), 'ישראל ישראלי')
    await user.type(screen.getByLabelText(/כתובת אימייל/), 'test@example.com')
    await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'בלוגים מקצועיים')
    await user.type(screen.getByLabelText(/הודעה/), 'זוהי הודעת בדיקה ארוכה מספיק')
    
    const submitButton = screen.getByRole('button', { name: /שלח הודעה/ })
    await user.click(submitButton)
    
    // Wait for success message (skip loading state check as it's too fast)
    await waitFor(() => {
      expect(screen.getByText(/ההודעה נשלחה בהצלחה!/)).toBeInTheDocument()
    }, { timeout: 3000 })
    
    // Verify fetch was called with correct data
    expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'ישראל ישראלי',
        email: 'test@example.com',
        projectType: 'בלוגים מקצועיים',
        message: 'זוהי הודעת בדיקה ארוכה מספיק',
        selectedPackage: ''
      })
    })
  })

  it('handles submission error', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    
    render(<ContactForm />)
    
    // Fill form with valid data
    await user.type(screen.getByLabelText(/שם מלא/), 'ישראל ישראלי')
    await user.type(screen.getByLabelText(/כתובת אימייל/), 'test@example.com')
    await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'בלוגים מקצועיים')
    await user.type(screen.getByLabelText(/הודעה/), 'זוהי הודעת בדיקה ארוכה מספיק')
    
    const submitButton = screen.getByRole('button', { name: /שלח הודעה/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnClose = vi.fn()
    
    render(<ContactForm onClose={mockOnClose} />)
    
    const closeButton = screen.getByRole('button', { name: /ביטול/ })
    await user.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('resets form when reset button is clicked after successful submission', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response)
    
    render(<ContactForm />)
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/שם מלא/), 'ישראל ישראלי')
    await user.type(screen.getByLabelText(/כתובת אימייל/), 'test@example.com')
    await user.selectOptions(screen.getByLabelText(/סוג הפרויקט/), 'בלוגים מקצועיים')
    await user.type(screen.getByLabelText(/הודעה/), 'זוהי הודעת בדיקה ארוכה מספיק')
    
    await user.click(screen.getByRole('button', { name: /שלח הודעה/ }))
    
    // Wait for success and click reset
    await waitFor(() => {
      expect(screen.getByText(/ההודעה נשלחה בהצלחה!/)).toBeInTheDocument()
    })
    
    const resetButton = screen.getByRole('button', { name: /שלח הודעה נוספת/ })
    await user.click(resetButton)
    
    // Check that form is reset
    expect(screen.getByLabelText(/שם מלא/)).toHaveValue('')
    expect(screen.getByLabelText(/כתובת אימייל/)).toHaveValue('')
    expect(screen.getByLabelText(/סוג הפרויקט/)).toHaveValue('')
    expect(screen.getByLabelText(/הודעה/)).toHaveValue('')
  })
})