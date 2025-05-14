import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    fontFamily: 'sans',
    language: 'fr',
    features: {
      notifications: true,
      autoSave: true,
      animations: true
    }
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        applySettings(parsedSettings);
      } catch (error) {
        console.error("Error parsing saved settings:", error);
      }
    } else {
      // Apply default settings on first load
      applySettings(settings);
    }
  }, []);

  const applySettings = (newSettings) => {
    // Apply theme to html element instead of documentElement
    document.documentElement.setAttribute('data-theme', newSettings.theme);
    document.documentElement.setAttribute('data-font-size', newSettings.fontSize);
    document.documentElement.setAttribute('data-font-family', newSettings.fontFamily);
    
    // Also apply direct styles to the body to ensure they take effect
    if (newSettings.theme === 'light') {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    } else {
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    }
    
    // Apply font family directly
    document.body.style.fontFamily = 
      newSettings.fontFamily === 'sans' ? 'ui-sans-serif, system-ui, sans-serif' :
      newSettings.fontFamily === 'serif' ? 'ui-serif, Georgia, serif' :
      'ui-monospace, SFMono-Regular, monospace';
    
    // Apply font size directly
    document.body.style.fontSize = 
      newSettings.fontSize === 'small' ? '0.875rem' :
      newSettings.fontSize === 'large' ? '1.125rem' :
      '1rem';
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);