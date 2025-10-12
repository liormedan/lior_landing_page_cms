// Hero Section Types
export interface HeroContent {
  title: string
  subtitle: string
  description: string
  ctaText?: string
  primaryCtaText?: string
  primaryCtaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  ctaSupportText?: string
  badge?: string
}

// Technology Types
export interface Technology {
  name: string
  logo: string
  description: string
  benefits: string[]
  category: string
}

// Project Types
export interface ProjectType {
  title: string
  description: string
  image: string
  features: string[]
  examples: string[]
  ctaLabel?: string
  ctaHref?: string
  demoUrl?: string
}

// Service Types
export interface Service {
  title: string
  description: string
  benefits: string[]
  icon: string
  price?: string
}

// Demo Content Types
export interface DemoContent {
  title: string
  description: string
  features: string[]
  screenshots: string[]
  videoUrl?: string
  imageUrl?: string
}

export interface TestimonialItem {
  name: string
  role: string
  quote: string
  avatar?: string
  company?: string
  highlight?: string
}

export interface TestimonialsContent {
  title: string
  subtitle: string
  items: TestimonialItem[]
  supportingText?: string
}

// FAQ Types
export interface FAQItem {
  question: string
  answer: string
  category: string
}

// Pricing Types
export interface PricingPackage {
  name: string
  price: string
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

export interface ContactFormErrors {
  name?: string
  email?: string
  projectType?: string
  message?: string
  general?: string
}

export interface ContactFormState {
  data: ContactFormData
  errors: ContactFormErrors
  isSubmitting: boolean
  isSuccess: boolean
  isSubmitted: boolean
  submitError?: string
}

// Landing Page Content Types
export interface LandingPageContent {
  hero: HeroContent
  technologies: Technology[]
  projectTypes: ProjectType[]
  services: Service[]
  testimonials: TestimonialsContent
  demo: DemoContent
  faq: FAQItem[]
  pricing: PricingPackage[]
}
