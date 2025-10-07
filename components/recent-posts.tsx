import Link from "next/link"
import { PostCard } from "./post-card"
import type { PostListItem } from "@/types/sanity"

interface RecentPostsProps {
  posts: PostListItem[]
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60" aria-labelledby="recent-posts-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            id="recent-posts-title"
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            העדכונים שלנו
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            הישארו מעודכנים עם הטיפים, הטכנולוגיות והפתרונות החדשים ביותר שלנו
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            aria-label="עבור לכל הפוסטים בבלוג"
          >
            לכל הפוסטים
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
