package com.easyflight.backend.dto;

import com.easyflight.backend.enums.CabinType;

public record DraftDto(
        Long goFlightId,
        Long returnFlightId,
        CabinType goCabinType,
        CabinType returnCabinType,
        java.util.List<PassengerDto> passengers,
        Long amountCents
) {}
