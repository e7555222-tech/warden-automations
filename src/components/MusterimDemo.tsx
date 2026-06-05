import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface MusterimDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  budget: string;
  timeline: string;
  score: number;
  sentiment: 'high' | 'medium' | 'low';
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    company: 'Teknova Ltd.',
    email: 'ahmet@teknova.com',
    phone: '+90 212 555 0123',
    source: 'Organik Arama',
    budget: '50K - 100K USD',
    timeline: '2-3 Months',
    score: 92,
    sentiment: 'high'
  },
  {
    id: 2,
    name: 'Fatma Kaya',
    company: 'Digital Systems Inc.',
    email: 'fatma@digitalsys.com',
    phone: '+90 212 555 0124',
    source: 'LinkedIn',
    budget: '25K - 50K USD',
    timeline: '1-2 Months',
    score: 78,
    sentiment: 'high'
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    company: 'Business Solutions Co.',
    email: 'mehmet@bizsol.com',
    phone: '+90 212 555 0125',
    source: 'Referans',
    budget: '10K - 25K USD',
    timeline: '3-6 Months',
    score: 65,
    sentiment: 'medium'
  },
  {
    id: 4,
    name: 'Zeynep Akar',
    company: 'Growth Partners',
    email: 'zeynep@growthp.com',
    phone: '+90 212 555 0126',
    source: 'Soğuk E-posta',
    budget: '< 10K USD',
    timeline: '6+ Months',
    score: 42,
    sentiment: 'low'
  }
];

export default function MusterimDemo({ isOpen, onClose }: MusterimDemoProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleClose = () => {
    setSelectedLead(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#05060a]/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-[#0a0d16]
              border border-[rgba(120,150,220,0.16)] shadow-[0_24px_80px_rgba(4,16,31,0.7)]
              overflow-hidden flex flex-col"
          >
            {/* üstten ince warden parıltısı */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24"
              style={{ background: 'radial-gradient(420px 120px at 50% 0%, rgba(77,141,255,0.18), transparent 70%)' }} />

            {/* BAŞLIK (HEADER) - shrink-0: asla yukarı kayıp kaybolmaz */}
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-[rgba(120,150,220,0.14)] z-10">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-warden-cyan animate-pulseDot" />
                <h2 className="font-display text-lg font-semibold tracking-tight text-zinc-50">Müşterim</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-warden-cyan/80">Canlı Demo</span>
              </div>
              <button onClick={handleClose}
                className="text-zinc-500 hover:text-zinc-100 transition-colors p-1.5 rounded-lg hover:bg-[rgba(120,150,220,0.08)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* İÇERİK - flex-1 ve min-h-0 eklendi, artık sadece burası kendi içinde kayacak */}
            <div className="flex-1 p-6 overflow-y-auto min-h-0">
              <div className="space-y-4">
                {mockLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedLead?.id === lead.id
                        ? 'border-warden-blue/50 bg-[rgba(77,141,255,0.08)]'
                        : 'border-[rgba(120,150,220,0.14)] bg-[rgba(120,150,220,0.03)] hover:border-[rgba(120,150,220,0.3)] hover:bg-[rgba(120,150,220,0.06)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-display font-medium text-zinc-50">{lead.name}</span>
                        <span className="text-xs text-zinc-500 font-light">{lead.company}</span>
                      </div>
                      <div className="text-sm text-zinc-500 font-light">{lead.email}</div>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl border ${
                      lead.score >= 80 ? 'border-warden-cyan/40 bg-[rgba(47,230,224,0.07)] text-warden-cyan' :
                      lead.score >= 60 ? 'border-warden-amber/40 bg-[rgba(255,178,77,0.07)] text-warden-amber' :
                      'border-warden-violet/40 bg-[rgba(176,107,255,0.07)] text-warden-violet'
                    }`}>
                      <span className="font-display text-xl font-semibold">{lead.score}</span>
                      <span className="text-[10px] uppercase tracking-wider opacity-70">Skor</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* DETAILS SECTION */}
              <AnimatePresence>
                {selectedLead && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 border-t border-[rgba(120,150,220,0.14)] pt-8 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-warden-cyan">
                        Detaylı Analiz — {selectedLead.name}
                      </h3>
                      <button
                        onClick={() => setSelectedLead(null)}
                        className="flex items-center gap-2 px-4 py-2 text-xs rounded-full border border-[rgba(120,150,220,0.2)] hover:border-warden-blue text-zinc-400 hover:text-zinc-100 transition-all bg-[rgba(120,150,220,0.05)]"
                      >
                        <X className="w-3 h-3" />
                        Paneli Kapat
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl border border-[rgba(120,150,220,0.14)] bg-[rgba(120,150,220,0.03)]">
                        <h4 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-4">İletişim Bilgileri</h4>
                        <div className="space-y-3 text-sm text-zinc-300 font-light">
                          <p>{selectedLead.name}</p>
                          <p>{selectedLead.company}</p>
                          <p>{selectedLead.email}</p>
                          <p>{selectedLead.phone}</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl border border-[rgba(120,150,220,0.14)] bg-[rgba(120,150,220,0.03)]">
                        <h4 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-4">Bütçe & Zaman Çizelgesi</h4>
                        <div className="space-y-3 text-sm text-zinc-300 font-light">
                          <p><span className="text-zinc-500 mr-2">Bütçe:</span> {selectedLead.budget}</p>
                          <p><span className="text-zinc-500 mr-2">Zaman:</span> {selectedLead.timeline}</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl border border-[rgba(120,150,220,0.14)] bg-[rgba(120,150,220,0.03)]">
                        <h4 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-4">Kaynak & Durum</h4>
                        <div className="space-y-3 text-sm text-zinc-300 font-light">
                          <p><span className="text-zinc-500 mr-2">Kaynak:</span> {selectedLead.source}</p>
                          <p><span className="text-zinc-500 mr-2">İlgi Seviyesi:</span> <span className="capitalize">{selectedLead.sentiment}</span></p>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl border border-[rgba(120,150,220,0.14)] bg-[rgba(120,150,220,0.03)]">
                        <h4 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-4">Nitelik Skoru</h4>
                        <div className="h-2 w-full bg-[rgba(120,150,220,0.12)] rounded-full overflow-hidden mb-3">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              selectedLead.score >= 80 ? 'bg-gradient-to-r from-warden-cyan to-warden-blue' :
                              selectedLead.score >= 60 ? 'bg-gradient-to-r from-warden-amber to-warden-blue' :
                              'bg-gradient-to-r from-warden-violet to-warden-blue'
                            }`}
                            style={{ width: `${selectedLead.score}%` }}
                          />
                        </div>
                        <div className="text-sm font-light">
                          <span className="font-display font-semibold warden-gradient-text">{selectedLead.score}</span>
                          <span className="text-zinc-600"> / 100</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
