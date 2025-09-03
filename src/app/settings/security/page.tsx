"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../components/styles/Settings.css";
import Navbar from "@/app/components/Navbar/Navbar";

const SecuritySettings = () => {
  const router = useRouter();

  // Local state for security form
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle save changes (submit to API)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:1990/api/security/update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Navigate to Communication Reference after success
        router.push("/settings/communication");
      } else {
        console.error("Failed to update security settings");
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
            <Link href="/settings/profile-settings" className="tab">
              Profile
            </Link>
            <Link href="/settings/payout-details" className="tab">
              Payout Details
            </Link>
            <Link href="/settings/security" className="tab active">
              Security
            </Link>
            <Link href="/settings/communication" className="tab">
              Communication Reference
            </Link>
          </div>
          <hr className="tab-line" />

          {/* Security Settings Form */}
          <h3 className="profile-header">Security</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-div">
              <div className="form-container">
                <div className="form-row">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Enter current password"
                    value={formData.currentPassword || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword || ""}
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

export default SecuritySettings;
