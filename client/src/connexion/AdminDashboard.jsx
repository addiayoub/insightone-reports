import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components_Admin/Header';
import MainMenu from '../components_Admin/MainMenu';
import Sidebar from '../components_Admin/Sidebar';
import UsersManagement from '../components_Admin/sections/UsersManagement';
import Contexte from '../components_Admin/sections/Contexte';
import Politiques from '../components_Admin/sections/Politiques';
import Processus from '../components_Admin/sections/Processus';
import Risques from '../components_Admin/sections/Risques';
import Objectifs from '../components_Admin/sections/Objectifs';
import Audits from '../components_Admin/sections/Audits';
import Revues from '../components_Admin/sections/Revues';
import Actions from '../components_Admin/sections/Actions';
import NonConformite from '../components_Admin/sections/NonConformite';
import SST from '../components_Admin/sections/SST';
import Environnement from '../components_Admin/sections/Environnement';
import Energie from '../components_Admin/sections/Energie';
import Production from '../components_Admin/sections/Production';
import Achats from '../components_Admin/sections/Achats';
import Formation from '../components_Admin/sections/Formation';
import Securite from '../components_Admin/sections/Securite';
import Maintenance from '../components_Admin/sections/Maintenance';
import Qualite from '../components_Admin/sections/Qualite';
import Innovation from '../components_Admin/sections/Innovation';
import { useSettings } from '../settings/SettingsContext';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { settings } = useSettings();

  // Classes dynamiques basées sur le thème
  const isDarkTheme = settings.theme === 'dark';
  const bgClass = isDarkTheme 
    ? 'bg-gray-900' 
    : 'bg-white';
  const gradientClass = isDarkTheme 
    ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
    : 'bg-gradient-to-br from-gray-50 to-blue-50';

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSidebarOpen(true);
  };

  const handleBackToMenu = () => {
    setSelectedSection(null);
    setSidebarOpen(false);
  };

  // Helper function to render the correct component based on the selected section
  const renderSection = () => {
    switch (selectedSection) {
      case 'users': return <UsersManagement />;
      case 'contexte': return <Contexte />;
      case 'politiques': return <Politiques />;
      case 'processus': return <Processus />;
      case 'risques': return <Risques />;
      case 'objectifs': return <Objectifs />;
      case 'audits': return <Audits />;
      case 'revues': return <Revues />;
      case 'actions': return <Actions />;
      case 'nonConformite': return <NonConformite />;
      case 'sst': return <SST />;
      case 'environnement': return <Environnement />;
      case 'energie': return <Energie />;
      case 'production': return <Production />;
      case 'achats': return <Achats />;
      case 'formation': return <Formation />;
      case 'securite': return <Securite />;
      case 'maintenance': return <Maintenance />;
      case 'qualite': return <Qualite />;
      case 'innovation': return <Innovation />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen ${gradientClass} transition-colors duration-300`}>
      <Header 
        onBackToMenu={handleBackToMenu} 
        sidebarOpen={sidebarOpen} 
      />
      
      <div className="flex min-h-[calc(100vh-80px)]">
        <AnimatePresence>
          {sidebarOpen && (
            <Sidebar 
              selectedSection={selectedSection} 
              onBackToMenu={handleBackToMenu}
              onSectionSelect={handleSectionSelect}
            />
          )}
        </AnimatePresence>

        <div className={`flex-1 transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {!selectedSection ? (
            <MainMenu onSectionSelect={handleSectionSelect} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`p-6 ${isDarkTheme ? 'text-white' : 'text-black'} transition-colors duration-300`}
            >
              {renderSection()}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;