import Image from "next/image"
import type {Metadata} from "next"
import {notFound} from "next/navigation"

import {PortableTextContent} from "@/components/portable-text"
import {urlFor} from "@/lib/sanity.image"
import {sanityFetch} from "@/lib/sanity.client"
import {POST_BY_SLUG_QUERY, POST_SLUGS_QUERY} from "@/lib/queries"
import type {Post} from "@/types/sanity"

const formatter = new Intl.DateTimeFormat("he-IL", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})

type RouteParams = Promise<{slug: string}>

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await sanityFetch<{slug: string}[]>(POST_SLUGS_QUERY, {
    tags: ["post"],
    revalidate,
  })

  return slugs.map(({slug}) => ({slug}))
}

export async function generateMetadata({params}: {params: RouteParams}): Promise<Metadata> {
  const {slug} = await params

  const post = await sanityFetch<Post | null>(POST_BY_SLUG_QUERY, {
    params: {slug},
    revalidate,
  })

  if (!post) {
    return {
      title: "פוסט לא נמצא",
      description: "התוכן שחיפשת לא קיים",
    }
  }

  const description = post.seo?.metaDescription || post.excerpt || `פוסט מאת ${post.author?.name ?? "מחבר"}`
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").quality(90).url()
    : undefined

  return {
    title: post.seo?.metaTitle || post.title,
    description,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description,
      type: "article",
      images: ogImage
        ? [{url: ogImage, width: 1200, height: 630, alt: post.mainImage?.alt || post.title}]
        : undefined,
    },
  }
}

export default async function PostPage({params}: {params: RouteParams}) {
  const {slug} = await params

  const post = await sanityFetch<Post | null>(POST_BY_SLUG_QUERY, {
    params: {slug},
    revalidate,
  })

  if (!post) {
    notFound()
  }

  const published = post.publishedAt ? formatter.format(new Date(post.publishedAt)) : undefined
  const heroImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1600).height(900).fit("crop").quality(90).url()
    : null

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-4 py-12">
      <article className="flex flex-col gap-10">
        <header className="flex flex-col gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-sky-600">
            {post.categories?.map((category) => (
              <span key={category._id} className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                {category.title}
              </span>
            ))}
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 md:text-5xl dark:text-slate-100">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            {post.author ? (
              <div className="flex items-center gap-3">
                {post.author.avatar?.asset ? (
                  <Image
                    src={urlFor(post.author.avatar).width(72).height(72).fit("crop").url()}
                    alt={post.author.avatar.alt || post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full border border-slate-200"
                  />
                ) : null}
                <div className="text-left">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{post.author.name}</p>
                  {post.author.role ? <p>{post.author.role}</p> : null}
                </div>
              </div>
            ) : null}
            {published ? <time dateTime={post.publishedAt}>{published}</time> : null}
          </div>
        </header>

        {heroImage ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow">
            <Image
              src={heroImage}
              alt={post.mainImage?.alt || post.title}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
              priority
            />
            {post.mainImage?.caption ? (
              <p className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 text-xs text-white">
                {post.mainImage.caption}
              </p>
            ) : null}
          </div>
        ) : null}

        {post.excerpt ? (
          <p className="rounded-3xl bg-slate-100 p-6 text-lg text-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
            {post.excerpt}
          </p>
        ) : null}

        {post.body ? (
          <div className="mx-auto w-full max-w-3xl space-y-6 text-right leading-8 text-slate-700 dark:text-slate-200">
            <PortableTextContent value={post.body} />
          </div>
        ) : (
          <p className="text-center text-slate-500">תוכן הפוסט עדיין לא נכתב.</p>
        )}
      </article>
    </main>
  )
}
