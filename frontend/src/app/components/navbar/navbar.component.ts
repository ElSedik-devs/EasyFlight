import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit{
  constructor( private keycloakService: KeycloakService,
    private userService:UserServiceService
  ){
  }

  ngOnInit(): void {
    if(this.keycloakService.isLoggedIn()){
      console.log(' Logged in — syncing user...');
    //Sync user info to the backend right after login
    this.userService.syncUserWithBackend();
    }
  }


   logIn(){
    this.keycloakService.login();
    
  }

  logOut(){
    this.keycloakService.logout();
  }
  isLoggedIn():boolean{
    return this.keycloakService.isLoggedIn();
  }
}
