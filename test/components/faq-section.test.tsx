import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQSection from '@/components/faq-section'
import { FAQItem } from '@/types/landing-page'

// Mock the scroll animation hook
vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true
  })
}))

const mockFAQItems: FAQItem[] = [
  {
    question: 'מה זה Sanity CMS?',
    answer: 'Sanity הוא מערכת ניהול תוכן מתקדמת שמאפשרת עריכה קלה ונוחה של התוכן באתר.',
    category: 'technical'
  },
  {
    question: 'כמה עולה פיתוח אתר?',
    answer: 'המחיר תלוי בסוג האתר ובדרישות. יש לנו חבילות החל מ-1500₪.',
    category: 'pricing'
  },
  {
    question: 'כמה זמן לוקח לפתח אתר?',
    answer: 'בדרך כלל בין שבועיים לחודש, תלוי במורכבות הפרויקט.',
    category: 'process'
  },
  {
    question: 'האם יש אחריות על האתר?',
    answer: 'כן, אנחנו נותנים אחריות מלאה לשנה על כל האתרים שאנחנו מפתחים.',
    category: 'process'
  }
]

describe('FAQSection', () => {
  it('renders FAQ section with title and description', () => {
    render(<FAQSection faqItems={mockFAQItems} />)
    
    expect(screen.getByText('שאלות נפוצות')).toBeInTheDocument()
    expect(screen.getByText(/מצאו תשובות לשאלות הנפוצות ביותר/)).toBeInTheDocument()
  })

  it('groups FAQ items by category', () => {
    render(<FAQSection faqItems={mockFAQItems} />)
    
    expect(screen.getByText('שאלות טכניות')).toBeInTheDocument()
    expect(screen.getByText('מחירים ותשלום')).toBeInTheDocument()
    expect(screen.getByText('תהליך העבודה')).toBeInTheDocument()
  })

  it('renders all FAQ questions', () => {
    render(<FAQSection faqItems={mockFAQItems} />)
    
    mockFAQItems.forEach(item => {
      expect(screen.getByText(item.question)).toBeInTheDocument()
    })
  })

  it('initially shows questions but hides answers', () => {
    render(<FAQSection faqItems={mockFAQItems} />)
    
    // Questions should be visible
    expect(screen.getByText('מה זה Sanity CMS?')).toBeInTheDocument()
    
    // Check that the answer container has the collapsed classes
    const answerContainer = screen.getByText(/Sanity הוא מערכת ניהול תוכן/).closest('[role="region"]')
    expect(answerContainer).toHaveClass('max-h-0', 'opacity-0')
  })

  it('expands FAQ item when clicked', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)
    
    const questionButton = screen.getByRole('button', { name: /מה זה Sanity CMS?/ })
    await user.click(questionButton)
    
    expect(screen.getByText(/Sanity הוא מערכת ניהול תוכן/)).toBeInTheDocument()
  })

  it('collapses FAQ item when clicked again', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)
    
    const questionButton = screen.getByRole('button', { name: /מה זה Sanity CMS?/ })
    
    // First click - expand
    await user.click(questionButton)
    expect(screen.getByText(/Sanity הוא מערכת ניהול תוכן/)).toBeInTheDocument()
    
    // Second click - collapse
    await user.click(questionButton)
    const answerContainer = screen.getByText(/Sanity הוא מערכת ניהול תוכן/).closest('[role="region"]')
    expect(answerContainer).toHaveClass('max-h-0', 'opacity-0')
  })

  it('allows multiple FAQ items to be open simultaneously', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)
    
    const question1Button = screen.getByRole('button', { name: /מה זה Sanity CMS?/ })
    const question2Button = screen.getByRole('button', { name: /כמה עולה פיתוח אתר?/ })
    
    await user.click(question1Button)
    await user.click(question2Button)
    
    expect(screen.getByText(/Sanity הוא מערכת ניהול תוכן/)).toBeInTheDocument()
    expect(screen.getByText(/המחיר תלוי בסוג האתר/)).toBeInTheDocument()
  })

  it('has proper ARIA attributes for accessibility', () => {
    render(<FAQSection faqItems={mockFAQItems} />)
    
    const questionButton = screen.getByRole('button', { name: /מה זה Sanity CMS?/ })
    
    expect(questionButton).toHaveAttribute('aria-expanded', 'false')
    expect(questionButton).toHaveAttribute('aria-controls')
    expect(questionButton).toHaveAttribute('id')
  })

  it('updates ARIA attributes when expanded', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)
    
    const questionButton = screen.getByRole('button', { name: /מה זה Sanity CMS?/ })
    
    await user.click(questionButton)
    
    expect(questionButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders contact CTA section', () => {
    render(<FAQSection faqItems={mockFAQItems} />)
    
    expect(screen.getByText(/לא מצאתם את התשובה שחיפשתם?/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /יצירת קשר/ })).toBeInTheDocument()
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)
    
    const questionButton = screen.getByRole('button', { name: /מה זה Sanity CMS?/ })
    
    // Focus and press Enter
    questionButton.focus()
    await user.keyboard('{Enter}')
    
    expect(screen.getByText(/Sanity הוא מערכת ניהול תוכן/)).toBeInTheDocument()
  })

  it('handles empty FAQ items gracefully', () => {
    render(<FAQSection faqItems={[]} />)
    
    expect(screen.getByText('שאלות נפוצות')).toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeInTheDocument() // Contact button should still be there
  })

  it('applies correct CSS classes for animations', () => {
    render(<FAQSection faqItems={mockFAQItems} />)
    
    const questionButton = screen.getByRole('button', { name: /מה זה Sanity CMS?/ })
    const chevronIcon = questionButton.querySelector('svg')
    
    expect(chevronIcon).toHaveClass('transition-transform', 'duration-300')
  })
})