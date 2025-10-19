"use client"

import { landingPageContent } from "@/lib/landing-page-content"
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation"

export default function Offerings() {
  const { heading, benefits, platformsHeading, platforms } = landingPageContent.offerings
  const { containerRef, visibleItems } = useStaggeredAnimation(2, 120)

  const items = [
    {
      id: "benefits",
      title: heading,
      summary: "הדגשים המרכזיים שכל לקוח מקבל איתנו כבר מהיום הראשון.",
      features: benefits.map((benefit) => `${benefit.title} — ${benefit.desc}`),
      primaryCta: { label: landingPageContent.hero.ctas.primary.label, href: "#contact" },
      secondaryCta: { label: "צפו בדמו", href: "#demo" },
    },
    {
      id: "platforms",
      title: platformsHeading,
      summary: "הסטאק המוכח שמאפשר לנו לשמור על יציבות, מהירות ושליטה מלאה בתוכן.",
      features: platforms.map((platform) => `${platform.name} — ${platform.blurb}`),
      primaryCta: { label: landingPageContent.hero.ctas.secondary.label, href: "#pricing" },
      secondaryCta: { label: "שאלו אותנו על חיבורים", href: "#contact" },
    },
  ] as const

  return (
    <section id="offerings" className="py-20" aria-labelledby="offerings-heading" lang="he" dir="rtl">
      <div className="lp-container">
        <header className="mb-12 text-center">
          <h2 id="offerings-heading" className="text-3xl font-bold text-slate-900 dark:text-white">
            {heading}
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-white/80">
            בחרנו את הרכיבים הקריטיים כדי שתוכלו להשיק דף נחיתה מקצועי, מדויק ומוכן לצמיחה.
          </p>
        </header>

        <div ref={containerRef} className="grid gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const isVisible = visibleItems.has(index)
            return (
              <article
                key={item.id}
                className={`rounded-2xl border border-slate-200 bg-white p-6 text-right shadow-sm transition-all duration-500 dark:border-slate-800 dark:bg-slate-900 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]`}
                aria-labelledby={`${item.id}-title`}
              >
                <div className="text-center">
                  <h3 id={`${item.id}-title`} className="text-xl font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/80">{item.summary}</p>
                </div>

                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-white/90" role="list">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start justify-start gap-2 text-right" role="listitem">
                      <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-slate-900/70" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row-reverse sm:justify-center">
                  <a
                    href={item.primaryCta.href}
                    className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
                  >
                    {item.primaryCta.label}
                  </a>
                  {item.secondaryCta && (
                    <a
                      href={item.secondaryCta.href}
                      className="inline-flex flex-row-reverse items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                    >
                      {item.secondaryCta.label}
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

