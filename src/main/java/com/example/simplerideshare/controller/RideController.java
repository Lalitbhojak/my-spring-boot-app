package com.example.simplerideshare.controller;

import com.example.simplerideshare.model.Ride;
import com.example.simplerideshare.service.RideService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class RideController {
    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("rides", rideService.findAll());
        return "index";
    }

    @GetMapping("/new")
    public String newRide(Model model) {
        model.addAttribute("ride", new Ride());
        return "newride";
    }

    @PostMapping("/create")
    public String createRide(Ride ride) {
        rideService.create(ride);
        return "redirect:/";
    }

    @PostMapping("/accept")
    public String acceptRide(@RequestParam Long id) {
        rideService.acceptRide(id);
        return "redirect:/";
    }
}
