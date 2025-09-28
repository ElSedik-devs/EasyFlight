package com.easyflight.backend.dao;

import com.easyflight.backend.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByFlightFromIgnoreCaseAndFlightToIgnoreCaseAndDepartureTimeBetween(
            String from,
            String to,
            LocalDateTime start,
            LocalDateTime end
    );

    Flight findById(long id);





}
