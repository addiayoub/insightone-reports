import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Moon, Sun, Globe, Type, Minimize, Maximize, CheckSquare, Square } from 'lucide-react';
import { useSettings } from './SettingsContext';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleFeatureToggle = (featureId) => {
    setLocalSettings(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureId]: !prev.features[featureId]
      }
    }));
  };

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    onClose();
  };

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ar', name: 'العربية' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Petit', icon: <Minimize className="h-4 w-4" /> },
    { id: 'medium', name: 'Moyen', icon: <Type className="h-4 w-4" /> },
    { id: 'large', name: 'Grand', icon: <Maximize className="h-4 w-4" /> }
  ];

  const fontFamilies = [
    { id: 'sans', name: 'Sans Serif' },
    { id: 'serif', name: 'Serif' },
    { id: 'mono', name: 'Monospace' }
  ];

  const features = [
    { id: 'notifications', name: 'Notifications' },
    { id: 'autoSave', name: 'Sauvegarde automatique' },
    { id: 'animations', name: 'Animations' }
  ];

  // Styles dynamiques basés sur le thème
  const isDarkTheme = localSettings.theme === 'dark';
  const panelBgClass = isDarkTheme ? 'bg-gray-800' : 'bg-white';
  const panelTextClass = isDarkTheme ? 'text-white' : 'text-red-500';
  const borderClass = isDarkTheme ? 'border-white' : 'border-gray-200';
  const titleTextClass = isDarkTheme ? 'text-white' : 'text-gray-800';
  const subtitleTextClass = isDarkTheme ? 'text-white' : 'text-gray-700';
  
  // Styles pour les boutons
  const buttonInactiveClass = isDarkTheme 
    ? 'bg-gray-700 text-white border-gray-600' 
    : 'bg-gray-100 text-gray-600 border-gray-200';
  const buttonActiveClass = isDarkTheme 
    ? 'bg-blue-900 text-blue-300 border-2 border-blue-700' 
    : 'bg-blue-50 text-blue-600 border-2 border-blue-300';
  const buttonHoverClass = isDarkTheme 
    ? 'hover:bg-red-600' 
    : 'hover:bg-gray-50';
  const selectClass = isDarkTheme 
    ? 'bg-gray-700 text-gray-200 border-gray-600 focus:ring-blue-800 focus:border-blue-800' 
    : 'border-white focus:ring-blue-500 focus:border-blue-500';
  
  // Styles pour les boutons d'action
  const cancelBtnClass = isDarkTheme 
    ? 'bg-red-700 text-white hover:bg-red-600' 
    : 'bg-red-300 text-white hover:bg-red-700';
  const applyBtnClass = isDarkTheme 
    ? 'bg-green-800 text-white hover:bg-green-700' 
    : 'bg-green-300 text-white hover:bg-green-700';

  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        ease: 'easeInOut', 
        duration: 0.3 
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <motion.div 
        className={`absolute inset-0 bg-opacity-30 backdrop-blur-sm ${isDarkTheme ? '' : ''}`}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />
      
      <motion.div 
        className={`absolute top-0  right-0 w-80 max-w-full h-full ${panelBgClass} shadow-xl overflow-y-auto transition-colors duration-300`}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={`flex items-center justify-between p-4 border-b ${borderClass} transition-colors duration-300`}>
          <h2 className={`text-lg font-medium ${titleTextClass} transition-colors duration-300`}>Paramètres</h2>
          <motion.button
            className={`p-2 rounded-full  ${buttonHoverClass} ${panelTextClass} cursor-pointer transition-colors duration-300`}
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
        
        <div className="p-4 space-y-6">
          <div>
            <h3 className={`text-sm font-medium ${subtitleTextClass} mb-3 transition-colors duration-300`}>Thème</h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                className={`p-3 rounded-lg flex items-center justify-center ${
                  localSettings.theme === 'light' ? buttonActiveClass : buttonInactiveClass
                } cursor-pointer transition-colors duration-300`}
                onClick={() => setLocalSettings({...localSettings, theme: 'light'})}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sun className="h-5 w-5 mr-2" />
                <span>Clair</span>
              </motion.button>
              
              <motion.button
                className={`p-3 rounded-lg flex items-center justify-center ${
                  localSettings.theme === 'dark' ? buttonActiveClass : buttonInactiveClass
                } cursor-pointer transition-colors duration-300`}
                onClick={() => setLocalSettings({...localSettings, theme: 'dark'})}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Moon className="h-5 w-5 mr-2" />
                <span>Sombre</span>
              </motion.button>
            </div>
          </div>
          
          <div>
            <h3 className={`text-sm font-medium ${subtitleTextClass} mb-3 transition-colors duration-300`}>Langue</h3>
            <select 
              className={`w-full p-2 border rounded-md shadow-sm ${selectClass} cursor-pointer transition-colors duration-300`}
              value={localSettings.language}
              onChange={(e) => setLocalSettings({...localSettings, language: e.target.value})}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <h3 className={`text-sm font-medium ${subtitleTextClass} mb-3 transition-colors duration-300`}>Taille de police</h3>
            <div className="grid grid-cols-3  gap-2">
              {fontSizes.map((size) => (
                <motion.button
                  key={size.id}
                  className={`p-2 cursor-pointer rounded-lg flex flex-col items-center justify-center ${
                    localSettings.fontSize === size.id ? buttonActiveClass : buttonInactiveClass
                  } transition-colors duration-300`}
                  onClick={() => setLocalSettings({...localSettings, fontSize: size.id})}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {size.icon}
                  <span className="text-xs mt-1 ">{size.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className={`text-sm font-medium ${subtitleTextClass} mb-3 transition-colors duration-300`}>Type de police</h3>
            <div className="grid grid-cols-3 gap-2">
              {fontFamilies.map((font) => (
                <motion.button
                  key={font.id}
                  className={`p-2 cursor-pointer rounded-lg ${
                    localSettings.fontFamily === font.id ? buttonActiveClass : buttonInactiveClass
                  } transition-colors duration-300`}
                  onClick={() => setLocalSettings({...localSettings, fontFamily: font.id})}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: 
                      font.id === 'sans' ? 'ui-sans-serif, system-ui, sans-serif' :
                      font.id === 'serif' ? 'ui-serif, Georgia, serif' :
                      'ui-monospace, SFMono-Regular, monospace'
                  }}
                >
                  {font.name}
                </motion.button>
              ))}
            </div>
          </div>
          
        
          
          <div className={`flex gap-3 pt-4 border-t ${borderClass} transition-colors duration-300`}>
            <motion.button
              className={`flex-1 p-2 rounded-lg ${cancelBtnClass} transition-colors cursor-pointer duration-300`}
              onClick={onClose}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Annuler
            </motion.button>
            
            <motion.button
              className={`flex-1 p-2 rounded-lg ${applyBtnClass} transition-colors cursor-pointer duration-300`}
              onClick={handleSaveSettings}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Appliquer
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPanel;