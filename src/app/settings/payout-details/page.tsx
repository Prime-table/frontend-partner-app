"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../components/styles/Settings.css";
import Navbar from "@/app/components/Navbar/Navbar";

const PayoutSettings = () => {
  const router = useRouter();

  // Local state for payout form
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    paymentFrequency: "",
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
      const response = await fetch("http://localhost:1990/api/payout/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navigate to Security after success
        router.push("/settings/security");
      } else {
        console.error("Failed to update payout details");
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
            <Link href="/settings/payout-details" className="tab active">
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

          {/* Payout Settings Form */}
          <h3 className="profile-header">Payout Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-div">
              <div className="form-container">
                <div className="form-row">
                  <label>Bank Name</label>
                  <select
                    name="bankName"
                    value={formData.bankName || ""}
                    onChange={handleChange}
                    className="bank"
                  >
                    <option value="">Example</option>
                    <option value="First Bank">First Bank</option>
                    <option value="Wema Bank">Wema Bank</option>
                    <option value="Sterling">Sterling Bank</option>
                    <option value="FCMB">First City Monument Bank</option>
                  </select>
                </div>

                <div className="form-row">
                  <label>Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter account number"
                    value={formData.accountNumber || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Account Holder Name</label>
                  <input
                    type="text"
                    name="accountHolder"
                    placeholder="Enter account holder name"
                    value={formData.accountHolder || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Payment Frequency</label>
                  <input
                    type="text"
                    name="paymentFrequency"
                    placeholder="Enter payment frequency (e.g. Weekly, Monthly)"
                    value={formData.paymentFrequency || ""}
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

export default PayoutSettings;
