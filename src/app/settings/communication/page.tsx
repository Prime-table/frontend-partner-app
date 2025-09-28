"use client";

import React, { useState, useEffect } from "react";
import "../../../component/styles/Settings.css";
import Navbar from "@/component/Navbar/Navbar";

const CommunicationReference = () => {
  const [emailSettings, setEmailSettings] = useState({
    promotions: false,
    bookings: false,
    system: false,
  });

  const [smsSettings, setSmsSettings] = useState({
    promotions: false,
    bookings: false,
    system: false,
  });

  const [pushNotifications, setPushNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const partnerId = typeof window !== "undefined" ? localStorage.getItem("partnerId") : null;

  // Fetch existing settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      if (!partnerId) return;

      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/prime-table-partner/settings/communication?partnerId=${partnerId}`
        );

        if (!res.ok) {
          console.warn("No saved communication settings found");
          setLoading(false);
          return;
        }

        const data = await res.json();

        // Set state based on fetched settings
        setEmailSettings(data.emailSettings || { promotions: false, bookings: false, system: false });
        setSmsSettings(data.smsSettings || { promotions: false, bookings: false, system: false });
        setPushNotifications(data.pushNotifications || false);
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [partnerId]);

  const handleEmailToggle = (field: keyof typeof emailSettings) => {
    setEmailSettings({ ...emailSettings, [field]: !emailSettings[field] });
  };

  const handleSmsToggle = (field: keyof typeof smsSettings) => {
    setSmsSettings({ ...smsSettings, [field]: !smsSettings[field] });
  };

  const handleSave = async () => {
    if (!partnerId) {
      alert("Partner ID not found. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/prime-table-partner/settings/communication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId, emailSettings, smsSettings, pushNotifications }),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      const data = await response.json();
      console.log("Response from server:", data);
      alert("Settings saved successfully ✅");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="communication">
        <div className="settings-page">
          <h3 className="settings-header">Settings</h3>

          {/* Tabs */}
          <div className="settings-tabs">
            <a href="/settings/profile-settings">Profile</a>
            <a href="/settings/payout-details">Payout Details</a>
            <a href="/settings/security">Security</a>
            <a href="/settings/communication" className="active">
              Communication Reference
            </a>
          </div>
          <hr />

          <h3 className="profile-header">Communication Reference</h3>
          {loading ? (
            <p>Loading settings...</p>
          ) : (
            <div className="comm-container">
              {/* Email Notifications */}
              <div className="comm-section">
                <h4>Email Notifications</h4>
                {Object.entries(emailSettings).map(([key, value]) => (
                  <div className="comm-option" key={key}>
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleEmailToggle(key as keyof typeof emailSettings)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                ))}
              </div>

              <hr />

              {/* SMS Notifications */}
              <div className="comm-section">
                <h4>SMS Notifications</h4>
                {Object.entries(smsSettings).map(([key, value]) => (
                  <div className="comm-option" key={key}>
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleSmsToggle(key as keyof typeof smsSettings)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                ))}
              </div>

              <hr />

              {/* Push Notifications */}
              <div className="comm-section">
                <h4>Push Notifications</h4>
                <div className="comm-option">
                  <span>Enable Push Notifications</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={() => setPushNotifications(!pushNotifications)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <button className="save-last-btn" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationReference;
