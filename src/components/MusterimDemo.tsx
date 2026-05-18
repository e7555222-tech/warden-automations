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
    source: 'Website Form',
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
    phone: '+90 216 555 0456',
    source: 'Email Campaign',
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
    phone: '+90 312 555 0789',
    source: 'Inbound Chat',
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
    phone: '+90 212 555 1011',
    source: 'LinkedIn',
    budget: 'TBD',
    timeline: '6+ Months',
    score: 42,
    sentiment: 'low'
  }
];

export default function MusterimDemo({ isOpen, onClose }: MusterimDemoProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-zinc-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-950/30 border-emerald-800/50';
    if (score >= 60) return 'bg-amber-950/30 border-amber-800/50';
    return 'bg-zinc-900/30 border-zinc-800/50';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div className="w-full max-w-6xl my-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden shadow-2xl">
                <div className="border-b border-zinc-800 px-8 py-6 flex items-center justify-between bg-zinc-950/50">
                  <div>
                    <h2 className="text-2xl font-light text-zinc-50 mb-1">
                      Müşterim - Lead Nitelendirme Sistemi
                    </h2>
                    <p className="text-sm text-zinc-400 font-light">
                      Gelen müşteri adaylarının otomatik analizi ve skorlaması
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-zinc-400 hover:text-zinc-200 transition-colors p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8 bg-gradient-to-b from-zinc-900/50 to-zinc-950">
                  <div className="mb-8">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 font-light mb-6">
                      Nitelendirilen Müşteri Adayları
                    </h3>

                    <div className="space-y-3">
                      {mockLeads.map((lead) => (
                        <motion.button
                          key={lead.id}
                          onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                          whileHover={{ x: 4 }}
                          className="w-full text-left p-4 border border-zinc-800 hover:border-zinc-700 bg-zinc-950/50 transition-all duration-300 group"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-sm font-light text-zinc-50">{lead.name}</h4>
                                <span className="text-xs text-zinc-500 font-light">{lead.company}</span>
                              </div>
                              <p className="text-xs text-zinc-500 font-light">{lead.email}</p>
                            </div>

                            <div className={`flex-shrink-0 px-3 py-2 ${getScoreBg(lead.score)} border rounded text-center`}>
                              <div className={`text-lg font-light ${getScoreColor(lead.score)}`}>
                                {lead.score}
                              </div>
                              <div className="text-xs text-zinc-400 font-light">Score</div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {selectedLead && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-zinc-800 pt-8"
                    >
                      <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 font-light mb-6">
                        Detaylı Analiz - {selectedLead.name}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 border border-zinc-800 bg-zinc-950/50">
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-light mb-2">
                              İletişim Bilgileri
                            </p>
                            <div className="space-y-2 text-sm text-zinc-300 font-light">
                              <p>{selectedLead.name}</p>
                              <p>{selectedLead.company}</p>
                              <p>{selectedLead.email}</p>
                              <p>{selectedLead.phone}</p>
                            </div>
                          </div>

                          <div className="p-4 border border-zinc-800 bg-zinc-950/50">
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-light mb-3">
                              Kaynağı & Durum
                            </p>
                            <div className="space-y-2 text-sm text-zinc-300 font-light">
                              <p>Kaynak: <span className="text-zinc-200">{selectedLead.source}</span></p>
                              <p>Durum: <span className={selectedLead.sentiment === 'high' ? 'text-emerald-400' : selectedLead.sentiment === 'medium' ? 'text-amber-400' : 'text-zinc-400'}>
                                {selectedLead.sentiment === 'high' ? 'Yüksek İlgi' : selectedLead.sentiment === 'medium' ? 'Orta İlgi' : 'Düşük İlgi'}
                              </span></p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 border border-zinc-800 bg-zinc-950/50">
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-light mb-3">
                              Bütçe & Zaman Çizelgesi
                            </p>
                            <div className="space-y-2 text-sm text-zinc-300 font-light">
                              <p>Bütçe: <span className="text-zinc-200">{selectedLead.budget}</span></p>
                              <p>Zaman: <span className="text-zinc-200">{selectedLead.timeline}</span></p>
                            </div>
                          </div>

                          <div className="p-4 border border-zinc-800 bg-zinc-950/50">
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-light mb-3">
                              Nitelik Skoru
                            </p>
                            <div className="mb-3">
                              <div className="h-2 bg-zinc-800 mb-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${selectedLead.score}%` }}
                                  className={`h-full transition-all ${
                                    selectedLead.score >= 80 ? 'bg-emerald-500' :
                                    selectedLead.score >= 60 ? 'bg-amber-500' :
                                    'bg-zinc-500'
                                  }`}
                                />
                              </div>
                              <p className="text-sm font-light">
                                <span className={getScoreColor(selectedLead.score)}>
                                  {selectedLead.score}
                                </span>
                                <span className="text-zinc-500"> / 100</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-8 pt-8 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 font-light text-center">
                      Bu bir demo sürümüdür. Gerçek verilerinizle tüm özellikleri görmek için bize ulaşın.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
