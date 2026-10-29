export interface Reservation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  seatNumber: number;
  ticketCode: string;
  registeredAt: string;
}

export type ThemeMode = 'dark' | 'light';
