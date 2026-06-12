import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const rows = [
  {
    label: 'Lead yanıt süresi',
    with: 'Dakikalar içinde, 7/24',
    without: 'Saatler, bazen ertesi gün',
  },
  {
    label: 'Mesai dışı çağrılar',
    with: 'Sesli asistan yanıtlar, randevu alır',
    without: 'Sesli mesaja düşer, çoğu geri aranmaz',
  },
  {
    label: 'Müşteri keşfi',
    with: 'Sürekli otomatik tarama ve doğrulama',
    without: 'Elle liste toplama, bayat veri',
  },
  {
    label: 'Takip önceliği',
    with: 'Skora göre en sıcak lead önde',
    without: 'Sezgiyle, gelişigüzel sırayla',
  },
  {
    label: 'CRM kaydı',
    with: 'Her etkileşim otomatik işlenir',
    without: 'Elle giriş, eksik ve geç',
  },
  {
    label: 'Ölçeklenme',
    with: 'Hacim artsa da sistem aynı',
    without: 'Her büyüme yeni personel demek',
  },
];

// temsilî büyüme eğrileri — viewBox 0 0 560 300, x 40..530
const PATH_WITH = 'M40 235 C 150 228, 230 210, 310 170 S 460 80, 530 58';
const PATH_WITHOUT = 'M40 235 C 140 232, 240 230, 330 226 S 480 218, 530 212';
const AREA_WITH = `${PATH_WITH} L 530 260 L 40 260 Z`;

function GrowthChart() {
  return (
    <div className="relative rounded-2xl border border-[rgba(120,150,220,0.14)] bg-[rgba(18,22,34,0.5)] backdrop-blur-xl p-6 sm:p-8 h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h3 className="font-display text-lg font-semibold text-zinc-50 tracking-tight">
          Nitelikli görüşme hacmi
        </h3>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider">
          <span className="flex items-center gap-2 text-warden-cyan">
            <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-warden-cyan to-warden-blue" />
            Warden ile
          </span>
          <span className="flex items-center gap-2 text-zinc-500">
            <span className="w-4 h-[2px] rounded-full bg-zinc-600" />
            Warden'sız
          </span>
        </div>
      </div>

      <svg viewBox="0 0 560 300" className="w-full flex-1" role="img"
        aria-label="Warden ile ve Warden'sız nitelikli görüşme büyümesini karşılaştıran temsili grafik">
        <defs>
          <linearGradient id="cmp-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2fe6e0" />
            <stop offset="1" stopColor="#4d8dff" />
          </linearGradient>
          <linearGradient id="cmp-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2fe6e0" stopOpacity="0.22" />
            <stop offset="1" stopColor="#2fe6e0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* yatay kılavuz çizgileri */}
        {[60, 120, 180, 240].map((y) => (
          <line key={y} x1="40" y1={y} x2="530" y2={y}
            stroke="rgba(120,150,220,0.12)" strokeWidth="1" strokeDasharray="3 6" />
        ))}

        {/* ay etiketleri */}
        {['Ay 1', 'Ay 2', 'Ay 3', 'Ay 4', 'Ay 5', 'Ay 6'].map((m, i) => (
          <text key={m} x={40 + i * 98} y="285" textAnchor="middle"
            className="fill-zinc-600" style={{ font: '11px "JetBrains Mono", monospace' }}>
            {m}
          </text>
        ))}

        <motion.path
          d={AREA_WITH}
          fill="url(#cmp-area)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.9 }}
        />

        <motion.path
          d={PATH_WITHOUT}
          fill="none"
          stroke="#52525b"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        <motion.path
          d={PATH_WITH}
          fill="none"
          stroke="url(#cmp-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px rgba(47,230,224,0.45))' }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />

        {/* uç noktalar */}
        <motion.circle cx="530" cy="212" r="4" fill="#52525b"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.4 }} />
        <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.6 }}>
          <circle cx="530" cy="58" r="9" fill="rgba(47,230,224,0.18)" />
          <circle cx="530" cy="58" r="4.5" fill="#2fe6e0" />
        </motion.g>

        {/* fark rozeti */}
        <motion.g initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 1.8, duration: 0.5 }}>
          <rect x="452" y="18" rx="11" width="62" height="22" fill="rgba(47,230,224,0.1)"
            stroke="rgba(47,230,224,0.4)" strokeWidth="1" />
          <text x="483" y="33" textAnchor="middle" fill="#2fe6e0"
            style={{ font: '600 12px "JetBrains Mono", monospace' }}>
            3.4x
          </text>
        </motion.g>
      </svg>

      <p className="mt-4 font-mono text-[10px] text-zinc-600 tracking-wide">
        * Temsilî eğri — sonuçlar sektöre ve başlangıç hacmine göre değişir.
      </p>
    </div>
  );
}

export default function ComparisonSection() {
  return (
    <section id="compare" className="relative py-20 sm:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-warden-cyan">
            Karşılaştırma
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-zinc-50 mt-4 mb-4 tracking-tight">
            Warden'ı tercih edenler, etmeyenler
          </h2>
          <p className="text-lg text-zinc-400 font-light">
            Aynı pazar, aynı lead'ler — fark, fırsata kaç dakikada dokunduğunuzda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 32, rotateX: 12, transformPerspective: 1000 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <GrowthChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, rotateX: 12, transformPerspective: 1000 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[rgba(120,150,220,0.14)] bg-[rgba(18,22,34,0.5)] backdrop-blur-xl overflow-hidden"
          >
            {/* kolon başlıkları */}
            <div className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-3 px-6 py-4 border-b border-[rgba(120,150,220,0.14)] font-mono text-[10px] uppercase tracking-[0.18em]">
              <span className="text-zinc-600" />
              <span className="flex items-center gap-1.5 text-warden-cyan">
                <Check className="w-3.5 h-3.5" strokeWidth={2.4} /> Tercih edenler
              </span>
              <span className="flex items-center gap-1.5 text-zinc-500">
                <X className="w-3.5 h-3.5" strokeWidth={2.4} /> Etmeyenler
              </span>
            </div>

            {rows.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-3 px-6 py-4 items-start
                  border-b border-[rgba(120,150,220,0.08)] last:border-b-0
                  hover:bg-[rgba(77,141,255,0.04)] transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 pt-0.5">
                  {r.label}
                </span>
                <span className="text-sm text-zinc-200 font-light leading-snug">{r.with}</span>
                <span className="text-sm text-zinc-500 font-light leading-snug">{r.without}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
