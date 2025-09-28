package com.easyflight.backend.service;

import com.easyflight.backend.dao.BookingRepository;
import com.easyflight.backend.dao.CabinRepository;
import com.easyflight.backend.dao.FlightRepository;
import com.easyflight.backend.dao.UserRepository;
import com.easyflight.backend.dto.BookingDTO;
import com.easyflight.backend.dto.ConfirmReq;
import com.easyflight.backend.dto.PassengerDto;
import com.easyflight.backend.entity.*;
import com.easyflight.backend.enums.CabinType;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final FlightRepository flightRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final CabinRepository cabinRepository;
    public BookingService(FlightRepository flightRepository, UserRepository userRepository, BookingRepository bookingRepository, CabinRepository cabinRepository) {
        this.flightRepository = flightRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.cabinRepository = cabinRepository;
    }

    public boolean isBookingExist(String sid){
        Booking booking=bookingRepository.findBookingByCheckoutSessionId(sid);
        return booking != null;

    }

    @Transactional
    public Booking saveBooking(ConfirmReq confirmReq) throws ChangeSetPersister.NotFoundException {

        Long goFlightId=confirmReq.draft().goFlightId();
        Long returnFlightId=confirmReq.draft().returnFlightId();
        CabinType goCabinType=confirmReq.draft().goCabinType();
        CabinType returnCabinType=confirmReq.draft().returnCabinType();
        List<PassengerDto> passengers=confirmReq.draft().passengers();
        Long amountCents=confirmReq.draft().amountCents() ;
        String loggedInUser=confirmReq.loggedInUser();


        Flight goFlight=flightRepository.findById(goFlightId)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());


        Flight returnFlight=(returnFlightId == null) ? null :
                flightRepository.findById(returnFlightId)
                        .orElseThrow(() -> new ChangeSetPersister.NotFoundException());


        User user=userRepository.findById(loggedInUser).orElse(null);
        List<PassengerDto> passengersList =confirmReq.draft().passengers();
        Booking booking=new Booking();
        if(goFlight!=null){
            booking.setGoFlightId(goFlight);
            goFlight.setNumberOfPassengers(goFlight.getNumberOfPassengers()+passengersList.size());
            flightRepository.save(goFlight);
        }
        if(returnFlight!=null){
            booking.setReturnFlightId(returnFlight);
            returnFlight.setNumberOfPassengers(returnFlight.getNumberOfPassengers()+passengersList.size());
            flightRepository.save(returnFlight);
        }
        if(goCabinType!=null){
            booking.setGoFlightCabin(goCabinType);
            Cabin cabin=cabinRepository.findByFlightIdAndCabinType(goFlightId,goCabinType);
            cabin.setReservedSeats(cabin.getReservedSeats()+passengersList.size());
            cabin.setAvailableSeats(cabin.getAvailableSeats()-passengersList.size());
            cabinRepository.save(cabin);
        }
        if(returnCabinType!=null&& returnFlight!=null){
            booking.setReturnFlightCabin(returnCabinType);
            Cabin cabin=cabinRepository.findByFlightIdAndCabinType(returnFlightId,returnCabinType);
            cabin.setReservedSeats(cabin.getReservedSeats()+passengersList.size());
            cabin.setAvailableSeats(cabin.getAvailableSeats()-passengersList.size());
            cabinRepository.save(cabin);
        }

        if(user!=null){
            booking.setLoggedInUserId(user);
        }

        booking.setAmountCents(amountCents);
        booking.setCheckoutSessionId(confirmReq.sessionId());

        int i = 1;
        for (var p : passengersList) {
            Passenger passengerData = new Passenger();
            passengerData.setSequenceNo(i++);
            passengerData.setFirstName(p.firstName());
            passengerData.setLastName(p.lastName());
            passengerData.setPassportNumber(p.passportNumber());
            passengerData.setAge(p.age());
            booking.addPassenger(passengerData); // cascade saves passengers
        }



    return bookingRepository.save(booking);

    }

    public List<BookingDTO> getUserBookings(String loggedInUser){
        User user=userRepository.findById(loggedInUser).orElse(null);
        return bookingRepository.findByLoggedInUserId(user).stream().map(this::convertToDto).collect(Collectors.toList());
    }
    private BookingDTO convertToDto(Booking booking) {
        BookingDTO bookingDTO=new BookingDTO();
        Flight goFlight=booking.getGoFlightId();

        bookingDTO.setId(booking.getId());
        bookingDTO.setGoFlightId(goFlight.getId());

        bookingDTO.setGoFlightDeparture(goFlight.getFlightFrom());
        bookingDTO.setGoFlightArrival(goFlight.getFlightTo());
        bookingDTO.setGoFlightCabin(booking.getGoFlightCabin().toString());
        if(booking.getReturnFlightId()!=null){
            Flight returnFlight=booking.getReturnFlightId();
            bookingDTO.setReturnFlightId(returnFlight.getId());
            bookingDTO.setReturnFlightDeparture(returnFlight.getFlightFrom());
            bookingDTO.setReturnFlightArrival(returnFlight.getFlightTo());
            bookingDTO.setReturnFlightCabin(booking.getReturnFlightCabin().toString());
        }

        bookingDTO.setAmountCents(booking.getAmountCents());
        bookingDTO.setCurrency(booking.getCurrency());
        bookingDTO.setCreatedAt(booking.getCreatedAt());

        return bookingDTO;
    }
}
