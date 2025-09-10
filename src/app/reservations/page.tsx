"use client";
import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import "../components/styles/Reservation.css";
import Navbar from "../components/Navbar/Navbar";

const ReservationTable = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [reservations, setReservations] = useState<any[]>([]);

  // Fetch reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:1990/api/reservations");
        if (!response.ok) throw new Error("Failed to fetch reservations");
        const data = await response.json();
        setReservations(data); // expects an array
      } catch (error) {
        console.error("Error fetching reservations:", error);
        // fallback sample data
        setReservations([
          {
            id: 1,
            date: "2025/08/22",
            time: "7:00 PM",
            size: 4,
            name: "Mecury Paul",
            table: "T4",
            status: "Approved",
          },
          {
            id: 2,
            date: "2025/08/23",
            time: "8:00 PM",
            size: 2,
            name: "Mecury Paul",
            table: "T4",
            status: "Pending",
          },
          { id: 3,
            date: "2025/08/23", 
            time: "8:00 PM", 
            size: 2, 
            name: "Mecury Paul", 
            table: "T4", 
            status: "Approved", 
          }, 
          { 
            id: 4, 
            date: "2025/08/23", 
            time: "8:00 PM", 
            size: 2, 
            name: "Mecury Paul", 
            table: "T4", 
            status: "Cancelled", 
          }, 
          { 
            id: 5, 
            date: "2025/08/23", 
            time: "8:00 PM", 
            size: 2, 
            name: "Mecury Paul", 
            table: "T4", 
            status: "Pending", 
          },
        ]);
      }
    };

    fetchReservations();
  }, []);

  // ✅ filter reservations based on selected option
  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "all") return true;
    return reservation.status.toLowerCase() === filter;
  });

  return (
    <div>
      <Navbar />

      {/* Filter Section */}
      <div className="reservation-status">
        <h3>Reservation</h3>
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
            <option value="approved">Status: Approved</option>
            <option value="cancelled">Status: Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="reservations-container">
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Size</th>
              <th>Name</th>
              <th>Table</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res) => (
                <tr key={res.id}>
                  <td>{res.date}</td>
                  <td>{res.time}</td>
                  <td>{res.size}</td>
                  <td>{res.name}</td>
                  <td>{res.table}</td>
                  <td>
                    <span className={`status ${res.status.toLowerCase()}`}>
                      {res.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-wrapper">
                      <FiMoreVertical
                        className="action-icon"
                        onClick={() =>
                          setOpenModal(openModal === res.id ? null : res.id)
                        }
                      />
                      {openModal === res.id && (
                        <div className="action-modal">
                          <button className="border-btn">Edit</button>
                          <button className="border-btn">Cancel</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No reservations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationTable;
