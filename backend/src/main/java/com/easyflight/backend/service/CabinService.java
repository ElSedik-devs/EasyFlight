package com.easyflight.backend.service;

import com.easyflight.backend.dao.CabinRepository;
import com.easyflight.backend.dto.CabinDTO;
import com.easyflight.backend.entity.Cabin;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CabinService {

    private final CabinRepository cabinRepository;
    public CabinService(CabinRepository cabinRepository) {
        this.cabinRepository = cabinRepository;
    }

    public List<CabinDTO> getCabinsByFlightId(Long flightId) {
        return cabinRepository.findByFlightId(flightId)
                .stream().map(this::convertToDto).collect(Collectors.toList());
    }


    private CabinDTO convertToDto(Cabin cabin) {
        CabinDTO cabinDTO = new CabinDTO();
        cabinDTO.setId(cabin.getId());
        cabinDTO.setCabinType(cabin.getCabinType());
        cabinDTO.setAvailableSeats(cabin.getAvailableSeats());
        cabinDTO.setFlightId(cabin.getFlight().getId());
        cabinDTO.setPrice(cabin.getPrice());

        return cabinDTO;
    }

}
