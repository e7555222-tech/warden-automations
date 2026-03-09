import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Phone } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';

const VAPI_PUBLIC_KEY = 'df22fbc5-4029-4ebe-ac53-a5e4b73a4929';
const VAPI_ASSISTANT_ID = '4a832cc7-4935-4d6a-a7f2-7d113b29319d';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CallStatus = 'idle' | 'loading' | 'active' | 'error';

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
    }

    const vapi = vapiRef.current;

    const handleCallStart = () => {
      setCallStatus('active');
      setError(null);
    };

    const handleCallEnd = () => {
      setCallStatus('idle');
    };

    const handleError = (error: any) => {
      console.error('Vapi error:', error);
      setCallStatus('error');
      setError(error?.message || 'Failed to start call. Please check your microphone permissions.');
    };

    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('error', handleError);

    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('error', handleError);
    };
  }, []);

  const handleStartCall = async () => {
    if (!vapiRef.current) return;

    setCallStatus('loading');
    setError(null);

    try {
      await vapiRef.current.start(VAPI_ASSISTANT_ID);
    } catch (err: any) {
      setCallStatus('error');
      setError(err?.message || 'Failed to start call');
    }
  };

  const handleEndCall = async () => {
    if (!vapiRef.current) return;

    try {
      await vapiRef.current.stop();
      setCallStatus('idle');
    } catch (err: any) {
      console.error('Error ending call:', err);
      setCallStatus('idle');
    }
  };

  const isCallActive = callStatus === 'active';
  const isLoading = callStatus === 'loading';

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Talk to Sarah
                  </h3>
                  <p className="text-sm text-slate-400">
                    Our Live AI Sales Agent
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-12 flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-b from-slate-900 to-slate-950">
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-slate-400 text-sm mb-12 text-center max-w-sm"
                >
                  Please allow microphone access when prompted to start the conversation.
                </motion.p>

                <div className="relative mb-12">
                  <motion.div
                    animate={
                      isCallActive
                        ? {
                            scale: [1, 1.15, 1],
                            boxShadow: [
                              '0 0 0 0px rgba(59, 130, 246, 0.5)',
                              '0 0 0 30px rgba(59, 130, 246, 0)',
                            ],
                          }
                        : { scale: 1, boxShadow: '0 0 0 0px rgba(59, 130, 246, 0)' }
                    }
                    transition={
                      isCallActive
                        ? { duration: 1.5, repeat: Infinity }
                        : { duration: 0.3 }
                    }
                    className="absolute inset-0 rounded-full"
                  />

                  <motion.div
                    animate={
                      isCallActive
                        ? {
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              '0 0 20px 0px rgba(6, 182, 212, 0.3)',
                              '0 0 40px 0px rgba(6, 182, 212, 0.1)',
                            ],
                          }
                        : {
                            scale: 1,
                            boxShadow: '0 0 20px 0px rgba(59, 130, 246, 0.2)',
                          }
                    }
                    transition={
                      isCallActive
                        ? { duration: 2, repeat: Infinity }
                        : { duration: 0.3 }
                    }
                    className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-2xl"
                  >
                    <motion.div
                      animate={
                        isCallActive
                          ? { scale: [1, 0.95, 1] }
                          : { scale: 1 }
                      }
                      transition={
                        isCallActive
                          ? { duration: 0.6, repeat: Infinity }
                          : { duration: 0.3 }
                      }
                    >
                      <Mic className="w-16 h-16 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center max-w-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {callStatus === 'idle' && !error && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartCall}
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-lg text-white transition-all hover:shadow-2xl hover:shadow-blue-500/50 flex items-center gap-3"
                  >
                    <Mic className="w-5 h-5" />
                    Start Live Conversation
                  </motion.button>
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
                    />
                    <span className="text-slate-400">Connecting...</span>
                  </motion.div>
                )}

                {isCallActive && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEndCall}
                    className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl font-bold text-lg text-white transition-all hover:shadow-2xl hover:shadow-red-500/50 flex items-center gap-3"
                  >
                    <Phone className="w-5 h-5" />
                    End Call
                  </motion.button>
                )}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-slate-500 mt-12 text-center max-w-sm"
                >
                  This is a live AI agent powered by Vapi. The conversation is not recorded.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
