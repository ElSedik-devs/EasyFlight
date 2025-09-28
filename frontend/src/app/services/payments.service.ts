import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  constructor(private http: HttpClient) {}

 // amountEuro can be 199.99 etc. We convert to cents (integers).
  async goToCheckout(amountEuro: number, desc = 'EasyFlight booking', currency = 'eur') {
    const amountCents = Math.round(amountEuro * 100); // 199.99 -> 19999
    const res = await firstValueFrom(
      this.http.post<{ url: string }>('http://localhost:8081/api/payment/create-session', {
        amountCents, currency, description: desc
      })
    );
    window.location.href = res.url; // redirect to Stripe Checkout
  }


}