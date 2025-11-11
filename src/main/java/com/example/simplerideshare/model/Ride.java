package com.example.simplerideshare.model;

public class Ride {
    private Long id;
    private String passengerName;
    private String pickup;
    private String destination;
    private int seats;
    private String status;

    public Ride() {}

    public Ride(Long id, String passengerName, String pickup, String destination, int seats) {
        this.id = id;
        this.passengerName = passengerName;
        this.pickup = pickup;
        this.destination = destination;
        this.seats = seats;
        this.status = "OPEN";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }
    public String getPickup() { return pickup; }
    public void setPickup(String pickup) { this.pickup = pickup; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}