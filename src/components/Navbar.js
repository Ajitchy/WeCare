import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userType = useSelector((state) => state.userType); 

  // If userType is not defined (no user logged in), show generic navbar
  if (!userType) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand link-light fw-bolder" href='/'>WeCare</a>
            <div className="d-flex align-items-center ms-auto">
              <span className="material-icons align-middle link-light">call</span>
              <a className='btn btn-link link-light' href='tel:082-233-447' role='button'>Call us: 08 2233447</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  // If userType is 'user' or 'coach', show user-specific or coach-specific navbar
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand link-light fw-bolder" href='/'>WeCare</a>
          {userType === 'user' && (
            <div className="navbar-nav ms-auto">
              <a className="nav-link link-light" href="/UserViewProfile">View Profile</a>
              <a className="nav-link link-light" href="/UserAppointments">My Appointments</a>
              <a className="nav-link link-light" href="/logout">Logout</a>
            </div>
          )}
          {userType === 'coach' && (
            <div className="navbar-nav ms-auto">
              <a className="nav-link link-light" href="/CoachViewProfile">View Profile</a>
              <a className="nav-link link-light" href="/CoachSchedules">My Schedules</a>
              <a className="nav-link link-light" href="/logout">Logout</a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
