"use client";

import { useState } from "react";
import Image from "next/image";
import "../components/styles/Auth.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
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
        <h1 className="auth-title">Partner Login</h1>
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
        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-link" onClick={() => alert("Forgot password?")}>
          Forgot password?
        </p>

        <p className="auth-switch">
          Don&apos;t have an account?{" "}
          <span onClick={() => router.push("/registration")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
