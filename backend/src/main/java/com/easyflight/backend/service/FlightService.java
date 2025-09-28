package com.easyflight.backend.service;

import com.easyflight.backend.dao.FlightRepository;
import com.easyflight.backend.dto.FlightDTO;
import com.easyflight.backend.entity.Flight;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }



    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }

    public List<FlightDTO> searchFlights(String from, String to,String dateString, int passengers) {

        LocalDate date = LocalDate.parse(dateString); // e.g., "2025-08-01"
//        System.out.println("Parsed date: " + date);
        // Build the full-day range
        LocalDateTime startOfDay = date.atStartOfDay();           // 2025-08-01T00:00:00
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);      // 2025-08-01T23:59:59.999...
//        System.out.println("Start: " + startOfDay); // 2025-08-01T00:00
//        System.out.println("End: " + endOfDay);

        return flightRepository.findByFlightFromIgnoreCaseAndFlightToIgnoreCaseAndDepartureTimeBetween(
                        from, to, startOfDay, endOfDay
                ).stream()
                .filter(flight -> flight.getRemainingPassengers() >=passengers)
                .map(this::convertToDto).collect(Collectors.toList());

    }

    public FlightDTO getFlightById(int id) {
        return this.convertToDto(flightRepository.findById(id));
    }

    private FlightDTO convertToDto(Flight flight) {
        FlightDTO flightDTO = new FlightDTO();
        flightDTO.setId(flight.getId());
        flightDTO.setPrice(flight.getPrice());
        flightDTO.setFrom(flight.getFlightFrom());
        flightDTO.setTo(flight.getFlightTo());
        flightDTO.setArrivalTime( flight.getArrivalTime().toString());
        flightDTO.setDepartureTime(flight.getDepartureTime().toString());
//        System.out.println(flightDTO.getArrivalTime());
        return flightDTO;
    }
}
