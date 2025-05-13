// UserDashboard.jsx
import React, { useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

export const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Animation d'entrée
    document.querySelector('.user-dashboard').classList.add('animate__animated', 'animate__fadeInUp');
  }, []);

  const handleLogout = () => {
    // Supprimer les informations de session
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    
    // Rediriger vers la page de connexion
    navigate('/');
  };

  return (
    <div className="dashboard-container user-dashboard">
      <div className="dashboard-header animate__animated animate__fadeIn">
        <h1>Welcome User</h1>
        <p>Your personalized dashboard</p>
        <button 
          className="logout-btn animate__animated animate__fadeIn" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};