import { HeroSection } from "@/components/hero-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
// RecentPosts removed from landing page scope
import Footer from "@/components/footer"
// import SectionNav from "@/components/section-nav"
import Offerings from "@/components/offerings"
import ExplainerTabs from "@/components/explainer-tabs"
import PackageCompare from "@/components/package-compare"
import PricingSection from "@/components/pricing-section"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"
import {
  getHeroContent,
  getTestimonials,
  getFAQItems,
} from "@/lib/landing-page-content"
// Removed Sanity blog fetching for focused landing page
// import { sanityFetch } from "@/lib/sanity.client"
// import { RECENT_POSTS_QUERY } from "@/lib/queries"
// import type { PostListItem } from "@/types/sanity"
import type { Metadata } from "next"

// Hide the side navigation by replacing it with a no-op component
const SectionNavHidden = (_props: Record<string, unknown>) => null

export const metadata: Metadata = {
  title: "דפי נחיתה עם CMS | אתרים מותאמים לעברית (RTL)",
  description:
    "בניית דפי נחיתה מהירים ב‑Next.js עם CMS, התאמה מלאה ל‑RTL, SEO מובנה ורכיבים נגישים. אינטגרציות עם Sanity ועוד.",
  keywords: ["Next.js", "Sanity CMS", "Vercel", "RTL", "אתרי תוכן", "דפי נחיתה"],
  openGraph: {
    title: "דפי נחיתה עם CMS | RTL מותאם",
    description:
      "פתרון Tailor‑made על בסיס Next.js ו‑Sanity עם ביצועים גבוהים, תמיכה מלאה בעברית (RTL) ו‑SEO חזק.",
    type: "website",
  },
}

export default async function HomePage() {
  // const sections = [
    { id: 'hero', label: 'ראשי' },
    { id: 'technologies', label: 'טכנולוגיות' },
    { id: 'projects', label: 'פרויקטים' },
    { id: 'services', label: 'שירותים' },
    { id: 'demo', label: 'דמו' },
    { id: 'testimonials', label: 'לקוחות ממליצים' },
    { id: 'faq', label: 'שאלות נפוצות' },
    { id: 'pricing', label: 'תמחור' },
    { id: 'posts', label: 'פוסטים' },
    { id: 'contact', label: 'צור קשר' },
  // ] as const

  const heroContent = getHeroContent()
  const testimonials = getTestimonials()
  const faqItems = getFAQItems()

  // No recent posts on this simplified landing page

  return (
    <main className="min-h-screen text-right" role="main">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rounded-lg bg-slate-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-700/40"
      >
        דלג לתוכן הראשי
      </a>

      <SectionNavHidden
        sections={[
          { id: 'hero', label: 'ראשי' },
          { id: 'offerings', label: 'יתרונות' },
          { id: 'testimonials', label: 'לקוחות ממליצים' },
          { id: 'faq', label: 'שאלות נפוצות' },
          { id: 'posts', label: 'פוסטים' },
          { id: 'contact', label: 'צור קשר' },
        ]}
      />

      <div id="main-content">
        <HeroSection hero={heroContent} />
        <Offerings />
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <ExplainerTabs />
        </AnimatedWrapper>
        <AnimatedWrapper animation="fadeIn" threshold={0.15}>
          <PackageCompare />
        </AnimatedWrapper>
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <PricingSection />
        </AnimatedWrapper>
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <TestimonialsSection testimonials={testimonials} />
        </AnimatedWrapper>
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <FAQSection faqItems={faqItems} />
        </AnimatedWrapper>
        {/* Posts section removed for focused landing page */}
        <AnimatedWrapper animation="scaleIn" threshold={0.2}>
          <ContactSection />
        </AnimatedWrapper>
      </div>
      <Footer />
    </main>
  )
}
