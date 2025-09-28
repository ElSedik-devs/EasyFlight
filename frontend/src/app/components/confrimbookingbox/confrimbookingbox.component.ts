import { Component, effect, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Flight } from '../../models/flights';
import { CommonModule } from '@angular/common';
import { Cabin } from '../../models/cabin';
import { CabintypeComponent } from "../cabintype/cabintype.component";

@Component({
  selector: 'app-confrimbookingbox',
  imports: [CommonModule, CabintypeComponent],
  templateUrl: './confrimbookingbox.component.html',
  styleUrl: './confrimbookingbox.component.css'
})
export class ConfrimbookingboxComponent {
  @Input() flight!: Flight;
  @Input() passengers!:number;
  @Input() cabinType!:string;
  @Input() cabins:Cabin[]=[];
  price!:number ;

  @Output() outCabinType=new EventEmitter<string>();
  @Output() outTotalPrice=new EventEmitter<number>();


  constructor(){
    effect(()=>{
      
    });
  }

  ngOnInit(){
    //  this.outTotalPrice.emit(this.price * this.passengers);
  }


  ngOnChanges(changes: SimpleChanges) {
  if (changes['cabins'] || changes['cabinType']) {
    const list = this.cabins ?? [];
    const cabin=list.find(c=>c.cabinType==this.cabinType);
    this.price=cabin?.price ?? this.flight.price ;
    this.outTotalPrice.emit(this.price * this.passengers);
  }
  }

  get modalId(): string {
  return `cabinModal-${this.flight?.id ?? 'x'}`;
}

  onCabinChange(event:string){

    this.outCabinType.emit(event);
    // this.outTotalPrice.emit(this.price * this.passengers);
  }



}
