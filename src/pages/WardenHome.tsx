import { motion } from 'framer-motion';
import { ArrowRight, Mic, Target, Radar, Search, ScanLine, PhoneCall } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import IntegrationsMarquee from '../components/IntegrationsMarquee';
import FaqSection from '../components/FaqSection';
import ComparisonSection from '../components/ComparisonSection';

interface WardenHomeProps {
  onOpenMusterimDemo: () => void;
}

export default function WardenHome({ onOpenMusterimDemo }: WardenHomeProps) {
  const products = [
    {
      id: 'musterim',
      index: '01',
      name: 'Müşterim',
      description: 'AI Destekli Lead Nitelendirme ve Skorlama',
      details:
        'Gelen müşteri adaylarını otomatik analiz eder, nitelendirir ve üretken yapay zekayla en yüksek potansiyelli fırsatları öne çıkarır. Gerçek zamanlı skorlama satış ekibinizin verimliliğini 3x artırır.',
      Icon: Target,
      button: 'Sistemi Test Et',
      link: 'https://wardenb2b-bwhnkluukmucoikbjsajyf.streamlit.app/',
      points: ['Gerçek zamanlı skor', 'Niyet analizi', 'Otomatik önceliklendirme'],
      isDemoButton: true,
    },
    {
      id: 'voice-warden',
      index: '02',
      name: 'Voice Warden',
      description: '7/24 Otonom Sesli Asistan',
      details:
        'Doğal dil işlemeyle güçlenen Voice Warden müşteri çağrılarını 7/24 yönetir. Randevu almaktan sorun çözmeye kadar, insan gibi konuşan asistan tam zamanlı destek sağlar.',
      Icon: Mic,
      button: 'Demo Talebi',
      link: 'https://calendly.com/e7555222/15-min-ai-strategy-discovery-call-warden-automations',
      points: ['Doğal Türkçe diyalog', 'Otomatik randevu', 'Canlı CRM kaydı'],
      isDemoButton: false,
    },
    {
      id: 'data-hunter',
      index: '03',
      name: 'Data Hunter',
      description: 'Sektörel Veri Kazıma ve Müşteri Keşif Robotu',
      details:
        'Web üzerindeki binlerce kaynaktan B2B verisini toplar ve doğrular. Sektörünüze uygun potansiyel müşterileri keşfeder, iletişim bilgilerini derler ve kampanyaya hazır veri setleri hazırlar.',
      Icon: Radar,
      button: 'Demo Talebi',
      link: 'https://calendly.com/e7555222/15-min-ai-strategy-discovery-call-warden-automations',
      points: ['Sektörel tarama', 'Veri doğrulama', 'Otomatik zenginleştirme'],
      isDemoButton: false,
    },
  ];

  const stats = [
    { value: '7/24', label: 'kesintisiz operasyon' },
    { value: '%63', label: 'daha hızlı lead yanıtı' },
    { value: '3.4x', label: 'nitelikli görüşme artışı' },
    { value: '0', label: 'kaçırılan fırsat' },
  ];

  const steps = [
    { n: '01', t: 'Keşfet', d: 'Data Hunter hedef pazarınızı tarar, potansiyel müşterileri ağa düğüm olarak ekler.', Icon: Search },
    { n: '02', t: 'Nitelendir', d: 'Müşterim her düğümü gerçek zamanlı puanlar; sıcak sinyaller öne çıkar.', Icon: ScanLine },
    { n: '03', t: 'Dönüştür', d: 'Voice Warden en yüksek skorlu fırsatları otomatik arar ve randevuya çevirir.', Icon: PhoneCall },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 24, rotateX: 10, transformPerspective: 900 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transformPerspective: 900,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const handleProductClick = (product: (typeof products)[0]) => {
    if (product.isDemoButton) onOpenMusterimDemo();
    else window.open(product.link, '_blank');
  };

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeInUp}
              className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.32em] text-warden-cyan">
              <span className="w-6 h-px bg-gradient-to-r from-warden-cyan to-transparent" />
              Otonom B2B Yapay Zeka
            </motion.span>

            <motion.h1 variants={fadeInUp}
              className="font-display text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-50 mt-6 mb-6 sm:mt-7 sm:mb-7 leading-[1.07] sm:leading-[1.04]">
              İşletmenizin{' '}
              <span className="text-zinc-400 font-normal">kendi kendine çalışan</span>{' '}
              <span className="warden-gradient-text">büyüme ağı</span>
            </motion.h1>

            <motion.p variants={fadeInUp}
              className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Warden Automations; lead’leri keşfeden, nitelendiren ve 7/24 yanıtlayan otonom bir yapay zeka ağı kurar.
              Siz uyurken sistem çalışmaya devam eder.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-7 py-3.5 rounded-full font-semibold text-sm text-[#04101f]
                  bg-gradient-to-r from-warden-cyan to-warden-blue shadow-[0_8px_30px_rgba(77,141,255,0.4)]
                  hover:shadow-[0_14px_44px_rgba(77,141,255,0.55)] hover:-translate-y-0.5 transition-all duration-300
                  flex items-center gap-2"
              >
                Çözümleri İncele
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#contact"
                className="px-7 py-3.5 rounded-full text-sm font-medium border border-[rgba(120,150,220,0.2)]
                  text-zinc-200 hover:border-warden-blue hover:bg-[rgba(77,141,255,0.08)] transition-all duration-300">
                İletişime Geç
              </a>
            </motion.div>

            <motion.div variants={fadeInUp}
              className="mt-16 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-warden-cyan animate-pulseDot" />
              aşağı kaydır
            </motion.div>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 28, rotateX: 16, transformPerspective: 900 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 900 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden
              border border-[rgba(120,150,220,0.14)] bg-[rgba(120,150,220,0.14)]"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-[rgba(10,13,22,0.72)] backdrop-blur-md px-6 py-7">
                <div className="font-display text-3xl md:text-4xl font-semibold warden-gradient-text">{s.value}</div>
                <div className="text-sm text-zinc-500 mt-1.5 font-light">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <IntegrationsMarquee />

      {/* PRODUCTS */}
      <section id="solutions" className="relative py-20 sm:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-warden-cyan">Ürünler</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-zinc-50 mt-4 mb-4 tracking-tight">
              Ağı oluşturan üç otonom ajan
            </h2>
            <p className="text-lg text-zinc-400 font-light">
              Her biri tek başına güçlü, birlikte kesintisiz bir büyüme makinesi.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32, rotateX: 14, transformPerspective: 1000 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ProductCard {...product} onDemoClick={() => handleProductClick(product)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-20 sm:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-warden-cyan">Nasıl Çalışır</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-zinc-50 mt-4 mb-5 tracking-tight">
              Tek bir yaşayan ağ
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              Üç ürün ayrı araçlar değil — birbiriyle konuşan tek bir otonom sinir ağı. Robot fırsatı bulur,
              skorlama beyni önceliklendirir, sesli asistan kapatır.
            </p>
          </motion.div>

          <div>
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex gap-5"
              >
                <div className="flex-none flex flex-col items-center">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl
                    border border-[rgba(120,150,220,0.18)] bg-[rgba(77,141,255,0.08)] text-warden-cyan">
                    <s.Icon className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  {i < steps.length - 1 && (
                    <span className="w-px flex-1 my-2 bg-gradient-to-b from-[rgba(77,141,255,0.45)] via-[rgba(47,230,224,0.2)] to-transparent" />
                  )}
                </div>
                <div className={i < steps.length - 1 ? 'pb-10' : ''}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-warden-blue">{s.n}</span>
                    <h4 className="font-display text-xl font-semibold text-zinc-50">{s.t}</h4>
                  </div>
                  <p className="text-zinc-400 font-light mt-1.5">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ComparisonSection />

      <FaqSection />

      {/* CONTACT CTA */}
      <section id="contact" className="relative py-16 sm:py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32, rotateX: 10, transformPerspective: 1100 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 1100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl text-center px-8 py-16 md:py-24
              border border-[rgba(120,150,220,0.14)] backdrop-blur-md"
            style={{
              background:
                'radial-gradient(600px 300px at 50% 0%, rgba(77,141,255,0.18), transparent 70%), rgba(10,13,22,0.82)',
            }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-warden-cyan">Başlayalım</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-zinc-50 mt-5 mb-5 tracking-tight max-w-[16ch] mx-auto">
              Çözümleri keşfetmeye hazır mısınız?
            </h2>
            <p className="text-lg text-zinc-400 font-light mb-9">
              İşletmenize özel otonom ağı 20 dakikada planlayalım.
            </p>
            <motion.a
              href="https://calendly.com/e7555222/15-min-ai-strategy-discovery-call-warden-automations"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-[#04101f]
                bg-gradient-to-r from-warden-cyan to-warden-blue shadow-[0_8px_30px_rgba(77,141,255,0.4)]
                hover:shadow-[0_14px_44px_rgba(77,141,255,0.55)] transition-all duration-300"
            >
              Demo Talep Et
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <a href="mailto:hello@wardenautomations.com"
              className="block mt-6 font-mono text-sm text-warden-cyan hover:text-zinc-100 transition-colors">
              hello@wardenautomations.com
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
