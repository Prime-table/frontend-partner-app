"use client";

import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import "../components/styles/Reservation.css";
import Navbar from "../../component/Navbar/Navbar";

// ✅ Base URL from env (frontend-safe)
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/prime-table-partner";

interface Reservation {
  _id: string;
  date: string;
  time: string;
  size: number;
  name: string;
  table: string;
  status: string;
}

const ReservationTable: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [filter, setFilter] = useState("pending");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch reservations
  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reservations`, {
        cache: "no-store", // avoids stale cache
      });
      if (!res.ok) throw new Error("Failed to fetch reservations");
      const data: Reservation[] = await res.json();
      setReservations(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching reservations:", err);
      setError("Unable to load reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // ✅ Update reservation status
  const handleUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update reservation");
      await fetchReservations();
    } catch (err) {
      console.error("Error updating reservation:", err);
      setError("Update failed.");
    }
  };

  // ✅ Delete reservation
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete reservation");
      await fetchReservations();
    } catch (err) {
      console.error("Error deleting reservation:", err);
      setError("Delete failed.");
    }
  };

  // ✅ Filter reservations
  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "all") return true;
    return reservation.status.toLowerCase() === filter;
  });

  return (
    <div>
      <Navbar />

      {/* Filter Section */}
      <div className="reservation-status">
        <h3>Reservations</h3>
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
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
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
                            <button
                              className="border-btn"
                              onClick={() => handleUpdate(res._id, "Approved")}
                            >
                              Approve
                            </button>
                            <button
                              className="border-btn"
                              onClick={() => handleUpdate(res._id, "Cancelled")}
                            >
                              Cancel
                            </button>
                            <button
                              className="border-btn"
                              onClick={() => handleDelete(res._id)}
                            >
                              Delete
                            </button>
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
        )}
      </div>
    </div>
  );
};

export default ReservationTable;
