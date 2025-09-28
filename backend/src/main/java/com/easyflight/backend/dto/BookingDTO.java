package com.easyflight.backend.dto;

import com.easyflight.backend.entity.Flight;
import com.easyflight.backend.entity.User;
import com.easyflight.backend.enums.CabinType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

public class BookingDTO {

    private Long id;

    private Long goFlightId;

    private Long returnFlightId;

    private String goFlightDeparture;
    private String goFlightArrival;


    private String returnFlightDeparture;
    private String returnFlightArrival;

    private String goFlightCabin;

    private String returnFlightCabin;

    private Long amountCents;

    private String currency;

    private Instant createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGoFlightId() {
        return goFlightId;
    }

    public void setGoFlightId(Long goFlightId) {
        this.goFlightId = goFlightId;
    }

    public Long getReturnFlightId() {
        return returnFlightId;
    }

    public void setReturnFlightId(Long returnFlightId) {
        this.returnFlightId = returnFlightId;
    }

    public String getGoFlightDeparture() {
        return goFlightDeparture;
    }

    public void setGoFlightDeparture(String goFlightDeparture) {
        this.goFlightDeparture = goFlightDeparture;
    }

    public String getGoFlightArrival() {
        return goFlightArrival;
    }

    public void setGoFlightArrival(String goFlightArrival) {
        this.goFlightArrival = goFlightArrival;
    }

    public String getReturnFlightDeparture() {
        return returnFlightDeparture;
    }

    public void setReturnFlightDeparture(String returnFlightDeparture) {
        this.returnFlightDeparture = returnFlightDeparture;
    }

    public String getReturnFlightArrival() {
        return returnFlightArrival;
    }

    public void setReturnFlightArrival(String returnFlightArrival) {
        this.returnFlightArrival = returnFlightArrival;
    }

    public String getGoFlightCabin() {
        return goFlightCabin;
    }

    public void setGoFlightCabin(String goFlightCabin) {
        this.goFlightCabin = goFlightCabin;
    }

    public String getReturnFlightCabin() {
        return returnFlightCabin;
    }

    public void setReturnFlightCabin(String returnFlightCabin) {
        this.returnFlightCabin = returnFlightCabin;
    }

    public Long getAmountCents() {
        return amountCents;
    }

    public void setAmountCents(Long amountCents) {
        this.amountCents = amountCents;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
