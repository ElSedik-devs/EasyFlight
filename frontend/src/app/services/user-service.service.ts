import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8081/api/users/sync';


  constructor(private http:HttpClient) { }

  syncUserWithBackend(){
    return this.http.post(this.apiUrl,null).subscribe({
      next:(user)=> console.log("Synced User: ",user),
      error:(err)=>console.error('Failed to sync user: ',err)
    });
  }
}
