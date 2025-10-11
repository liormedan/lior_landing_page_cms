// Hero Section Types
export interface HeroContent {
  title: string
  subtitle: string
  description: string
  ctaText: string
}

// Technology Types
export interface Technology {
  name: string
  description: string
  icon: string
  color: string
}

// Project Types
export interface ProjectType {
  title: string
  description: string
  features: string[]
  image: string
  demoUrl?: string
}

// Service Types
export interface Service {
  title: string
  description: string
  features: string[]
  icon: string
  price?: string
}

// Demo Content Types
export interface DemoContent {
  title: string
  description: string
  videoUrl?: string
  imageUrl?: string
  features: string[]
}

// FAQ Types
export interface FAQItem {
  question: string
  answer: string
}

// Pricing Types
export interface PricingPackage {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  ctaText: string
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  projectType: string
  message: string
  selectedPackage?: string
}

// Landing Page Content Types
export interface LandingPageContent {
  hero: HeroContent
  technologies: Technology[]
  projectTypes: ProjectType[]
  services: Service[]
  demo: DemoContent
  faq: FAQItem[]
  pricing: PricingPackage[]
}