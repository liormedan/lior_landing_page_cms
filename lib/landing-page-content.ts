import { LandingPageContent } from '@/types/landing-page'
import landingPageData from '@/data/landing-page-content.json'

// Override hero copy with refined Hebrew messaging
const HERO_OVERRIDE = {
  badge: 'שתי חבילות ברורות — נחיתה או בלוג — עם CMS ותמיכה מלאה',
  title: '\u05D1\u05E0\u05D9\u05D9\u05EA\u0020\u05D3\u05E4\u05D9\u0020\u05E0\u05D7\u05D9\u05EA\u05D4\u0020\u05D5\u05D1\u05DC\u05D5\u05D2\u05D9\u05DD',
  subtitle:
    '\u004E\u0065\u0078\u0074\u002E\u006A\u0073\u0020\u002B\u0020\u0053\u0061\u006E\u0069\u0074\u0079\u0020\u002B\u0020\u0056\u0065\u0072\u0063\u0065\u006C\u0020\u2014\u0020\u05E2\u05E8\u05D9\u05DB\u05D4\u0020\u05D1\u05D6\u05DE\u05DF\u0020\u05D0\u05DE\u05EA\u002C\u0020\u05D1\u05D9\u05E6\u05D5\u05E2\u05D9\u05DD\u0020\u05D2\u05D1\u05D5\u05D4\u05D9\u05DD\u0020\u05D5\u05EA\u05DE\u05D9\u05DB\u05D4\u0020\u05DE\u05DC\u05D0\u05D4\u0020\u05D1\u05E2\u05D1\u05E8\u05D9\u05EA\u002F\u0052\u0054\u004C',
  description:
    '\u05D0\u05E0\u05D9\u0020\u05DE\u05E4\u05EA\u05D7\u0020\u05DE\u05DC\u05D5\u05D5\u05D4\u0020\u05EA\u05D4\u05DC\u05D9\u05DA\u0020\u05E7\u05E6\u05D4\u2011\u05DC\u05E7\u05E6\u05D4\u003A\u0020\u05D0\u05E4\u05D9\u05D5\u05DF\u002C\u0020\u05E2\u05D9\u05E6\u05D5\u05D1\u002C\u0020\u05E4\u05D9\u05EA\u05D5\u05D7\u0020\u05D5\u05E4\u05E8\u05D9\u05E1\u05D4\u0020\u05DE\u05D4\u05D9\u05E8\u05D4\u002E\u0020\u0053\u0074\u0061\u0063\u006B\u0020\u05DE\u05D5\u05D3\u05E8\u05E0\u05D9\u0020\u05DC\u05D2\u05DE\u05D9\u05E9\u05D5\u05EA\u002C\u0020\u05E0\u05D9\u05D4\u05D5\u05DC\u0020\u05EA\u05D5\u05DB\u05DF\u0020\u05D1\u05D6\u05DE\u05DF\u0020\u05D0\u05DE\u05EA\u0020\u05D5\u05D0\u05D9\u05E0\u05D8\u05D2\u05E8\u05E6\u05D9\u05D5\u05EA\u0020\u05DC\u2011\u0043\u0052\u004D\u002F\u0042\u0049\u002E\u0020\u05E0\u05D2\u05D9\u05E9\u002C\u0020\u05DE\u05D4\u05D9\u05E8\u002C\u0020\u05D5\u05DE\u05D5\u05DB\u05DF\u0020\u05DC\u05E9\u05D9\u05D5\u05D5\u05E7\u002E',
  primaryCtaText: '\u05E7\u05D1\u05DC\/\u05D9\u0020\u05D4\u05E6\u05E2\u05D4',
  primaryCtaHref: '#contact',
  secondaryCtaText: '\u05DC\u05D1\u05DC\u05D5\u05D2',
  secondaryCtaHref: '/blog',
}

export function getLandingPageContent(): LandingPageContent {
  const data = landingPageData as LandingPageContent
  return {
    ...data,
    hero: { ...data.hero, ...HERO_OVERRIDE },
  }
}

export function getHeroContent() {
  const data = landingPageData as LandingPageContent
  return { ...data.hero, ...HERO_OVERRIDE }
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

export function getTestimonials() {
  return landingPageData.testimonials
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
