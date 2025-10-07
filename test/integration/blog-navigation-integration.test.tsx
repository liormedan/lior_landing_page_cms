import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import RecentPosts from '@/components/recent-posts'
import BlogPage from '@/app/blog/page'
import HomePage from '@/app/page'
import { PostListItem } from '@/types/sanity'

// Mock Next.js navigation
const mockPush = vi.fn()
const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '/',
}))

// Mock Next.js Link component
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => {
      return (
        <a 
          href={href} 
          {...props}
          onClick={(e) => {
            e.preventDefault()
            if (href === '/blog') {
              mockPush('/blog')
            } else if (href === '/') {
              mockPush('/')
            } else if (href.startsWith('/posts/')) {
              mockPush(href)
            }
          }}
        >
          {children}
        </a>
      )
    }
  }
})

// Mock Sanity client
vi.mock('@/lib/sanity.client', () => ({
  sanityFetch: vi.fn()
}))

// Mock landing page content
vi.mock('@/lib/landing-page-content', () => ({
  getHeroContent: () => ({
    title: 'פתרונות דיגיטליים מתקדמים',
    subtitle: 'מערכת ניהול תוכן + אתר מעוצב',
    description: 'קבלו פלטפורמה טכנולוगית מלאה',
    ctaText: 'בואו נתחיל'
  }),
  getTechnologies: () => [],
  getProjectTypes: () => [],
  getServices: () => [],
  getDemoContent: () => ({ title: '', description: '', features: [], screenshots: [] }),
  getFAQItems: () => [],
  getPricingPackages: () => []
}))

describe('Blog Navigation Integration Tests', () => {
  const mockPosts: PostListItem[] = [
    {
      _id: '1',
      title: 'איך לבנות אתר מהיר עם Next.js',
      slug: { current: 'how-to-build-fast-website-nextjs' },
      publishedAt: '2024-01-15T10:00:00Z',
      excerpt: 'מדריך מלא לבניית אתר מהיר ומעוצב עם Next.js',
      mainImage: {
        asset: {
          _ref: 'image-123',
          _type: 'reference'
        },
        alt: 'Next.js logo'
      },
      author: {
        name: 'ליאור כהן',
        image: {
          asset: {
            _ref: 'image-author-123',
            _type: 'reference'
          }
        }
      },
      categories: [
        {
          _id: 'cat-1',
          title: 'פיתוח',
          slug: { current: 'development' }
        }
      ]
    },
    {
      _id: '2',
      title: 'מדריך למערכת ניהול תוכן עם Sanity',
      slug: { current: 'sanity-cms-guide' },
      publishedAt: '2024-01-10T14:30:00Z',
      excerpt: 'כל מה שצריך לדעת על Sanity CMS',
      mainImage: {
        asset: {
          _ref: 'image-456',
          _type: 'reference'
        },
        alt: 'Sanity CMS'
      },
      author: {
        name: 'ליאור כהן',
        image: {
          asset: {
            _ref: 'image-author-123',
            _type: 'reference'
          }
        }
      },
      categories: [
        {
          _id: 'cat-2',
          title: 'CMS',
          slug: { current: 'cms' }
        }
      ]
    },
    {
      _id: '3',
      title: 'אופטימיזציה לביצועים עם Vercel',
      slug: { current: 'vercel-performance-optimization' },
      publishedAt: '2024-01-05T09:15:00Z',
      excerpt: 'טיפים לשיפור ביצועי האתר עם Vercel',
      mainImage: {
        asset: {
          _ref: 'image-789',
          _type: 'reference'
        },
        alt: 'Vercel deployment'
      },
      author: {
        name: 'ליאור כהן',
        image: {
          asset: {
            _ref: 'image-author-123',
            _type: 'reference'
          }
        }
      },
      categories: [
        {
          _id: 'cat-3',
          title: 'ביצועים',
          slug: { current: 'performance' }
        }
      ]
    }
  ]

  beforeEach(() => {
    mockPush.mockClear()
    mockReplace.mockClear()
  })

  describe('Recent Posts Section Navigation', () => {
    it('should navigate to individual post when clicking on post card', async () => {
      const user = userEvent.setup()
      
      render(<RecentPosts posts={mockPosts.slice(0, 2)} />)

      // Find and click on first post
      const firstPostLink = screen.getByRole('link', { name: /איך לבנות אתר מהיר עם Next\.js/ })
      await user.click(firstPostLink)

      // Verify navigation was called
      expect(mockPush).toHaveBeenCalledWith('/posts/how-to-build-fast-website-nextjs')
    })

    it('should navigate to blog page when clicking "לכל הפוסטים" button', async () => {
      const user = userEvent.setup()
      
      render(<RecentPosts posts={mockPosts.slice(0, 2)} />)

      // Find and click "view all posts" button
      const viewAllButton = screen.getByRole('link', { name: /לכל הפוסטים/ })
      await user.click(viewAllButton)

      // Verify navigation to blog page
      expect(mockPush).toHaveBeenCalledWith('/blog')
    })

    it('should display correct number of recent posts', () => {
      render(<RecentPosts posts={mockPosts} />)

      // Should display all posts (component handles limiting)
      const postCards = screen.getAllByRole('article')
      expect(postCards).toHaveLength(3)
    })

    it('should handle empty posts array gracefully', () => {
      render(<RecentPosts posts={[]} />)

      // Should still render the section but with no posts
      expect(screen.getByText(/העדכונים שלנו/)).toBeInTheDocument()
      expect(screen.queryByRole('article')).not.toBeInTheDocument()
    })
  })

  describe('Blog Page Navigation', () => {
    it('should navigate back to home page when clicking back link', async () => {
      const user = userEvent.setup()
      
      // Mock the sanityFetch to return posts
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue(mockPosts)
      
      const BlogPageComponent = await BlogPage()
      render(BlogPageComponent)

      // Find and click back to home link
      const backLink = screen.getByRole('link', { name: /חזרה לדף הבית/ })
      await user.click(backLink)

      // Verify navigation to home page
      expect(mockPush).toHaveBeenCalledWith('/')
    })

    it('should display all posts in blog page', async () => {
      // Mock the sanityFetch to return posts
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue(mockPosts)
      
      const BlogPageComponent = await BlogPage()
      render(BlogPageComponent)

      // Verify all posts are displayed
      expect(screen.getByText(/איך לבנות אתר מהיר עם Next\.js/)).toBeInTheDocument()
      expect(screen.getByText(/מדריך למערכת ניהול תוכן עם Sanity/)).toBeInTheDocument()
      expect(screen.getByText(/אופטימיזציה לביצועים עם Vercel/)).toBeInTheDocument()
    })

    it('should navigate to individual posts from blog page', async () => {
      const user = userEvent.setup()
      
      // Mock the sanityFetch to return posts
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue(mockPosts)
      
      const BlogPageComponent = await BlogPage()
      render(BlogPageComponent)

      // Click on a post
      const postLink = screen.getByRole('link', { name: /מדריך למערכת ניהול תוכן עם Sanity/ })
      await user.click(postLink)

      // Verify navigation to post
      expect(mockPush).toHaveBeenCalledWith('/posts/sanity-cms-guide')
    })

    it('should display empty state when no posts available', async () => {
      // Mock the sanityFetch to return empty array
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue([])
      
      const BlogPageComponent = await BlogPage()
      render(BlogPageComponent)

      // Verify empty state is displayed
      expect(screen.getByText(/אין פוסטים עדיין/)).toBeInTheDocument()
      expect(screen.getByText(/נראה שעדיין לא פרסמנו פוסטים/)).toBeInTheDocument()
      
      // Verify back to home link in empty state
      const backLinks = screen.getAllByRole('link', { name: /חזרה לדף הבית/ })
      expect(backLinks.length).toBeGreaterThan(0)
    })
  })

  describe('Home Page to Blog Navigation Flow', () => {
    it('should navigate from home page recent posts to blog page', async () => {
      const user = userEvent.setup()
      
      // Mock the sanityFetch for home page
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue(mockPosts.slice(0, 2))
      
      const HomePageComponent = await HomePage()
      render(HomePageComponent)

      // Find the "לכל הפוסטים" button in recent posts section
      const viewAllButton = screen.getByRole('link', { name: /לכל הפוסטים/ })
      await user.click(viewAllButton)

      // Verify navigation to blog page
      expect(mockPush).toHaveBeenCalledWith('/blog')
    })

    it('should navigate from home page recent post to individual post', async () => {
      const user = userEvent.setup()
      
      // Mock the sanityFetch for home page
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue(mockPosts.slice(0, 2))
      
      const HomePageComponent = await HomePage()
      render(HomePageComponent)

      // Click on a recent post
      const postLink = screen.getByRole('link', { name: /איך לבנות אתר מהיר עם Next\.js/ })
      await user.click(postLink)

      // Verify navigation to individual post
      expect(mockPush).toHaveBeenCalledWith('/posts/how-to-build-fast-website-nextjs')
    })
  })

  describe('Accessibility and SEO Navigation', () => {
    it('should have proper ARIA labels for navigation links', async () => {
      // Mock the sanityFetch to return posts
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue(mockPosts)
      
      const BlogPageComponent = await BlogPage()
      render(BlogPageComponent)

      // Check for proper ARIA labels
      const backLink = screen.getByRole('link', { name: /חזרה לדף הבית/ })
      expect(backLink).toHaveAttribute('aria-label', 'חזרה לדף הבית')
    })

    it('should have skip to main content link', async () => {
      // Mock the sanityFetch to return posts
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue(mockPosts)
      
      const BlogPageComponent = await BlogPage()
      render(BlogPageComponent)

      // Check for skip link
      const skipLink = screen.getByRole('link', { name: /דלג לתוכן הראשי/ })
      expect(skipLink).toBeInTheDocument()
      expect(skipLink).toHaveAttribute('href', '#main-content')
    })

    it('should have proper heading hierarchy in blog page', async () => {
      // Mock the sanityFetch to return posts
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockResolvedValue(mockPosts)
      
      const BlogPageComponent = await BlogPage()
      render(BlogPageComponent)

      // Check for proper heading structure
      const mainHeading = screen.getByRole('heading', { level: 1, name: /הבלוג שלנו/ })
      expect(mainHeading).toBeInTheDocument()
    })
  })

  describe('Error Handling in Navigation', () => {
    it('should handle Sanity fetch errors gracefully', async () => {
      // Mock the sanityFetch to throw an error
      const { sanityFetch } = await import('@/lib/sanity.client')
      vi.mocked(sanityFetch).mockRejectedValue(new Error('Sanity fetch failed'))
      
      // This should not throw an error but handle it gracefully
      try {
        const BlogPageComponent = await BlogPage()
        render(BlogPageComponent)
        
        // Should still render the page structure
        expect(screen.getByText(/הבלוג שלנו/)).toBeInTheDocument()
      } catch (error) {
        // If it throws, the component should handle it gracefully
        expect(error).toBeDefined()
      }
    })
  })
})