import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightServiceService } from '../../services/flight-service.service';
import { Flight } from '../../models/flights';
import { ConfrimbookingboxComponent } from '../confrimbookingbox/confrimbookingbox.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Cabin } from '../../models/cabin';
import { CabinService } from '../../services/cabin.service';
import { KeycloakService } from '../../keycloak/keycloak.service';

@Component({
  selector: 'app-confrimbooking',
  imports: [ConfrimbookingboxComponent, NavbarComponent],
  templateUrl: './confrimbooking.component.html',
  styleUrl: './confrimbooking.component.css',
})
export class ConfrimbookingComponent {
  goFlight = signal<Flight | null>(null);
  returnFlight = signal<Flight | null>(null);
  goCabins = signal<Cabin[]>([]);
  returnCabins = signal<Cabin[]>([]);
  passengers: number = -1;
  goCabinType: string = 'ECONOMY';
  returnCabinType: string = 'ECONOMY';
  goPrice = 0;
  returnPrice = 0;
  constructor(
    private flightService: FlightServiceService,
    private cabinService: CabinService,
    private route: ActivatedRoute,
    private router: Router,
    private keyCloakService: KeycloakService
  ) {
    effect(() => {
      // console.log('GO: ');
      // console.log('Return: ');
      // console.log(this.goFlight());
      // console.log(this.returnCabins());
    });
  }

  ngOnInit() {
    this.loadSearchedFlights();
  }

  loadSearchedFlights() {
    this.route.queryParams.subscribe((params) => {
      this.passengers = params['passengers'];
      console.log(this.passengers);
      const goFlightId = params['fromFlightId'];
      if (goFlightId) {
        this.flightService.getFlightById(goFlightId).subscribe((flight) => {
          this.goFlight.set(flight);
        });
        this.cabinService.getCabinByFlightId(goFlightId).subscribe((cabin) => {
          this.goCabins.set(cabin);
        });
      }

      const returnFlightId = params['returnFlightId'];
      if (returnFlightId) {
        this.flightService.getFlightById(returnFlightId).subscribe((flight) => {
          this.returnFlight.set(flight);
        });

        this.cabinService
          .getCabinByFlightId(returnFlightId)
          .subscribe((cabin) => {
            this.returnCabins.set(cabin);
          });
      }
    });
  }

  onCabinChange(leg: 'GO' | 'RETURN', cabinType: string) {
    if (leg === 'GO') {
      console.log('go');
      this.goCabinType = cabinType;
    } else {
      console.log('return');
      this.returnCabinType = cabinType;
    }
  }

  onPriceChange(leg: 'GO' | 'RETURN', price: number) {
    if (leg === 'GO') {
      console.log('goprice :' + price);
      this.goPrice = price;
    } else {
      console.log('returnprice : ' + price);
      this.returnPrice = price;
    }
  }
  onConfirm() {
    if (this.keyCloakService.isLoggedIn()) {
      sessionStorage.setItem(
        'params',
        JSON.stringify({
          goFlightId: this.goFlight()?.id,
          returnFlightId: this.returnFlight()?.id,
          passengers: this.passengers,
          goCabinType: this.goCabinType,
          returnCabinType: this.returnCabinType,
          price: this.goPrice + this.returnPrice,
        })
      );
      this.router.navigate(['/passengers'], {
        queryParams: {
          goFlightId: this.goFlight()?.id,
          returnFlightId: this.returnFlight()?.id,
          passengers: this.passengers,
          goCabinType: this.goCabinType,
          returnCabinType: this.returnCabinType,
        },
      });
    }else{
      this.keyCloakService.login();
    }
  }
}
