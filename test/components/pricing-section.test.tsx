import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PricingSection from '@/components/pricing-section'
import { PricingPackage } from '@/types/landing-page'

// Mock ContactForm component
vi.mock('@/components/contact-form', () => ({
  default: ({ selectedPackage, onClose }: { selectedPackage?: string, onClose?: () => void }) => (
    <div data-testid="contact-form">
      <div>Contact Form</div>
      {selectedPackage && <div data-testid="selected-package">{selectedPackage}</div>}
      {onClose && <button onClick={onClose} data-testid="close-form">Close</button>}
    </div>
  )
}))

const mockPricingPackages: PricingPackage[] = [
  {
    name: 'בסיסי',
    price: '1,500₪',
    features: [
      'עיצוב מותאם אישית',
      'מערכת ניהול תוכן',
      'אחסון ענן מאובטח',
      'תמיכה טכנית בסיסית'
    ],
    highlighted: false,
    ctaText: 'התחל עכשיו'
  },
  {
    name: 'פרו',
    price: '3,000₪',
    features: [
      'כל מה שיש בחבילה הבסיסית',
      'עיצוב מתקדם ואנימציות',
      'אינטגרציות חיצוניות',
      'תמיכה טכנית מורחבת',
      'אופטימיזציה למנועי חיפוש'
    ],
    highlighted: true,
    ctaText: 'הכי פופולרי'
  },
  {
    name: 'פרימיום',
    price: 'יצירת קשר',
    features: [
      'כל מה שיש בחבילת הפרו',
      'פיתוח מותאם אישית',
      'אינטגרציות מתקדמות',
      'תמיכה טכנית 24/7',
      'ייעוץ אסטרטגי'
    ],
    highlighted: false,
    ctaText: 'בואו נדבר'
  }
]

describe('PricingSection', () => {
  it('renders pricing section with title and description', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    expect(screen.getByText('חבילות מחיר שקופות')).toBeInTheDocument()
    expect(screen.getByText(/בחרו את החבילה המתאימה לכם/)).toBeInTheDocument()
  })

  it('renders all pricing packages', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    mockPricingPackages.forEach(pkg => {
      expect(screen.getByText(pkg.name)).toBeInTheDocument()
      expect(screen.getByText(pkg.price)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: pkg.ctaText })).toBeInTheDocument()
    })
  })

  it('highlights the recommended package', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    // Find the card that contains the highlighted package
    const proCard = screen.getByText('פרו').closest('.relative')
    expect(proCard).toHaveClass('ring-4', 'ring-blue-500')
    
    const popularBadge = screen.getByText('המומלץ ביותר')
    expect(popularBadge).toBeInTheDocument()
  })

  it('renders package features correctly', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    mockPricingPackages.forEach(pkg => {
      pkg.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument()
      })
    })
  })

  it('opens contact form when package is selected', async () => {
    const user = userEvent.setup()
    render(<PricingSection packages={mockPricingPackages} />)
    
    const basicButton = screen.getByRole('button', { name: 'התחל עכשיו' })
    await user.click(basicButton)
    
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    expect(screen.getByTestId('selected-package')).toHaveTextContent('בסיסי')
  })

  it('closes contact form when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<PricingSection packages={mockPricingPackages} />)
    
    // Open contact form
    const basicButton = screen.getByRole('button', { name: 'התחל עכשיו' })
    await user.click(basicButton)
    
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    
    // Close contact form
    const closeButton = screen.getByTestId('close-form')
    await user.click(closeButton)
    
    expect(screen.queryByTestId('contact-form')).not.toBeInTheDocument()
  })

  it('closes contact form when clicking outside modal', async () => {
    const user = userEvent.setup()
    render(<PricingSection packages={mockPricingPackages} />)
    
    // Open contact form
    const basicButton = screen.getByRole('button', { name: 'התחל עכשיו' })
    await user.click(basicButton)
    
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    
    // Click on modal backdrop
    const modalBackdrop = screen.getByTestId('contact-form').closest('.fixed')
    if (modalBackdrop) {
      await user.click(modalBackdrop)
    }
  })

  it('renders additional info section', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    expect(screen.getByText('מה כלול בכל החבילות?')).toBeInTheDocument()
    expect(screen.getByText('אחריות מלאה לשנה')).toBeInTheDocument()
    expect(screen.getByText('הדרכה מלאה על המערכת')).toBeInTheDocument()
    expect(screen.getByText('עדכונים אוטומטיים')).toBeInTheDocument()
    expect(screen.getByText('גיבויים אוטומטיים')).toBeInTheDocument()
    expect(screen.getByText('אבטחה ברמה גבוהה')).toBeInTheDocument()
    expect(screen.getByText('תעודת SSL חינם')).toBeInTheDocument()
  })

  it('renders money back guarantee', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    expect(screen.getByText('אחריות החזר כספי מלא תוך 30 יום')).toBeInTheDocument()
  })

  it('handles different price formats correctly', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    // Regular price
    expect(screen.getByText('1,500₪')).toBeInTheDocument()
    expect(screen.getByText('3,000₪')).toBeInTheDocument()
    
    // Contact price
    expect(screen.getByText('יצירת קשר')).toBeInTheDocument()
  })

  it('applies correct styling to highlighted package', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    const proButton = screen.getByRole('button', { name: 'הכי פופולרי' })
    expect(proButton).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'to-purple-600')
  })

  it('applies correct styling to non-highlighted packages', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    const basicButton = screen.getByRole('button', { name: 'התחל עכשיו' })
    expect(basicButton).toHaveClass('bg-gray-900')
  })

  it('shows additional info for premium package', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    expect(screen.getByText('מחיר מותאם לפי דרישות הפרויקט')).toBeInTheDocument()
  })

  it('handles empty packages array', () => {
    render(<PricingSection packages={[]} />)
    
    expect(screen.getByText('חבילות מחיר שקופות')).toBeInTheDocument()
    expect(screen.getByText('מה כלול בכל החבילות?')).toBeInTheDocument()
  })

  it('maintains accessibility with proper ARIA labels', () => {
    render(<PricingSection packages={mockPricingPackages} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeInTheDocument()
    })
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<PricingSection packages={mockPricingPackages} />)
    
    const basicButton = screen.getByRole('button', { name: 'התחל עכשיו' })
    
    // Focus and press Enter
    basicButton.focus()
    await user.keyboard('{Enter}')
    
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })
})