import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'Kurulum ne kadar sürer?',
    a: 'İhtiyaç analizinden sonra çoğu sistem 1-2 hafta içinde yayında olur. Mevcut araçlarınıza (CRM, takvim, e-posta) entegrasyon bu süreye dahildir; siz çalışmaya devam ederken biz ağı arka planda kurarız.',
  },
  {
    q: 'Mevcut CRM ve araçlarımla entegre olur mu?',
    a: 'Evet. Sistemlerimiz n8n tabanlı esnek bir otomasyon altyapısı üzerinde çalışır; HubSpot, Pipedrive, Google Sheets, WhatsApp ve Calendly gibi yüzlerce araçla hazır bağlantı kurar. Özel bir iç sisteminiz varsa API üzerinden bağlarız.',
  },
  {
    q: 'Voice Warden gerçekten doğal Türkçe konuşuyor mu?',
    a: 'Evet. Voice Warden doğal Türkçe diyalog için eğitilmiş ses modelleri kullanır; randevu alır, soruları yanıtlar ve görüşme özetini CRM\'inize otomatik kaydeder. Demo görüşmesinde canlı olarak test edebilirsiniz.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: 'Veri işleme süreçlerimiz KVKK uyumlu olacak şekilde tasarlanır. Müşteri verileriniz üçüncü taraflarla paylaşılmaz, erişim yetkileri proje başında sizinle birlikte tanımlanır.',
  },
  {
    q: 'Fiyatlandırma nasıl çalışıyor?',
    a: 'Her işletmenin ihtiyacı farklı olduğu için sabit paket yerine kapsamınıza göre teklif hazırlıyoruz. 15 dakikalık ücretsiz keşif görüşmesinde hedeflerinizi dinliyor, net bir kapsam ve fiyat sunuyoruz.',
  },
  {
    q: 'Hangi sektörlerle çalışıyorsunuz?',
    a: 'B2B satış yapan her sektörle çalışabiliriz: ajanslar, yazılım şirketleri, üretim, lojistik, danışmanlık ve hizmet işletmeleri. Sistem hedef pazarınıza göre yapılandırılır.',
  },
];

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? 'border-[rgba(77,141,255,0.35)] bg-[rgba(77,141,255,0.05)]'
          : 'border-[rgba(120,150,220,0.14)] bg-[rgba(18,22,34,0.4)] hover:border-[rgba(120,150,220,0.3)]'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span className="font-display text-base sm:text-lg font-medium text-zinc-100 tracking-tight">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-none flex items-center justify-center w-8 h-8 rounded-full border ${
            isOpen
              ? 'border-warden-cyan/50 text-warden-cyan bg-[rgba(47,230,224,0.08)]'
              : 'border-[rgba(120,150,220,0.2)] text-zinc-500'
          }`}
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm sm:text-[15px] text-zinc-400 font-light leading-relaxed max-w-[60ch]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28 px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-28"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-warden-cyan">SSS</span>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-zinc-50 mt-4 mb-5 tracking-tight">
            Sıkça sorulan sorular
          </h2>
          <p className="text-lg text-zinc-400 font-light leading-relaxed">
            Aklınızdaki soru burada yoksa, 15 dakikalık keşif görüşmesinde birlikte yanıtlayalım.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-7 font-mono text-sm text-warden-cyan hover:text-zinc-100 transition-colors"
          >
            → Soru sormak için iletişime geçin
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: 10, transformPerspective: 1000 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          {faqs.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
