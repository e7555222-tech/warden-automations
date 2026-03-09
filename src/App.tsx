import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Phone,
  Target,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Shield,
  Cpu,
  Volume2
} from 'lucide-react';
import DemoModal from './components/DemoModal';
import BookingSection from './components/BookingSection';

function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden scroll-smooth">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-cyan-950/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />

      <div className="relative z-10">
        <nav className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Specter.ai</span>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                href="#contact"
                className="hidden sm:block px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50"
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </nav>

        <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-semibold text-sm">Outbound AI Sales Representatives</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Stop Cold Calling.
                <br />
                Let Our AI{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text animate-pulse">
                  Book Your Meetings
                </span>
                .
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                We build custom, human-like AI cold callers that dial local businesses,
                bypass gatekeepers, and fill your Calendly with high-ticket web design leads.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="#booking-section"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 flex items-center gap-2"
                >
                  Book Your Setup Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="group px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 rounded-xl font-bold text-lg transition-all hover:shadow-xl flex items-center gap-2"
                >
                  <Volume2 className="w-5 h-5 text-blue-400" />
                  Hear a Cold Call Demo
                </button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
              >
                {[
                  { label: 'Calls Made Daily', value: '500+', icon: Phone },
                  { label: 'Meeting Booked Rate', value: '23%', icon: Target },
                  { label: 'Setup Time', value: '72hrs', icon: Clock }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm"
                  >
                    <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Your Sales Team Is <span className="text-blue-400">Burned Out</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Cold calling is brutal. Gatekeepers hang up. Decision makers are busy.
                Your team wastes hours on dead ends.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30">
                  <div className="text-red-400 font-bold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    Without Specter.ai
                  </div>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Your team dials 100+ numbers per day, books 2-3 meetings max</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Gatekeepers kill 80% of your outreach before you reach the owner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Inconsistent scripts, emotional burnout, high turnover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Paying $50k-80k/year per sales rep with mediocre results</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                  <div className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    With Specter.ai
                  </div>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>AI dials 500+ businesses daily, books 15-20 qualified meetings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Bypasses gatekeepers with natural, context-aware conversations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Perfect pitch every time, never gets tired or emotional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Fraction of the cost, 10x the output, instant ROI</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                How It <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Works</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                We deploy your custom AI agent in 72 hours. Fully managed, fully automated.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Discovery Call',
                  description: 'We learn your offer, target market, and qualifying questions',
                  icon: Target
                },
                {
                  step: '02',
                  title: 'AI Training',
                  description: 'We build your custom voice agent using Vapi.ai and n8n workflows',
                  icon: Cpu
                },
                {
                  step: '03',
                  title: 'Go Live',
                  description: 'Your AI starts dialing local businesses and booking meetings',
                  icon: Phone
                },
                {
                  step: '04',
                  title: 'Optimize',
                  description: 'We monitor performance and refine scripts for maximum conversion',
                  icon: TrendingUp
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative p-8 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all group"
                >
                  <div className="absolute top-0 right-0 text-6xl font-bold text-blue-500/10 -mt-4 -mr-4">
                    {item.step}
                  </div>
                  <item.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Built For <span className="text-blue-400">Web Agencies</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Designed specifically for agencies selling web design, SEO, and digital services to local businesses.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Compliance First',
                  description: 'FCC-compliant calling, proper opt-outs, CRM integration'
                },
                {
                  icon: BarChart3,
                  title: 'Real-Time Analytics',
                  description: 'Track calls, listen to recordings, optimize conversion rates'
                },
                {
                  icon: Zap,
                  title: 'Instant Integration',
                  description: 'Connects to your Calendly, CRM, and existing tech stack'
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all"
                >
                  <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50 bg-gradient-to-br from-blue-950/20 to-slate-950">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 rounded-2xl bg-slate-900/50 border border-blue-500/30 backdrop-blur-xl"
            >
              <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Ready to 10x Your Meetings?
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Book a 15-minute strategy call. We'll show you exactly how Specter.ai
                can fill your calendar with qualified web design leads.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-xl transition-all hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
              >
                Book Your Free Strategy Call
                <ArrowRight className="w-6 h-6" />
              </a>
              <p className="text-sm text-slate-500 mt-4">
                No credit card required • 72-hour setup guarantee
              </p>
            </motion.div>
          </div>
        </section>

        <BookingSection />

        <footer className="border-t border-slate-800/50 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-slate-400">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white">Specter.ai</span>
            </div>
            <p className="text-sm">
              Outbound AI Voice Agents for Web Design & Marketing Agencies
            </p>
          </div>
        </footer>
      </div>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}

export default App;
