"use client"
import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import '../components/styles/Analytics.css'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"; 

const data = [
  { date: "July", bookings: 50 },
  { date: "Aug", bookings: 60 },
  { date: "Sep", bookings: 25 },
  { date: "Oct", bookings: 59 },
  { date: "Nov", bookings: 18 },
];

const Analytics = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='analytics-section'>
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
        <div className="analytics-container">
          <div className="chart-wrapper">
            <h3 className="analytics-heading">Booking Over Time</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid vertical={false} horizontal={true} />
                
                {/* Center X-axis labels */}
                <XAxis 
                  dataKey="date" 
                  tick={{ textAnchor: "middle" }} 
                />

                {/* Hide Y-axis line & ticks */}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
