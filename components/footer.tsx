import Link from 'next/link'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">ליאור מדן</h3>
            <p className="text-sm leading-relaxed">
              בניית מערכת ניהול תוכן עם אתר מעוצב על בסיס טכנולוגיות חדישות. 
              מתמחה בפיתוח אתרים מהירים ומערכות ניהול תוכן מתקדמות.
            </p>
            <div className="flex items-center space-x-2 space-x-reverse">
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span className="text-xs">נבנה בישראל</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">שירותים</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#services" className="hover:text-sky-400 transition-colors">
                  פיתוח אתרים
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-sky-400 transition-colors">
                  מערכות ניהול תוכן
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-sky-400 transition-colors">
                  אתרי מסחר אלקטרוני
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-sky-400 transition-colors">
                  אפליקציות ווב
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-sky-400 transition-colors">
                  ייעוץ טכנולוגי
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">קישורים מהירים</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-sky-400 transition-colors">
                  בלוג
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-sky-400 transition-colors">
                  מחירים
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-sky-400 transition-colors">
                  שאלות נפוצות
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-sky-400 transition-colors">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">צור קשר</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 space-x-reverse">
                <EnvelopeIcon className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <a 
                  href="mailto:lior@example.com" 
                  className="hover:text-sky-400 transition-colors"
                >
                  lior@example.com
                </a>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <PhoneIcon className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <a 
                  href="tel:+972501234567" 
                  className="hover:text-sky-400 transition-colors"
                >
                  050-123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPinIcon className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <span>ישראל</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-3">בנוי עם טכנולוגיות מתקדמות</p>
            <div className="flex justify-center items-center space-x-6 space-x-reverse flex-wrap gap-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-xs font-medium">Next.js</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-xs font-medium">Sanity CMS</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-xs font-medium">Vercel</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-xs font-medium">Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-xs font-medium">TypeScript</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © {currentYear} ליאור מדן. כל הזכויות שמורות.
            </div>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <Link 
                href="/privacy" 
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                מדיניות פרטיות
              </Link>
              <Link 
                href="/terms" 
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                תנאי שימוש
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}