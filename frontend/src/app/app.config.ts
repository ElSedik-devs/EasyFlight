import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { KeycloakService } from './keycloak/keycloak.service';
import { keycloakHttpInterceptor } from './interceptors/keycloak.interceptor';

// Material & Forms Imports
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([keycloakHttpInterceptor])),
    provideNativeDateAdapter(),

    //  Add this line to support Angular Material + forms globally
    importProvidersFrom(
      // BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      MatOptionModule,
      ReactiveFormsModule,
      
    ),

    provideAppInitializer(() => {
      const initFn = ((key: KeycloakService) => {
        return () => key.init();
      })(inject(KeycloakService));
      return initFn();
    })
  ]
};
