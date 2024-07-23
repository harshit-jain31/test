package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

@RestController
@RequestMapping("/v3/service")
@Validated
public class XYZSubscriptionController {

    @GetMapping("/{msisdn}")
    public ResponseEntity<XYZSubscriptionResponse> getXYZSubscriptionDetails(
            @PathVariable 
            @Pattern(regexp = "^\\d{10,15}$", message = "MSISDN must be between 10 and 15 digits") 
            String msisdn,
            @RequestParam 
            @NotBlank(message = "Category is mandatory") 
            String category,
            @RequestHeader("Authorization") String authorization,
            @RequestHeader("Client-ID") String clientId) {

        if (!"XYZ".equals(category)) {
            throw new IllegalArgumentException("Invalid category");
        }

        // Assuming fetchXYZSubscriptionDetails is a method that interacts with the backend API
        XYZSubscriptionResponse response = fetchXYZSubscriptionDetails(msisdn, authorization, clientId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private XYZSubscriptionResponse fetchXYZSubscriptionDetails(String msisdn, String authorization, String clientId) {
        // Logic to call the backend API and fetch the subscription details
        // Mocking the response for illustration purposes
        return new XYZSubscriptionResponse(msisdn, "PAI123", "BundleID456", "XYZOfferID789", "ChannelABC",
                "ServiceKeyXYZ", "Active", "PlanType1", "2023-01-01", "2024-01-01");
    }
}
