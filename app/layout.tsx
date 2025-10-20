import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist_Mono } from "next/font/google"
import { Heebo } from "next/font/google"

import "./globals.css"
import { ScrollProgress, ScrollToTop } from "@/components/ui/scroll-progress"

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
  title: "\u05D1\u05E0\u05D9\u05D9\u05EA\u0020\u05D0\u05EA\u05E8\u05D9\u0020\u05EA\u05D5\u05DB\u05DF\u0020\u05D5\u05D3\u05E4\u05D9\u0020\u05E0\u05D7\u05D9\u05EA\u05D4",
  description: "\u05E4\u05D9\u05EA\u05D5\u05D7\u0020\u05D0\u05EA\u05E8\u05D9\u0020\u05EA\u05D5\u05DB\u05DF\u002C\u0020\u05D1\u05DC\u05D5\u05D2\u05D9\u05DD\u0020\u05D5\u05D3\u05E4\u05D9\u0020\u05E0\u05D7\u05D9\u05EA\u05D4\u0020\u05D1\u05E2\u05D1\u05E8\u05D9\u05EA\u002E\u0020\u05E9\u05D9\u05E8\u05D5\u05EA\u0020\u05DE\u05D4\u05D9\u05E8\u002C\u0020\u05D9\u05D7\u05E1\u0020\u05D0\u05D9\u05E9\u05D9\u002C\u0020\u05DE\u05E2\u05E8\u05DB\u05EA\u0020\u05E0\u05D9\u05D4\u05D5\u05DC\u0020\u05E7\u05DC\u05D4\u0020\u05D1\u05E2\u05D1\u05E8\u05D9\u05EA\u0020\u05DE\u05DC\u05D0\u05D4",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className="dark h-full">
      <body
        className={`${heebo.variable} ${geistMono.variable} min-h-screen bg-slate-950 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 antialiased`}
      >
        <ScrollProgress />
        <div className="flex min-h-screen flex-col">{children}</div>
        <ScrollToTop />
      </body>
    </html>
  )
}


