package com.easyflight.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:4200")
public class CheckoutController {
    public CheckoutController(@Value("${stripe.secret-key}") String secretKey) {
        Stripe.apiKey = secretKey;
    }

    public record CreateReq(Long amountCents, String currency, String description) {}

    @PostMapping("/create-session")
    public ResponseEntity<?> create(@RequestBody CreateReq req) {
        try {
            long amount = (req.amountCents() == null ? 0 : req.amountCents());
            if (amount < 50) { // Stripe minimums vary; 50 = €0.50
                return ResponseEntity.badRequest().body(Map.of("error", "Amount too small"));
            }
            String currency = (req.currency() == null || req.currency().isBlank()) ? "eur" : req.currency();
            String desc = (req.description() == null || req.description().isBlank()) ? "EasyFlight booking" : req.description();

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("http://localhost:4200/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency(currency)
                                            .setUnitAmount(amount) // **amount in smallest currency unit**
                                            .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                    .setName(desc)
                                                    .build())
                                            .build())
                                    .build())
                    .build();

            Session session = Session.create(params);
            return ResponseEntity.ok(Map.of("url", session.getUrl()));

        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
}
