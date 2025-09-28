package com.easyflight.backend.entity;

import com.easyflight.backend.enums.CabinType;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "flight")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_id")
    private Long id;


    @Column(name = "price")
    private BigDecimal price=BigDecimal.ZERO;

    @Column(name = "flight_number")
    private String flightNumber;

    @Column(name = "flight_from")
    private String flightFrom;

    @Column(name = "flight_to")
    private String flightTo;

    @Column(name = "number_of_allowed_passengers")
    private int numberOfAllowedPassengers;

    @Column(name = "number_of_passengers")
    private int numberOfPassengers;

    @Column(name = "departure_time")
    private LocalDateTime departureTime;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;

    @ManyToMany(mappedBy = "flights")
    private List<User> users=new ArrayList<>();


    public Flight() {
    }

    public Flight(Long id, BigDecimal price, String flightNumber, String flightFrom, String flightTo, int numberOfAllowedPassengers, int numberOfPassengers, LocalDateTime departureTime, LocalDateTime arrivalTime, List<User> users, Map<CabinType, Cabin> cabins) {
        this.id = id;
        this.price = price;
        this.flightNumber = flightNumber;
        this.flightFrom = flightFrom;
        this.flightTo = flightTo;
        this.numberOfAllowedPassengers = numberOfAllowedPassengers;
        this.numberOfPassengers = numberOfPassengers;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.users = users;
    }


    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getFlightFrom() {
        return flightFrom;
    }

    public void setFlightFrom(String flightFrom) {
        this.flightFrom = flightFrom;
    }

    public String getFlightTo() {
        return flightTo;
    }

    public void setFlightTo(String flightTo) {
        this.flightTo = flightTo;
    }

    public int getNumberOfAllowedPassengers() {
        return numberOfAllowedPassengers;
    }

    public void setNumberOfAllowedPassengers(int numberOfAllowedPassengers) {
        this.numberOfAllowedPassengers = numberOfAllowedPassengers;
    }

    public int getNumberOfPassengers() {
        return numberOfPassengers;
    }

    public void setNumberOfPassengers(int numberOfPassengers) {
        this.numberOfPassengers = numberOfPassengers;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
    public int getRemainingPassengers() {
        return numberOfAllowedPassengers-numberOfPassengers ;
    }
}
