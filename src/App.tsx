import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import WardenHome from './pages/WardenHome';
import MusterimDemo from './components/MusterimDemo';

// 3D arka plan three.js içerir; ilk boyamayı bloklamasın diye ayrı chunk olarak tembel yüklenir.
const NetworkBackground = lazy(() => import('./components/NetworkBackground'));

/** İlk paint sonrası (idle) true olur — ağır 3D canvas'ın mount'unu erteler, LCP'yi iyileştirir. */
function useDeferredMount() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true));
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, []);
  return ready;
}

function BrandMark() {
  return (
    <a href="#top" className="flex items-center gap-3 group">
      <span className="relative w-7 h-7 rounded-lg shadow-[0_0_24px_rgba(77,141,255,0.45)]"
        style={{ background: 'conic-gradient(from 140deg, #4d8dff, #2fe6e0, #b06bff, #4d8dff)' }}>
        <span className="absolute inset-[5px] rounded-[4px] bg-[#05060a]" />
      </span>
      <span className="font-display font-semibold tracking-tight text-zinc-50 text-[15px]">
        Warden Automations
      </span>
    </a>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusterimDemoOpen, setIsMusterimDemoOpen] = useState(false);
  const show3D = useDeferredMount();
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  const links = [
    { label: 'Ürünler', href: '#solutions' },
    { label: 'Nasıl Çalışır', href: '#how' },
    { label: 'SSS', href: '#faq' },
    { label: 'İletişim', href: '#contact' },
  ];

  return (
    <div className="relative min-h-screen bg-[#05060a] text-zinc-50 overflow-x-hidden scroll-smooth font-sans" id="top">
      <div className="warden-nebula" />
      {show3D && (
        <Suspense fallback={null}>
          <NetworkBackground />
        </Suspense>
      )}
      <div className="warden-grain" />

      <div className="relative z-10">
        <motion.div
          className="fixed top-0 inset-x-0 h-[2px] z-50 origin-left bg-gradient-to-r from-warden-blue via-warden-cyan to-warden-violet"
          style={{ scaleX: scrollProgress }}
        />
        <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-md"
          style={{ background: 'linear-gradient(180deg, rgba(5,6,10,0.72), transparent)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between">
              <BrandMark />

              <div className="hidden sm:flex items-center gap-8">
                {links.map((l) => (
                  <a key={l.href} href={l.href}
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
                    {l.label}
                  </a>
                ))}
                <a href="#contact"
                  className="text-sm font-medium px-4 py-2 rounded-full border border-[rgba(120,150,220,0.2)] text-zinc-100 bg-[rgba(77,141,255,0.08)] hover:bg-[rgba(77,141,255,0.2)] hover:border-warden-blue transition-all">
                  Demo Talep Et
                </a>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden text-zinc-300 hover:text-zinc-50 transition-colors"
                aria-label="Menü"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:hidden mt-5 pt-5 border-t border-[rgba(120,150,220,0.14)] space-y-3"
              >
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-zinc-400 hover:text-zinc-100">
                    {l.label}
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </nav>

        <WardenHome onOpenMusterimDemo={() => setIsMusterimDemoOpen(true)} />

        <footer className="border-t border-[rgba(120,150,220,0.14)] py-16 px-6 mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <BrandMark />
                <p className="mt-4 text-sm text-zinc-500 font-light max-w-[260px]">
                  Otonom B2B yapay zeka ağları. Keşfeder, nitelendirir, dönüştürür.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Ürünler</h3>
                <ul className="space-y-2 text-sm text-zinc-400 font-light">
                  <li><a href="#solutions" className="hover:text-warden-cyan transition-colors">Müşterim</a></li>
                  <li><a href="#solutions" className="hover:text-warden-cyan transition-colors">Voice Warden</a></li>
                  <li><a href="#solutions" className="hover:text-warden-cyan transition-colors">Data Hunter</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Keşfet</h3>
                <ul className="space-y-2 text-sm text-zinc-400 font-light">
                  <li><a href="#how" className="hover:text-warden-cyan transition-colors">Nasıl Çalışır</a></li>
                  <li><a href="#compare" className="hover:text-warden-cyan transition-colors">Karşılaştırma</a></li>
                  <li><a href="#faq" className="hover:text-warden-cyan transition-colors">SSS</a></li>
                  <li><a href="#contact" className="hover:text-warden-cyan transition-colors">Demo Talep Et</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-4">İletişim</h3>
                <a href="mailto:hello@wardenautomations.com"
                  className="text-sm text-zinc-400 hover:text-warden-cyan font-light transition-colors">
                  hello@wardenautomations.com
                </a>
                <p className="text-sm text-zinc-500 font-light mt-3">İstanbul, Türkiye</p>
              </div>
            </div>

            <div className="border-t border-[rgba(120,150,220,0.14)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-zinc-600 font-light">
                © 2026 Warden Automations. Tüm hakları saklıdır.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-warden-cyan/60 animate-pulseDot" />
                Sistem aktif — 7/24
              </p>
            </div>
          </div>
        </footer>
      </div>

      <MusterimDemo isOpen={isMusterimDemoOpen} onClose={() => setIsMusterimDemoOpen(false)} />
    </div>
  );
}

export default App;
