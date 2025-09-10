"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import "../components/styles/Analytics.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type AnalyticsData = {
  date: string;
  bookings: number;
};

const Analytics = () => {
  const [chartData, setChartData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/analytics");
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        // fallback demo data
        setChartData([
          { date: "July", bookings: 50 },
          { date: "Aug", bookings: 60 },
          { date: "Sep", bookings: 25 },
          { date: "Oct", bookings: 59 },
          { date: "Nov", bookings: 18 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="analytics-section">
        <div className="analytics">
          <h2 className="analytics-title">Analytics</h2>
          <div className="analytics-container">
            {/* Total Bookings */}
            <div className="analytics-card">
              <div className="analytics-card-header">
                <FaCalendarAlt className="analytics-icon" />
              </div>
              <div>
                <p>Total Bookings</p>
                <h3>123</h3>
              </div>
            </div>

            {/* Top Time Slots */}
            <div className="analytics-card">
              <div className="analytics-card-header">
                <FaRegClock className="analytics-icon" />
              </div>
              <div>
                <p>Top Time Slots</p>
                <h3>10:00 PM</h3>
              </div>
            </div>

            {/* Total Views */}
            <div className="analytics-card">
              <div className="analytics-card-header">
                <IoEyeOutline className="analytics-icon" />
              </div>
              <div>
                <p>Total Views</p>
                <h3>12,500</h3>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="analytics-card">
              <div className="analytics-card-header">
                <FaArrowTrendUp className="analytics-icon" />
              </div>
              <div>
                <p>Conversion Rate</p>
                <h3>543</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="analytics-container">
          <div className="chart-wrapper">
            <h3 className="analytics-heading">Booking Over Time</h3>
            {loading ? (
              <p>Loading chart...</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} horizontal={true} />
                  <XAxis dataKey="date" tick={{ textAnchor: "middle" }} />
                  <YAxis
                    ticks={[0, 20, 40, 60, 80]}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#eb6e72"
                    strokeWidth={1}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
