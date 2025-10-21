import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility Statement | CMS Studio",
  description:
    "Accessibility statement for CMS Studio in accordance with Israeli accessibility regulations and WCAG 2.1 AA.",
}

export default function AccessibilityStatement() {
  return (
    <main className="lp-container py-16 text-right" lang="he" dir="rtl">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold text-slate-100">הצהרת נגישות</h1>
        <p className="text-slate-300">
          CMS Studio מחויבת לעמוד בחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998, ובדרישות התקן הישראלי 5568 המושתת על
          WCAG 2.1 ברמת AA. אנו משקיעים מאמצים רבים כדי שכל גולש, עם או בלי מוגבלות, יוכל להשתמש באתר בנוחות וביעילות.
        </p>
      </header>

      <section className="space-y-4 text-slate-200">
        <h2 className="text-2xl font-semibold text-slate-100">התאמות שבוצעו באתר</h2>
        <ul className="list-disc pr-5 space-y-2 text-slate-300">
          <li>תמיכה מלאה בעברית ובכיווניות RTL, כולל מבנה סמנטי תקין ותגיות ARIA.</li>
          <li>תפריט נגיש וקישורי דילוג לתוכן המאפשרים ניווט מקלדת מלא.</li>
          <li>תוסף נגישות פנימי עם אפשרויות לניגודיות גבוהה, הגדלת טקסט, הדגשת קישורים והפחתת אנימציות.</li>
          <li>טקסט חלופי לתמונות, תיאורי כפתורים ושדות טופס עבור משתמשי קוראי מסך.</li>
          <li>הבלטת מצב מיקוד (Focus), צבעי ניגודיות מותאמים ואפשרות להפחתת תנועה עבור משתמשים רגישים.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4 text-slate-200">
        <h2 className="text-2xl font-semibold text-slate-100">בדיקות ותחזוקה שוטפת</h2>
        <p className="text-slate-300">
          האתר נבדק מעת לעת באמצעות כלי נגישות אוטומטיים (Axe, Lighthouse) ובאמצעות בדיקות ידניות לרבות גלישה באמצעות מקלדת
          וקוראי מסך. אנו ממשיכים לשפר את האתר באופן מתמיד ומברכים על כל משוב שיעזור לנו לשפר את חוויית הנגישות.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-200">
        <h2 className="text-2xl font-semibold text-slate-100">פניות בנושא נגישות</h2>
        <p className="text-slate-300">
          מצאתם רכיב שאינו נגיש או שיש לכם בקשה להתאמה נוספת? נשמח לשמוע מכם. אנו מתחייבים לתת מענה בהקדם האפשרי ובהתאם
          לדרישות החוק.
        </p>
        <ul className="space-y-2 text-slate-300">
          <li>
            דוא&quot;ל:
            <a href="mailto:liormedan1@gmail.com" className="text-sky-400 underline hover:text-sky-300 pr-1">
              liormedan1@gmail.com
            </a>
          </li>
          <li>
            טלפון:
            <a href="tel:+972547382675" className="text-sky-400 underline hover:text-sky-300 pr-1">
              054-738-2675
            </a>
          </li>
        </ul>
        <p className="text-xs text-slate-500">מועד עדכון אחרון של ההצהרה: מרץ 2025.</p>
      </section>
    </main>
  )
}

