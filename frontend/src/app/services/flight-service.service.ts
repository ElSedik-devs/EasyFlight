import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Flight } from '../models/flights';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightServiceService {
  private apiUrl = 'http://localhost:8081/api/flight/allflights';
  private searchApiUrl = 'http://localhost:8081/api/flight/searchflights';
  private flightByIdApiUrl = 'http://localhost:8081/api/flight/flight';

  // flights:Flight[]=[]

  fullFlights = signal<Flight[]>([]);
  routeMap = signal<Record<string, string[]>>({});

  constructor(private http: HttpClient) {}

  loadFlights() {
    this.http
      .get<Flight[]>(this.apiUrl)
      .pipe(
        map((flights) => {
          const map: Record<string, string[]> = {};
          flights.forEach((flight) => {
            if (!map[flight.from]) {
              map[flight.from] = [];
            }
            if (!map[flight.from].includes(flight.to)) {
              map[flight.from].push(flight.to);
            }
          });
          return { flights, routeMap: map };
        })
      )
      .subscribe((data) => {
        this.fullFlights.set(data.flights);
        this.routeMap.set(data.routeMap);
      });
  }

  searchFlights(from: string, to: string, date: string,passengers:number): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.searchApiUrl, {
      params: {
        from: from,
        to: to,
        date: date,
        passengers:passengers
      },
    });
  }

  getFlightById(id:string){
    return this.http.get<Flight>(this.flightByIdApiUrl,{
      params:{
        id:id
      }
    });
  }
}
