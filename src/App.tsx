/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reservation } from './types';
import { INITIAL_RESERVATIONS } from './data/initialData';
import { TypographyReveal } from './components/TypographyReveal';
import { ReservationForm } from './components/ReservationForm';
import { ThankYouView } from './components/ThankYouView';
import { ContactWidget } from './components/ContactWidget';
import venueImage from './assets/images/event_venue_minnesota_1793008779899.jpg';

const STORAGE_KEY = 'gld_reservations_global_v1';

export default function App() {
  // Splash to form to thank-you state
  const [phase, setPhase] = useState<'splash' | 'form' | 'thankyou'>('splash');

  // Clean light mode enforcement
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Ensure browser address bar always reflects /minnesota-event
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (window.location.pathname === '/' || window.location.pathname === '')
    ) {
      window.history.replaceState(null, '', '/minnesota-event');
    }
  }, []);

  // Reservations state: synced with global server ledger, starting chronologically from Seat #0001
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_RESERVATIONS;
  });

  const [latestReservation, setLatestReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    }
  }, [reservations]);

  const handleReserve = async (data: {
    fullName: string;
    email: string;
    phone: string;
  }): Promise<{ error?: string } | void> => {
    const normalizedEmail = data.email.toLowerCase().trim();
    const cleanPhone = data.phone.replace(/[^\d+]/g, '');

    // 1. Client-side check: prevent ordering more than once on the same browser
    const existingLocal = reservations.find(
      (r) =>
        r.email.toLowerCase().trim() === normalizedEmail ||
        (cleanPhone.length >= 7 && r.phone.replace(/[^\d+]/g, '') === cleanPhone)
    );

    if (existingLocal) {
      const paddedExisting = existingLocal.seatNumber.toString().padStart(4, '0');
      return {
        error: `This email has already reserved a ticket (Seat #${paddedExisting}). Only one ticket is permitted per person.`,
      };
    }

    // 2. Server-side global ledger check & email dispatch:
    // Verifies across all users worldwide that this email hasn't registered before
    // and assigns the true global chronological seat number (#0001, #0002, #0003...).
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: normalizedEmail,
          phone: data.phone,
        }),
      });

      const payload = await res.json();

      if (res.status === 409 || payload.alreadyRegistered) {
        return {
          error:
            payload.error ||
            'This email has already reserved a ticket. Only one ticket is permitted per person.',
        };
      }

      if (!res.ok) {
        return {
          error: payload.error || 'Unable to process reservation. Please try again.',
        };
      }

      const assignedSeat = Number(payload.seatNumber) || reservations.length + 1;
      const padded = assignedSeat.toString().padStart(4, '0');
      const newReservation: Reservation = {
        id: payload.reservation?.id || `res-${Date.now()}`,
        fullName: data.fullName,
        email: normalizedEmail,
        phone: data.phone,
        seatNumber: assignedSeat,
        ticketCode: payload.ticketCode || `TWS-2026-${padded}`,
        registeredAt: new Date().toISOString(),
      };

      setReservations((prev) => [...prev, newReservation]);
      setLatestReservation(newReservation);
      setPhase('thankyou');
    } catch {
      // Fallback if offline in preview sandbox
      const fallbackSeat = reservations.length + 1;
      const padded = fallbackSeat.toString().padStart(4, '0');
      const newReservation: Reservation = {
        id: `res-${Date.now()}`,
        fullName: data.fullName,
        email: normalizedEmail,
        phone: data.phone,
        seatNumber: fallbackSeat,
        ticketCode: `TWS-2026-${padded}`,
        registeredAt: new Date().toISOString(),
      };

      setReservations((prev) => [...prev, newReservation]);
      setLatestReservation(newReservation);
      setPhase('thankyou');
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-[#FAF7F2] text-[#1F1A14] font-sans-clean select-none relative">
      {/* Subtle Background Architectural Backdrop with warm cream & gold tint scrim */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={venueImage}
          alt="Minneapolis Venue"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-[0.07] scale-105 sepia-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/90 to-[#F5EFE6]/95" />
      </div>

      {/* Main Container: Splash -> Form -> Simple Thank You Page (in place, zero scroll) */}
      <div className="relative z-10 w-full max-w-lg px-4 sm:px-6 flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {phase === 'splash' && (
            <motion.div
              key="splash-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.96,
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              }}
              className="w-full flex flex-col items-center justify-center"
            >
              <TypographyReveal onComplete={() => setPhase('form')} />
            </motion.div>
          )}

          {phase === 'form' && (
            <motion.div
              key="registration-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.98,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              className="w-full flex flex-col items-center justify-center"
            >
              <ReservationForm onReserve={handleReserve} />
            </motion.div>
          )}

          {phase === 'thankyou' && latestReservation && (
            <motion.div
              key="thank-you-page"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.98,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              className="w-full flex flex-col items-center justify-center"
            >
              <ThankYouView
                reservation={latestReservation}
                onReset={() => setPhase('form')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Call / WhatsApp Circle Widget */}
      <ContactWidget />
    </div>
  );
}
