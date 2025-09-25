"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/styles/Profile.css";
import Image from "next/image";

const UserProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback single-profile (used when fetch fails)
  const fallbackProfiles = [
    {
      _id: "fallback-1",
      restaurantName: "Big Taste",
      totalReservation: 500,
      pendingReservation: 12,
      approvedReservation: 550,
      pendingRevenue: 42300,
      address: "1234 Culinary Ave., Foodsville, CA 987854",
      openAt: "11:00 AM",
      closeAt: "09:00 PM",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ac aliquam ultrices massa aenean risus etiam ac tristique habitasse.",
      paymentMethod: "Bank Transfer",
      premiumTable: true,
      pricePerTable: "$400",
      restaurantPhoto: null,
      secondaryPhoto: null,
    },
  ];

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000/prime-table-partner";

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/restaurants/profile`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // If backend returns a single object, normalize to array
        if (!Array.isArray(data)) {
          setProfiles([data]);
        } else {
          setProfiles(data.length ? data : fallbackProfiles);
        }
      } catch (err: any) {
        console.warn("Fetch profiles failed — using fallback. Error:", err);
        setError("Unable to fetch profiles. Showing fallback data.");
        setProfiles(fallbackProfiles);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [API_BASE_URL]);

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
                    {/* First Image / main */}
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

                    {/* Secondary */}
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

                    {/* Third image - optional fallback */}
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
