import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FlightServiceService } from '../../services/flight-service.service';
import { Flight } from '../../models/flights';
import { SearchBoxComponent } from "../search-box/search-box.component";
import { CommonModule, DatePipe } from '@angular/common';  
@Component({
  selector: 'app-search-result',
  imports: [NavbarComponent, SearchBoxComponent,CommonModule,   
    DatePipe,],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent {
  searchedFlights = signal<Flight[]>([]);
  isReturnFlight=false;
  returnDate='';
  passengers=0;
  // logeffect=effect(()=>{
  //   const flights=this.searchedFlights();
  //   console.log(flights);
  // });
  constructor(
    private route: ActivatedRoute,
    private flightService: FlightServiceService
  ) {}

  ngOnInit() {
    this.getSearchedFlights();
  }

  getSearchedFlights() {
    this.route.queryParams.subscribe((params) => {
      const from = params['from'];
      const to = params['to'];
      const date = params['date'];
      this.returnDate = params['returnDate'];
      this.isReturnFlight=(params['returnFlight']=='true' ? true : false);
      this.passengers= params['passengers'];
      const dateObj = new Date(date); // or from your FormControl

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const day = String(dateObj.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      // console.log(from+" "+to+" "+formattedDate +" "+this.passengers);

      this.flightService
        .searchFlights(from, to, formattedDate,this.passengers)
        .subscribe((flights) => {


          this.searchedFlights.set(flights);
          // console.log(flights);
        });
    });
  }
}
