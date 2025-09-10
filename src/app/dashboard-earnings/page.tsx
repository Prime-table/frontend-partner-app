"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/styles/Dasboard.css";
import { FaSackDollar } from "react-icons/fa6";
import { PiUserRectangleThin } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";

const DashboardEarnings = () => {
  const [filter, setFilter] = useState({ status: "all", date: "" });
  const [bookings, setBookings] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback static data
  const fallbackBookings = [
    {
      id: 1,
      booking_id: "#SK-1015",
      date: "2025-07-24",
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

  const fallbackCards = [
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:1990/mnb/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBookings(data.bookings || fallbackBookings);
        setCards(data.cards || fallbackCards);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setBookings(fallbackBookings);
        setCards(fallbackCards);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Convert yyyy-mm-dd → dd/mm/yyyy
  function formatDate(isoDate: string) {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  }

  // Format into Naira
  function formatNaira(value: string) {
    if (!value) return "₦0";
    const num = Number(value.toString().replace(/,/g, ""));
    return num.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    });
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      filter.status === "all" ||
      booking.status.toLowerCase() === filter.status.toLowerCase();

    const matchesDate = !filter.date || booking.date === filter.date;
    return matchesStatus && matchesDate;
  });

  return (
    <div>
      <Navbar />
      <div className="dash-earnings">
        <div className="earnings">
          <h3>Earnings and Payouts</h3>
        </div>

        <div className="payout">
          {/* Status Filter */}
          <div>
            <select
              id="status"
              className="view-earnings"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="all">View All</option>
              <option value="pending">Status: Pending</option>
              <option value="paid">Status: Paid</option>
              <option value="in escrow">Status: In Escrow</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
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

        {/* Cards */}
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

        {/* Bookings Table */}
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th className="withdraw-head">Withdrawal Earnings</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
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
                    <td>{b.withdrawal_earnings || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardEarnings;
