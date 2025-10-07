import { LandingPageContent } from '@/types/landing-page'
import landingPageData from '@/data/landing-page-content.json'

export function getLandingPageContent(): LandingPageContent {
  return landingPageData as LandingPageContent
}

export function getHeroContent() {
  return landingPageData.hero
}

export function getTechnologies() {
  return landingPageData.technologies as LandingPageContent['technologies']
}

export function getProjectTypes() {
  return landingPageData.projectTypes
}

export function getServices() {
  return landingPageData.services
}

export function getFAQItems() {
  return landingPageData.faq as LandingPageContent['faq']
}

export function getDemoContent() {
  return landingPageData.demo
}

export function getPricingPackages() {
  return landingPageData.pricing
}