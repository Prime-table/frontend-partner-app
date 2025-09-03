"use client";
import React, { useState } from "react";
import "../../components/styles/Settings.css";
import Navbar from "@/app/components/Navbar/Navbar";

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

  const handleEmailToggle = (field: keyof typeof emailSettings) => {
    setEmailSettings({ ...emailSettings, [field]: !emailSettings[field] });
  };

  const handleSmsToggle = (field: keyof typeof smsSettings) => {
    setSmsSettings({ ...smsSettings, [field]: !smsSettings[field] });
  };

  const handleSave = async () => {
    console.log("Saved Settings:", {
      emailSettings,
      smsSettings,
      pushNotifications,
    });

    try {
      const response = await fetch(
        "http://localhost:1990/api/settings/communication",
        {
          method: "POST", // or PUT depending on backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailSettings,
            smsSettings,
            pushNotifications,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      const data = await response.json();
      console.log("Response from server:", data);

      alert("Settings saved successfully ✅");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
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
          <div className="comm-container">
            {/* Email Notifications */}
            <div className="comm-section">
              <h4>Email Notifications</h4>
              <div className="comm-option">
                <span>Promotion Updates</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={emailSettings.promotions}
                    onChange={() => handleEmailToggle("promotions")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="comm-option">
                <span>Booking Alerts</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={emailSettings.bookings}
                    onChange={() => handleEmailToggle("bookings")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="comm-option">
                <span>System Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={emailSettings.system}
                    onChange={() => handleEmailToggle("system")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <hr />

            {/* SMS Notifications */}
            <div className="comm-section">
              <h4>SMS Notifications</h4>
              <div className="comm-option">
                <span>Promotion Updates</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={smsSettings.promotions}
                    onChange={() => handleSmsToggle("promotions")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="comm-option">
                <span>Booking Alerts</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={smsSettings.bookings}
                    onChange={() => handleSmsToggle("bookings")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="comm-option">
                <span>System Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={smsSettings.system}
                    onChange={() => handleSmsToggle("system")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
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
          </div>

          {/* Save Changes */}
          <button className="save-last-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationReference;
