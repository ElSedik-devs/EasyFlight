export interface Cabin{
    
        id:number;
        cabinType:'ECONOMY' | 'BUSINESS' | 'FIRST_CLASS';
        price:number;
        availableSeats:number;
        flightId:number;
    
}