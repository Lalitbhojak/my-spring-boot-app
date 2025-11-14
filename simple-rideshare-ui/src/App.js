import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";

import './App.css';



function App() {
  const [rides, setRides] = useState([]);
  const [form, setForm] = useState({
    passengerName: "",
    pickup: "",
    destination: "",
    seats: 1,
  });

  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);



  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/rides`)
      .then((res) => res.json())
      .then((data) => setRides(data))
      .catch((err) => console.error("Error fetching rides:", err));
  }, []);


  const createRide = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/rides`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => window.location.reload())
      .catch((err) => console.error("Error creating ride:", err));
  };

const acceptRide = (id) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/rides/${id}/accept`, {
    method: "PUT",
  })
    .then((res) => res.json())
    .then((updatedRide) => {
      // Update only that ride in state
      setRides((prev) =>
        prev.map((r) => (r.id === updatedRide.id ? updatedRide : r))
      );
    })
    .catch((err) => console.error("Error accepting ride:", err));
};

  return (
    <div className="container mt-4">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded shadow mb-4">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-warning taxi-logo" href="#">
            🚕 SimpleRideShare
          </a>

        </div>
      </nav>

      {/* Ride Request Form */}
      <div className="card shadow-sm mb-5">
        <div className="card-header bg-primary text-white fw-bold">
          Request a Ride
        </div>
        <div className="card-body">
          <form className="row g-3 align-items-center" onSubmit={createRide}>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Passenger name"
                required
                onChange={(e) => setForm({ ...form, passengerName: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Pickup location"
                required
                onChange={(e) => setForm({ ...form, pickup: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Destination"
                required
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                className="form-control"
                type="number"
                min="1"
                max="6"
                placeholder="Seats"
                required
                onChange={(e) => setForm({ ...form, seats: e.target.value })}
              />
            </div>
            <div className="col-md-1 d-grid">
              <button className="btn btn-success" type="submit">
                🚗 Request
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card-body">
        {/* your ride request form here */}

        {/* Google Map below form */}
        <div className="mt-4">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={['places']}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={{ lat: 28.6139, lng: 77.2090 }}
              zoom={10}
            >
              {/* Optional: Add pickup/destination markers */}
              {pickup && <Marker position={pickup} />}
              {destination && <Marker position={destination} />}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>


      {/* Rides Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white fw-bold">
          Available Rides
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-secondary">
              <tr>
                <th>ID</th>
                <th>Passenger</th>
                <th>Pickup</th>
                <th>Destination</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rides.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-3 text-muted">
                    No rides available. Request one above! 🚙
                  </td>
                </tr>
              ) : (
                rides.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.passengerName || "—"}</td>
                    <td>{r.pickup || "—"}</td>
                    <td>{r.destination || "—"}</td>
                    <td>{r.seats}</td>
                    <td>
                      {r.status === "OPEN" ? (
                        <span className="badge bg-warning text-dark">OPEN</span>
                      ) : (
                        <span className="badge bg-success">ACCEPTED</span>
                      )}
                    </td>
                    <td>
                      {r.status === "OPEN" && (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => acceptRide(r.id)}
                        >
                          Accept
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted mt-4 small">
        © {new Date().getFullYear()} SimpleRideShare — Built with ❤️ in React + Spring Boot
      </footer>
    </div>
  );
}

export default App;
