"use client";

import { useRouter } from "next/navigation";
import "../components/styles/Welcome.css";
import Navbar from "../components/Navbar/Navbar";

const WelcomePage = () => {
  const router = useRouter();

  const handleSetupProfile = async () => {
    try {
      // Example API call: replace with your actual endpoint
      const response = await fetch("/api/setup-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "currentUserId" }), // Add actual data
      });

      if (!response.ok) throw new Error("Failed to set up profile");

      // Redirect after successful setup
      router.push("/profile");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="welcome-page">
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome to Prime Table!</h1>
        <p className="welcome-subtitle">Set up your profile to get started</p>
        <button className="welcome-btn" onClick={handleSetupProfile}>
          Set Up Profile
        </button>
      </div>
    </div>
    </div>
  );
};

export default WelcomePage;
