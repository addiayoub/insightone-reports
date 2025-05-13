import { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import InsightOneIntro from './InsightOneIntro';
import { Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showIntro, setShowIntro] = useState(false);
  const [targetPath, setTargetPath] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Gestion du délai
  useEffect(() => {
    if (!showIntro || !targetPath) return;

    const timer = setTimeout(() => {
      navigate(targetPath);
    }, 7000); // 5 secondes de délai

    return () => clearTimeout(timer);
  }, [showIntro, targetPath, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.login(formData.email, formData.password);

      if (!data.success) {
        throw new Error('Login failed');
      }

      const role = data.role;
      if (!role || !['admin', 'user'].includes(role)) {
        throw new Error('Invalid or missing user role');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', role);

      // Définir la cible de redirection
      const path = role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
      setTargetPath(path);
      
      // Afficher l'intro
      setShowIntro(true);

    } catch (err) {
      setError(err.message || 'An error occurred during login');
      setLoading(false);
    }
  };

  if (showIntro) {
    return <InsightOneIntro />; // Le composant s'affichera pendant 5 secondes
  }

  return (
    <div className="login-container">
      <div className="content-wrapper">
        <div className="logo-container">
          <img src="logo.jpg" alt="Logo" className="logo" />
        </div>
        <div className="form-container">
          <div className="container">
            <div className="login-box">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label>Email</label>
                </div>
                <div className="input-box">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label>Password</label>
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 
                      <EyeOff size={18} /> : 
                      <Eye size={18} />
                    }
                  </button>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
            {[...Array(50)].map((_, i) => (
              <span key={i} style={{ '--i': i }}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};