import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './connexion/Login';
import { UserDashboard } from './connexion/UserDashboard';
import AdminDashboard  from './connexion/AdminDashboard';
import { useEffect, useState } from 'react';
import './App.css';

// Composant de protection pour les routes publiques (comme login)
// Redirige les utilisateurs authentifiés vers leur dashboard
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (token) {
    // Rediriger vers le dashboard approprié selon le rôle
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }
  
  return children;
};

// Composant de protection pour les routes privées
// Vérifie que l'utilisateur est authentifié et a le bon rôle
const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    // Rediriger vers login si non authentifié
    return <Navigate to="/" />;
  }
  
  // Si un rôle spécifique est requis et que l'utilisateur n'a pas ce rôle
  if (requiredRole && userRole !== requiredRole) {
    // Rediriger vers le dashboard approprié pour le rôle de l'utilisateur
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }
  
  return children;
};

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Vérifier l'authentification au chargement initial
  useEffect(() => {
    // Vous pourriez ajouter ici une vérification de la validité du token si nécessaire
    setIsInitialized(true);
  }, []);
  
  // Afficher un chargement pendant l'initialisation
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Route de login - inaccessible si déjà authentifié */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Route protégée pour le dashboard utilisateur */}
        <Route 
          path="/user-dashboard" 
          element={
            <PrivateRoute requiredRole="user">
              <UserDashboard />
            </PrivateRoute>
          } 
        />
        
        {/* Route protégée pour le dashboard admin */}
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        
        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;//