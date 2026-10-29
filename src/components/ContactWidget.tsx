import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, X } from 'lucide-react';

export const ContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '+1 (763) 639 2294';
  const cleanPhone = '17636392294';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20Wealth%20Summit%20in%20Minnesota.`;
  const telUrl = `tel:+${cleanPhone}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans-clean select-none">
      {/* Pop-up Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-14 right-0 w-72 bg-[#FFFDF9] border border-[#DFD1B8] rounded-sm p-4 text-[#1F1A14]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#EBE2D0]">
              <span className="font-century-bold text-xs text-[#7A6438]">
                Contact Coordinator
              </span>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-1 text-[#A69272] hover:text-[#1F1A14] transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Demo text */}
            <p className="text-xs text-[#6E5D46] mb-3 leading-relaxed font-century">
              Have questions or want to learn more about the Wealth Summit? Connect directly with our event coordinator.
            </p>

            <div className="bg-[#FAF7F2] border border-[#E6DAC3] rounded-sm p-2.5 mb-3 text-center">
              <span className="text-[10px] font-century-bold text-[#8C734B] block mb-0.5">
                DIRECT LINE
              </span>
              <span className="font-century-bold text-sm text-[#1F1A14]">
                {phoneNumber}
              </span>
            </div>

            {/* Action Buttons: WhatsApp & Call */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded-sm transition-colors text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={telUrl}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFFDF9] bg-[#B68D40] hover:bg-[#9E782F] rounded-sm transition-colors text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Call Circle Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="w-12 h-12 rounded-full bg-[#B68D40] text-[#FFFDF9] border border-[#DFD1B8] hover:bg-[#9E782F] flex items-center justify-center transition-colors cursor-pointer"
        title="Contact coordinator on WhatsApp or Call"
        aria-label="Contact Coordinator"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Phone className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
