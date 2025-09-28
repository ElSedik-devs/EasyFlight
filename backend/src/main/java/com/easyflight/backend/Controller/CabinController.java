package com.easyflight.backend.Controller;

import com.easyflight.backend.dto.CabinDTO;
import com.easyflight.backend.service.CabinService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cabin")
public class CabinController {
    private final CabinService cabinService;
    public CabinController(CabinService cabinService) {
        this.cabinService = cabinService;
    }

    @GetMapping("/flightCabin")
    public List<CabinDTO> getCabinByFlightId(@RequestParam  Long flightId) {
        return this.cabinService.getCabinsByFlightId(flightId);
    }
}
