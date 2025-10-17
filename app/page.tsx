import { HeroSection } from "@/components/hero-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import RecentPosts from "@/components/recent-posts"
import Footer from "@/components/footer"
import SectionNav from "@/components/section-nav"
import Offerings from "@/components/offerings"
import ExplainerTabs from "@/components/explainer-tabs"
import LogoClouds from "@/components/logo-clouds"
import PackageCompare from "@/components/package-compare"
import ClientLogos from "@/components/client-logos"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"
import {
  getHeroContent,
  getTestimonials,
  getFAQItems,
} from "@/lib/landing-page-content"
import { sanityFetch } from "@/lib/sanity.client"
import { RECENT_POSTS_QUERY } from "@/lib/queries"
import type { PostListItem } from "@/types/sanity"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "דף נחיתה מעוצב וממיר | ניהול תוכן מלא ו‑RTL",
  description:
    "דף נחיתה מהיר, ממוקד המרה ומותאם לימין‑לשמאל. כולל ניהול תוכן מלא ב‑Sanity, בלוג מהיר עם SEO מצוין, וטופס לידים עם שליחת מייל ללקוח.",
  keywords: ["Next.js", "Sanity CMS", "Vercel", "דף נחיתה", "בלוג", "Frontend", "RTL"],
  openGraph: {
    title: "דף נחיתה מעוצב וממיר | ניהול תוכן מלא",
    description:
      "פתרון Tailor‑made על בסיס Next.js ו‑Sanity עם ביצועים גבוהים, נגישות, RTL מלא וטופס יצירת קשר.",
    type: "website",
  },
}

export default async function HomePage() {
  const sections = [
    { id: 'hero', label: 'ראשי' },
    { id: 'technologies', label: 'טכנולוגיות' },
    { id: 'projects', label: 'פרויקטים' },
    { id: 'services', label: 'שירותים' },
    { id: 'demo', label: 'דמו' },
    { id: 'testimonials', label: 'המלצות' },
    { id: 'faq', label: 'שאלות ותשובות' },
    { id: 'pricing', label: 'מחירון' },
    { id: 'posts', label: 'פוסטים' },
    { id: 'contact', label: 'צור קשר' },
  ] as const

  const heroContent = getHeroContent()
  const testimonials = getTestimonials()
  const faqItems = getFAQItems()

  let recentPosts: PostListItem[] = []
  try {
    recentPosts = await sanityFetch<PostListItem[]>(RECENT_POSTS_QUERY, {
      revalidate: 3600,
      tags: ["post"],
    })
  } catch (error) {
    console.log("Failed to fetch posts from Sanity, using empty array:", error)
    recentPosts = []
  }

  return (
    <main className="min-h-screen text-right" role="main">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rounded-lg bg-blue-700/90 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-700/40"
      >
        דלג/י לתוכן הראשי
      </a>

      <SectionNav
        sections={[
          { id: 'hero', label: 'ראשי' },
          { id: 'offerings', label: 'מה אני מציע' },
          { id: 'testimonials', label: 'המלצות' },
          { id: 'faq', label: 'שאלות נפוצות' },
          { id: 'posts', label: 'פוסטים' },
          { id: 'contact', label: 'צור קשר' },
        ]}
      />

      <div id="main-content">
        <HeroSection hero={heroContent} />
        <Offerings />
        <AnimatedWrapper animation="fadeIn" threshold={0.15}>
          <PackageCompare />
        </AnimatedWrapper>
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <ExplainerTabs />
        </AnimatedWrapper>
        <AnimatedWrapper animation="fadeIn" threshold={0.15}>
          <LogoClouds />
        </AnimatedWrapper>
        <AnimatedWrapper animation="fadeIn" threshold={0.15}>
          <ClientLogos />
        </AnimatedWrapper>
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <TestimonialsSection testimonials={testimonials} />
        </AnimatedWrapper>
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <FAQSection faqItems={faqItems} />
        </AnimatedWrapper>
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <RecentPosts posts={recentPosts} />
        </AnimatedWrapper>
        <AnimatedWrapper animation="scaleIn" threshold={0.2}>
          <ContactSection />
        </AnimatedWrapper>
      </div>
      <Footer />
    </main>
  )
}
