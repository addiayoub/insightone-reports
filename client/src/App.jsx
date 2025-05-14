import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './connexion/Login';
import { UserDashboard } from './connexion/UserDashboard';
import AdminDashboard from './connexion/AdminDashboard';
import { useEffect, useState } from 'react';
import { SettingsProvider } from './settings/SettingsContext';
import './App.css';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (token) {
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }
  
  return children;
};

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/" />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }
  
  return children;
};

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/user-dashboard" 
            element={
              <PrivateRoute requiredRole="user">
                <UserDashboard />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/admin-dashboard" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;//////////////////////////////////////////////////////////////////////////////