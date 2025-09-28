package com.easyflight.backend.dao;


import com.easyflight.backend.entity.Cabin;
import com.easyflight.backend.entity.Flight;
import com.easyflight.backend.enums.CabinType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CabinRepository extends JpaRepository<Cabin, Long> {
    List<Cabin> findByFlightId(Long flight_id);
    Cabin findByFlightIdAndCabinType(Long flight_id, CabinType cabin_type);
}
