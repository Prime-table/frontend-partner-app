"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../components/styles/Settings.css";
import Navbar from "@/component/Navbar/Navbar";

const SecuritySettings = () => {
  const router = useRouter();

  // Local state for security form
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const partnerId = localStorage.getItem("partnerId");
    if (!partnerId) {
      setMessage({ type: "error", text: "Partner user ID not found. Please log in again." });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New password and confirm password do not match." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        "http://localhost:5000/prime-table-partner/security/update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, partnerId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Security settings updated successfully!" });
        setTimeout(() => router.push("/settings/communication"), 1500);
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update security settings." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="setting">
        <div className="settings-page">
          <h3 className="settings-header">Settings</h3>

          {/* Tab Navigation */}
          <div className="settings-tabs">
            <Link href="/settings/profile-settings" className="tab">Profile</Link>
            <Link href="/settings/payout-details" className="tab">Payout Details</Link>
            <Link href="/settings/security" className="tab active">Security</Link>
            <Link href="/settings/communication" className="tab">Communication Reference</Link>
          </div>
          <hr className="tab-line" />

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
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {message && (
              <p className={message.type === "success" ? "success-message" : "error-message"}>
                {message.text}
              </p>
            )}

            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
