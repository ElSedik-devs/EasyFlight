package com.easyflight.backend.Controller;

import com.easyflight.backend.dto.FlightDTO;
import com.easyflight.backend.service.FlightService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/flight")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/allflights")
    public List<FlightDTO> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/searchflights")
    public List<FlightDTO> getSearchFlights(@RequestParam String from,@RequestParam String to,@RequestParam String date,@RequestParam int passengers) {
//        System.out.println(flightService.searchFlights(from,to,date,passengers)+"hi");
        return flightService.searchFlights(from,to,date,passengers);

    }

    @GetMapping("/flight")
    public FlightDTO getFlightById(@RequestParam String id) {
        return flightService.getFlightById(Integer.parseInt(id));
    }
}
