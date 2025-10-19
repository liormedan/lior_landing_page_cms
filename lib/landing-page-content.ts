import { LandingPageContent, FAQItem, TestimonialsContent } from '@/types/landing-page'

export const landingPageContent = {
  
      '���� ������ ���� ���� ������ CMS',
      '���� ���� ���������, ���������� ������ ������ ���� ��� ����.',
      '���������� ����� �� Sanity ���� �����, ��� �� SEO �����.',
    ,
      secondary: { label: 'רוצה לשמוע עוד?', href: '#contact' },
    },
  },

  offerings: {
    heading: 'יתרונות CMS לעסק',
    benefits: [
      { title: 'שליטה מלאה', desc: 'עדכנו דפים, בלוג, מוצרים ונכסים דיגיטליים ללא קוד.' },
      { title: 'גמישות בזמן אמת', desc: 'מבני תוכן מודולריים, קומפוננטות ניתנות לשילוב ושינוי מהיר.' },
      { title: 'התאמה אישית', desc: 'UI/UX לפי המותג, קומפוננטות ותבניות ידידותיות לעורכים.' },
      { title: 'ניהול מכל מקום', desc: 'ממשק ענן מאובטח, הרשאות צוות וזרימות אישור.' },
      { title: 'SEO מובנה', desc: 'מטא‑דאטה, סלאגים, סכמה ופרוויו חברתי — מוכנים לקידום.' },
    ],
    platformsHeading: 'פלטפורמות מומלצות',
    platforms: [
      { name: 'Sanity', blurb: 'Headless גמיש במיוחד, תוכן כשירות, סכמות TypeScript ואינטגרציות עשירות.' },
      { name: 'WordPress', blurb: 'אקוסיסטם עצום, מאות תוספים, מתאים לבלוגים ואתרי תוכן קלאסיים.' },
      { name: 'Wix', blurb: 'הקמה מהירה, עורך ויזואלי נוח, פתרון כולל לעסקים קטנים.' },
      { name: 'Drupal', blurb: 'יציב ומאובטח לארגונים, מבני תוכן מורכבים והרשאות מתקדמות.' },
    ],
  },

  pricing: {
    heading: 'תמחור',
    note: 'טווח המחירים תלוי בהיקף ותכולה. נשמח לדייק יחד את החבילה המתאימה.',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        price: 'החל מ‑₪4,900',
        tagline: 'פתרון מהיר לדף נחיתה עם CMS בסיסי.',
        features: [
          'עד 5 מקטעים (Hero, יתרונות, עדויות, FAQ, יצירת קשר)',
          'הטמעת SEO בסיסי ו‑Open Graph',
          'ביצועים מיטביים והקשחת נגישות בסיסית',
          'סיור מסירה קצר והדרכה',
        ],
        cta: 'דברו איתנו על Starter',
      },
      {
        id: 'growth',
        name: 'Growth',
        price: 'החל מ‑₪9,900',
        tagline: 'למשרדים/עסקים שזקוקים ליותר תוכן וגמישות.',
        features: [
          'עד 12 מקטעים + קומפוננטות חוזרות',
          'התאמות UI/UX לפי מותג ותבניות לעורכים',
          'SEO מתקדם + מטא נתונים ודפי שיתוף',
          'אינטגרציות שיווק (לדוגמה: CRM/טפסים/Analytics)',
        ],
        cta: 'בחירת חבילת Growth',
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 'לפי דרישה',
        tagline: 'Headless/Enterprise מותאם אישית מקצה לקצה.',
        features: [
          'Headless CMS (לרוב Sanity) + סכמות מותאמות',
          'Workflow לעורכים: טיוטה > סקירה > פרסום',
          'אינטגרציות מתקדמות ו‑API',
          'ביצועים, אבטחה ונגישות מחמירים',
        ],
        cta: 'נדבר על Pro',
      },
    ],
  },

  faq: {
    heading: 'שאלות נפוצות',
    items: [
      { q: 'למי מתאים אתר מבוסס CMS?', a: 'לעסקים שצריכים לעדכן תוכן באופן תדיר, לבלוגים, למותגים עם קטלוג מוצרים או תכנים עשירים.' },
      { q: 'האם אפשר להרחיב בעתיד?', a: 'כן. אנו בונים מבנה מודולרי המאפשר הוספת מקטעים, קומפוננטות ואינטגרציות בהמשך בקלות.' },
      { q: 'איך CMS עוזר ל‑SEO?', a: 'שליטה במטא‑דאטה, סלאגים, סכמה, Sitemap ותצוגות שיתוף משפרת את הנראות האורגנית.' },
      { q: 'אפשר תמיכה בעברית ו‑RTL?', a: 'בהחלט. המערכת וה‑UI נבנים עם RTL בראש, כולל טיפוגרפיה וכיווניות תקינה.' },
      { q: 'מה לגבי אבטחה וביצועים?', a: 'מיישמים Best Practices, שימוש ב‑CDN, הקשחת הרשאות ו‑CI/CD חכם לטובת יציבות ומהירות.' },
    ],
  },

  testimonials: {
    heading: 'לקוחות ממליצים',
    items: [
      { name: 'נועה ל.', role: 'מנהלת שיווק', quote: 'תהליך זריז ותוצאה מדויקת למותג. סוף סוף אפשר לעדכן תוכן לבד.' },
      { name: 'יואב ש.', role: 'בעלים, סטארטאפ', quote: 'ה‑CMS וה‑RTL עובדים מעולה. האתר מהיר וקל לקידום.' },
      { name: 'מיכל ר.', role: 'מנהלת תוכן', quote: 'ממשק עריכה נוח, גמיש וידידותי לצוות. ממליצה בחום.' },
    ],
  },

  navigation: {
    services: [
      { label: 'אתרי תוכן', href: '/services/content-sites' },
      { label: 'תחזוקה מתמשכת', href: '/services/maintenance' },
      { label: 'קומפוננטות מותאמות', href: '/services/components' },
      { label: 'אינטגרציות ומערכות', href: '/services/integrations' },
    ],
    footerLinks: [
      { label: 'בית', href: '/' },
      { label: 'שירותים', href: '/services' },
      { label: 'תמחור', href: '#pricing' },
      { label: 'שאלות נפוצות', href: '#faq' },
      { label: 'צור קשר', href: '#contact' },
    ],
  },

  contact: {
    heading: 'נשמח לשמוע על הפרויקט שלך',
    subheading: 'ספרו לנו בכמה מילים מה המטרה ומה חשוב לכם — ונחזור עם כיוון מדויק.',
    placeholders: {
      name: 'שם מלא',
      email: 'אימייל',
      phone: 'טלפון (לא חובה)',
      goals: 'מטרות הפרויקט, קהל יעד ותוכן מרכזי',
    },
    submit: 'שלח/י',
  },
} as const

// Helpers mapped to existing component expectations
export function getLandingPageContent(): LandingPageContent {
  return {
    hero: {
      title: landingPageContent.hero.title,
      subtitle: landingPageContent.hero.lines[0] || '',
      description: landingPageContent.hero.lines.slice(1).join('\n'),
      primaryCtaText: landingPageContent.hero.ctas.primary.label,
      primaryCtaHref: landingPageContent.hero.ctas.primary.href,
      secondaryCtaText: landingPageContent.hero.ctas.secondary.label,
      secondaryCtaHref: landingPageContent.hero.ctas.secondary.href,
      badge: '',
    },
    technologies: [],
    projectTypes: [],
    services: [],
    testimonials: getTestimonials(),
    demo: { title: '', description: '', features: [], screenshots: [] },
    faq: getFAQItems(),
    pricing: getPricingPackages(),
  }
}

export function getHeroContent() {
  return getLandingPageContent().hero
}

export function getTestimonials(): TestimonialsContent {
  return {
    title: landingPageContent.testimonials.heading,
    subtitle: '',
    items: landingPageContent.testimonials.items,
  }
}

export function getFAQItems(): FAQItem[] {
  return landingPageContent.faq.items.map((it) => ({
    question: it.q,
    answer: it.a,
    category: 'general',
  }))
}

export function getPricingPackages() {
  return landingPageContent.pricing.plans.map((p) => ({
    name: p.name,
    price: p.price,
    features: p.features,
    highlighted: p.id === 'growth',
    ctaText: p.cta,
  }))
}


