import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface WardenHomeProps {
  onOpenMusterimDemo: () => void;
}

export default function WardenHome({ onOpenMusterimDemo }: WardenHomeProps) {
  const products = [
    {
      id: 'musterim',
      name: 'Müşterim',
      description: 'Yapay Zeka Destekli Akıllı Lead Nitelendirme ve Skorlama Sistemi',
      details: 'Müşterim, B2B işletmeleriniz için gelen müşteri adaylarını otomatik olarak analiz eder, nitelendirir ve üretken yapay zekayı kullanarak en yüksek potansiyel müşterileri tanımlar. Gerçek zamanlı skorlama ile satış ekibinizin verimliliğini 3x artırır.',
      icon: '⚡',
      button: 'Sistemi Test Et',
      link: "https://wardenb2b-bwhnkluukmucoikbjsajyf.streamlit.app/",
      isDemoButton: true
    },
    {
      id: 'voice-warden',
      name: 'Voice Warden',
      description: '7/24 Müşteri Karşılayan ve Randevu Alan Otonom Sesli Asistan',
      details: 'Doğal dil işleme ve yapay zekayla güçlendirilen Voice Warden, müşteri çağrılarını 7/24 sorunsuz şekilde yönetir. Randevu almaktan müşteri sorunlarını çözmesine kadar, insan gibi konuşan sesli asistan tam zamanlı destek sağlar.',
      icon: '🎙️',
      button: 'Demo Talebi',
      link: "https://calendly.com/e7555222/15-min-ai-strategy-discovery-call-warden-automations",
      isDemoButton: false
    },
    {
      id: 'data-hunter',
      name: 'Data Hunter',
      description: 'Sektörel Veri Kazıma ve B2B Potansiyel Müşteri Keşif Robotu',
      details: 'Data Hunter, web üzerindeki binlerce kaynaktan B2B verilerini toplar ve analiz eder. Sektörünüze uygun potansiyel müşterileri otomatik olarak keşfeder, iletişim bilgilerini derler ve pazarlama kampanyalarınız için hazır veri setleri hazırlar.',
      icon: '🔍',
      button: 'Demo Talebi',
      link: "https://calendly.com/e7555222/15-min-ai-strategy-discovery-call-warden-automations",
      isDemoButton: false
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-light mb-8"
            >
              B2B Otomasyon Çözümleri
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-50 mb-8 leading-[1.1]"
            >
              İşletmeniz İçin Otonom Yapay Zeka Çözümleri
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Warden Automations, kuruluşların operasyon verimliliğini katlamak ve kişi başına üretkenliği artırmak için tasarlanmış yapay zeka ve otomasyon sistemleri sunar.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <a
                href="#solutions"
                className="group px-8 py-3 border border-zinc-400 hover:border-zinc-200 text-zinc-200 hover:text-zinc-50 transition-all duration-300 flex items-center gap-2 text-sm font-light tracking-wide"
              >
                Çözümleri İncele
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="solutions" className="relative py-32 px-6 lg:px-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-light mb-4">
              Marketplace
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-zinc-50">
              Otomasyon Araçları
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard
                  {...product}
                  onDemoClick={() => window.open(product.link, '_blank')}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-24 px-6 lg:px-8 border-t border-zinc-800">
        <div className="max-w-4xl mx-
