import { Reservation } from '../types';

export function getConfirmationEmail(reservation: Reservation) {
  const dateFormatted = 'Saturday, November 21, 2026';
  const location = 'Minneapolis Marriott Northwest, 7025 Northland Dr N, Brooklyn Park, MN 55428';
  const seatFormatted = `#${reservation.seatNumber.toString().padStart(4, '0')}`;

  return {
    subject: `Reservation Confirmed: Your Seat at The Wealth Summit (${seatFormatted})`,
    from: 'Golden Leadership Development <reservations@goldenleadershipdevelopment.com>',
    to: `${reservation.fullName} <${reservation.email}>`,
    replyTo: 'no-reply@goldenleadershipdevelopment.com',
    date: 'Just now (Instant confirmation)',
    previewText: `Your reservation for The Wealth Summit in Minnesota is confirmed. Seat ${seatFormatted} secured.`,
    bodyHtml: `
Dear ${reservation.fullName},

Your seat for THE WEALTH SUMMIT has been successfully reserved.

EVENT DETAILS:
• Date: ${dateFormatted}
• Venue: ${location}
• Ticket Code: ${reservation.ticketCode}
• Assigned Seat: ${seatFormatted} of 1,000 Total Seats
• Registered Phone: ${reservation.phone}

NEXT STEPS & STAY TUNED:
You have officially secured one of only 1,000 available seats for this exclusive gathering. We will be releasing private briefing dossiers, keynote speaker announcements, and arrival protocols in the coming weeks.

Please stay tuned to this email address for:
1. Event Workbook & Curriculum.
2. Direct check-in ticket pass.
3. Networking schedule.

If you require any special executive accommodation or need to adjust your contact details, please reply directly to this email or visit:
https://goldenleadershipdevelopment.com/minnesota-event

Warm regards,
Golden Leadership Development Team
Executive Events Committee
    `.trim(),
  };
}
