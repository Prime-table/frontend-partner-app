import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import '../components/styles/Profile.css'

const UserProfile = () => {
  return (
    <div>
        <div>
            <Navbar />
        </div>
       <div className='profile-edit'>
         <div className='profile-header'>
            <h3 >
                Profile
                </h3>
            <div>
                <button className='edit-button'>
                    Edit Profile
                    </button>
            </div>
        </div>
        <div className='profile-section'>
            <div className='profile-indicator'>
                <div className='circular-object'></div>
                <h3 className='big-taste'>Big Taste</h3>
            </div>
            <div className='reservation-container'>
                <div>
                    <p>Total Reservation</p>
                    <p>500</p>
                </div>
                <div>
                    <p>Pending Reservation</p>
                    <p>12</p>
                </div>
                <div>
                    <p>Approved Reservation</p>
                    <p>550</p>
                </div>
                <div>
                    <p>Pending Revenue</p>
                    <p>$42,300</p>
                </div>
            </div>
            <div className='address-container'>
                <div>
                    <h5>Address</h5>
                    <p>1234 Culinary Ave., Foodsville, CA 987854</p>
                </div>
                <div>
                    <h5>Hours</h5>
                    <p>Monday - Sunday: 11:00 AM - 9:00 PM</p>
                </div>
            </div>
            <div className='description-container'>
                <div className='description'>
                    <h5>Description</h5>
                    <p>Lorem ipsum dolor sit amet consectetur. Ac aliquam ultrices <br />massa aenean risus etiam ac tristique habitasse.</p>
                </div>
                <div className='premium-container'>
                    <div>
                        <h5>Payment Method</h5>
                        <p>Bank Transfer</p>
                    </div>
                    <div>
                        <h5>Premium Tables</h5>
                        <p>Yes</p>
                    </div>
                </div>
            </div>
            <div className='image-container'>
                <div className='first-image'></div>
                <div className='second-image'></div>
                <div className='third-image'></div>
            </div>
        </div>
       </div>
    </div>
  )
}

export default UserProfile