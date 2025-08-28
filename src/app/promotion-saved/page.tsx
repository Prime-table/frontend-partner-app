"use client";
import React from "react";
import { useRouter } from "next/navigation"; 
import { FaCheck } from "react-icons/fa";
import "../components/styles/Promotion.css"; // external CSS 
import Navbar from "../components/Navbar/Navbar";

const PromotionSaved = () => {
  const router = useRouter();

  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className="promotion-saved">
      <div className="icon-wrapper">
        <FaCheck className="check-icon" />
      </div>
      <h2>Promotion saved</h2>
      <p>Promotion has been saved successfully</p>
      <button
        className="view-reservation-btn"
        onClick={() => router.push("/reservations")}
      >
        View Reservation
      </button>
    </div>
    </div>
  );
};

export default PromotionSaved;
