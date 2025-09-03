import React from "react";
import "../components/styles/Dasboard.css";
import Navbar from "../components/Navbar/Navbar";
import { FaCalendarAlt } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { IoEyeOutline } from "react-icons/io5";

const DasboardEmpty = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <h4 className="partner">Partner Dasboard</h4>
      </div>
      <div className="partner-grouping">
        <div className="partner-style">
          <div className="icon">
            <FaCalendarAlt />
          </div>
          <div>
            <p>Total Booking</p>
            <p>0</p>
          </div>
        </div>
        <div className="partner-style">
          <div className="icon">
            <GrSchedules />
          </div>
          <div>
            <p>Incoming Reservation</p>
            <p>0</p>
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
            <div className="status">
              <p>N0.00</p>
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
            <p>0</p>
          </div>
        </div>
      </div>
      <div className="no-reservation">
        <h4>No recent reservations</h4>
        <p>You don&apos;t have recent reservation to display.</p>
      </div>
    </div>
  );
};

export default DasboardEmpty;
