import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { DecimalPipe } from '@angular/common';  
import { RouterLink } from '@angular/router';
type ConfirmResponse = {
  paid: boolean;
  sessionId: string;
  paymentIntentId?: string;
  paymentIntentStatus?: string;
  amountTotal?: number; // cents
  currency?: string;    // e.g. "eur"
};

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [NavbarComponent, DecimalPipe,RouterLink],  
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {
  loading = true;
  result?: ConfirmResponse;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit() {
    const passengersData = JSON.parse(
      sessionStorage.getItem('passengersData') ?? '[]'
    );

    const sid = this.route.snapshot.queryParamMap.get('session_id');
    const draft = JSON.parse(sessionStorage.getItem('params') ?? '{}');
    const loggedInUser = this.keycloakService.userId;

    const payload = {
      sessionId: sid!, // from URL ?session_id=...
      loggedInUser,
      draft: {
        goFlightId: draft.goFlightId,
        returnFlightId: draft.returnFlightId ?? null,
        goCabinType: draft.goCabinType,
        returnCabinType: draft.returnCabinType,
        passengers: passengersData,
        amountCents: Math.round((draft.price ?? 0) * 100),
      },
    };

    if (!sid) {
      this.loading = false;
      this.error = 'Missing session_id in URL';
      return;
    }

    const params = new HttpParams().set('session_id', sid);
    this.http
      .post<ConfirmResponse>('http://localhost:8081/api/payment/confirm', payload,
    { params })
      .subscribe({
        next: (r) => {
          this.result = r;
          this.loading = false;
        },
        error: (e) => {
          this.error = e?.error?.error || 'Confirm failed';
          this.loading = false;
        },
      });
  }
}
