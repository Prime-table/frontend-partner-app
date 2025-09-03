import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/styles/Reservation.css";

const ReservationEmpty = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="reservation-status">
        <div>
          <h3>Reservation</h3>
        </div>
        <div>
          <div className="filter-container">
            <label htmlFor="status">Filter:</label>
            <select id="status" className="filter-select">
              <option value="all">Status: All</option>
              <option value="pending">Status: Pending</option>
              <option value="approved">Status: Approved</option>
              <option value="rejected">Status: Cancelled</option>
            </select>
          </div>
        </div>
        <div className="no-reservation">
          <h6>You don&apos;t have any reservations yet</h6>
          <p>Start by adding one</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationEmpty;
