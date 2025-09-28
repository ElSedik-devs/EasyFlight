import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ReturnSearchResultComponent } from './components/return-search-result/return-search-result.component';
import { ConfrimbookingComponent } from './components/confrimbooking/confrimbooking.component';
import { PassengersComponent } from './components/passengers/passengers.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { SuccessComponent } from './components/success/success.component';
import { MybookingsComponent } from './components/mybookings/mybookings.component';

export const routes: Routes = [
    {path:'',component:HomepageComponent},
    {path:'searchResult',component:SearchResultComponent},
    {path: 'searchReturnResult',component:ReturnSearchResultComponent},
    {path:'confirmBooking',component: ConfrimbookingComponent},
    {path:'passengers',component: PassengersComponent},
    {path:'checkout',component: CheckoutComponent},
    {path:'success',component: SuccessComponent},
    {path:'cancel',component: CancelComponent},
    {path:'bookings',component: MybookingsComponent},
];
