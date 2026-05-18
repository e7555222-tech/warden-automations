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
      link: "https://calendly.
