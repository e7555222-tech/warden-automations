import { motion } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface ProductCardProps {
  id: string;
  index: string;
  name: string;
  description: string;
  details: string;
  Icon: LucideIcon;
  button: string;
  points?: string[];
  isDemoButton: boolean;
  onDemoClick?: () => void;
}

export default function ProductCard({
  index,
  name,
  description,
  details,
  Icon,
  button,
  points = [],
  onDemoClick,
}: ProductCardProps) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="h-full">
      <div
        onMouseMove={onMove}
        className="warden-card group relative h-full overflow-hidden rounded-2xl p-8 flex flex-col
          border border-[rgba(120,150,220,0.14)] bg-[rgba(18,22,34,0.5)] backdrop-blur-xl
          transition-colors duration-300 hover:border-[rgba(77,141,255,0.4)]"
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl
              border border-[rgba(120,150,220,0.18)] bg-[rgba(77,141,255,0.08)] text-warden-cyan">
              <Icon className="w-5 h-5" strokeWidth={1.6} />
            </span>
            <span className="font-mono text-xs text-zinc-600">/{index}</span>
          </div>

          <h3 className="font-display text-xl font-semibold text-zinc-50 tracking-tight mb-2">
            {name}
          </h3>
          <p className="text-sm text-warden-cyan/90 font-medium leading-relaxed mb-4">
            {description}
          </p>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">{details}</p>

          {points.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {points.map((pt) => (
                <li key={pt} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-warden-cyan shadow-[0_0_10px_#2fe6e0] flex-none" />
                  {pt}
                </li>
              ))}
            </ul>
          )}

          <div className="flex-1" />

          <motion.button
            onClick={onDemoClick}
            whileHover={{ x: 2 }}
            className="relative z-20 mt-8 group/btn w-full px-6 py-3 rounded-xl
              border border-[rgba(120,150,220,0.18)] hover:border-warden-blue
              text-zinc-200 hover:text-zinc-50 bg-[rgba(5,6,10,0.5)] hover:bg-[rgba(77,141,255,0.12)]
              transition-all duration-300 text-sm font-medium tracking-wide
              flex items-center justify-between cursor-pointer"
          >
            <span>{button}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
