"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/styles/Profile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState<any>({
    name: "Big Taste",
    totalReservation: 500,
    pendingReservation: 12,
    approvedReservation: 550,
    pendingRevenue: 42300,
    address: "1234 Culinary Ave., Foodsville, CA 987854",
    hours: "Monday - Sunday: 11:00 AM - 9:00 PM",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ac aliquam ultrices massa aenean risus etiam ac tristique habitasse.",
    paymentMethod: "Bank Transfer",
    premiumTables: true,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 🔹 Replace with real backend when ready
        const res = await fetch("http://localhost:5000/api/profile");
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.warn("Using fallback dummy profile. Error:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profile-edit">
        <div className="profile-header">
          <h3>Profile</h3>
          <button className="edit-button">Edit Profile</button>
        </div>

        <div className="profile-section">
          <div className="profile-indicator">
            <div className="circular-object"></div>
            <h3 className="big-taste">{profile.name}</h3>
          </div>

          <div className="reservation-container">
            <div>
              <p>Total Reservation</p>
              <p>{profile.totalReservation}</p>
            </div>
            <div>
              <p>Pending Reservation</p>
              <p>{profile.pendingReservation}</p>
            </div>
            <div>
              <p>Approved Reservation</p>
              <p>{profile.approvedReservation}</p>
            </div>
            <div>
              <p>Pending Revenue</p>
              <p>${profile.pendingRevenue}</p>
            </div>
          </div>

          <div className="address-container">
            <div>
              <h5>Address</h5>
              <p>{profile.address}</p>
            </div>
            <div>
              <h5>Hours</h5>
              <p>{profile.hours}</p>
            </div>
          </div>

          <div className="description-container">
            <div className="description">
              <h5>Description</h5>
              <p>{profile.description}</p>
            </div>
            <div className="premium-container">
              <div>
                <h5>Payment Method</h5>
                <p>{profile.paymentMethod}</p>
              </div>
              <div>
                <h5>Premium Tables</h5>
                <p>{profile.premiumTables ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          <div className="image-container">
            <div className="first-image"></div>
            <div className="second-image"></div>
            <div className="third-image"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
