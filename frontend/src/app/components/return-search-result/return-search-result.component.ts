import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightServiceService } from '../../services/flight-service.service';
import { Flight } from '../../models/flights';
import { NavbarComponent } from "../navbar/navbar.component";
import { SearchBoxComponent } from "../search-box/search-box.component";
import { CommonModule } from '@angular/common';  
@Component({
  selector: 'app-return-search-result',
  imports: [NavbarComponent, SearchBoxComponent,CommonModule],
  templateUrl: './return-search-result.component.html',
  styleUrl: './return-search-result.component.css'
})
export class ReturnSearchResultComponent {
  searchedFlights=signal<Flight[]>([]);
  fromFlightId=signal<number>(-1);
  passengers=-1;
  constructor(private route:ActivatedRoute, private flightService:FlightServiceService){}

  ngOnInit(){
    this.route.queryParams.subscribe((params)=>{

      this.fromFlightId.set(params['fromFlightId']);
      const from = params['from'];
      const to = params['to'];
      const returnDate = params['returnDate'];
      const dateObj=new Date(returnDate);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const day = String(dateObj.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      this.passengers=parseInt(params['passengers']);
      // console.log(from+" "+to);
      this.flightService.searchFlights(to,from,formattedDate,this.passengers).subscribe(
        (flights)=>{
          this.searchedFlights.set(flights);
        }
      );
    });

    console.log(this.searchedFlights());
    console.log("hi");
  }
}
