import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "הסטודיו של ליאור | אתרי תוכן ופתרונות Sanity מותאמים",
  description:
    "בניית אתרי תוכן, מוצר וקהילה בעזרת Next.js, Sanity ו-Vercel – עם דגש על מסע משתמש, RTL, נגישות ופריסה מהירה.",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 text-slate-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-white text-slate-900">{children}</div>
      </body>
    </html>
  )
}
