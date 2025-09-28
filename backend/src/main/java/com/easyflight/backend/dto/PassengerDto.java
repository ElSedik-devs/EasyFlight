package com.easyflight.backend.dto;

public record PassengerDto(
        String firstName, String lastName, String passportNumber, Integer age
) {}