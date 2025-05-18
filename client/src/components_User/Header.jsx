import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Menu, X, Settings } from 'lucide-react';
import SettingsPanel from '../settings/SettingsPanel';
import { useSettings } from '../settings/SettingsContext';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Header = ({ onBackToMenu, sidebarOpen, onLogout }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { settings } = useSettings();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // Classes dynamiques basées sur le thème
  const isDarkTheme = settings.theme === 'dark';
  const headerBgClass = isDarkTheme ? 'bg-gray-800' : 'bg-white';
  const headerTextClass = isDarkTheme ? 'text-gray-100' : 'text-white';
  const headerShadowClass = isDarkTheme ? 'shadow-md shadow-gray-100/20' : 'shadow-sm';
  const logoFilter = isDarkTheme ? 'brightness-90 contrast-125' : '';
  // Nouveau : Définir les logos pour chaque thème
  const logoLight = '/logo.jpg'; // Chemin vers votre logo light
  const logoDark = '/D.png';   // Chemin vers votre logo dark
  const currentLogo = isDarkTheme ? logoDark : logoLight;
  const handleLogout = () => {
    // Adapter le style Sweetalert2 au thème
    const swalBgColor = isDarkTheme ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    const swalTextColor = isDarkTheme ? 'text-white' : 'text-gray-700';
    const swalBorderColor = isDarkTheme ? 'border-white' : 'border-gray-200';
    
    MySwal.fire({
      title: <span className={`text-red-${isDarkTheme ? '600' : '600'} font-semibold`}>Déconnexion</span>,
      html: <p className={swalTextColor}>Voulez-vous vraiment vous déconnecter ?</p>,
      icon: 'question',
      background: swalBgColor,
      showCancelButton: true,
      confirmButtonText: <div className="text-white hover:bg-red-500 p-3 cursor-pointer rounded-full transition-colors duration-300 bg-red-300">
                            <LogOut className="h-5 w-5" />
                          </div>,
      cancelButtonText: <div className="text-white bg-green-200 hover:text-white p-3 cursor-pointer rounded-full transition-colors duration-300 hover:bg-green-500">
                          <X className="h-5 w-5" />
                        </div>,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#9ca3af',
      customClass: {
        popup: `backdrop-blur-sm border ${swalBorderColor} shadow-lg rounded-xl`,
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <>
      <motion.header 
        className={`${headerBgClass} ${headerShadowClass} sticky top-0 z-10 transition-colors duration-300`}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className={`text-2xl font-bold ${headerTextClass} flex items-center transition-colors duration-300`}>
              <img 
                src={currentLogo} // Utilisation du logo approprié
                alt="Logo" 
                className={`h-15 ${logoFilter} transition-filter duration-300`}
                style={{ filter: isDarkTheme ? 'brightness(0.9) contrast(1.25)' : 'none' }}
              />
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleSettings}
              className="text-white bg-gray-500 hover:bg-gray-600 p-3 transition-colors duration-300 cursor-pointer rounded-full"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              onClick={handleLogout}
              className="text-white hover:bg-red-500 p-3 transition-colors duration-300 cursor-pointer rounded-full bg-red-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <LogOut className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {settingsOpen && (
          <SettingsPanel 
            isOpen={settingsOpen} 
            onClose={() => setSettingsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;