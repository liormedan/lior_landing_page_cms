import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQSection from '@/components/faq-section'
import { FAQItem } from '@/types/landing-page'

// Mock the scroll animation hook to ensure the section is visible in tests
vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true
  })
}))

const mockFAQItems: FAQItem[] = [
  {
    question: 'כמה זמן לוקח לבנות אתר?',
    answer: 'תלוי בסוג הפרויקט - אתר בסיסי יכול להיות מוכן תוך שבועיים, פרויקטים מורכבים יותר יכולים לקחת 4-8 שבועות.',
    category: 'process'
  },
  {
    question: 'האם אוכל לערוך את התוכן בעצמי?',
    answer: 'כן. תקבלו גישה ל-Sanity CMS עם ממשק ידידותי בעברית, כך שתוכלו לעדכן טקסטים ותמונות בכל רגע.',
    category: 'technical'
  },
  {
    question: 'איך עובד התמחור?',
    answer: 'אנחנו מציעים חבילות מותאמות ומשתפים אתכם בעלויות לפני שמתחילים.',
    category: 'pricing'
  },
  {
    question: 'מה קורה אחרי שהאתר מוכן?',
    answer: 'אתם מקבלים הדרכה מלאה ותמיכה שוטפת כדי להבטיח שהכל יעבוד חלק.',
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

    expect(screen.getByText('תהליך העבודה')).toBeInTheDocument()
    expect(screen.getByText('מחירים ותשלום')).toBeInTheDocument()
    expect(screen.getByText('שאלות טכניות')).toBeInTheDocument()
  })

  it('renders all FAQ questions', () => {
    render(<FAQSection faqItems={mockFAQItems} />)

    mockFAQItems.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument()
    })
  })

  it('initially shows questions but hides answers', () => {
    render(<FAQSection faqItems={mockFAQItems} />)

    expect(screen.getByText('כמה זמן לוקח לבנות אתר?')).toBeInTheDocument()

    const answerContainer = screen.getByText(/תלוי בסוג הפרויקט/).closest('[role="region"]')
    expect(answerContainer).toHaveClass('max-h-0', 'opacity-0')
  })

  it('expands FAQ item when clicked', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)

    const questionButton = screen.getByRole('button', { name: /כמה זמן לוקח לבנות אתר/ })
    await user.click(questionButton)

    expect(screen.getByText(/תלוי בסוג הפרויקט/)).toBeInTheDocument()
  })

  it('collapses FAQ item when clicked again', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)

    const questionButton = screen.getByRole('button', { name: /כמה זמן לוקח לבנות אתר/ })

    await user.click(questionButton)
    expect(screen.getByText(/תלוי בסוג הפרויקט/)).toBeInTheDocument()

    await user.click(questionButton)
    const answerContainer = screen.getByText(/תלוי בסוג הפרויקט/).closest('[role="region"]')
    expect(answerContainer).toHaveClass('max-h-0', 'opacity-0')
  })

  it('allows multiple FAQ items to be open simultaneously', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)

    const firstQuestion = screen.getByRole('button', { name: /כמה זמן לוקח לבנות אתר/ })
    const secondQuestion = screen.getByRole('button', { name: /איך עובד התמחור/ })

    await user.click(firstQuestion)
    await user.click(secondQuestion)

    expect(screen.getByText(/תלוי בסוג הפרויקט/)).toBeInTheDocument()
    expect(screen.getByText(/אנחנו מציעים חבילות/)).toBeInTheDocument()
  })

  it('has proper ARIA attributes for accessibility', () => {
    render(<FAQSection faqItems={mockFAQItems} />)

    const questionButton = screen.getByRole('button', { name: /כמה זמן לוקח לבנות אתר/ })

    expect(questionButton).toHaveAttribute('aria-expanded', 'false')
    expect(questionButton).toHaveAttribute('aria-controls')
    expect(questionButton).toHaveAttribute('id')
  })

  it('updates ARIA attributes when expanded', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)

    const questionButton = screen.getByRole('button', { name: /כמה זמן לוקח לבנות אתר/ })

    await user.click(questionButton)

    expect(questionButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders contact CTA section', () => {
    render(<FAQSection faqItems={mockFAQItems} />)

    expect(screen.getByText(/יש לכם עוד שאלות בדרך/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /דברו איתנו/ })).toBeInTheDocument()
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<FAQSection faqItems={mockFAQItems} />)

    const questionButton = screen.getByRole('button', { name: /כמה זמן לוקח לבנות אתר/ })

    questionButton.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByText(/תלוי בסוג הפרויקט/)).toBeInTheDocument()
  })

  it('handles empty FAQ items gracefully', () => {
    render(<FAQSection faqItems={[]} />)

    expect(screen.getByText('שאלות נפוצות')).toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

  it('applies correct CSS classes for animations', () => {
    render(<FAQSection faqItems={mockFAQItems} />)

    const questionButton = screen.getByRole('button', { name: /כמה זמן לוקח לבנות אתר/ })
    const chevronIcon = questionButton.querySelector('svg')

    expect(chevronIcon).toHaveClass('transition-transform', 'duration-300')
  })
})
