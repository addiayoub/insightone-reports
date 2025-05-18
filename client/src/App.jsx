import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './connexion/Login';
import  UserDashboard  from './connexion/UserDashboard';
import AdminDashboard from './connexion/AdminDashboard';
import { useEffect, useState, useRef } from 'react';
import { SettingsProvider } from './settings/SettingsContext';
import './App.css';

// Composant d'introduction vidéo
const IntroVideo = ({ onComplete }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleVideoEnd = () => {
        onComplete();
      };
      
      videoElement.addEventListener('ended', handleVideoEnd);
      
      // Nettoyage de l'événement
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [onComplete]);

  return (
    <div className="intro-container">
      <video 
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        src="/intro reports.mp4"
      >
        Votre navigateur ne prend pas en charge la lecture vidéo.
      </video>
    </div>
  );
};

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
  const [showIntro, setShowIntro] = useState(true);
  
  useEffect(() => {
    // Vérifiez si l'utilisateur a déjà vu l'intro (facultatif)
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
    }
    
    setIsInitialized(true);
  }, []);

  const handleIntroComplete = () => {
    // Marquez que l'utilisateur a vu l'intro (facultatif)
    localStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // Afficher d'abord l'intro vidéo si nécessaire
  if (showIntro) {
    return <IntroVideo onComplete={handleIntroComplete} />;
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

export default App;//////intro////