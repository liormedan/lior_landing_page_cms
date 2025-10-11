export interface LandingPageContent {
  hero: HeroContent
  technologies: Technology[]
  projectTypes: ProjectType[]
  services: Service[]
  faq: FAQItem[]
  demo: DemoContent
  pricing: PricingPackage[]
}

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  ctaText: string
}

export interface Technology {
  name: string
  logo: string // path to logo image
  description: string
  benefits: string[]
  category: 'frontend' | 'cms' | 'deployment'
}

export interface ProjectType {
  title: string
  description: string
  image: string // path to example image
  features: string[]
  examples: string[]
  ctaLabel?: string
  ctaHref?: string
}

export interface Service {
  title: string
  description: string
  icon: string // icon name or path
  benefits: string[]
}

export interface FAQItem {
  question: string
  answer: string
  category: 'technical' | 'pricing' | 'process'
}

export interface DemoContent {
  title: string
  description: string
  features: string[]
  screenshots: string[] // paths to demo images
}

export interface PricingPackage {
  name: string
  price: string
  features: string[]
  highlighted: boolean
  ctaText: string
}

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
  selectedPackage?: string
}

export interface ContactFormState {
  data: ContactFormData
  errors: ContactFormErrors
  isSubmitting: boolean
  isSubmitted: boolean
  submitError?: string
}
