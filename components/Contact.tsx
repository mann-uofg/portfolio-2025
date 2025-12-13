import React, { useRef, useState } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);
    setStatus('idle');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          formRef.current?.reset();
      }, (error) => {
          console.log(error.text);
          setStatus('error');
      })
      .finally(() => {
        setIsLoading(false);
        // Clear success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <SectionWrapper id="contact" className="py-32">
      <div className="max-w-2xl mx-auto text-center px-6 md:px-0">
        <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-6">Let's Talk.</h2>
        <p className="text-xl text-light-secondary dark:text-dark-secondary mb-12">
          Have a project in mind? I'd love to hear about it.
        </p>

        <form ref={formRef} className="space-y-6 text-left" onSubmit={sendEmail}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                   <label className="text-sm font-medium text-light-text dark:text-dark-text ml-1">Name</label>
                   <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                      placeholder="Steve Jobs"
                   />
               </div>
               <div className="space-y-2">
                   <label className="text-sm font-medium text-light-text dark:text-dark-text ml-1">Email</label>
                   <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                      placeholder="steve@apple.com"
                   />
               </div>
           </div>
           
           <div className="space-y-2">
               <label className="text-sm font-medium text-light-text dark:text-dark-text ml-1">Message</label>
               <textarea 
                  name="title"
                  required
                  className="w-full h-40 p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-inner"
                  placeholder="Tell me about your idea..."
               ></textarea>
           </div>

           <div className="pt-4 flex flex-col gap-4">
               <LiquidButton className="w-full" variant="primary">
                  {isLoading ? 'Sending...' : 'Send Message'} 
                  {!isLoading && <Send className="w-4 h-4" />}
               </LiquidButton>

               <AnimatePresence>
                 {status === 'success' && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium bg-green-500/10 p-3 rounded-xl border border-green-500/20"
                   >
                     <CheckCircle2 className="w-5 h-5" />
                     Message sent successfully! I'll get back to you soon.
                   </motion.div>
                 )}
                 {status === 'error' && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-medium bg-red-500/10 p-3 rounded-xl border border-red-500/20"
                   >
                     <AlertCircle className="w-5 h-5" />
                     Something went wrong. Please try again later.
                   </motion.div>
                 )}
               </AnimatePresence>
           </div>
        </form>
      </div>
    </SectionWrapper>
  );
};