"use client";

import { useState } from "react";
import Image from "next/image";
import "../../component/styles/Auth.css";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://backend-partner-app.onrender.com";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // 🔹 Save token & user/partnerId if available
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.partnerId || data.userId || data._id) {
          localStorage.setItem("partnerId", data.partnerId || data.userId || data._id);
        }

        router.push("/profile-form");
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Image
        src="/logo.png"
        alt="Prime Table Logo"
        width={200}
        height={80}
        className="auth-logo"
      />

      <div className="auth-container">
        <h1 className="auth-title">Partner Registration</h1>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="auth-input"
        />

        <button
          className="auth-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => router.push("/profile-form")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
