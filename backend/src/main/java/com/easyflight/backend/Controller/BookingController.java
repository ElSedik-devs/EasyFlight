package com.easyflight.backend.Controller;

import com.easyflight.backend.dto.BookingDTO;
import com.easyflight.backend.entity.Booking;
import com.easyflight.backend.service.BookingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    BookingService bookingService;
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/mybookings")
    public List<BookingDTO> getUserBookings(@RequestParam String uid){
        for(BookingDTO booking : bookingService.getUserBookings(uid)){
            System.out.println(booking);
        }
        return this.bookingService.getUserBookings(uid);
    }
}
