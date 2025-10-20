import { HeroSection } from "@/components/hero-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import DemoSection from "@/components/demo-section"
import Footer from "@/components/footer"
import Offerings from "@/components/offerings"
import ExplainerTabs from "@/components/explainer-tabs"
import PackageCompare from "@/components/package-compare"
import PricingSection from "@/components/pricing-section"
import { AnimatedWrapper } from "@/components/ui/animated-wrapper"
import {
  getHeroContent,
  getTestimonials,
  getFAQItems,
  getDemoContent,
} from "@/lib/landing-page-content"
import type { Metadata } from "next"

const SectionNavHidden = () => null

export const metadata: Metadata = {
  title: "בניית דפי נחיתה עם CMS | חוויית RTL מלאה לעסקים",
  description:
    "דפי נחיתה חכמים ב-Next.js ו-Sanity, החל מ-₪3,000. מותאם לעברית, מובייל ואינטגרציות CRM כדי להפוך מבקרים ללקוחות.",
  keywords: ["Next.js", "Sanity CMS", "Vercel", "RTL", "דפי נחיתה", "CMS לעסקים", "Landing Page"],
  openGraph: {
    title: "בניית דפי נחיתה עם CMS | חוויית RTL מלאה לעסקים",
    description:
      "תהליך מלא להקמת וניהול מערכת תוכן חכמה עם CMS מתקדם, כולל חיבורים ל-CRM, SEO, תמיכה ו-RTL מדויק.",
    type: "website",
  },
}

export default async function HomePage() {
  const heroContent = getHeroContent()
  const testimonials = getTestimonials()
  const faqItems = getFAQItems()
  const demoContent = getDemoContent()

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
          { id: "hero", label: "ראשי" },
          { id: "offerings", label: "מה תקבלו" },
          { id: "demo", label: "דמו חי" },
          { id: "testimonials", label: "לקוחות ממליצים" },
          { id: "faq", label: "שאלות נפוצות" },
          { id: "pricing", label: "תמחור" },
          { id: "contact", label: "צור קשר" },
        ]}
      />

      <div id="main-content">
        <HeroSection hero={heroContent} />
        <Offerings />
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <ExplainerTabs />
        </AnimatedWrapper>
        <AnimatedWrapper animation="slideUp" threshold={0.15}>
          <DemoSection demo={demoContent} />
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
        <AnimatedWrapper animation="scaleIn" threshold={0.2}>
          <ContactSection />
        </AnimatedWrapper>
      </div>
      <Footer />
    </main>
  )
}


