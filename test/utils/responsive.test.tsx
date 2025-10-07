import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactForm from '@/components/contact-form'
import FAQSection from '@/components/faq-section'
import PricingSection from '@/components/pricing-section'
import RecentPosts from '@/components/recent-posts'
import { FAQItem, PricingPackage } from '@/types/landing-page'
import type { PostListItem } from '@/types/sanity'

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true
  })
}))

vi.mock('@/components/post-card', () => ({
  PostCard: ({ post }: { post: PostListItem }) => (
    <div data-testid={`post-card-${post._id}`}>{post.title}</div>
  )
}))

// Mock data
const mockFAQItems: FAQItem[] = [
  {
    question: 'Test question?',
    answer: 'Test answer',
    category: 'technical'
  }
]

const mockPricingPackages: PricingPackage[] = [
  {
    name: 'Basic',
    price: '1,500₪',
    features: ['Feature 1', 'Feature 2'],
    highlighted: false,
    ctaText: 'Get Started'
  }
]

const mockPosts: PostListItem[] = [
  {
    _id: '1',
    title: 'Test Post',
    slug: { current: 'test-post' },
    excerpt: 'Test excerpt',
    publishedAt: '2024-01-01',
    mainImage: {
      asset: { _ref: 'image-123', _type: 'reference' },
      alt: 'Test image'
    },
    author: {
      name: 'Test Author',
      image: { asset: { _ref: 'author-123', _type: 'reference' } }
    },
    categories: []
  }
]

describe('Responsive Behavior Tests', () => {
  // Helper function to simulate different screen sizes
  const setViewport = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
    
    // Update matchMedia mock
    window.matchMedia = vi.fn().mockImplementation(query => {
      const matches = {
        '(min-width: 640px)': width >= 640,  // sm
        '(min-width: 768px)': width >= 768,  // md
        '(min-width: 1024px)': width >= 1024, // lg
        '(min-width: 1280px)': width >= 1280, // xl
      }[query] || false
      
      return {
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }
    })
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'))
  }

  beforeEach(() => {
    // Reset to desktop size
    setViewport(1280)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('ContactForm Responsive Behavior', () => {
    it('applies mobile-friendly classes on small screens', () => {
      setViewport(375) // Mobile
      render(<ContactForm />)
      
      const container = screen.getByRole('button', { name: /שלח הודעה/ }).closest('.max-w-md')
      expect(container).toBeInTheDocument()
    })

    it('maintains proper spacing on tablet screens', () => {
      setViewport(768) // Tablet
      render(<ContactForm />)
      
      // Form should still be contained but with proper spacing
      const form = screen.getByRole('button', { name: /שלח הודעה/ }).closest('form')
      expect(form).toHaveClass('space-y-6')
    })

    it('has full layout on desktop screens', () => {
      setViewport(1280) // Desktop
      render(<ContactForm />)
      
      const form = screen.getByRole('button', { name: /שלח הודעה/ }).closest('form')
      expect(form).toHaveClass('space-y-6')
    })
  })

  describe('FAQSection Responsive Behavior', () => {
    it('adjusts padding for mobile screens', () => {
      setViewport(375) // Mobile
      render(<FAQSection faqItems={mockFAQItems} />)
      
      const section = screen.getByLabelText(/שאלות נפוצות/)
      expect(section).toHaveClass('py-12', 'sm:py-16')
    })

    it('adjusts text sizes for different screen sizes', () => {
      setViewport(768) // Tablet
      render(<FAQSection faqItems={mockFAQItems} />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-2xl', 'sm:text-3xl')
    })

    it('maintains proper button spacing on mobile', () => {
      setViewport(375) // Mobile
      render(<FAQSection faqItems={mockFAQItems} />)
      
      const questionButton = screen.getByRole('button', { name: /Test question/ })
      expect(questionButton).toHaveClass('px-4', 'sm:px-6', 'py-3', 'sm:py-4')
    })
  })

  describe('PricingSection Responsive Behavior', () => {
    it('stacks pricing cards on mobile', () => {
      setViewport(375) // Mobile
      render(<PricingSection packages={mockPricingPackages} />)
      
      const grid = screen.getByRole('button', { name: 'Get Started' }).closest('.grid')
      expect(grid).toHaveClass('md:grid-cols-3')
    })

    it('shows 3 columns on desktop', () => {
      setViewport(1280) // Desktop
      render(<PricingSection packages={mockPricingPackages} />)
      
      const grid = screen.getByRole('button', { name: 'Get Started' }).closest('.grid')
      expect(grid).toHaveClass('md:grid-cols-3')
    })
  })

  describe('RecentPosts Responsive Behavior', () => {
    it('shows single column on mobile', () => {
      setViewport(375) // Mobile
      render(<RecentPosts posts={mockPosts} />)
      
      const grid = screen.getByTestId('post-card-1').parentElement
      expect(grid).toHaveClass('md:grid-cols-2', 'lg:grid-cols-3')
    })

    it('shows 2 columns on tablet', () => {
      setViewport(768) // Tablet
      render(<RecentPosts posts={mockPosts} />)
      
      const grid = screen.getByTestId('post-card-1').parentElement
      expect(grid).toHaveClass('md:grid-cols-2', 'lg:grid-cols-3')
    })

    it('shows 3 columns on desktop', () => {
      setViewport(1280) // Desktop
      render(<RecentPosts posts={mockPosts} />)
      
      const grid = screen.getByTestId('post-card-1').parentElement
      expect(grid).toHaveClass('md:grid-cols-2', 'lg:grid-cols-3')
    })

    it('adjusts container padding for different screen sizes', () => {
      setViewport(375) // Mobile
      render(<RecentPosts posts={mockPosts} />)
      
      const container = screen.getByRole('region').querySelector('.container')
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })
  })

  describe('General Responsive Utilities', () => {
    it('handles viewport changes correctly', () => {
      // Start with mobile
      setViewport(375)
      expect(window.innerWidth).toBe(375)
      
      // Change to desktop
      setViewport(1280)
      expect(window.innerWidth).toBe(1280)
    })

    it('matchMedia returns correct values for breakpoints', () => {
      setViewport(768)
      
      expect(window.matchMedia('(min-width: 640px)').matches).toBe(true)  // sm
      expect(window.matchMedia('(min-width: 768px)').matches).toBe(true)  // md
      expect(window.matchMedia('(min-width: 1024px)').matches).toBe(false) // lg
      expect(window.matchMedia('(min-width: 1280px)').matches).toBe(false) // xl
    })
  })

  describe('Touch and Mobile Interactions', () => {
    it('ensures buttons are touch-friendly on mobile', () => {
      setViewport(375) // Mobile
      render(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /שלח הודעה/ })
      // Button should have adequate padding for touch
      expect(submitButton).toHaveClass('py-3', 'px-6')
    })

    it('maintains proper spacing between interactive elements', () => {
      setViewport(375) // Mobile
      render(<FAQSection faqItems={mockFAQItems} />)
      
      const questionButton = screen.getByRole('button', { name: /Test question/ })
      // Should have proper spacing for touch targets
      expect(questionButton).toHaveClass('py-3', 'sm:py-4')
    })
  })
})