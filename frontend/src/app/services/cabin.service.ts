import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cabin } from '../models/cabin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CabinService {
  private apiUrl = 'http://localhost:8081/api/cabin/flightCabin';

  constructor(private http:HttpClient) { }

  getCabinByFlightId(flightId:number):Observable<Cabin[]>{
      return this.http.get<Cabin[]>(this.apiUrl,{
        params:{
          flightId:flightId
        }
      });
    
  }

}
