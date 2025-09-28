import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;

  constructor() { }
  get keycloak(){
    if (!this._keycloak) {
      this._keycloak=new Keycloak({
        url: 'http://localhost:8080',
        realm: 'Easyflight',
        clientId: 'easyflight-frontend',
      });
    }
    return this._keycloak;
  }

 async init() {
  await this.keycloak.init({
    onLoad: 'check-sso',               // you’re using this mode
  silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  pkceMethod: 'S256',
  checkLoginIframe: false  
  });
}

  async login(){
    await this.keycloak.login();
  }

  get userId(): string{
    return this.keycloak?.tokenParsed?.sub as string;
  }

  get isTokenValid(){
    return !this.keycloak.isTokenExpired();
  }

  get fullName():string{
    return this.keycloak.tokenParsed?.['name'] as string;
  }

  logout(){
    return this.keycloak.logout({redirectUri:'http://localhost:4200'});
  }

  accountManagement(){
    return this.keycloak.accountManagement();
  }
   isLoggedIn(): boolean {
    return this.keycloak?.authenticated || false;
  }

  getToken(){
    return this.keycloak.token;
  }
}







