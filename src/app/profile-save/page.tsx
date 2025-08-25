"use client";

import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa"; // white check icon
import "../components/styles/ProfileSave.css";
import Navbar from "../components/Navbar/Navbar";

const ProfileSavePage = () => {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push("/profile"); // navigate to profile page
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="profile-save-page">
      <div className="profile-save-container">
        <div className="icon-wrapper">
          <FaCheck className="check-icon" />
        </div>
        <h1 className="profile-save-headline">Profile Saved</h1>
        <p className="profile-save-text">You can now manage your reservation</p>
        <button className="btn-view-profile" onClick={handleViewProfile}>
          View Profile
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProfileSavePage;
