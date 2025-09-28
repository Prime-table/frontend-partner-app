"use client";
import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import "../../component/styles/Reservation.css";
import Navbar from "../../component/Navbar/Navbar";

interface Reservation {
  _id: string;
  date: string;
  time: string;
  size: number;
  name: string;
  table: string;
  status: "Pending" | "Approved" | "Cancelled";
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/prime-table-partner";

const fallbackData: Reservation[] = [
  {
    _id: "1",
    date: "2025-08-22",
    time: "7:00 PM",
    size: 4,
    name: "Mecury Paul",
    table: "T4",
    status: "Cancelled",
  },
  {
    _id: "2",
    date: "2025-08-23",
    time: "8:00 PM",
    size: 2,
    name: "Mecury Paul",
    table: "T4",
    status: "Pending",
  },
];

const ReservationTable: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [filter, setFilter] = useState("cancelled");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch reservations with fallback
  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reservations`, {
        cache: "no-store", // prevent stale data
      });
      if (!res.ok) throw new Error("Failed to fetch reservations");
      const data: Reservation[] = await res.json();
      setReservations(data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setReservations(fallbackData);
      setError("Unable to load live data. Showing fallback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // ✅ filter reservations
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
        {loading ? (
          <p>Loading reservations...</p>
        ) : (
          <>
            {error && <p className="error">{error}</p>}
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
                    <tr key={res._id}>
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
                              setOpenModal(openModal === res._id ? null : res._id)
                            }
                          />
                          {openModal === res._id && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationTable;
