import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Flight } from '../../models/flights';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { FlightServiceService } from '../../services/flight-service.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core'; // ⟵ add this



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  Math = Math;

  // helpers
  startOfToday = (() => { const d = new Date(); d.setHours(0,0,0,0); return d; })();
  ymd(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  const y = c.getFullYear();
  const m = String(c.getMonth() + 1).padStart(2, '0');
  const dd = String(c.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`; // local Y-M-D
}
  // controls
  fromControl = new FormControl<string>('');
  toControl = new FormControl<string>('');
  passengers = new FormControl<number>(1);
  dateControl = new FormControl<Date | null>({ value: null, disabled: true });
  dateReturnControl = new FormControl<Date | null>({ value: null, disabled: true });
  toggleControl = new FormControl<boolean>(false, { nonNullable: true });

  // lists / signals
  filteredFromOptions: string[] = [];
  filteredToOptions: string[] = [];
  flights = signal<Flight[]>([]);
  routeMap = signal<Record<string, string[]>>({});

  allowedDates: Date[] = [];
  allowedReturnDates: Date[] = [];
  private allowedDatesSet = new Set<string>();
  private allowedReturnDatesSet = new Set<string>();

  myFilter = (d: Date | null): boolean => {
    if (!d) return false;
    d.setHours(0,0,0,0);
    return d >= this.startOfToday && this.allowedDatesSet.has(this.ymd(d));
  };
  highlightDates = (d: Date): string => this.allowedDatesSet.has(this.ymd(d)) ? 'highlighted-date' : '';

  myFilterReturn = (d: Date | null): boolean => {
    if (!d) return false;
    d.setHours(0,0,0,0);
    const dep = this.dateControl.value ?? this.startOfToday;
    const depMid = new Date(dep); depMid.setHours(0,0,0,0);
    return d >= depMid && this.allowedReturnDatesSet.has(this.ymd(d));
  };
  highlightReturnDates = (d: Date): string => this.allowedReturnDatesSet.has(this.ymd(d)) ? 'highlighted-date' : '';

  constructor(
    private keycloakService: KeycloakService,
    private flightService: FlightServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef // ⟵ add this
  ) {
    this.flights = this.flightService.fullFlights;
    this.routeMap = this.flightService.routeMap;

    // ✅ Only update options here; DO NOT rewire subscriptions here
    effect(() => {
      const map = this.routeMap();
      this.filteredFromOptions = Object.keys(map);
      // no wireUpInputs() here
    });
    effect(() => {
  const map = this.routeMap();
  this.filteredFromOptions = Object.keys(map);
  console.log('[routeMap] from-cities:', this.filteredFromOptions);
});

effect(() => {
  const fs = this.flights();
  console.log('[flights] count =', fs.length);
  if (fs.length) {
    console.log('[flights] first 3:', fs.slice(0, 3).map(f => ({
      from: f.from, to: f.to, dep: f.departureTime
    })));
  }
});

    this.flightService.loadFlights();
  }

  ngOnInit() {
    this.wireUpInputs();

    // Depart changes → clamp return
    this.dateControl.valueChanges.subscribe((d) => {
      const depMid = d ? new Date(d) : this.startOfToday;
      depMid.setHours(0, 0, 0, 0);
      this.restrictReturnTo(depMid);

      const ret = this.dateReturnControl.value;
      if (ret) {
        const retMid = new Date(ret); retMid.setHours(0, 0, 0, 0);
        if (retMid < depMid) this.dateReturnControl.setValue(null);
      }
      this.cdr.markForCheck(); // ⟵ ensure UI refresh
    });

    // One-way / return toggle
    this.toggleControl.valueChanges.subscribe((on) => {
      if (on) {
        if (this.allowedReturnDates.length) {
          this.dateReturnControl.enable({ emitEvent: false });
        }
      } else {
        this.dateReturnControl.setValue(null, { emitEvent: false });
        this.dateReturnControl.disable({ emitEvent: false });
      }
      this.cdr.markForCheck(); // ⟵ ensure UI refresh
    });
  }

  private wireUpInputs() {
    // FROM
    this.fromControl.valueChanges.subscribe((fromValue) => {
      const map = this.routeMap();
      const allFrom = Object.keys(map);
      const q = (fromValue || '').toLowerCase();
      this.filteredFromOptions = allFrom.filter(o => o.toLowerCase().startsWith(q));

      // Update TO
      this.filteredToOptions = (fromValue && map[fromValue]) ? map[fromValue] : [];

      this.resetDatesAndLists();
      this.cdr.markForCheck(); // ⟵ ensure UI refresh
    });

    // TO
    this.toControl.valueChanges.subscribe((toValue) => {
      const fromValue = this.fromControl.value || '';
      const map = this.routeMap();
      const tos = map[fromValue] || [];
      const q = (toValue || '').toLowerCase();
      this.filteredToOptions = tos.filter(o => o.toLowerCase().startsWith(q));

      // Build outbound allowed dates
      this.allowedDates = [];
      this.allowedDatesSet.clear();

      const outFlights = this.flights().filter(f =>
        f.from.toLowerCase() === fromValue.toLowerCase() &&
        (!!toValue ? f.to.toLowerCase() === toValue.toLowerCase() : true)
      );

      const uniqueOut = new Set<string>();
      outFlights.forEach(f => {
        const d = new Date(f.departureTime); d.setHours(0,0,0,0);
        if (d >= this.startOfToday) {
          const key = this.ymd(d);
          if (!uniqueOut.has(key)) {
            uniqueOut.add(key);
            this.allowedDates.push(new Date(d));
            this.allowedDatesSet.add(key);
          }
        }
      });

      if (this.allowedDates.length) {
        this.dateControl.enable({ emitEvent: false });
      } else {
        this.dateControl.setValue(null, { emitEvent: false });
        this.dateControl.disable({ emitEvent: false });
      }

      // Build return dates base
      this.allowedReturnDates = [];
      this.allowedReturnDatesSet.clear();

      const backFlights = this.flights().filter(f =>
        !!toValue && f.from.toLowerCase() === toValue.toLowerCase()
      );

      const uniqueRet = new Set<string>();
      backFlights.forEach(f => {
        const d = new Date(f.departureTime); d.setHours(0,0,0,0);
        if (d >= this.startOfToday) {
          const key = this.ymd(d);
          if (!uniqueRet.has(key)) {
            uniqueRet.add(key);
            this.allowedReturnDates.push(new Date(d));
            this.allowedReturnDatesSet.add(key);
          }
        }
      });

      if (this.toggleControl.value && this.allowedReturnDates.length) {
        this.dateReturnControl.enable({ emitEvent: false });
      } else {
        this.dateReturnControl.setValue(null, { emitEvent: false });
        this.dateReturnControl.disable({ emitEvent: false });
      }

      this.cdr.markForCheck(); // ⟵ ensure UI refresh
    });
  }

  private resetDatesAndLists() {
    this.allowedDates = [];
    this.allowedReturnDates = [];
    this.allowedDatesSet.clear();
    this.allowedReturnDatesSet.clear();

    this.dateControl.setValue(null, { emitEvent: false });
    this.dateReturnControl.setValue(null, { emitEvent: false });

    this.dateControl.disable({ emitEvent: false });
    this.dateReturnControl.disable({ emitEvent: false });
  }

  private restrictReturnTo(depMidnight: Date) {
    this.allowedReturnDates = this.allowedReturnDates
      .filter(d => { const c = new Date(d); c.setHours(0,0,0,0); return c >= depMidnight; })
      .sort((a,b) => +a - +b);

    this.allowedReturnDatesSet.clear();
    this.allowedReturnDates.forEach(d => this.allowedReturnDatesSet.add(this.ymd(d)));
  }

  onSearchSubmit() {
    const from = this.fromControl.value;
    const to = this.toControl.value;
    const date = this.dateControl.value;
    const returnDate = this.dateReturnControl.value;

    if (from && to && date && (!this.toggleControl.value || returnDate)) {
      this.router.navigate(['/searchResult'], {
        queryParams: {
          from, to, date, returnDate,
          returnFlight: this.toggleControl.value,
          passengers: this.passengers.value,
        },
      });
    } else {
      alert('Please select From, To, and a valid Date (and Return if chosen).');
    }
  }
  
}
