package com.example.simplerideshare.repository;

import com.example.simplerideshare.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideRepository extends JpaRepository<Ride, Long> {}
