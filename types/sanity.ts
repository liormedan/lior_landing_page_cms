import type {PortableTextBlock} from "@portabletext/types"

export interface SanityImageAsset {
  _type?: string
  _id: string
  url: string
}

export interface SanityImage {
  _type?: string
  asset: SanityImageAsset
  alt?: string
  caption?: string
}

export interface Category {
  _id: string
  title: string
  slug: string
}

export interface Author {
  _id: string
  name: string
  slug?: string
  role?: string
  avatar?: SanityImage
  bio?: PortableTextBlock[]
}

export interface PostListItem {
  _id: string
  title: string
  slug: string
  publishedAt?: string
  excerpt?: string
  featured?: boolean
  mainImage?: SanityImage
  author?: Author
  categories?: Category[]
}

export interface Post extends PostListItem {
  body?: PortableTextBlock[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}
