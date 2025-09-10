"use client";
import React, { useState, useEffect } from "react";
import "../components/styles/Dasboard.css";
import "../components/styles/Reservation.css";
import Navbar from "../components/Navbar/Navbar";
import { FaCalendarAlt } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { IoAlert, IoEyeOutline } from "react-icons/io5";

const DasboardFilled = () => {
  const [filter, setFilter] = useState("all");
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ fallback sample data
  const fallbackReservations = [
    {
      id: 1,
      date: "2025/08/22",
      time: "7:00 PM",
      size: 4,
      name: "Mecury Paul",
      table: "T4",
      status: "Pending",
    },
    {
      id: 2,
      date: "2025/08/23",
      time: "8:00 PM",
      size: 2,
      name: "Mecury Paul",
      table: "T4",
      status: "Approved",
    },
    {
      id: 3,
      date: "2025/08/23",
      time: "8:00 PM",
      size: 2,
      name: "Mecury Paul",
      table: "T4",
      status: "Cancelled",
    },
  ];

  // ✅ Fetch reservations from backend (fallback if fails)
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reservations");
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data = await res.json();
        setReservations(data || fallbackReservations);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setReservations(fallbackReservations);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // ✅ filter reservations based on status
  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "all") return true;
    return reservation.status.toLowerCase() === filter;
  });

  return (
    <div>
      <Navbar />
      <div>
        <h4 className="partner">Partner Dashboard</h4>
      </div>

      {/* Top Stats Section */}
      <div className="partner-grouping">
        <div className="partner-style">
          <div className="icon">
            <FaCalendarAlt />
          </div>
          <div>
            <p>Total Booking</p>
            <p>{reservations.length}</p>
          </div>
        </div>
        <div className="partner-style">
          <div className="icon">
            <GrSchedules />
          </div>
          <div>
            <p>Incoming Reservation</p>
            <p>
              {
                reservations.filter((r) => r.status.toLowerCase() === "pending")
                  .length
              }{" "}
              Today
            </p>
          </div>
        </div>
        <div className="partner-style">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M2 4.5h6.757a3 3 0 0 1 2.122.879L14 8.5m-9 5H2m6.5-6l2 2a1.414 1.414 0 1 1-2 2L7 10c-.86.86-2.223.957-3.197.227L3.5 10" />
                <path d="M5 11v4.5c0 1.886 0 2.828.586 3.414S7.114 19.5 9 19.5h9c1.886 0 2.828 0 3.414-.586S22 17.386 22 15.5v-3c0-1.886 0-2.828-.586-3.414S19.886 8.5 18 8.5H9.5" />
                <path d="M15.25 14a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0" />
              </g>
            </svg>
          </div>
          <div>
            <p>Payout Status</p>
            <div className="status-filled">
              <p>N150,000.00</p>
              <p>pending</p>
            </div>
          </div>
        </div>
        <div className="partner-style">
          <div className="icon">
            <IoEyeOutline />
          </div>
          <div>
            <p>Views This Week</p>
            <p>543</p>
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="alert">
        <div className="alert-text">
          <IoAlert className="alert-icon" />
          <p>New reservation received!</p>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="recent">
        <div className="recent-filter">
          <div>
            <h4>Recent reservations</h4>
          </div>
          <div>
            <select
              id="status"
              className="view-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">View All</option>
              <option value="pending">Status: Pending</option>
              <option value="approved">Status: Approved</option>
              <option value="cancelled">Status: Cancelled</option>
            </select>
          </div>
        </div>

        <div className="recent-table">
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
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6}>Loading...</td>
                  </tr>
                ) : filteredReservations.length > 0 ? (
                  filteredReservations.map((res) => (
                    <tr key={res.id || res._id}>
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No reservations found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DasboardFilled;
