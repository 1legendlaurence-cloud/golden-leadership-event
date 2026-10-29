import React from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { Reservation } from '../types';
import { downloadTicketImage } from '../utils/ticketGenerator';

interface ThankYouViewProps {
  reservation: Reservation;
  onReset: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({ reservation, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto"
    >
      {/* Clean, simple Thank You card with thin champagne gold stroke, NO shadow box */}
      <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD1B8] rounded-sm p-6 sm:p-7 text-center transition-colors">
        <h2 className="font-klarissa text-4xl sm:text-5xl font-semibold text-[#1F1A14] tracking-wide uppercase mb-1.5 pt-2">
          Thank You
        </h2>

        <p className="text-sm sm:text-base text-[#6E5D46] mb-5 font-century">
          Your spot has been reserved for <strong className="text-[#1F1A14] font-semibold">The Wealth Summit</strong>.
        </p>

        {/* Chronological Seat & Reservation Information */}
        <div className="bg-[#FAF7F2]/90 border border-[#E6DAC3] rounded-sm p-3.5 mb-5 text-left space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#E6DAC3]">
            <span className="font-century-bold text-[11px] text-[#8C734B]">ASSIGNED SEAT</span>
            <span className="font-century-bold text-sm text-[#9A7B38]">
              #{reservation.seatNumber.toString().padStart(4, '0')} / 1,000
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-century-bold text-[11px] text-[#8C734B]">ATTENDEE</span>
            <span className="font-semibold text-[#1F1A14] truncate max-w-[200px]">
              {reservation.fullName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-century-bold text-[11px] text-[#8C734B]">EMAIL</span>
            <span className="text-[#3A3125] font-century text-sm truncate max-w-[200px]">
              {reservation.email}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-century-bold text-[11px] text-[#8C734B]">DATE</span>
            <span className="font-century text-sm text-[#3A3125]">
              Saturday, November 21, 2026
            </span>
          </div>

          <div className="flex items-start justify-between pt-1.5 border-t border-[#E6DAC3]/70">
            <span className="font-century-bold text-[11px] text-[#8C734B]">VENUE</span>
            <span className="font-century text-sm text-[#3A3125] text-right max-w-[220px]">
              Minneapolis Marriott Northwest<br />
              <span className="text-xs text-[#8C734B]">7025 Northland Dr N, Brooklyn Park, MN 55428</span>
            </span>
          </div>
        </div>

        {/* Simple Actions: Single-word Download button */}
        <div className="space-y-2">
          <button
            onClick={() => downloadTicketImage(reservation)}
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-century-bold tracking-widest text-[#FFFDF9] bg-[#B68D40] hover:bg-[#9E782F] rounded-sm transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>

          <button
            onClick={onReset}
            type="button"
            className="w-full py-1.5 text-xs font-century tracking-wide text-[#8C734B] hover:text-[#1F1A14] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </motion.div>
  );
};
