package com.easyflight.backend.dao;

import com.easyflight.backend.entity.Booking;
import com.easyflight.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking findBookingByCheckoutSessionId(String checkoutSessionId);

    List<Booking> findByLoggedInUserId(User loggedInUserId);

}
