import Image from "next/image"
import Link from "next/link"

import {urlFor} from "@/lib/sanity.image"
import type {PostListItem} from "@/types/sanity"

const formatter = new Intl.DateTimeFormat("he-IL", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

interface PostCardProps {
  post: PostListItem
}

export function PostCard({post}: PostCardProps) {
  const image = post.mainImage?.asset ? urlFor(post.mainImage).width(900).height(500).fit("crop").quality(85).url() : null
  const published = post.publishedAt ? formatter.format(new Date(post.publishedAt)) : undefined

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-sky-100/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      {image ? (
        <Link href={`/posts/${post.slug}`} className="group relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={post.mainImage?.alt || post.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={post.featured}
          />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
          {post.featured ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">
              פוסט מומלץ
            </span>
          ) : null}
          {published ? <time dateTime={post.publishedAt}>{published}</time> : null}
          {post.categories?.map((category) => (
            <span key={category._id} className="rounded-full bg-sky-100/60 px-3 py-1 text-slate-600">
              {category.title}
            </span>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            <Link href={`/posts/${post.slug}`} className="hover:text-sky-600 dark:hover:text-sky-400">
              {post.title}
            </Link>
          </h3>
          {post.excerpt ? <p className="text-slate-600 dark:text-slate-300">{post.excerpt}</p> : null}
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          {post.author?.avatar?.asset ? (
            <Image
              src={urlFor(post.author.avatar).width(64).height(64).fit("crop").url()}
              alt={post.author.avatar.alt || post.author.name}
              width={40}
              height={40}
              className="rounded-full border border-slate-200"
            />
          ) : null}
          {post.author ? (
            <div className="flex flex-col">
              <span className="font-medium text-slate-800 dark:text-slate-200">{post.author.name}</span>
              {post.author.role ? <span>{post.author.role}</span> : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
