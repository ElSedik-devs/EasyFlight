package com.easyflight.backend.entity;

import com.easyflight.backend.enums.CabinType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cabin")
public class Cabin {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cabin_type")
    @Enumerated(EnumType.STRING)
    private CabinType cabinType;

    @Column(name = "price")
    private double price;

    @Column(name = "available_seats")
    private int availableSeats;

    @Column(name = "reserved_seats")
    private int reservedSeats;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;

    public Cabin() {
    }

    public Cabin(Long id, CabinType cabinType, double price, int availableSeats, int reservedSeats, Flight flight) {

        this.id = id;
        this.cabinType = cabinType;
        this.price = price;
        this.availableSeats = availableSeats;
        this.reservedSeats = reservedSeats;
        this.flight = flight;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CabinType getCabinType() {
        return cabinType;
    }

    public void setCabinType(CabinType cabinType) {
        this.cabinType = cabinType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public int getReservedSeats() {
        return reservedSeats;
    }

    public void setReservedSeats(int reservedSeats) {
        this.reservedSeats = reservedSeats;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
}
