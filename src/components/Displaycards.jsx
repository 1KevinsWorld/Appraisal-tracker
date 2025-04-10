// frontend/components/Displaycards.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/Styles/Dashboard.css';
import userdisplay from '../assets/user-display-grad.png';
import projectsdisplay from '../assets/projects-display-grad.png';
import pendingdisplay from '../assets/pending-display-grad.png';
import leavedisplay from '../assets/leave-display-grad.png';
import { Link } from 'react-router-dom';

const Displaycards = () => {
  const [stats, setStats] = useState({
    projects: 0,
    pending: 0,
    daysOff: 0
  });
  const axiosBaseURL= "https://employee-management-server-f7k2.onrender.com/api"

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${axiosBaseURL}/user/getdashboardstats`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add token if required
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 m-2">
        <div className="col">
          <div className="card h-100 py-4 display-card-border display-card-green">
            <div className="d-flex justify-content-between align-items-center">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h4 className="card-title text-dark">PROJECTS</h4>
                <p className="card-text stat-text">{stats.projects}</p>
              </div>
              <div className="col-4">
                <img src={projectsdisplay} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 py-4 display-card-border display-card-red">
            <div className="d-flex justify-content-between align-items-center">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h4 className="card-title text-dark">PENDING</h4>
                <p className="card-text stat-text">{stats.pending}</p>
              </div>
              <div className="col-4">
                <img src={pendingdisplay} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 py-4 display-card-border display-card-yellow">
            <div className="d-flex justify-content-between align-items-center">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h4 className="card-title text-dark">DAYS OFF</h4>
                <p className="card-text stat-text">{stats.daysOff}</p>
              </div>
              <div className="col-4">
                <img src={leavedisplay} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 py-4 display-card-border display-card-blue">
            <div className="d-flex justify-content-between align-items-center">
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h4 className="card-title text-dark">PROFILE</h4>
                <h6>
                  <Link to="/myprofile">Update Profile</Link>
                </h6>
              </div>
              <div className="col-4">
                <img src={userdisplay} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Displaycards;
