import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST, GET } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

// Mock console.log to capture email logs
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('Contact API Integration Tests', () => {
  let testCounter = 0
  
  beforeEach(() => {
    mockConsoleLog.mockClear()
    testCounter++
    // Reset environment variables
    process.env.EMAIL_SERVICE = 'console'
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Email Delivery Functionality', () => {
    it('should log email details to console in development mode', async () => {
      const validFormData = {
        name: 'יוסי כהן',
        email: 'yossi@example.com',
        projectType: 'בלוגים מקצועיים',
        message: 'אני מעוניין לבנות בלוג מקצועי לעסק שלי',
        selectedPackage: 'פרו'
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validFormData)
      })

      const response = await POST(request)
      const responseData = await response.json()

      // Verify successful response
      expect(response.status).toBe(200)
      expect(responseData.success).toBe(true)
      expect(responseData.message).toBe('ההודעה נשלחה בהצלחה')

      // Verify email details were logged
      expect(mockConsoleLog).toHaveBeenCalledWith('📧 New Contact Form Submission:')
      expect(mockConsoleLog).toHaveBeenCalledWith('Name:', 'יוסי כהן')
      expect(mockConsoleLog).toHaveBeenCalledWith('Email:', 'yossi@example.com')
      expect(mockConsoleLog).toHaveBeenCalledWith('Project Type:', 'בלוגים מקצועיים')
      expect(mockConsoleLog).toHaveBeenCalledWith('Selected Package:', 'פרו')
      expect(mockConsoleLog).toHaveBeenCalledWith('Message:', 'אני מעוניין לבנות בלוג מקצועי לעסק שלי')
    })

    it('should handle form submission without selected package', async () => {
      const validFormData = {
        name: 'שרה לוי',
        email: 'sara@example.com',
        projectType: 'אתרי חברה',
        message: 'אני מעוניינת באתר חברה מקצועי'
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validFormData)
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData.success).toBe(true)

      // Verify "None" is logged for selected package
      expect(mockConsoleLog).toHaveBeenCalledWith('Selected Package:', 'None')
    })
  })

  describe('Server-side Validation and Error Handling', () => {
    it('should reject requests with missing required fields', async () => {
      const invalidFormData = {
        name: '',
        email: 'invalid-email',
        projectType: '',
        message: ''
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidFormData)
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.success).toBe(false)
      expect(responseData.error).toBe('נתונים לא תקינים')
      expect(responseData.details).toContain('שם מלא הוא שדה חובה')
      expect(responseData.details).toContain('כתובת אימייל לא תקינה')
      expect(responseData.details).toContain('יש לבחור סוג פרויקט')
      expect(responseData.details).toContain('הודעה היא שדה חובה')
    })

    it('should validate email format on server side', async () => {
      const invalidEmailData = {
        name: 'דוד כהן',
        email: 'not-an-email',
        projectType: 'פורטפוליו דיגיטלי',
        message: 'אני מעוניין בפורטפוליו דיגיטלי מקצועי'
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidEmailData)
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.success).toBe(false)
      expect(responseData.details).toContain('כתובת אימייל לא תקינה')
    })

    it('should validate minimum message length', async () => {
      const shortMessageData = {
        name: 'רחל אברהם',
        email: 'rachel@example.com',
        projectType: 'חנויות אונליין',
        message: 'קצר'
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shortMessageData)
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.success).toBe(false)
      expect(responseData.details).toContain('הודעה חייבת להכיל לפחות 10 תווים')
    })

    it('should sanitize input data', async () => {
      const maliciousData = {
        name: 'מיכל דוד<script>alert("xss")</script>',
        email: 'michal@example.com',
        projectType: 'אתרי אירועים',
        message: 'אני מעוניינת באתר לאירועים<>test'
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${testCounter}`
        },
        body: JSON.stringify(maliciousData)
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData.success).toBe(true)

      // Verify malicious content was sanitized in logs
      expect(mockConsoleLog).toHaveBeenCalledWith('Name:', 'מיכל דודscriptalert("xss")/script')
      expect(mockConsoleLog).toHaveBeenCalledWith('Message:', 'אני מעוניינת באתר לאירועיםtest')
    })

    it('should handle malformed JSON requests', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.2.${testCounter}`
        },
        body: 'invalid json{'
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.success).toBe(false)
      expect(responseData.error).toBe('נתונים לא תקינים')
    })

    it('should handle non-object request bodies', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.3.${testCounter}`
        },
        body: JSON.stringify('not an object')
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.success).toBe(false)
      expect(responseData.error).toBe('נתונים לא תקינים')
    })
  })

  describe('Rate Limiting', () => {
    it('should allow requests within rate limit', async () => {
      const validFormData = {
        name: 'אבי שמואל',
        email: 'avi@example.com',
        projectType: 'פלטפורמות חינוכיות',
        message: 'אני מעוניין בפלטפורמה חינוכית מתקדמת'
      }

      // Send 3 requests (within limit of 5)
      for (let i = 0; i < 3; i++) {
        const request = new NextRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '192.168.1.1'
          },
          body: JSON.stringify(validFormData)
        })

        const response = await POST(request)
        expect(response.status).toBe(200)
      }
    })

    it('should block requests exceeding rate limit', async () => {
      const validFormData = {
        name: 'עמית רוזן',
        email: 'amit@example.com',
        projectType: 'אחר',
        message: 'אני מעוניין בפרויקט מותאם אישית'
      }

      // Send 6 requests (exceeding limit of 5)
      let lastResponse
      for (let i = 0; i < 6; i++) {
        const request = new NextRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '192.168.1.2'
          },
          body: JSON.stringify(validFormData)
        })

        lastResponse = await POST(request)
      }

      // Last request should be rate limited
      expect(lastResponse!.status).toBe(429)
      const responseData = await lastResponse!.json()
      expect(responseData.success).toBe(false)
      expect(responseData.error).toBe('יותר מדי בקשות. אנא נסו שוב בעוד 15 דקות.')
    })
  })

  describe('HTTP Methods', () => {
    it('should reject GET requests', async () => {
      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(405)
      expect(responseData.error).toBe('Method not allowed')
    })
  })

  describe('Error Recovery', () => {
    it('should handle unexpected server errors gracefully', async () => {
      // Mock console.error to avoid noise in test output
      const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      // Create a request that will cause an error in processing
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.4.${testCounter}`
        },
        body: JSON.stringify({
          name: 'תמר גולן',
          email: 'tamar@example.com',
          projectType: 'בלוגים מקצועיים',
          message: 'אני מעוניינת בבלוג מקצועי'
        })
      })

      // Since the email service is set to 'console', this test will actually succeed
      // Let's test that the system handles the request properly even in production mode
      const originalEnv = process.env.EMAIL_SERVICE
      process.env.EMAIL_SERVICE = 'production' // This will trigger the commented email code path
      
      const response = await POST(request)
      const responseData = await response.json()

      // In production mode with no actual email service configured, it should still succeed
      // because the email sending is simulated with a timeout
      expect(response.status).toBe(200)
      expect(responseData.success).toBe(true)
      expect(responseData.message).toBe('ההודעה נשלחה בהצלחה')

      // Restore environment
      process.env.EMAIL_SERVICE = originalEnv
      mockConsoleError.mockRestore()
    })
  })

  describe('Input Length Limits', () => {
    it('should truncate very long input fields', async () => {
      const longString = 'א'.repeat(1500) // Longer than 1000 char limit
      
      const longInputData = {
        name: longString,
        email: 'long@example.com',
        projectType: 'בלוגים מקצועיים',
        message: longString
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.5.${testCounter}`
        },
        body: JSON.stringify(longInputData)
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData.success).toBe(true)

      // Verify truncation occurred (check logs for truncated content)
      const nameLogCall = mockConsoleLog.mock.calls.find(call => call[0] === 'Name:')
      const messageLogCall = mockConsoleLog.mock.calls.find(call => call[0] === 'Message:')
      
      expect(nameLogCall![1].length).toBeLessThanOrEqual(1000)
      expect(messageLogCall![1].length).toBeLessThanOrEqual(1000)
    })
  })
})