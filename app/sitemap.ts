import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity.client'
import { POST_SLUGS_QUERY } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  let postUrls: MetadataRoute.Sitemap = []
  try {
    const slugs = await sanityFetch<{ slug: string }[]>(POST_SLUGS_QUERY, {
      revalidate: 3600,
      tags: ['post'],
    })
    postUrls = slugs.map(({ slug }) => ({
      url: `${baseUrl}/posts/${slug}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    }))
  } catch {
    postUrls = []
  }

  return [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...postUrls,
  ]
}

