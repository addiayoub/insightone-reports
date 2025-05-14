import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Shield, Settings, AlertTriangle, Target, FileText, User, CheckSquare, 
  AlertOctagon, Heart, Leaf, Zap, BarChart2, ShoppingCart, BookOpen, Utensils, 
  Menu, Award, Lightbulb, House
} from 'lucide-react';
import { useSettings } from '../settings/SettingsContext'; // Importez useSettings

const Sidebar = ({ selectedSection, onBackToMenu, onSectionSelect }) => {
  // Utilisez le hook useSettings pour accéder au thème actuel
  const { settings } = useSettings();
  const isDarkMode = settings.theme === 'dark';

  const menuItems = [
    { id: 'contexte', title: 'Contexte', icon: <Globe className="h-5 w-5 text-blue-600" /> },
    { id: 'politiques', title: 'Politiques', icon: <Shield className="h-5 w-5 text-purple-600" /> },
    { id: 'processus', title: 'Processus', icon: <Settings className="h-5 w-5 text-yellow-600" /> },
    { id: 'risques', title: 'Risques', icon: <AlertTriangle className="h-5 w-5 text-red-600" /> },
    { id: 'objectifs', title: 'Objectifs', icon: <Target className="h-5 w-5 text-blue-600" /> },
    { id: 'audits', title: 'Audits', icon: <FileText className="h-5 w-5 text-blue-600" /> },
    { id: 'revues', title: 'Revues de direction', icon: <User className="h-5 w-5 text-green-600" /> },
    { id: 'actions', title: 'Actions', icon: <CheckSquare className="h-5 w-5 text-green-600" /> },
    { id: 'nonConformite', title: 'Non Conformité', icon: <AlertOctagon className="h-5 w-5 text-yellow-600" /> },
    { id: 'sst', title: 'Système de management Intégré', icon: <Heart className="h-5 w-5 text-red-600" /> },
    { id: 'environnement', title: 'Environnement', icon: <Leaf className="h-5 w-5 text-green-600" /> },
    { id: 'energie', title: 'Énergie', icon: <Zap className="h-5 w-5 text-yellow-600" /> },
    { id: 'production', title: 'Production', icon: <BarChart2 className="h-5 w-5 text-blue-600" /> },
    { id: 'achats', title: 'Achats', icon: <ShoppingCart className="h-5 w-5 text-purple-600" /> },
    { id: 'formation', title: 'Formation', icon: <BookOpen className="h-5 w-5 text-blue-600" /> },
    { id: 'securite', title: 'Sécurité alimentaire', icon: <Utensils className="h-5 w-5 text-yellow-600" /> },
    { id: 'maintenance', title: 'Maintenance', icon: <Menu className="h-5 w-5 text-green-600" /> },
    { id: 'qualite', title: 'Qualité', icon: <Award className="h-5 w-5 text-blue-600" /> },
    { id: 'innovation', title: 'Innovation', icon: <Lightbulb className="h-5 w-5 text-yellow-500" /> },
    { id: 'users', title: 'Utilisateurs', icon: <User className="h-5 w-5 text-purple-600" /> }
  ];

  const getCurrentSectionTitle = () => {
    const section = menuItems.find(item => item.id === selectedSection);
    return section ? section.title : '';
  };

  const getCurrentSectionIcon = () => {
    const section = menuItems.find(item => item.id === selectedSection);
    return section ? section.icon : null;
  };

  // Définir les classes CSS basées sur le thème
  const sidebarBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const sidebarBorderClass = isDarkMode ? 'border-gray-700' : 'border-white';
  const headerTextClass = isDarkMode ? 'text-white' : 'text-gray-700';
  const buttonHoverClass = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100';
  const iconColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  
  // Classes pour les éléments de menu
  const getMenuItemClasses = (isSelected) => {
    if (isSelected) {
      return isDarkMode 
        ? 'bg-blue-900 text-white' 
        : 'bg-blue-50 text-blue-700';
    }
    return isDarkMode 
      ? 'text-gray-300 hover:bg-gray-600' 
      : 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      exit={{ x: -280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed h-[calc(100vh-80px)] w-64 ${sidebarBgClass} shadow-lg border-r ${sidebarBorderClass} z-10`}
    >
      <div className={`p-4 border-b ${sidebarBorderClass}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getCurrentSectionIcon()}
            <h4 className={`ml-2 font-semibold ${headerTextClass}`}>{getCurrentSectionTitle()}</h4>
          </div>
          <motion.button
            onClick={onBackToMenu}
            className={`p-2 rounded-full ${buttonHoverClass}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <House className={`h-5 w-5 cursor-pointer ${iconColor}`} />
          </motion.button>
        </div>
      </div>
      
      <nav className="mt-4 px-3 overflow-y-auto h-[calc(100vh-180px)]">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSectionSelect(item.id);
                }}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  getMenuItemClasses(selectedSection === item.id)
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;