import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RecentPosts from '@/components/recent-posts'
import type { PostListItem } from '@/types/sanity'

// Mock PostCard component
vi.mock('@/components/post-card', () => ({
  PostCard: ({ post }: { post: PostListItem }) => (
    <div data-testid={`post-card-${post._id}`}>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <time>{post.publishedAt}</time>
    </div>
  )
}))

const mockPosts: PostListItem[] = [
  {
    _id: '1',
    title: 'איך לבחור את הטכנולוגיה הנכונה לאתר שלכם',
    slug: { current: 'how-to-choose-technology' },
    excerpt: 'מדריך מקיף לבחירת הטכנולוגיות המתאימות לפרויקט הדיגיטלי שלכם',
    publishedAt: '2024-01-15',
    mainImage: {
      asset: {
        _ref: 'image-123',
        _type: 'reference'
      },
      alt: 'טכנולוגיות ווב'
    },
    author: {
      name: 'ליאור מדן',
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
        title: 'טכנולוגיה',
        slug: { current: 'technology' }
      }
    ]
  },
  {
    _id: '2',
    title: 'יתרונות של Next.js לפיתוח אתרים מהירים',
    slug: { current: 'nextjs-benefits' },
    excerpt: 'למה Next.js הוא הבחירה הטובה ביותר לפיתוח אתרים מודרניים ומהירים',
    publishedAt: '2024-01-10',
    mainImage: {
      asset: {
        _ref: 'image-456',
        _type: 'reference'
      },
      alt: 'Next.js לוגו'
    },
    author: {
      name: 'ליאור מדן',
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
        title: 'פיתוח',
        slug: { current: 'development' }
      }
    ]
  },
  {
    _id: '3',
    title: 'מדריך למערכת ניהול התוכן Sanity',
    slug: { current: 'sanity-cms-guide' },
    excerpt: 'כל מה שצריך לדעת על Sanity CMS ואיך זה יכול לשפר את ניהול התוכן שלכם',
    publishedAt: '2024-01-05',
    mainImage: {
      asset: {
        _ref: 'image-789',
        _type: 'reference'
      },
      alt: 'Sanity CMS'
    },
    author: {
      name: 'ליאור מדן',
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
        title: 'CMS',
        slug: { current: 'cms' }
      }
    ]
  }
]

describe('RecentPosts', () => {
  it('renders section with title and description', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    expect(screen.getByText('העדכונים שלנו')).toBeInTheDocument()
    expect(screen.getByText(/הישארו מעודכנים עם הטיפים/)).toBeInTheDocument()
  })

  it('renders all provided posts', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    mockPosts.forEach(post => {
      expect(screen.getByTestId(`post-card-${post._id}`)).toBeInTheDocument()
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })
  })

  it('renders "View All Posts" button', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const viewAllButton = screen.getByRole('link', { name: /לכל הפוסטים/ })
    expect(viewAllButton).toBeInTheDocument()
    expect(viewAllButton).toHaveAttribute('href', '/blog')
  })

  it('has proper accessibility attributes', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby', 'recent-posts-title')
    
    const title = screen.getByRole('heading', { name: 'העדכונים שלנו' })
    expect(title).toHaveAttribute('id', 'recent-posts-title')
  })

  it('renders with correct grid layout classes', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const postsGrid = screen.getByTestId('post-card-1').parentElement
    expect(postsGrid).toHaveClass('grid', 'gap-8', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  it('handles empty posts array by not rendering', () => {
    const { container } = render(<RecentPosts posts={[]} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('handles null posts by not rendering', () => {
    const { container } = render(<RecentPosts posts={null as any} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('handles undefined posts by not rendering', () => {
    const { container } = render(<RecentPosts posts={undefined as any} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('renders correct number of posts in grid', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const postCards = screen.getAllByTestId(/post-card-/)
    expect(postCards).toHaveLength(mockPosts.length)
  })

  it('applies correct styling classes', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('py-16', 'bg-slate-50', 'dark:bg-slate-900/50')
  })

  it('renders view all button with correct styling', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const viewAllButton = screen.getByRole('link', { name: /לכל הפוסטים/ })
    expect(viewAllButton).toHaveClass(
      'inline-flex',
      'items-center',
      'gap-2',
      'px-6',
      'py-3',
      'bg-sky-600',
      'hover:bg-sky-700',
      'text-white',
      'font-semibold',
      'rounded-lg'
    )
  })

  it('includes arrow icon in view all button', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const viewAllButton = screen.getByRole('link', { name: /לכל הפוסטים/ })
    const arrowIcon = viewAllButton.querySelector('svg')
    
    expect(arrowIcon).toBeInTheDocument()
    expect(arrowIcon).toHaveAttribute('aria-hidden', 'true')
  })

  it('has proper focus management', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const viewAllButton = screen.getByRole('link', { name: /לכל הפוסטים/ })
    expect(viewAllButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-sky-500')
  })

  it('renders with single post correctly', () => {
    const singlePost = [mockPosts[0]]
    render(<RecentPosts posts={singlePost} />)
    
    expect(screen.getByTestId(`post-card-${singlePost[0]._id}`)).toBeInTheDocument()
    expect(screen.getByText(singlePost[0].title)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /לכל הפוסטים/ })).toBeInTheDocument()
  })

  it('maintains responsive design classes', () => {
    render(<RecentPosts posts={mockPosts} />)
    
    const container = screen.getByRole('region').querySelector('.container')
    expect(container).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
  })
})