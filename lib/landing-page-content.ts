import { LandingPageContent, FAQItem, TestimonialsContent } from '@/types/landing-page'

export const landingPageContent = {
  hero: {
    title: "פיתוח אתרים ומערכות CMS",
    lines: [
      "החל מ-₪2,900 בלבד לאתר עסק מקצועי עם מערכת ניהול תוכן, מותאם לעברית ולמובייל תוך ימים ספורים.",
      "עיצוב מרהיב, RTL מדויק ותשתית Next.js + Sanity שמעניקה לכם שליטה מלאה בתוכן.",
      "פיתוח אתרי תדמית, חנויות אונליין, בלוגים ודפי נחיתה עם חיבורים ל-CRM ואוטומציות דיוור.",
    ],
    badge: "פיתוח מקצועי וללא התחייבות",
    ctaSupportText: "נחזור אליך תוך 24 שעות עם הצעת מחיר מותאמת לפרויקט שלך.",
    ctas: {
      primary: { label: "לתיאום שיחת ייעוץ", href: "#contact" },
      secondary: { label: "קבל הצעת מחיר", href: "#pricing" },
    },
  },

  offerings: {
    heading: 'למה לבחור בנו לפיתוח האתר שלכם',
    benefits: [
      { title: 'פיתוח מקצועי ומותאם', desc: 'אתרי תדמית, חנויות אונליין, בלוגים ודפי נחיתה עם מערכת ניהול תוכן מתקדמת.' },
      { title: 'RTL ונייד בליגה אחרת', desc: 'טיפוגרפיה בעברית, אנימציות רספונסיביות וטעינה מהירה בכל מכשיר.' },
      { title: 'אינטגרציות מתקדמות', desc: 'חיבור ל-CRM, מערכות דיוור, תשלומים ופיקסלים - בלי להתפשר על איכות הנתונים.' },
      { title: 'ביצועים ומדידה', desc: 'SEO מובנה, Lighthouse 90+, אנליטיקה ותיוג אירועים ב-GA4, גיבויים אוטומטיים.' },
      { title: 'ליווי מקצועי צמוד', desc: 'מנהל.ת פרויקט זמין.ה, סטודיו עיצוב ומדריכים מוקלטים להפעלה עצמאית.' },
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
    title: 'מערכת ניהול תוכן מתקדמת שאנחנו בונים',
    description: 'דפדפו בדמו קצר שמראה את מערכת ה-CMS המתקדמת שאנחנו מפתחים לכל לקוח - ניהול ועדכון תוכן בדקות וללא מתכנתים.',
    features: [
      'Preview חי לפני פרסום, עם תמיכה מלאה ב-RTL ובמובייל.',
      'טיוטות, הרשאות וגרסאות המותאמות לקמפיינים ולצוותים שונים.',
      'אינטגרציה מלאה ל-CRM ודיוור - HubSpot, ActiveCampaign, Salesforce ועוד.',
      'מעקב אוטומטי אחרי טפסים והמרות, כולל תגיות לאנליטיקה ו-GA4.',
      'מיגרציה מאתרים קיימים (WordPress, Wix) למעבר חלק ומהיר.',
      'Webhooks ו-API פתוח לשילוב תהליכים עסקיים ואוטומציות מותאמות.',
    ],
    screenshots: ['/images/sanity-demo-1.svg', '/images/sanity-demo-2.svg', '/images/sanity-demo-3.svg'],
  },

  pricing: {
    heading: "חבילות פיתוח ותמחור שקוף",
    note: "המחירים אינם כוללים מע\"\"מ וכוללים פיתוח, העלאה ופריסה ב-Vercel.",
    plans: [
      {
        id: "essential",
        name: "Essential",
        price: "₪2,900",
        tagline: "אתר עסק מקצועי עם CMS - נקודת פתיחה מושלמת לעסקים שרוצים לעלות לאוויר מהר.",
        features: [
          "פיתוח אתר עד 5 עמודים (דף בית, אודות, שירותים, צור קשר + עמוד נוסף).",
          "עיצוב מותאם מותג + פיתוח RTL מדויק וקריאות גבוהה במובייל.",
          "מערכת CMS בסיסית + אינטגרציה ל-CRM או מערכת דיוור + Google Analytics.",
          "הדרכת וידאו מוקלטת ונוהל עדכונים מפורט לצוות שלכם.",
        ],
        cta: "דברו איתי על חבילת Essential",
      },
      {
        id: "growth",
        name: "Growth",
        price: "₪4,900",
        tagline: "אתר מתקדם עם בלוג ו-CMS מלא - מותאם לעסקים עם צרכי תוכן ושיווק מתקדמים.",
        features: [
          "פיתוח אתר עד 10 עמודים + בלוג עם מערכת ניהול תוכן מתקדמת.",
          "עיצוב UX/UI מעמיק עם מיקרו-אינטראקציות ורכיבי אנימציה מותאמים.",
          "אינטגרציות CRM מרובות, אוטומציות דיוור, סנכרון ללידים ותיוג המרות.",
          "סט דוחות Looker Studio או GA4 כולל אירועים ותיעוד KPI מותאם.",
        ],
        cta: "נשמע מתאים – צרו קשר לחבילת Growth",
      },
      {
        id: "scale",
        name: "Scale",
        price: "הצעת מחיר מותאמת",
        tagline: "פתרונות ארגוניים מתקדמים - אתרים מורכבים, חנויות אונליין ומערכות Headless CMS.",
        features: [
          "פיתוח אתרים מורכבים, חנויות אונליין או פורטלים עם ספריית קומפוננטות מותאמת.",
          "Headless CMS מלא עם Workflow מותאם, הרשאות מורכבות ותמיכה במספר מותגים.",
          "DevOps מנוהל: סביבות פיתוח, אבטחה, ניטור וזמינות SLA.",
          "אינטגרציות מותאמות ל-ERP, Data Warehouse ומערכות פנים ארגוניות.",
        ],
        cta: "נתאם שיחה ונתפור חבילת Scale",
      },
    ],
  },

  faq: {
    heading: 'שאלות נפוצות על פיתוח אתרים',
    items: [
      {
        q: 'כמה זמן לוקח עד שהאתר באוויר?',
        a: 'חבילת Essential (אתר בסיסי) נמסרת בתוך 10-14 ימי עבודה הכוללים אפיון, עיצוב ופיתוח. בחבילות המורחבות אנו מוסיפים שבועות בהתאם למורכבות האתר והאינטגרציות הנדרשות.',
      },
      {
        q: 'איזו הכנה צריך מצידכם לפיתוח האתר?',
        a: 'מספיק תדריך קצר על העסק, קהל היעד והמטרות. אנחנו דואגים לתכנים ראשוניים, עיצוב ופיתוח האתר. במהלך הפרויקט נקיים סשן אישור חומרים וכיוון עיצובי.',
      },
      {
        q: 'אפשר לחבר את האתר ל-CRM, זאפייר ודיוור קיים?',
        a: 'בוודאי. אנחנו מפתחים אינטגרציות ל-HubSpot, Salesforce, ActiveCampaign, Monday, Zapier ועוד. אם יש מערכת פנימית, נפתח Webhooks או API מותאם לפי הצורך.',
      },
      {
        q: 'מה קורה אחרי השקת האתר?',
        a: 'מעבירים הדרכה מסודרת על מערכת הניהול, מספקים הקלטות ותמיכה לשבועיים לאחר העלייה לאוויר. ניתן לצרף ריטיינר תחזוקה שכולל עדכונים ושיפורים שוטפים.',
      },
      {
        q: 'יש פתרון לעסקים קטנים או סטרטאפים בתחילת הדרך?',
        a: 'כן. חבילת Essential נבנתה במיוחד לעסקים בצמיחה, ואפשר לפרוס את התשלום לשני חלקים. נשמח להתאים גם אתר MVP פשוט כדי להתחיל למדוד תוצאות.',
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
      { label: 'פיתוח אתרי תדמית', href: '/services/websites' },
      { label: 'חנויות אונליין', href: '/services/ecommerce' },
      { label: 'מערכות CMS מתקדמות', href: '/services/cms' },
      { label: 'דפי נחיתה ושיווק', href: '/services/landing-pages' },
    ],
    footerLinks: [
      { label: 'בית', href: '/' },
      { label: 'שירותים', href: '/services' },
      { label: 'תמחור', href: '#pricing' },
      { label: 'שאלות נפוצות', href: '#faq' },
      { label: 'צור קשר', href: '#contact' },
      { label: 'הצהרת נגישות', href: '/accessibility' },
    ],
  },

  contact: {
    heading: 'בואו נפתח ביחד את האתר שמביא לקוחות',
    subheading: 'השאירו שם, מייל וקצת רקע על הפרויקט ואחזור אליכם לשיחת היכרות קצרה - בלי מחויבות.',
    placeholders: {
      name: 'שם מלא או שם חברה',
      email: 'דוא"ל עבודה',
      phone: 'טלפון לעדכון מהיר (לא חובה)',
      goals: 'איזה סוג אתר אתם צריכים? אתר תדמית, חנות, בלוג או דף נחיתה?',
    },
    submit: 'שלחו לי פרטים',
  },
}

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







