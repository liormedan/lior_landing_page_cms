import {PostCard} from "@/components/post-card"
import {sanityFetch} from "@/lib/sanity.client"
import {POSTS_QUERY} from "@/lib/queries"
import type {PostListItem} from "@/types/sanity"

export const revalidate = 60

export default async function HomePage() {
  const posts = await sanityFetch<PostListItem[]>(POSTS_QUERY, {
    tags: ["post"],
    revalidate,
  })

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-16">
      <header className="flex flex-col gap-6 text-center">
        <div className="flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-sky-600">
          <span>בלוג בניית הבלוג</span>
        </div>
        <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 md:text-5xl dark:text-slate-100">
          איך בנינו את הבלוג עם Codex, VS Code ו-Vercel
        </h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-300">
          מסע מתועד צעד-אחר-צעד מהרעיון לפרויקט חי. בתיעוד תמצאו פקודות, קטעי קוד וטיפים
          לעבודה עם Codex והפריסה ב-Vercel.
        </p>
      </header>

      {posts.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/60">
          <p className="text-lg">עדיין אין פוסטים. התחברו ל-Sanity והוסיפו את הפוסט הראשון שלכם.</p>
        </section>
      ) : (
        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </section>
      )}
    </main>
  )
}


