import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Send } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';

export const Contact: React.FC = () => {
  return (
    <SectionWrapper id="contact" className="py-32">
      <div className="max-w-2xl mx-auto text-center px-6 md:px-0">
        <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-6">Let's Talk.</h2>
        <p className="text-xl text-light-secondary dark:text-dark-secondary mb-12">
          Have a project in mind? I'd love to hear about it.
        </p>

        <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                   <label className="text-sm font-medium text-light-text dark:text-dark-text ml-1">Name</label>
                   <input 
                      type="text" 
                      className="w-full p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                      placeholder="Steve Jobs"
                   />
               </div>
               <div className="space-y-2">
                   <label className="text-sm font-medium text-light-text dark:text-dark-text ml-1">Email</label>
                   <input 
                      type="email" 
                      className="w-full p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                      placeholder="steve@apple.com"
                   />
               </div>
           </div>
           
           <div className="space-y-2">
               <label className="text-sm font-medium text-light-text dark:text-dark-text ml-1">Message</label>
               <textarea 
                  className="w-full h-40 p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-inner"
                  placeholder="Tell me about your idea..."
               ></textarea>
           </div>

           <div className="pt-4">
               <LiquidButton className="w-full" variant="primary">
                  Send Message <Send className="w-4 h-4" />
               </LiquidButton>
           </div>
        </form>
      </div>
    </SectionWrapper>
  );
};