"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/styles/Dasboard.css";
import { FaSackDollar } from "react-icons/fa6";
import { PiUserRectangleThin } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";

const DashboardEarnings = () => {
  const [filter, setFilter] = useState({
    status: "all",
    date: "",
  });

  // Convert yyyy-mm-dd → dd/mm/yyyy
  function formatDate(isoDate: string) {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  }

  // Format number/string into Naira currency
  function formatNaira(value: string) {
    if (!value) return "₦0";
    const num = Number(value.toString().replace(/,/g, "")); // remove commas if any
    return num.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    });
  }

  const bookings = [
    {
      id: 1,
      booking_id: "#SK-1015",
      date: "2025-07-24", // use ISO format (yyyy-mm-dd) so <input type="date"> matches
      amount: "15,000.00",
      status: "Paid",
      withdrawal_earnings: "",
    },
    {
      id: 2,
      booking_id: "#SK-1016",
      date: "2025-07-24",
      amount: "15,000.00",
      status: "In escrow",
      withdrawal_earnings: "",
    },
    {
      id: 3,
      booking_id: "#SK-1017",
      date: "2025-08-01",
      amount: "15,000.00",
      status: "Pending",
      withdrawal_earnings: "",
    },
  ];
  const cards = [
    {
      id: 1,
      title: "Total Earning",
      amount: "₦250,000",
      icon: <FaSackDollar />,
      containerBg: "light-green",
      iconBg: "green",
      textColor: "white",
    },
    {
      id: 2,
      title: "In Escrow",
      amount: "₦150,000",
      icon: <PiUserRectangleThin />,
      containerBg: "light-orange",
      iconBg: "orange",
      textColor: "white",
    },
    {
      id: 3,
      title: "Paid Out",
      amount: "₦300,000",
      icon: <FaCheck />,
      containerBg: "light-gray",
      iconBg: "white-gray",
      textColor: "black",
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      filter.status === "all" ||
      booking.status.toLowerCase() === filter.status.toLowerCase();

    const matchesDate = !filter.date || booking.date === filter.date; // only match if a date is picked

    return matchesStatus && matchesDate;
  });

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="dash-earnings">
        <div className="earnings">
          <h3>Earnings and Payouts</h3>
        </div>

        <div className="payout">
          {/* Status Filter */}
          <div>
            <label htmlFor="status"></label>
            <select
              id="status"
              className="view-earnings"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="all">View All</option>
              <option value="pending">Status: Pending</option>
              <option value="paid">Status: Paid</option>
              <option value="in Escrow">Status: In Escrow</option>
            </select>
          </div>

          {/* Dynamic Date Filter */}
          <div>
            <label htmlFor="date"></label>
            <select
              id="date"
              className="view-earnings-date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            >
              <option value="">Date</option>
              {Array.from(new Set(bookings.map((b) => b.date))).map(
                (date, i) => (
                  <option key={i} value={date}>
                    {date}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="cards-setting">
          <div className="cards-container">
            {cards.map((card) => (
              <div key={card.id} className={`card ${card.containerBg}`}>
                <div className={`icon ${card.iconBg} ${card.textColor}`}>
                  {card.icon}
                </div>
                <div className="card-content">
                  <p className="title">{card.title}</p>
                  <p className="amount">{card.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th className="withdraw-head">Withdrawa@Earnings</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.booking_id}>
                  <td>{b.booking_id}</td>
                  <td>{formatDate(b.date)}</td>
                  <td>
                    <span
                      className={`status ${b.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>{formatNaira(b.amount)}</td>
                  <td>{b.withdrawal_earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardEarnings;
