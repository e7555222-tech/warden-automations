import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface ProjectDetailProps {
  isOpen: boolean;
  projectId: string | null;
  onClose: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  image_url: string;
  category: string;
  features: string[];
  technologies: string[];
  link?: string;
  demo_link?: string;
}

export default function ProjectDetail({ isOpen, projectId, onClose }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && projectId) {
      loadProject();
    }
  }, [isOpen, projectId]);

  const loadProject = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (error) throw error;
      setProject(data);
    } catch (err) {
      console.error('Error loading project:', err);
    } finally {
      setLoading(false);
    }
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div className="w-full max-w-4xl my-8">
              {loading ? (
                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Loading project...</p>
                  </div>
                </div>
              ) : project ? (
                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="h-80 overflow-hidden bg-slate-950">
                    <motion.img
                      src={project.image_url}
                      alt={project.title}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>

                  <div className="relative p-8 sm:p-12">
                    <div className="mb-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-xs font-semibold text-blue-400 mb-4">
                        {project.category}
                      </div>
                      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        {project.title}
                      </h1>
                      <p className="text-xl text-slate-300">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-slate-800">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          Key Features
                        </h3>
                        <ul className="space-y-3">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-300">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">✓</span>
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <h3 className="text-lg font-bold text-white mb-4">Overview</h3>
                      <p className="text-slate-300 leading-relaxed mb-8">
                        {project.long_description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {project.demo_link && (
                          <a
                            href={project.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/30"
                          >
                            <ExternalLink className="w-5 h-5" />
                            View Live Demo
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold border border-slate-700 hover:border-blue-500/30 transition-all"
                          >
                            <Github className="w-5 h-5" />
                            View on GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
