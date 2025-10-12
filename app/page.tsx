import { HeroSection } from "@/components/hero-section"
import TechnologyShowcase from "@/components/technology-showcase"
import ProjectGallery from "@/components/project-gallery"
import ServicesCards from "@/components/services-cards"
import TestimonialsSection from "@/components/testimonials-section"
import DemoSection from "@/components/demo-section"
import FAQSection from "@/components/faq-section"
import PricingSection from "@/components/pricing-section"
import ContactSection from "@/components/contact-section"
import RecentPosts from "@/components/recent-posts"
import Footer from "@/components/footer"
import SectionNav from "@/components/section-nav"
import {
  getHeroContent,
  getTechnologies,
  getProjectTypes,
  getServices,
  getTestimonials,
  getDemoContent,
  getFAQItems,
  getPricingPackages,
} from "@/lib/landing-page-content"
import { sanityFetch } from "@/lib/sanity.client"
import { RECENT_POSTS_QUERY } from "@/lib/queries"
import type { PostListItem } from "@/types/sanity"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "הסטודיו של ליאור | בניית אתרי תוכן, SaaS וקהילות",
  description:
    "פיתוח אתרי תוכן ו-SaaS בעזרת Next.js, Sanity ו-Vercel – עם ביצועים גבוהים, RTL, נגישות ותהליך עבודה מסודר.",
  keywords: ["Next.js", "Sanity CMS", "Vercel", "פיתוח אתרים", "אתרי תוכן", "Frontend"],
  openGraph: {
    title: "הסטודיו של ליאור | בניית אתרי תוכן",
    description: "פרויקטים Tailor-made ב-Next.js ו-Sanity עם תמיכה מלאה בעברית וניהול תוכן קל.",
    type: "website",
  },
}

export default async function HomePage() {
  const sections = [
    { id: 'hero', label: 'ראשי' },
    { id: 'technologies', label: 'טכנולוגיות' },
    { id: 'projects', label: 'סוגי פרויקטים' },
    { id: 'services', label: 'שירותים' },
    { id: 'demo', label: 'הדגמה' },
    { id: 'testimonials', label: 'לקוחות' },
    { id: 'faq', label: 'שאלות' },
    { id: 'pricing', label: 'תמחור' },
    { id: 'posts', label: 'בלוג' },
    { id: 'contact', label: 'צור קשר' },
  ] as const

  const heroContent = getHeroContent()
  const technologies = getTechnologies()
  const projectTypes = getProjectTypes()
  const services = getServices()
  const testimonials = getTestimonials()
  const demoContent = getDemoContent()
  const faqItems = getFAQItems()
  const pricingPackages = getPricingPackages()

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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rounded-lg bg-sky-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        דלג לתוכן הראשי
      </a>

      <SectionNav sections={sections} />

      <div id="main-content">
        <HeroSection hero={heroContent} />
        <TechnologyShowcase technologies={technologies} />
        <ProjectGallery projects={projectTypes} />
        <ServicesCards services={services} />
        <DemoSection demo={demoContent} />
        <TestimonialsSection testimonials={testimonials} />
        <FAQSection faqItems={faqItems} />
        <PricingSection packages={pricingPackages} />
        <RecentPosts posts={recentPosts} />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
