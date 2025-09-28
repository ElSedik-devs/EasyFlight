export class Flight {
  constructor(
    public id:number,
    public price: number,
    public from: string,
    public to: string,
    public departureTime: string, 
    public arrivalTime: string    
  ) {}
}