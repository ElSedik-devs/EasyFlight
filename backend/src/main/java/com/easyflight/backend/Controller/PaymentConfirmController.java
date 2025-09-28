package com.easyflight.backend.Controller;

import com.easyflight.backend.dto.ConfirmReq;
import com.easyflight.backend.service.BookingService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "${app.frontend-origin}") // dev convenience; or configure global CORS
public class PaymentConfirmController {

    private final BookingService bookingService;

    public PaymentConfirmController(@Value("${stripe.secret-key}") String secretKey, BookingService bookingService) {
        Stripe.apiKey = secretKey;
        this.bookingService = bookingService;
    }

    /**
     * GET /api/payment/confirm?session_id=cs_test_...
     * Returns whether the session is paid and some basic details.
     */
    @PostMapping("/confirm")
    public ResponseEntity<?> confirm(@RequestBody ConfirmReq req) {
        try {
            // 1) Retrieve the Checkout Session from Stripe
            Session session = Session.retrieve(req.sessionId());
            System.out.println(req.draft().toString());
            boolean paid = "paid".equalsIgnoreCase(session.getPaymentStatus());

            // 2) (Optional but useful) also check the PaymentIntent status
            String piId = session.getPaymentIntent();
            String piStatus = null;
            if (piId != null) {
                PaymentIntent pi = PaymentIntent.retrieve(piId);
                piStatus = pi.getStatus(); // e.g. "succeeded"
            }

            if (!bookingService.isBookingExist(session.getId())) {
                bookingService.saveBooking(req);
            }
            // 3) Minimal JSON payload back to the frontend
            return ResponseEntity.ok(Map.of(
                    "paid", paid,
                    "sessionId", req.sessionId(),
                    "paymentIntentId", piId,
                    "paymentIntentStatus", piStatus,
                    "amountTotal", session.getAmountTotal(),  // cents
                    "currency", session.getCurrency()
            ));

        } catch (StripeException e) {
            // Bad session_id or other Stripe error
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}

