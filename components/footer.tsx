import Link from 'next/link'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">הסטודיו של ליאור</h3>
            <p className="text-sm leading-relaxed">
              סטודיו בוטיק לפיתוח אתרי תוכן ומוצר על בסיס Next.js ו-Sanity. אנחנו מייצרים פתרונות Tailor-made שמשרתים צוותי שיווק, מוצר ותוכן – עם דגש על ביצועים, נגישות והרחבה עתידית.
            </p>
            <div className="flex items-center space-x-2 space-x-reverse text-xs">
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span>עושים זאת באהבה ובפוקוס על התוצאה</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">מה אנחנו עושים</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#services" className="transition-colors hover:text-sky-400">
                  אסטרטגיית UX ותוכן
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-sky-400">
                  פיתוח Next.js + Sanity
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-sky-400">
                  DevOps, פריסה ואוטומציות
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-sky-400">
                  תחזוקה וליווי שוטף
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">קיצורי דרך</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-sky-400">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-sky-400">
                  הבלוג
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="transition-colors hover:text-sky-400">
                  חבילות ותמחור
                </Link>
              </li>
              <li>
                <Link href="#faq" className="transition-colors hover:text-sky-400">
                  שאלות נפוצות
                </Link>
              </li>
              <li>
                <Link href="#contact" className="transition-colors hover:text-sky-400">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">פרטי יצירת קשר</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 space-x-reverse">
                <EnvelopeIcon className="h-5 w-5 text-sky-400" />
                <a href="mailto:lior@example.com" className="transition-colors hover:text-sky-400">
                  lior@example.com
                </a>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <PhoneIcon className="h-5 w-5 text-sky-400" />
                <a href="tel:+972501234567" className="transition-colors hover:text-sky-400">
                  050-123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPinIcon className="h-5 w-5 text-sky-400" />
                <span>עובדים מרחוק – נפגשים בזום או אצלכם במשרד</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center text-xs text-slate-400 sm:justify-between">
            <p className="order-last w-full text-xs text-slate-400 sm:order-first sm:w-auto">
              © {currentYear} הסטודיו של ליאור. כל הזכויות שמורות.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span>Next.js</span>
              <span>Sanity</span>
              <span>Vercel</span>
              <span>Tailwind CSS</span>
              <span>TypeScript</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
            <span>אנחנו מקפידים על נגישות, אבטחת מידע ואחריות מקצועית מלאה.</span>
            <div className="flex gap-6">
              <Link href="/privacy" className="transition-colors hover:text-sky-400">
                מדיניות פרטיות
              </Link>
              <Link href="/terms" className="transition-colors hover:text-sky-400">
                תנאי שימוש
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
