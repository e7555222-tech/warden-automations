const tools = [
  'n8n',
  'HubSpot',
  'Calendly',
  'WhatsApp Business',
  'Google Sheets',
  'Apify',
  'Hunter.io',
  'Instantly',
  'Pipedrive',
  'ZeroBounce',
  'Vapi',
  'Gmail',
];

export default function IntegrationsMarquee() {
  return (
    <section aria-label="Entegrasyonlar" className="relative py-12 sm:py-16 overflow-hidden">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-600 mb-8 px-6">
        Kullandığınız araçlarla konuşur
      </p>
      <div className="warden-marquee-mask relative">
        {/* gap yerine mx kullanılıyor: -50% kayma dikişsiz olsun diye her öğe kendi boşluğunu taşır */}
        <div className="warden-marquee flex w-max items-center">
          {[...tools, ...tools].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex-none mx-2 flex items-center gap-2.5 px-5 py-2.5 rounded-full
                border border-[rgba(120,150,220,0.14)] bg-[rgba(18,22,34,0.5)]
                font-mono text-sm text-zinc-400 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-warden-blue/70" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
