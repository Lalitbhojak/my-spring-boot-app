package com.example.simplerideshare.service;

import com.example.simplerideshare.model.Ride;
import org.springframework.stereotype.Service;
//import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class RideService {
    private final List<Ride> rides = Collections.synchronizedList(new ArrayList<>());
    private final AtomicLong idGen = new AtomicLong(1);

    public List<Ride> findAll() {
        return new ArrayList<>(rides);
    }

    public Ride create(Ride ride) {
        ride.setId(idGen.getAndIncrement());
        ride.setStatus("OPEN");
        rides.add(ride);
        return ride;
    }

    public Optional<Ride> findById(Long id) {
        return rides.stream().filter(r -> r.getId().equals(id)).findFirst();
    }

    public boolean acceptRide(Long id) {
        Optional<Ride> opt = findById(id);
        if (opt.isPresent()) {
            opt.get().setStatus("ACCEPTED");
            return true;
        }
        return false;
    }
}