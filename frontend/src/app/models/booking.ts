export class Booking {
  constructor(
    public id: number,
    public goFlightId: number,
    public returnFlightId: number,
    public goFlightDeparture: string,
    public goFlightArrival: string,
    public returnFlightDeparture: string,
    public returnFlightArrival: string,
    public goFlightCabin: string,
    public returnFlightCabin: string,
    public amountCents: number,
    public currency: string,
    public createdAt:string
  ) {}
}
