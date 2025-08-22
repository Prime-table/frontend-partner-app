"use client";

import { useState } from "react";
import Image from "next/image";
import "../components/styles/Auth.css";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/welcome");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <Image src="/logo.png" alt="Prime Table Logo" width={200} height={80} className="auth-logo" />

      <div className="auth-container">
        <h1 className="auth-title">Partner Registration</h1>
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
        <button className="auth-btn" onClick={handleRegister}>Register</button>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => router.push("/login")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
