import {createClient} from 'next-sanity'
import type {QueryParams} from 'next-sanity'

import {apiVersion, dataset, projectId, token} from './env'

type SanityFetchOptions = {
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
  perspective?: 'published' | 'previewDrafts'
}

const useCdn = !token && process.env.NODE_ENV === 'production'

const baseClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token,
  stega: {enabled: false},
})

const previewClient = token
  ? baseClient.withConfig({useCdn: false, token, perspective: 'previewDrafts'})
  : baseClient

export const getClient = (preview = false) => (preview ? previewClient : baseClient)

export async function sanityFetch<QueryResponse>(
  query: string,
  {params = {}, revalidate = 60, tags, perspective = 'published'}: SanityFetchOptions = {},
): Promise<QueryResponse> {
  const client = perspective === 'previewDrafts' ? previewClient : baseClient

  return client.fetch<QueryResponse>(query, params, {
    cache: revalidate === false ? 'no-store' : 'force-cache',
    next: {
      revalidate: typeof revalidate === 'number' ? revalidate : undefined,
      tags,
    },
    perspective,
  })
}
