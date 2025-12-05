import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist_Mono } from "next/font/google"
import { Heebo } from "next/font/google"

import "./globals.css"
import { ScrollProgress, ScrollToTop } from "@/components/ui/scroll-progress"
import CookieConsent from "@/components/cookie-consent"
import AccessibilityToolbar from "@/components/accessibility-toolbar"
import DevResetButton from "@/components/dev-reset-button"
import ClientResetHandler from "@/components/client-reset-handler"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Hebrew-friendly UI font
const heebo = Heebo({
  variable: "--font-hebrew",
  subsets: ["hebrew"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "פיתוח אתרים ומערכות CMS",
  description: "פיתוח אתרי תדמית, חנויות אונליין, בלוגים ומערכות CMS בעברית. שירות מהיר, יחס אישי, מערכת ניהול קלה בעברית מלאה עם אינטגרציות מתקדמות.",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className="dark h-full">
      <body
        className={`${heebo.variable} ${geistMono.variable} min-h-screen bg-slate-950 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 antialiased`}
      >
        <ClientResetHandler />
        <ScrollProgress />
        <CookieConsent />
        <AccessibilityToolbar />
        <DevResetButton />
        <div className="flex min-h-screen flex-col">{children}</div>
        <ScrollToTop />
      </body>
    </html>
  )
}

