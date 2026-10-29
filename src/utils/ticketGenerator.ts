import { Reservation } from '../types';

export function downloadTicketImage(reservation: Reservation) {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 620;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background - Warm Cream White & Soft Alabaster Ivory
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#FAF7F2');
  gradient.addColorStop(0.5, '#FFFDF9');
  gradient.addColorStop(1, '#F5EFE6');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Very thin metallic gold hairline stroke border (no drop shadows)
  ctx.strokeStyle = 'rgba(182, 141, 64, 0.55)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Secondary inner champagne hairline accent
  ctx.strokeStyle = 'rgba(182, 141, 64, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(42, 42, width - 84, height - 84);

  // Perforation divider line for ticket stub
  const stubX = 860;
  ctx.setLineDash([6, 8]);
  ctx.strokeStyle = 'rgba(182, 141, 64, 0.45)';
  ctx.beginPath();
  ctx.moveTo(stubX, 42);
  ctx.lineTo(stubX, height - 42);
  ctx.stroke();
  ctx.setLineDash([]);

  // Perforation notch cutouts
  ctx.fillStyle = '#FAF7F2';
  ctx.beginPath();
  ctx.arc(stubX, 42, 12, 0, Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(stubX, height - 42, 12, Math.PI, 0);
  ctx.fill();

  // Organization Header
  ctx.fillStyle = '#9A7B38';
  ctx.font = '600 13px "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('GOLDEN LEADERSHIP DEVELOPMENT', 70, 95);

  // Event Domain / Series
  ctx.fillStyle = '#8C734B';
  ctx.font = '600 12px "Playfair Display", Georgia, serif';
  ctx.fillText('MINNESOTA EVENT · OFFICIAL TICKET', 70, 125);

  // Main Event Title — Wealth Summit in Modern Editorial Serif
  ctx.fillStyle = '#1F1A14';
  ctx.font = '600 48px "Cormorant Garamond", "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('WEALTH SUMMIT', 70, 195);

  // Date and Exact Venue Details
  ctx.fillStyle = '#3A3125';
  ctx.font = '600 16px "Playfair Display", Georgia, serif';
  ctx.fillText('SATURDAY, NOVEMBER 21, 2026', 70, 240);

  ctx.fillStyle = '#6E5D46';
  ctx.font = '500 16px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Minneapolis Marriott Northwest', 70, 270);

  ctx.fillStyle = '#8C734B';
  ctx.font = '400 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('7025 Northland Dr N, Brooklyn Park, MN 55428', 70, 292);

  // Divider Line
  ctx.strokeStyle = 'rgba(182, 141, 64, 0.3)';
  ctx.beginPath();
  ctx.moveTo(70, 318);
  ctx.lineTo(stubX - 50, 318);
  ctx.stroke();

  // Attendee Info Section
  // Full Name
  ctx.fillStyle = '#8C734B';
  ctx.font = '600 12px "Playfair Display", Georgia, serif';
  ctx.fillText('ATTENDEE', 70, 360);

  ctx.fillStyle = '#1F1A14';
  ctx.font = '600 28px "Cormorant Garamond", "Playfair Display", Georgia, serif';
  ctx.fillText(reservation.fullName.toUpperCase(), 70, 400);

  // Email
  ctx.fillStyle = '#8C734B';
  ctx.font = '600 12px "Playfair Display", Georgia, serif';
  ctx.fillText('EMAIL', 70, 450);

  ctx.fillStyle = '#3A3125';
  ctx.font = '400 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(reservation.email, 70, 480);

  // Phone
  ctx.fillStyle = '#8C734B';
  ctx.font = '600 12px "Playfair Display", Georgia, serif';
  ctx.fillText('PHONE', 420, 450);

  ctx.fillStyle = '#3A3125';
  ctx.font = '400 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(reservation.phone || '—', 420, 480);

  // Seat Badge
  ctx.fillStyle = '#8C734B';
  ctx.font = '600 12px "Playfair Display", Georgia, serif';
  ctx.fillText('ASSIGNED SEAT', 630, 450);

  ctx.fillStyle = '#B68D40';
  ctx.font = '700 20px "Playfair Display", Georgia, serif';
  ctx.fillText(`SEAT #${reservation.seatNumber.toString().padStart(4, '0')}`, 630, 480);

  // Bottom Notice with Venue Address
  ctx.fillStyle = '#8C734B';
  ctx.font = '12px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Minneapolis Marriott Northwest · 7025 Northland Dr N, Brooklyn Park, MN 55428 · 1000 Seats Total', 70, 545);

  // STUB SECTION (Right side)
  ctx.fillStyle = '#8C734B';
  ctx.font = '600 12px "Playfair Display", Georgia, serif';
  ctx.fillText('STUB / ADMIT ONE', stubX + 40, 95);

  ctx.fillStyle = '#1F1A14';
  ctx.font = '600 24px "Cormorant Garamond", "Playfair Display", Georgia, serif';
  ctx.fillText('WEALTH SUMMIT', stubX + 40, 135);

  // Stub Seat
  ctx.fillStyle = '#8C734B';
  ctx.font = '600 11px "Playfair Display", Georgia, serif';
  ctx.fillText('SEAT NO.', stubX + 40, 190);

  ctx.fillStyle = '#1F1A14';
  ctx.font = '700 28px "Playfair Display", Georgia, serif';
  ctx.fillText(`#${reservation.seatNumber.toString().padStart(4, '0')}`, stubX + 40, 225);

  // Stub Ticket Code
  ctx.fillStyle = '#8C734B';
  ctx.font = '600 11px "Playfair Display", Georgia, serif';
  ctx.fillText('TICKET CODE', stubX + 40, 275);

  ctx.fillStyle = '#B68D40';
  ctx.font = '700 16px "Playfair Display", Georgia, serif';
  ctx.fillText(reservation.ticketCode, stubX + 40, 302);

  // Barcode Lines on Stub in Deep Gold-Espresso
  const barcodeY = 360;
  const barcodeHeight = 65;
  ctx.fillStyle = '#3A3125';
  const barPattern = [3, 1, 4, 2, 1, 5, 2, 2, 4, 1, 2, 4, 3, 1, 5, 2, 1, 3, 4, 2, 1, 3, 5, 2, 4, 1, 2, 3];
  let currX = stubX + 40;
  for (let i = 0; i < barPattern.length; i++) {
    const barWidth = barPattern[i];
    ctx.fillRect(currX, barcodeY, barWidth, barcodeHeight);
    currX += barWidth + ((i % 2 === 0) ? 4 : 2);
    if (currX > width - 60) break;
  }

  // Label
  ctx.fillStyle = '#9A7B38';
  ctx.font = '600 10px "Playfair Display", Georgia, serif';
  ctx.fillText('OFFICIAL EVENT TICKET', stubX + 40, 460);

  // Convert to downloadable file
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `golden-leadership-ticket-${reservation.seatNumber}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
