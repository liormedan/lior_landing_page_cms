import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

import { PostCard } from "@/components/post-card"
import Footer from "@/components/footer"
import { sanityFetch } from "@/lib/sanity.client"
import { POSTS_QUERY } from "@/lib/queries"
import type { PostListItem } from "@/types/sanity"

export const metadata = {
  title: "בלוג | מאמרים ועדכונים",
  description: "בלוג בעברית עם תוכן איכותי על פיתוח אתרים, ביצועים, נגישות ו‑SEO.",
}

export const revalidate = 3600 // Cache for 1 hour

export default async function BlogPage() {
  const posts = await sanityFetch<PostListItem[]>(POSTS_QUERY, {
    revalidate: 3600,
    tags: ['post']
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800" role="main">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-700/90 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-700/40"
      >
        דלג/י לתוכן הראשי
      </a>
      
      <div id="main-content" className="container mx-auto px-4 py-12">
        {/* Header with back link */}
        <header className="mb-12 text-center">
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 transition-colors duration-200 group"
              aria-label="חזרה לדף הבית"
            >
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <span className="font-medium">חזרה לדף הבית</span>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            הבלוג
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            מאמרים וטיפים עדכניים על פיתוח אתרים מהיר ונגיש, שיפור SEO, ותהליכי עבודה חכמים עם Sanity ו‑Next.js.
          </p>
        </header>

        {/* Posts grid */}
        {posts && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-slate-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                עדיין אין פוסטים זמינים
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                התחילו להוסיף תכנים ב‑Sanity (טיוטה/פרסום/קטגוריות) והם יופיעו כאן.
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 bg-blue-700/90 hover:bg-blue-800/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <ArrowRightIcon className="w-5 h-5" />
                חזרה לדף הבית
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

