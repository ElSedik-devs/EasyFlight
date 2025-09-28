package com.easyflight.backend.dto;

public record ConfirmReq(String sessionId,String loggedInUser, DraftDto draft) {}