import {groq} from "next-sanity"

export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    featured,
    mainImage {
      asset->,
      alt,
      caption
    },
    author-> {
      _id,
      name,
      "slug": slug.current,
      role,
      avatar
    },
    categories[]-> {
      _id,
      title,
      "slug": slug.current
    }
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    featured,
    mainImage {
      asset->,
      alt,
      caption
    },
    seo,
    author-> {
      _id,
      name,
      "slug": slug.current,
      role,
      avatar {
        asset->,
        alt
      },
      bio
    },
    categories[]-> {
      _id,
      title,
      "slug": slug.current
    },
    body
  }
`

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`
