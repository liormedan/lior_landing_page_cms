import { LandingPageContent, FAQItem, TestimonialsContent } from '@/types/landing-page'

export const landingPageContent = {
  hero: {
    title: 'ניהול מערכת תוכן חכמה עם CMS',
    lines: [
      'החל מ-₪3,000 בלבד לאתר עסק מקצועי, מותאם לעברית ולמובייל תוך ימים ספורים.',
      'עיצוב מרהיב, RTL מדויק ותשתית Next.js + Sanity שמעניקה לכם שליטה מלאה בתוכן.',
      'חיבורים ל-CRM, אוטומציות דיוור ותמיכה צמודה מהאפיון ועד ההשקה.',
    ],
    badge: 'תהליך זריז וללא התחייבות',
    ctaSupportText: 'נחזור אליך תוך 24 שעות עם הצעת מחיר מותאמת.',
    ctas: {
      primary: { label: 'לתיאום שיחת ייעוץ', href: '#contact' },
      secondary: { label: 'קבל הצעת מחיר', href: '#pricing' },
    },
  },

  offerings: {
    heading: 'מה מקבלים כשמנהלים איתנו מערכת תוכן',
    benefits: [
      { title: 'שליטה מלאה בתוכן', desc: 'עדכון טקסטים, מבצעים וטפסים בלייב בממשק עברי ידידותי.' },
      { title: 'RTL ונייד בליגה אחרת', desc: 'טיפוגרפיה בעברית, אנימציות רספונסיביות וטעינה מהירה בכל מכשיר.' },
      { title: 'חיבורים שעובדים בשבילך', desc: 'הטמעת CRM, מערכות דיוור ופיקסלים - בלי להתפשר על איכות הנתונים.' },
      { title: 'ביצועים ומדידה', desc: 'SEO מובנה, Lighthouse 90+, אנליטיקה ותיוג אירועים ב-GA4, גיבויים אוטומטיים.' },
      { title: 'ליווי אנושי צמוד', desc: 'מנהל.ת פרויקט זמין.ה, סטודיו עיצוב ומדריכים מוקלטים להפעלה עצמאית.' },
    ],
    platformsHeading: 'הטכנולוגיות שמאחורי התוצאה',
    platforms: [
      { name: 'Next.js', blurb: 'תשתית מודרנית לביצועים גבוהים, SEO חזק ותמיכה ב-ISR ו-Edge.' },
      { name: 'Sanity CMS', blurb: 'ממשק עריכה בעברית עם Preview בזמן אמת וגרסאות תוכן.' },
      { name: 'Vercel', blurb: 'פריסה מיידית ל-CDN עולמי, אבטחה וניטור בזמן אמת.' },
      { name: 'אינטגרציות', blurb: 'חיבור ל-HubSpot, ActiveCampaign, Zapier ומערכות פנים ארגוניות.' },
    ],
  },

  demo: {
    title: 'איך נראה ניהול תוכן בזמן אמת',
    description: 'דפדפו בדמו קצר שמראה איך צוות השיווק מנהל ומעדכן תוכן בדקות וללא מתכנתים.',
    features: [
      'Preview חי לפני פרסום, עם תמיכה מלאה ב-RTL ובמובייל.',
      'טיוטות, הרשאות וגרסאות המותאמות לקמפיינים ולצוותים שונים.',
      'סנכרון דו-כיווני ל-CRM ודיוור - HubSpot, ActiveCampaign, Salesforce ועוד.',
      'מעקב אוטומטי אחרי טפסים והמרות, כולל תגיות לאנליטיקה ו-GA4.',
      'ייבוא תכנים מאתרים קיימים (WordPress, Wix) למעבר חלק ומהיר.',
      'Webhooks ו-API פתוח לשילוב תהליכים עסקיים ואוטומציות מותאמות.',
    ],
    screenshots: ['/images/sanity-demo-1.svg', '/images/sanity-demo-2.svg', '/images/sanity-demo-3.svg'],
  },

  pricing: {
    heading: 'חבילות ותמחור שקוף',
    note: 'המחירים אינם כוללים מע"מ וכוללים העלאה ופריסה ב-Vercel.',
    plans: [
      {
        id: 'essential',
        name: 'Essential',
        price: '₪3,000',
        tagline: 'נקודת פתיחה חכמה לעסקים שרוצים לעלות לאוויר מהר עם בסיס יציב.',
        features: [
          'עד 5 מקטעים קריטיים (Hero, יתרונות, גלריית דוגמאות, FAQ, טופס ליד).',
          'עיצוב מותאם מותג + רכיבי RTL וקריאות גבוהה במובייל.',
          'התממשקות בסיסית ל-CRM או למערכת דיוור אחת + Google Analytics.',
          'הדרכת וידאו מוקלטת ונוהל עדכונים מפורט לצוות שלכם.',
        ],
        cta: 'דברו איתי על חבילת Essential',
      },
      {
        id: 'growth',
        name: 'Growth',
        price: '₪9,900',
        tagline: 'מותאם לקמפיינים מתמשכים ו-A/B Testing עם שכבת אוטומציה מתקדמת.',
        features: [
          'עד 10 מקטעים, כולל ספריית רכיבים לכל קמפיין ובלוג כמהדורת תוכן.',
          'עיצוב UX/UI מעמיק עם מיקרו-אינטראקציות ורכיבי אנימציה קלים.',
          'חיבורי CRM מרובים, אוטומציות דיוור, סנכרון ללידים ותיוג המרות.',
          'סט דוחות Looker Studio או GA4 כולל אירועים ותיעוד KPI.',
        ],
        cta: 'נשמע מתאים - צרו קשר לחבילת Growth',
      },
      {
        id: 'scale',
        name: 'Scale',
        price: 'הצעת מחיר מותאמת',
        tagline: 'לארגונים שרוצים Headless מלא, תהליכים מרובי שפות ואינטגרציות מורכבות.',
        features: [
          'ספריית קומפוננטות מותאמת, ניהול גרסאות ותמיכה במספר מותגים.',
          'Headless CMS מלא עם Workflow מותאם, הרשאות מורכבות ותזמונים.',
          'DevOps מנוהל: סביבות פיתוח, אבטחה, ניטור וזמינות SLA.',
          'חיבורים מותאמים אישית ל-ERP, Data Warehouse ומערכות פנים ארגוניות.',
        ],
        cta: 'נתאם שיחה ונתפור חבילת Scale',
      },
    ],
  },

  faq: {
    heading: 'שאלות נפוצות',
    items: [
      {
        q: 'כמה זמן לוקח עד שהדף באוויר?',
        a: 'חבילת Essential נמסרת בתוך 10-14 ימי עבודה הכוללים אפיון, עיצוב ופיתוח. בחבילות המורחבות אנו מוסיפים שבועות בהתאם לכמות האוטומציות והאינטגרציות הנדרשות.',
      },
      {
        q: 'איזו הכנה צריך מצידכם?',
        a: 'מספיק תדריך קצר על הקהל, ההצעה והטון המותגי. אנחנו דואגים לקופי ראשוני, לעיצוב ולבניית הטפסים. במהלך הפרויקט נפיק סשן קצר לאישור חומרים ולכיוון סופי.',
      },
      {
        q: 'אפשר לחבר ל-CRM, זאפייר ודיוור קיים?',
        a: 'בוודאי. אנחנו מחברים באופן שוטף ל-HubSpot, Salesforce, ActiveCampaign, Monday, Zapier ועוד. אם יש מערכת פנימית, נבנה Webhooks או API מותאם לפי הצורך.',
      },
      {
        q: 'מה קורה אחרי ההשקה?',
        a: 'מעבירים הדרכה מסודרת, מספקים הקלטות, נוהל עדכונים ותמיכה לשבועיים לאחר העלייה לאוויר. ניתן לצרף ריטיינר תחזוקה שכולל A/B Testing ועדכוני תוכן שוטפים.',
      },
      {
        q: 'יש פתרון לעסקים קטנים או סטרטאפים בתחילת הדרך?',
        a: 'כן. חבילת Essential נבנתה במיוחד לעסקים בצמיחה, ואפשר לפרוס את התשלום לשני חלקים. נשמח להתאים גם גרסת MVP למערכת תוכן אחת כדי להתחיל למדוד תוצאות.',
      },
    ],
  },

  testimonials: {
    heading: 'לקוחות מספרים',
    subtitle: 'עסקים קטנים ובינוניים שבחרו בנו למערכות תוכן ממירות.',
    supportingText: 'כל פרויקט מקבל צוות קטן ומסור שמוביל משלב הרעיון עד להשקה ומדידה.',
    items: [
      {
        name: 'טל רותם',
        role: 'מנכ"לית סטודיו למיתוג',
        company: 'Studio TR',
        quote: '״בתוך שבועיים הייתה לנו מערכת תוכן שמייצרת פי שלושה פניות. הצוות זריז, יסודי ומגיב לכל שינוי בלייב.״',
        avatar: '/images/placeholder.svg',
        highlight: 'עלייה של 35% בלידים',
      },
      {
        name: 'מיכאל פרקש',
        role: 'מנהל שיווק',
        company: 'FinNext',
        quote: '״המערכת של Sanity עם האוטומציות שהוספתם חסכה לנו שעות עבודה. סוף סוף יש לנו RTL מדויק ומדידה מסודרת.״',
        avatar: '/images/placeholder.svg',
        highlight: 'חיסכון של 8 שעות בשבוע',
      },
      {
        name: 'הילה שחר',
        role: 'שותפה ומובילת מוצר',
        company: 'UpRight',
        quote: '״היישום היה מוקפד, התמיכה גם אחרי העלייה לאוויר והיכולת לשנות תוכן בלי מתכנתים - זה מה שחיפשנו.״',
        avatar: '/images/placeholder.svg',
      },
    ],
  },

  navigation: {
    services: [
      { label: 'בניית דפי נחיתה', href: '/services/landing-pages' },
      { label: 'אוטומציות שיווק', href: '/services/automation' },
      { label: 'ניהול תוכן CMS', href: '/services/cms' },
      { label: 'עיצוב ומיתוג', href: '/services/design' },
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
    heading: 'נבנה ביחד את הדף שמביא לקוחות',
    subheading: 'השאירו שם, מייל וקצת רקע ואחזור אליכם לשיחת היכרות קצרה - בלי מחויבות.',
    placeholders: {
      name: 'שם מלא או שם חברה',
      email: 'דוא"ל עבודה',
      phone: 'טלפון לעדכון מהיר (לא חובה)',
      goals: 'מה חשוב שיקרה בדף? הצעה, הרשמה, מכירה או משהו אחר',
    },
    submit: 'שלחו לי פרטים',
  },
} as const

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
      badge: landingPageContent.hero.badge ?? '',
      ctaSupportText: landingPageContent.hero.ctaSupportText ?? '',
    },
    technologies: [],
    projectTypes: [],
    services: [],
    testimonials: getTestimonials(),
    demo: landingPageContent.demo,
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
    subtitle: landingPageContent.testimonials.subtitle ?? '',
    items: landingPageContent.testimonials.items,
    supportingText: landingPageContent.testimonials.supportingText,
  }
}

export function getFAQItems(): FAQItem[] {
  return landingPageContent.faq.items.map((item) => ({
    question: item.q,
    answer: item.a,
    category: 'general',
  }))
}

export function getPricingPackages() {
  return landingPageContent.pricing.plans.map((plan) => ({
    name: plan.name,
    price: plan.price,
    features: plan.features,
    highlighted: plan.id === 'growth',
    ctaText: plan.cta,
  }))
}

export function getDemoContent() {
  return landingPageContent.demo
}
