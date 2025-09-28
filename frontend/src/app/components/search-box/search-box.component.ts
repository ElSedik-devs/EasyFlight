import {
  Component,
  computed,
  input,
  Input,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Flight } from '../../models/flights';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  imports: [CommonModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {

  @Input() flight!: Flight;
  @Input() isReturnFlight!:boolean;
  @Input() returnDate!:string;
  @Input() passengers!:number;
  @Input() fromFlightId!:number;
  from = '';
  to = '';
  date = '';
  arrivalTime = '';
  departureTime = '';
  weekday = '';
  month = '';
  day = '';
  departureHour = '';
  departureMinute = '';
  arrivalHour = '';
  arrivalMinute = '';
  price=0;

  constructor( private router:Router){}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['flight'] && this.flight) {
      this.from = this.flight.from;
      this.to = this.flight.to;
      this.price=this.flight.price;
      const tz = 'Europe/Berlin';
      var dateObj = new Date(this.flight.departureTime); // or from your FormControl
      const f = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24h clock
        timeZone: tz,
      });

      var parts = Object.fromEntries(
        f.formatToParts(dateObj).map((p) => [p.type, p.value])
      );
      this.weekday = parts['weekday']; // "Friday"
      this.month = parts['month']; // "August"
      this.day = parts['day']; // "1"
      this.departureHour = parts['hour']; // "09"
      this.departureMinute = parts['minute']; // "30"
      dateObj= new Date(this.flight.arrivalTime); 
      parts = Object.fromEntries(
        f.formatToParts(dateObj).map((p) => [p.type, p.value])
      );
      this.arrivalHour = parts['hour']; // "09"
      this.arrivalMinute = parts['minute']; // "30"
    
    }
  }

  selectFlight() {
      // console.log(this.isReturnFlight)
       const from=this.flight.from;
        const to=this.flight.to;
        const id=this.flight.id;
      if(this.isReturnFlight){
        this.isReturnFlight=false;
        this.router.navigate(['/searchReturnResult'],{
          queryParams:{
            from:from,
            to:to,
            returnDate:this.returnDate,
            fromFlightId:id,
            passengers:this.passengers
          }
        });
      }else{
        if(this.fromFlightId!=null){
          this.router.navigate(['/confirmBooking'],{
          queryParams:{
            fromFlightId:this.fromFlightId,
            returnFlightId:this.flight.id,
            passengers:this.passengers
          }
        });
        }else{
          this.router.navigate(['/confirmBooking'],{
          queryParams:{

            fromFlightId:this.flight.id,
            passengers:this.passengers
          }
        });
        }
        
      }
    
    }


}
