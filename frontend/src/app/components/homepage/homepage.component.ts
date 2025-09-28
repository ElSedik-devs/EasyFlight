import {ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { CommonModule } from '@angular/common';
import { FlightServiceService } from '../../services/flight-service.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { Flight } from '../../models/flights';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { SearchComponent } from "../search/search.component";


@Component({
  selector: 'app-homepage',
  imports: [
    NavbarComponent,
    CommonModule,
    SearchComponent
],
  providers: [provideNativeDateAdapter()],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  //   getFullName() {
  //   this.fullName = this.keycloakService.fullName;
  // }

  // isLoggedIn(): boolean {
  //   return this.keycloakService.isLoggedIn();
  // }
}
