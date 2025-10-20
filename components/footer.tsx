import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/outline'
import { landingPageContent } from '@/lib/landing-page-content'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const links = landingPageContent.navigation.footerLinks

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300" lang="he" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">סטודיו לדפי נחיתה חכמים</h3>
            <p className="text-sm leading-relaxed">
              אנחנו בונים דפי נחיתה ואתרי תדמית עם CMS מודרני, מותאם לעברית, RTL וחיבורים לכלי שיווק. דגש על ביצועים, נגישות ומדידה.
            </p>
            <div className="flex items-center space-x-2 space-x-reverse text-xs">
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span>אוהבים לעבוד עם עסקים שאוהבים את הלקוחות שלהם</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">ניווט מהיר</h4>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">צור קשר</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 space-x-reverse">
                <EnvelopeIcon className="h-5 w-5 text-slate-500" />
                <a href="mailto:liormedan1@gmail.com" className="transition-colors hover:text-white hover:underline">
                  liormedan1@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <PhoneIcon className="h-5 w-5 text-slate-500" />
                <a href="tel:+972547382675" className="transition-colors hover:text-white hover:underline">
                  054-738-2675
                </a>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPinIcon className="h-5 w-5 text-slate-500" />
                <span>עובדים מרחוק, פגישות בתל אביב ובקריית טבעון.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center text-xs text-slate-400 sm:justify-between">
            <p className="order-last w-full text-xs text-slate-400 sm:order-first sm:w-auto">
              © {currentYear} CMS Studio. כל הזכויות שמורות.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span>Sanity</span>
              <span>Next.js</span>
              <span>Vercel</span>
              <span>Tailwind</span>
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

