"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../components/styles/Promotion.css"; // external css file
import Navbar from "../components/Navbar/Navbar";

const PromotionForm = () => {
  const [promotion, setPromotion] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/reservations"); // ✅ navigate to reservations page
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPromotion({ ...promotion, [name]: value });
  };

  const handleSavePromotion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // API endpoint for saving promotions
      const res = await fetch("http://localhost:3000/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promotion),
      });

      const data = await res.json();
      console.log("Saving promotion:", promotion);

      if (res.ok) {
        alert("Promotion saved successfully!");
        router.push("/promotion-saved"); // ✅ redirect after success
      } else {
        alert(data.message || "Failed to save promotion!");
      }
    } catch (error) {
      console.error("Error saving promotion:", error);
      alert("Something went wrong, please try again.");
    }
  }; // ✅ FIX: close function here

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="promotion-form-container">
        <h2>Promotion Form</h2>
        <p>
          Create time-limited offers to attract more reservations. Promotions
          are visible to your customers on your profile.
        </p>

        <form onSubmit={handleSavePromotion} className="promotion-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={promotion.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={promotion.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Start & End Date */}
          <div
            className="form-dates"
            style={{ display: "flex", gap: "0.4rem" }}
          >
            <div className="form-group">
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={promotion.startDate}
                onChange={handleChange}
                required
                className="date-input"
              />
            </div>

            <div className="form-group">
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={promotion.endDate}
                onChange={handleChange}
                required
                className="date-input"
              />
            </div>
          </div>

          {/* Button */}
          <button type="submit" className="save-btn">
            Save Promotion
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromotionForm;
