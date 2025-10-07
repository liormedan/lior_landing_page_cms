import { HeroSection } from "@/components/hero-section"
import TechnologyShowcase from "@/components/technology-showcase"
import ProjectGallery from "@/components/project-gallery"
import ServicesCards from "@/components/services-cards"
import DemoSection from "@/components/demo-section"
import FAQSection from "@/components/faq-section"
import PricingSection from "@/components/pricing-section"
import ContactSection from "@/components/contact-section"
import RecentPosts from "@/components/recent-posts"
import { getHeroContent, getTechnologies, getProjectTypes, getServices, getDemoContent, getFAQItems, getPricingPackages } from "@/lib/landing-page-content"
import { sanityFetch } from "@/lib/sanity.client"
import { RECENT_POSTS_QUERY } from "@/lib/queries"
import type { PostListItem } from "@/types/sanity"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'פתרונות דיגיטליים מתקדמים | מערכת ניהול תוכן + אתר מעוצב',
  description: 'קבלו פלטפורמה טכנולוגית מלאה עם Vercel + Sanity - לא רק בלוגים, אלא כל רעיון דיגיטלי שתרצו ליצור',
  keywords: ['פיתוח אתרים', 'Next.js', 'Sanity CMS', 'Vercel', 'מערכת ניהול תוכן', 'אתרים מותאמים'],
  openGraph: {
    title: 'פתרונות דיגיטליים מתקדמים',
    description: 'מערכת ניהול תוכן + אתר מעוצב ומהיר',
    type: 'website',
  },
}

export default async function HomePage() {
  const heroContent = getHeroContent()
  const technologies = getTechnologies()
  const projectTypes = getProjectTypes()
  const services = getServices()
  const demoContent = getDemoContent()
  const faqItems = getFAQItems()
  const pricingPackages = getPricingPackages()
  
  // Fetch recent posts from Sanity
  const recentPosts = await sanityFetch<PostListItem[]>(RECENT_POSTS_QUERY, {
    revalidate: 3600, // Cache for 1 hour
    tags: ['post']
  })

  return (
    <main className="min-h-screen" role="main">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        דלג לתוכן הראשי
      </a>
      
      <div id="main-content">
        <HeroSection hero={heroContent} />
        <TechnologyShowcase technologies={technologies} />
        <ProjectGallery projects={projectTypes} />
        <ServicesCards services={services} />
        <DemoSection demo={demoContent} />
        <FAQSection faqItems={faqItems} />
        <PricingSection packages={pricingPackages} />
        <RecentPosts posts={recentPosts} />
        <ContactSection />
      </div>
    </main>
  )
}


