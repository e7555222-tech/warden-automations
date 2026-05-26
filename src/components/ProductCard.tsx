import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  details: string;
  icon: string;
  button: string;
  isDemoButton: boolean;
  onDemoClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  description,
  details,
  icon,
  button,
  isDemoButton,
  onDemoClick
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full"
    >
      <div className="relative h-full p-8 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 flex flex-col">
        {/* Tıklamayı engellememesi için pointer-events-none eklendi */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-6">
            <div className="text-5xl mb-6">{icon}</div>
            <h3 className="text-xl font-light text-zinc-50 tracking-tight mb-2">
              {name}
            </h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex-1 mb-8">
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              {details}
            </p>
          </div>

          <motion.button
            onClick={onDemoClick}
            whileHover={{ x: 2 }}
            /* Butonu en üste almak için relative z-50 eklendi */
            className="relative z-50 group/btn w-full px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 bg-zinc-950/50 hover:bg-zinc-900 transition-all duration-300 text-sm font-light tracking-wide flex items-center justify-between cursor-pointer"
          >
            <span>{button}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Tıklamayı engellememesi için pointer-events-none eklendi */}
      <div className="absolute inset-0 border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
