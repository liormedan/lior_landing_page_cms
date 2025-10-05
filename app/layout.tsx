import type {Metadata} from "next"
import type {ReactNode} from "react"
import {Geist, Geist_Mono} from "next/font/google"

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
  title: "בלוג הבנייה של ליאור מדן",
  description: "תיעוד מלא של בניית הבלוג עם Codex, VS Code, Sanity ו-Vercel.",
  metadataBase: new URL("https://liormedan-blog.vercel.app"),
}

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}>
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
          {children}
        </div>
      </body>
    </html>
  )
}
