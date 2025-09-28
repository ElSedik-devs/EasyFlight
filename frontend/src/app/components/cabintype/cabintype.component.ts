import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cabin } from '../../models/cabin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabintype',
  imports: [CommonModule],
  templateUrl: './cabintype.component.html',
  styleUrl: './cabintype.component.css'
})
export class CabintypeComponent {
  @Input() cabin!:Cabin;
  @Input() cabinType!:string;
  
  @Output() outCabinType =new EventEmitter<string>();



  // selected if it matches parent’s choice; if parent hasn't chosen yet, default ECONOMY
  get isSelected(): boolean {
    if (this.cabinType) return this.cabin.cabinType === this.cabinType;
    return this.cabin.cabinType === 'ECONOMY';
  }

  changeCabin(): void {
    this.outCabinType.emit(this.cabin?.cabinType);
  }
}
