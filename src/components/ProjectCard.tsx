import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  technologies: string[];
  link?: string;
  demo_link?: string;
  onViewDetails: (id: string) => void;
}

export default function ProjectCard({
  id,
  title,
  description,
  image_url,
  category,
  technologies,
  demo_link,
  onViewDetails
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 transition-all duration-300 z-0" />

      <div className="relative z-10 h-56 overflow-hidden bg-slate-950">
        <motion.img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-xs font-semibold text-blue-400 mb-3">
            {category}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex-1" />

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 rounded bg-slate-800/50 text-xs text-slate-300 border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs text-slate-400">
                +{technologies.length - 3}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onViewDetails(id)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group/btn"
            >
              View Details
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            {demo_link && (
              <a
                href={demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-sm transition-all border border-slate-700 hover:border-blue-500/30 flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
