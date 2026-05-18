import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import WardenHome from './pages/WardenHome';
import MusterimDemo from './components/MusterimDemo';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusterimDemoOpen, setIsMusterimDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden scroll-smooth font-sans">
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />

      <div className="relative z-10">
        <nav className="border-b border-zinc-800 backdrop-blur-md bg-zinc-950/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm uppercase tracking-[0.2em] font-light text-zinc-200"
              >
                Warden Automations
              </motion.div>

              <div className="hidden sm:flex items-center gap-8">
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  href="#solutions"
                  className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Solutions
                </motion.a>
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  href="#contact"
                  className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Contact
                </motion.a>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>

            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:hidden mt-6 pt-6 border-t border-zinc-800 space-y-4"
              >
                <a href="#solutions" className="block text-sm text-zinc-400 hover:text-zinc-200">
                  Solutions
                </a>
                <a href="#contact" className="block text-sm text-zinc-400 hover:text-zinc-200">
                  Contact
                </a>
              </motion.div>
            )}
          </div>
        </nav>

        <WardenHome onOpenMusterimDemo={() => setIsMusterimDemoOpen(true)} />

        <footer className="border-t border-zinc-800 py-12 px-6 mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-light text-zinc-400 mb-4">Company</h3>
                <div className="text-sm text-zinc-500 font-light">Warden Automations</div>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-light text-zinc-400 mb-4">Products</h3>
                <ul className="space-y-2 text-sm text-zinc-500 font-light">
                  <li>Müşterim</li>
                  <li>Voice Warden</li>
                  <li>Data Hunter</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-light text-zinc-400 mb-4">Contact</h3>
                <p className="text-sm text-zinc-500 font-light">hello@wardenautomations.com</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-light text-zinc-400 mb-4">Office</h3>
                <p className="text-sm text-zinc-500 font-light">İstanbul, Turkey</p>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-8">
              <p className="text-xs text-zinc-600 text-center font-light">
                © 2026 Warden Automations. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <MusterimDemo
        isOpen={isMusterimDemoOpen}
        onClose={() => setIsMusterimDemoOpen(false)}
      />
    </div>
  );
}

export default App;
