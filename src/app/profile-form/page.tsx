"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../components/styles/Profile.css";
import Navbar from "../components/Navbar/Navbar";

const times = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

const ProfilePage = () => {
  const [restaurantPhoto, setRestaurantPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [secondaryPhoto, setSecondaryPhoto] = useState<File | null>(null);
  const [secondaryPreview, setSecondaryPreview] = useState<string | null>(null);

  const router = useRouter();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRestaurantPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSecondaryPhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setSecondaryPhoto(file);
      setSecondaryPreview(URL.createObjectURL(file));
    }
  };
  type RestaurantFormFields = {
    restaurantName: { value: string };
    address: { value: string };
    openAt: { value: string };
    closeAt: { value: string };
    premiumTable: { value: string };
    pricePerTable: { value: string };
    description: { value: string };
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & RestaurantFormFields;
    const formData = new FormData();
    formData.append("restaurantName", target.restaurantName.value);
    formData.append("address", target.address.value);
    formData.append("openAt", target.openAt.value);
    formData.append("closeAt", target.closeAt.value);
    formData.append("premiumTable", target.premiumTable.value);
    formData.append("pricePerTable", target.pricePerTable.value);
    formData.append("description", target.description.value);
    if (restaurantPhoto) formData.append("restaurantPhoto", restaurantPhoto);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to save profile");
      alert("Profile saved successfully!");

      // Navigate to /profile-save after successful submission
      router.push("/profile-save");
    } catch (err) {
      console.error(err);
      alert("Error saving profile.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-page large-container">
        <h1 className="profile-headline">Profile Form</h1>
        <form className="profile-container" onSubmit={handleSubmit}>
          <label>
            Restaurant Name
            <input
              type="text"
              name="restaurantName"
              required
              className="tall-input"
            />
          </label>

          <label>
            Address
            <input type="text" name="address" required className="tall-input" />
          </label>

          {/* Hours + First Upload */}
          <div className="hours-upload-row">
            <div className="hours-section">
              <h5 className="hours-headline">Hours of Operation</h5>
              <div className="hours-select">
                <label>
                  Open At
                  <select name="openAt">
                    {times.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Close At
                  <select name="closeAt">
                    {times.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="photo-upload">
              <label className="restaurant">Upload a restaurant Photo</label>
              <div className="upload-container">
                <div className="choose-file">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(e)}
                  />
                  <span>Choose File</span>
                </div>
                <div className="drag-drop-preview">
                  <p>Drag & Drop</p>
                  <span className="image-preview-label">
                    Image <br />
                    Preview
                  </span>
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="preview-img"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Premium & Price aligned vertically with first upload container */}
          <div className="row premium-price-row">
            <label>
              Premium Table? (Optional)
              <select name="premiumTable">
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>

            <label>
              Price per Table
              <input type="text" name="pricePerTable" defaultValue="$400" />
            </label>
          </div>

          {/* Second Photo Upload */}
          <div className="photo-upload-small">
            <label className="restaurant">Upload a restaurant Photo</label>
            <div className="upload-container">
              <div className="choose-file">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSecondaryPhotoChange(e)}
                />
                <span>Choose File</span>
              </div>
              <div className="drag-drop-preview">
                <p>Drag & Drop</p>
                <span className="image-preview-label">
                  Image <br /> Preview
                </span>
                {secondaryPreview && (
                  <img
                    src={secondaryPreview}
                    alt="Preview"
                    className="preview-img"
                  />
                )}
              </div>
            </div>
          </div>

          <label>
            Description
            <textarea name="description" rows={4}></textarea>
          </label>

          <button type="submit" className="btn-save">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
