"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/styles/Reservation.css";

const ReservationEmpty = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch reservations from API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reservations");
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error(err);
        setReservations([]); // still show UI even if it fails
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Filter reservations
  const filteredReservations =
    filter === "all"
      ? reservations
      : reservations.filter((r) => r.status === filter);

  return (
    <div>
      <Navbar />

      <div className="reservation-status">
        <div>
          <h3>Reservation</h3>
        </div>

        {/* Filter dropdown */}
        <div>
          <div className="filter-container">
            <label htmlFor="status">Filter:</label>
            <select
              id="status"
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Status: All</option>
              <option value="pending">Status: Pending</option>
              <option value="confirmed">Status: Approved</option>
              <option value="cancelled">Status: Cancelled</option>
            </select>
          </div>
        </div>

        {/* Reservation list */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredReservations.length === 0 ? (
          <div className="no-reservation">
            <h6>You don&apos;t have any reservations yet</h6>
            <p>Start by adding one</p>
          </div>
        ) : (
          <div className="reservation-list">
            {filteredReservations.map((r) => (
              <div key={r._id} className="reservation-card">
                <h5>{r.serviceType}</h5>
                <p>Date: {new Date(r.date).toLocaleDateString()}</p>
                <p>Status: {r.status}</p>
                {r.notes && <p>Notes: {r.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationEmpty;
