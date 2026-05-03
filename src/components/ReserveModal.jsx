import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReserveModal({ isOpen, onClose }) {
  const [step, setStep] = useState('form'); // form, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('loading');
    // Simulate network request
    setTimeout(() => {
      setStep('success');
    }, 2500);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => setStep('form'), 800); // reset after exit animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          exit={{ clipPath: 'inset(0% 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-[#050505] text-white overflow-hidden"
        >
          {/* Left Side: Editorial & Branding */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden min-h-[40vh] md:min-h-screen">
            {/* Massive Background Typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <h2 className="text-[30vw] md:text-[20vw] font-extrabold text-transparent text-stroke leading-none tracking-tighter -rotate-90 md:rotate-0 whitespace-nowrap">
                ACCESS
              </h2>
            </div>
            
            <div className="relative z-10 flex justify-between items-center w-full">
               <img src="/airlogo.svg" className="h-6 md:h-8" alt="Air" />
               <span className="mono text-[0.6rem] uppercase tracking-widest text-white/30 hidden md:block">
                 Secure Connection
               </span>
            </div>

            <div className="relative z-10 mt-auto pt-20">
              <motion.h3 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-[6vw] font-extrabold tracking-tighter uppercase leading-[0.85] mb-8"
              >
                Join The <br /> Priority <br /> Queue.
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mono text-xs md:text-sm uppercase tracking-widest text-white/50 max-w-sm leading-relaxed"
              >
                No payment required today. Invitation only. Secured waitlist.
              </motion.p>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center relative min-h-[60vh] md:min-h-screen">
            {/* Circular Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-8 right-8 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-500 group z-50 cursor-none"
              data-cursor="click"
            >
              <span className="mono text-[0.5rem] uppercase tracking-widest group-hover:rotate-90 transition-transform duration-500">
                Close
              </span>
            </button>

            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                {step === 'form' && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-12 md:gap-20"
                  >
                    <div className="flex flex-col gap-4 group">
                      <label className="mono text-[0.6rem] text-white/40 uppercase tracking-[0.3em] group-focus-within:text-white transition-colors">
                        01 // Identification
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-white/20 pb-4 text-4xl md:text-5xl font-extrabold tracking-tighter uppercase focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/10"
                        placeholder="NAME"
                      />
                    </div>

                    <div className="flex flex-col gap-4 group">
                      <label className="mono text-[0.6rem] text-white/40 uppercase tracking-[0.3em] group-focus-within:text-white transition-colors">
                        02 // Comm Link
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-white/20 pb-4 text-4xl md:text-5xl font-extrabold tracking-tighter uppercase focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-white/10"
                        placeholder="EMAIL"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex items-center gap-6 w-max cursor-none mt-8"
                      data-cursor="explore"
                    >
                      <span className="text-2xl font-bold uppercase tracking-widest group-hover:text-white/80 transition-colors">
                        Confirm
                      </span>
                      <div className="w-12 h-[2px] bg-white group-hover:w-32 transition-all duration-500 ease-[0.22,1,0.36,1]" />
                    </button>
                  </motion.form>
                )}

                {step === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center py-20"
                  >
                    <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                       <div className="absolute inset-0 border border-white/10 rounded-full" />
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 border-t-2 border-white rounded-full" 
                       />
                       <span className="mono text-[0.6rem] uppercase tracking-widest opacity-50">Sync</span>
                    </div>
                    <p className="mono text-sm tracking-widest text-white/50 uppercase animate-pulse">
                      Processing Data...
                    </p>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-start py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-10">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter uppercase mb-6 leading-none">
                      Reservation <br /> Confirmed.
                    </h3>
                    <p className="text-white/50 text-lg mb-16 max-w-sm font-medium leading-relaxed">
                      You are officially on the priority list. Your unique access protocol will be transmitted via email.
                    </p>
                    <button
                      onClick={resetAndClose}
                      className="group flex items-center gap-6 w-max cursor-none"
                      data-cursor="click"
                    >
                      <div className="w-8 h-[2px] bg-white group-hover:w-24 transition-all duration-500 ease-[0.22,1,0.36,1]" />
                      <span className="text-xl font-bold uppercase tracking-widest group-hover:text-white/80 transition-colors">
                        Return
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
