import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function BookingSection() {
  return (
    <section id="booking-section" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm">Zero Commitment</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Ready to Scale?{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Book Your Setup Call
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select a time that works for you. Our team will show you exactly how Specter.ai
            can fill your calendar with qualified web design leads.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-blue-500/30 bg-slate-900/50 backdrop-blur-xl shadow-2xl"
        >
          <div className="w-full h-[800px] bg-slate-950">
            <iframe
              src="https://calendly.com/e7555222/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Calendly Booking"
              style={{ border: 'none' }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          We'll send you a Zoom link and discovery questions to prepare for the call.
        </motion.p>
      </div>
    </section>
  );
}
