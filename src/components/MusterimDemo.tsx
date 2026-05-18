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

  // Modal kapandığında seçili lead'i de sıfırla
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-lg font-light text-zinc-100 tracking-wide">MÜŞTERİM DEMO</h2>
              <button onClick={handleClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                {mockLeads.map((lead) => (
                  <div
                    key={lead.id}
                    // Tıklanan zaten açıksa kapat, değilse aç
                    onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                      selectedLead?.id === lead.id
                        ? 'border-zinc-500 bg-zinc-900/80'
                        : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-zinc-100">{lead.name}</span>
                        <span className="text-xs text-zinc-500">{lead.company}</span>
                      </div>
                      <div className="text-sm text-zinc-500">{lead.email}</div>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-16 h-16 border ${
                      lead.score >= 80 ? 'border-emerald-900/50 text-emerald-400' :
                      lead.score >= 60 ? 'border-amber-900/50 text-amber-400' :
                      'border-red-900/50 text-red-400'
                    }`}>
                      <span className="text-xl font-light">{lead.score}</span>
                      <span className="text-[10px] uppercase tracking-wider opacity-70">Score</span>
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
                    className="mt-8 border-t border-zinc-800 pt-8 overflow-hidden"
                  >
                    {/* YENİ EKLENEN UX DOSTU KAPATMA BUTONU VE BAŞLIK */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 font-light">
                        Detaylı Analiz - {selectedLead.name}
                      </h3>
                      <button
                        onClick={() => setSelectedLead(null)}
                        className="flex items-center gap-2 px-4 py-2 text-xs border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 transition-all rounded-sm bg-zinc-900/50"
                      >
                        <X className="w-3 h-3" />
                        Paneli Kapat
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border border-zinc-800 bg-zinc-900/20">
                        <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">İletişim Bilgileri</h4>
                        <div className="space-y-3 text-sm text-zinc-300 font-light">
                          <p>{selectedLead.name}</p>
                          <p>{selectedLead.company}</p>
                          <p>{selectedLead.email}</p>
                          <p>{selectedLead.phone}</p>
                        </div>
                      </div>

                      <div className="p-6 border border-zinc-800 bg-zinc-900/20">
                        <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Bütçe & Zaman Çizelgesi</h4>
                        <div className="space-y-3 text-sm text-zinc-300 font-light">
                          <p><span className="text-zinc-500 mr-2">Bütçe:</span> {selectedLead.budget}</p>
                          <p><span className="text-zinc-500 mr-2">Zaman:</span> {selectedLead.timeline}</p>
                        </div>
                      </div>

                      <div className="p-6 border border-zinc-800 bg-zinc-900/20">
                        <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Kaynağı & Durum</h4>
                        <div className="space-y-3 text-sm text-zinc-300 font-light">
                          <p><span className="text-zinc-500 mr-2">Kaynak:</span> {selectedLead.source}</p>
                          <p><span className="text-zinc-500 mr-2">İlgi Seviyesi:</span> <span className="capitalize">{selectedLead.sentiment}</span></p>
                        </div>
                      </div>

                      <div className="p-6 border border-zinc-800 bg-zinc-900/20">
                        <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Nitelik Skoru</h4>
                        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-3">
                          <div
                            className={`h-full transition-all duration-1000 ${
                              selectedLead.score >= 80 ? 'bg-emerald-500' :
                              selectedLead.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedLead.score}%` }}
                          />
                        </div>
                        <div className="text-sm font-light">
                          <span className={
                            selectedLead.score >= 80 ? 'text-emerald-400' :
                            selectedLead.score >= 60 ? 'text-amber-400' : 'text-red-400'
                          }>{selectedLead.score}</span>
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
