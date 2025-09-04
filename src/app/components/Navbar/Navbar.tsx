"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "../styles/Navbar.css"; // import external css

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Replace this URL with your actual logout API endpoint
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if using cookies
      });

      if (response.ok) {
        // Optionally clear localStorage/sessionStorage
        localStorage.removeItem("token"); 
        sessionStorage.clear();

        // Redirect to login page
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Image src="/images/logo.png" alt="Prime Table Logo" width={120} height={40} />
      </div>

      <ul className="navbar-menu">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/reservations">Reservations</Link></li>
        <li><Link href="/promotions">Promotions</Link></li>
        <li><Link href="/analytics">Analytics</Link></li>
        <li><Link href="/settings">Settings</Link></li>
        <li>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="mobile-menu">
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/reservations">Reservations</Link></li>
          <li><Link href="/analytics">Analytics</Link></li>
          <li><Link href="/settings">Settings</Link></li>
          <li>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
