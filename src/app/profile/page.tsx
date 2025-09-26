"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import "../../component/styles/Profile.css";
import Image from "next/image";


const UserProfile = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // ✅ get token from localStorage
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }

        const res = await fetch(
          "https://backend-partner-app.onrender.com/restaurants/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // ✅ token is now sent
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `Failed to fetch: ${res.status} ${res.statusText} — ${text}`
          );
        }

        const data = await res.json();

        // Ensure we always work with an array
        setProfiles(Array.isArray(data) ? data : [data]);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong while fetching profile.");
      } finally {
        setLoading(false);
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

        {loading ? (
          <div className="loading-state">
            <p>Loading profile...</p>
          </div>
        ) : (
          <>
            {error && <p className="warning">{error}</p>}

            {profiles.length === 0 ? (
              <p>No profiles available yet.</p>
            ) : (
              profiles.map((profile) => (
                <div key={profile._id} className="profile-section">
                  <div className="profile-indicator">
                    <div className="circular-object"></div>
                    <h3 className="big-taste">
                      {profile.restaurantName || "Unnamed Restaurant"}
                    </h3>
                  </div>

                  <div className="reservation-container">
                    <div>
                      <p>Total Reservation</p>
                      <p>{profile.totalReservation ?? 0}</p>
                    </div>
                    <div>
                      <p>Pending Reservation</p>
                      <p>{profile.pendingReservation ?? 0}</p>
                    </div>
                    <div>
                      <p>Approved Reservation</p>
                      <p>{profile.approvedReservation ?? 0}</p>
                    </div>
                    <div>
                      <p>Pending Revenue</p>
                      <p>
                        {typeof profile.pendingRevenue === "number"
                          ? profile.pendingRevenue.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            })
                          : profile.pendingRevenue ?? "-"}
                      </p>
                    </div>
                  </div>

                  <div className="address-container">
                    <div>
                      <h5>Address</h5>
                      <p>{profile.address || "No address provided"}</p>
                    </div>
                    <div>
                      <h5>Hours</h5>
                      <p>
                        {profile.openAt || "—"} - {profile.closeAt || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="description-container">
                    <div className="description">
                      <h5>Description</h5>
                      <p>{profile.description || "No description provided."}</p>
                    </div>

                    <div className="premium-container">
                      <div>
                        <h5>Payment Method</h5>
                        <p>{profile.paymentMethod || "N/A"}</p>
                      </div>
                      <div>
                        <h5>Premium Tables</h5>
                        <p>{profile.premiumTable ? "Yes" : "No"}</p>
                      </div>
                      <div>
                        <h5>Price per Table</h5>
                        <p>{profile.pricePerTable ?? "-"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="image-container">
                    {profile.restaurantPhoto ? (
                      <Image
                        src={profile.restaurantPhoto}
                        alt="Restaurant main"
                        width={200}
                        height={150}
                        className="preview-img"
                      />
                    ) : (
                      <div className="first-image placeholder" />
                    )}

                    {profile.secondaryPhoto ? (
                      <Image
                        src={profile.secondaryPhoto}
                        alt="Restaurant secondary"
                        width={180}
                        height={90}
                        className="preview-img"
                      />
                    ) : (
                      <div className="second-image placeholder" />
                    )}

                    {profile.thirdPhoto ? (
                      <Image 
                        src={profile.thirdPhoto}
                        alt="Restaurant third"
                        width={180}
                        height={90}
                        className="preview-img"
                      />
                    ) : (
                      <div className="third-image placeholder" />
                    )}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
