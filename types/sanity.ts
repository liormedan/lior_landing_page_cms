import { PortableTextBlock } from '@portabletext/types'

// Base Sanity Document
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Sanity Image
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

// Blog Post Types
export interface Post extends SanityDocument {
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  content: PortableTextBlock[]
  body?: PortableTextBlock[]
  coverImage?: SanityImage
  mainImage?: SanityImage
  author?: Author
  publishedAt: string
  tags?: Tag[]
  categories?: Category[]
  featured?: boolean
  seo?: {
    metaDescription?: string
    metaTitle?: string
    keywords?: string[]
  }
}

// Author Types
export interface Author extends SanityDocument {
  _type: 'author'
  name: string
  slug: {
    current: string
  }
  bio?: PortableTextBlock[]
  image?: SanityImage
  avatar?: SanityImage
  role?: string
}

// Tag Types
export interface Tag extends SanityDocument {
  _type: 'tag'
  name: string
  slug: {
    current: string
  }
  description?: string
}

// Post List Item (for listing pages)
export interface PostListItem {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  coverImage?: SanityImage
  mainImage?: SanityImage
  featured?: boolean
  categories?: Category[]
  author?: {
    name: string
    slug: {
      current: string
    }
    avatar?: SanityImage
    role?: string
  }
  publishedAt: string
  tags?: {
    name: string
    slug: {
      current: string
    }
  }[]
}

// Category Types
export interface Category extends SanityDocument {
  _type: 'category'
  name: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

// SEO Types
export interface SEO {
  title?: string
  description?: string
  keywords?: string[]
  image?: SanityImage
}