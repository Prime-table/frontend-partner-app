"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../components/styles/Settings.css";
import Navbar from "../components/Navbar/Navbar";

const ProfileSettings = () => {
  const router = useRouter();

  // Local state for form
  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    phone: "",
    contactPerson: "",
    password: "",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle save changes (submit to API)
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Example endpoint
      const response = await fetch("http://localhost:1990/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navigate to payout-details after success
        router.push("/settings/payout-details");
      } else {
        console.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="setting">
        <div className="settings-page">
          {/* Header */}
          <h3 className="settings-header">Settings</h3>

          {/* Tab Navigation */}
          <div className="settings-tabs">
            <Link href="/settings/profile-settings" className="tab active">
              Profile
            </Link>
            <Link href="/settings/payout-details" className="tab">
              Payout Details
            </Link>
            <Link href="/settings/security" className="tab">
              Security
            </Link>
            <Link href="/settings/communication" className="tab">
              Communication Reference
            </Link>
          </div>
          <hr className="tab-line" />

          {/* Profile Settings Form */}
          <h3 className="profile-header">Profile Settings</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-div">
              <div className="form-container">
                <div className="form-row">
                  <label>Restaurant Name</label>
                  <input
                    type="text"
                    name="restaurantName"
                    placeholder="Enter restaurant name"
                    value={formData.restaurantName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="Enter contact person name"
                    value={formData.contactPerson || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Save button */}
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
