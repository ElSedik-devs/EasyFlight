import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';
import { Booking } from '../models/booking';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingsServiceService {
 private apiUrl = 'http://localhost:8081/api/bookings/mybookings';
  constructor(private http :HttpClient,private keycloak:KeycloakService) { }


   getBookings(): Observable<Booking[]> {
    const uid = this.keycloak.userId;
    return this.http.get<Booking[]>(this.apiUrl, { params: { uid } });
  }
}
