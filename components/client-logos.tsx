export default function ClientLogos() {
  const clients = [
    { name: 'Acme', initials: 'A' },
    { name: 'Nova', initials: 'N' },
    { name: 'Orbit', initials: 'O' },
    { name: 'Pulse', initials: 'P' },
    { name: 'Atlas', initials: 'AT' },
    { name: 'Nimbus', initials: 'NB' },
  ] as const

  return (
    <section aria-labelledby="clients-heading" className="py-16">
      <div className="lp-container">
        <h2 id="clients-heading" className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
          לקוחות שבחרו בנו
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {clients.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-center rounded-2xl bg-white/5 p-6 text-white/90 ring-1 ring-white/10 shadow-inner hover:bg-white/10 transition"
              aria-label={`לוגו של ${c.name}`}
            >
              <div className="flex h-12 w-20 items-center justify-center rounded-md bg-white/10 text-sm font-bold">
                {c.initials}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

