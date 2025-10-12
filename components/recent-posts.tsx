import Link from 'next/link'
import { PostCard } from './post-card'
import type { PostListItem } from '@/types/sanity'

interface RecentPostsProps {
  posts: PostListItem[]
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section id="posts" className="bg-white py-24" aria-labelledby="recent-posts-title">
      <div className="lp-container">
        <div className="ml-auto max-w-3xl text-right">
          <span className="inline-flex items-center justify-center rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            תובנות וחדשות מהסטודיו
          </span>
          <h2
            id="recent-posts-title"
            className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
          >
            פוסטים אחרונים שכדאי להכיר
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            מדריכים, Case Studies ועדכונים על פרויקטים שעבדנו עליהם לאחרונה – כולל טיפים פרקטיים,
            מדידות ביצועים והמלצות לעבודה עם צוותי תוכן ומוצר.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            לכל הבלוג
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5l8 7-8 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
