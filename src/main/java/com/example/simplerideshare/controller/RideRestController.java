package com.example.simplerideshare.controller;

import com.example.simplerideshare.model.Ride;
import com.example.simplerideshare.service.RideService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
//@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "https://precious-halva-270549.netlify.app")
public class RideRestController {

    private final RideService rideService;

    public RideRestController(RideService rideService) {
        this.rideService = rideService;
    }

    @GetMapping
    public List<Ride> getAllRides() {
        return rideService.findAll();
    }

    @PostMapping
    public Ride createRide(@RequestBody Ride ride) {
        return rideService.create(ride);
    }

    @PutMapping("/{id}/accept")
    public Ride acceptRide(@PathVariable Long id) {
        rideService.acceptRide(id);
        return rideService.findById(id).orElse(null);
    }

}
