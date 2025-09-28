import { Component, effect, SimpleChanges } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
type PassengerFG = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  passportNumber: FormControl<string>;
  age: FormControl<number | null>;
}>;
@Component({
  selector: 'app-passengers',
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './passengers.component.html',
  styleUrl: './passengers.component.css',
})
export class PassengersComponent {
  passengersForm;
  form;
  numberOfPassengers = 1;

  NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,40}$/; // simple name rule
  PASSPORT_RE = /^[A-Z0-9]{6,9}$/i; // 6–9 letters/numbers
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router:Router) {
    this.passengersForm = this.formBuilder.array<PassengerFG>([]);
    this.form = this.formBuilder.group({
      passengers: this.passengersForm,
    });
    this.route.queryParams.subscribe((params) => {
      const n = Number(params['passengers'] ?? 1);
      this.adjustPassengersForms(n);
    });
  }

  ngOnInit() {
    if (!this.passengersForm.length) this.adjustPassengersForms(1);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.adjustPassengersForms(this.numberOfPassengers);
  }

  trackByIndex(i: number, _group: PassengerFG) {
    return i;
  }
  private newPassangerGroup(): PassengerFG {
    return this.formBuilder.group({
      firstName: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(this.NAME_RE)],
      }),
      lastName: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(this.NAME_RE)],
      }),
      passportNumber: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(this.PASSPORT_RE)],
      }),
      age: this.formBuilder.control<number | null>(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(120),
        ],
      }),
    });
  }

  adjustPassengersForms(numberOfPassengers: number) {
    const target = Math.max(0, Math.floor(numberOfPassengers || 0));
    while (this.passengersForm.length < target)
      this.passengersForm.push(this.newPassangerGroup());
    while (this.passengersForm.length > target)
      this.passengersForm.removeAt(this.passengersForm.length - 1);
  }

  save() {
    if (this.passengersForm.invalid || this.passengersForm.length === 0) {
      this.passengersForm.markAllAsTouched();
      return;
    }
    const data = this.passengersForm.getRawValue();
    console.log('Saving', data);
    sessionStorage.setItem('passengersData',JSON.stringify(data));
    this.router.navigate(['/checkout'],{
      queryParamsHandling:'preserve'
    });
  }
}
