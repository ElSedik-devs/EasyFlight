import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookingsServiceService } from '../../services/bookings-service.service';

export type Booking = {
  id: number;
  goFlightId: number;
  returnFlightId: number | null;
  goFlightDeparture: string;
  goFlightArrival: string;
  returnFlightDeparture: string | null;
  returnFlightArrival: string | null;

  // API actually sends these:
  goCabinType?: string | null;
  returnCabinType?: string | null;

  // (keep old names just in case)
  goFlightCabin?: string | null;
  returnFlightCabin?: string | null;

  amountCents: number;
  currency: string;      // e.g. "eur"
  createdAt: string;     // ISO string
};

@Component({
  selector: 'app-mybookings',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent {
  bookings: Booking[] = [];
  loading = false;
  error = '';

  constructor(private bookingService: BookingsServiceService) {}

  ngOnInit() {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: (data) =>{ this.bookings = data ?? []; console.log(data)},
      error: (e) => { console.error(e); this.error = 'Failed to load bookings.'; },
      complete: () => this.loading = false
    });
  }

  toAmount = (b: Booking) => (b.amountCents ?? 0) / 100;

  // prefer API cabin fields; fall back to old names
  goCabin = (b: Booking) => b.goCabinType ?? b.goFlightCabin ?? '—';
  retCabin = (b: Booking) => b.returnCabinType ?? b.returnFlightCabin ?? '—';

  currencyCode = (b: Booking) => (b.currency || 'EUR').toUpperCase();
  trackById = (_: number, b: Booking) => b.id;
}
