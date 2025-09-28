import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaymentsService } from '../../services/payments.service';
type Params = {
  goFlightId?: number;
  returnFlightId?: number;
  passengers?: number;
  goCabinType?: string;
  returnCabinType?: string;
  price?:number
};
@Component({
  selector: 'app-checkout',
  imports: [NavbarComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  passengersData: any[] | null = null;
  params: Params ={};
  price:number | undefined=0;
  loading = false;
  constructor(private router: Router, private location: Location,private paySvc: PaymentsService) {}
  ngOnInit() {
    this.passengersData = JSON.parse(
      sessionStorage.getItem('passengersData') ?? '[]'
    );
    console.log(this.passengersData);

    this.params=JSON.parse(sessionStorage.getItem('params') ?? '[]');
    console.log(this.params.price );
    this.price=this.params.price;

  }
    async pay() {
    this.loading = true;
    try { await this.paySvc.goToCheckout(this.price ?? 1,"flight"); }
    finally { this.loading = false; }
  }
}
