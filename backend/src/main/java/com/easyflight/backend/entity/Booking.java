package com.easyflight.backend.entity;

import com.easyflight.backend.enums.CabinType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "go_flight_id", nullable = false)
    private Flight goFlightId;

    @ManyToOne
    @JoinColumn(name = "return_flight_id")
    private Flight returnFlightId;

    @Enumerated(EnumType.STRING)
    @Column(name = "go_cabin", nullable = false, length = 32)
    private CabinType goFlightCabin;

    @Enumerated(EnumType.STRING)
    @Column(name = "return_cabin", length = 32)
    private CabinType returnFlightCabin;

    @ManyToOne
    @JoinColumn(name = "logged_in_user_id")
    private User loggedInUserId;

    // Store amounts like Stripe (smallest unit)
    @Column(name = "amount_cents", nullable = false)
    private Long amountCents;

    @Column(name = "currency", nullable = false, length = 10)
    private String currency = "eur";

    // Stripe references (verification + idempotency)
    @Column(name = "checkout_session_id", length = 128, unique = true)
    private String checkoutSessionId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @OneToMany(
            mappedBy = "booking",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Passenger> passengers = new ArrayList<>();




    // helpers
    public void addPassenger(Passenger p) {
        passengers.add(p);
        p.setBooking(this);
    }
    public void removePassenger(Passenger p) {
        passengers.remove(p);
        p.setBooking(null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Flight getGoFlightId() {
        return goFlightId;
    }

    public void setGoFlightId(Flight goFlightId) {
        this.goFlightId = goFlightId;
    }

    public Flight getReturnFlightId() {
        return returnFlightId;
    }

    public void setReturnFlightId(Flight returnFlightId) {
        this.returnFlightId = returnFlightId;
    }

    public CabinType getGoFlightCabin() {
        return goFlightCabin;
    }

    public void setGoFlightCabin(CabinType goFlightCabin) {
        this.goFlightCabin = goFlightCabin;
    }

    public CabinType getReturnFlightCabin() {
        return returnFlightCabin;
    }

    public void setReturnFlightCabin(CabinType returnFlightCabin) {
        this.returnFlightCabin = returnFlightCabin;
    }

    public User getLoggedInUserId() {
        return loggedInUserId;
    }

    public void setLoggedInUserId(User loggedInUserId) {
        this.loggedInUserId = loggedInUserId;
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

    public String getCheckoutSessionId() {
        return checkoutSessionId;
    }

    public void setCheckoutSessionId(String checkoutSessionId) {
        this.checkoutSessionId = checkoutSessionId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }

}
