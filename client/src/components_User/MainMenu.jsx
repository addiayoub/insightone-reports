import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Shield, Settings, AlertTriangle, Target, FileText, User, CheckSquare, 
  AlertOctagon, Heart, Leaf, Zap, BarChart2, ShoppingCart, BookOpen, Utensils, 
  Award, Lightbulb, Menu,
  DatabaseZap
} from 'lucide-react';
import { useSettings } from '../settings/SettingsContext';

const MainMenu = ({ onSectionSelect }) => {
  const { settings } = useSettings();
  const isDarkMode = settings.theme === 'dark';

  const menuItems = [
    { 
      id: 'contexte', 
      title: 'Contexte', 
      icon: <Globe className="h-8 w-8" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      id: 'Donnees', 
      title: 'Générateurs de Données', 
      icon: <DatabaseZap className="h-8 w-8" />, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      id: 'politiques', 
      title: 'Politiques', 
      icon: <Shield className="h-8 w-8" />, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      id: 'processus', 
      title: 'Processus', 
      icon: <Settings className="h-8 w-8" />, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
    { 
      id: 'risques', 
      title: 'Risques', 
      icon: <AlertTriangle className="h-8 w-8" />, 
      color: 'bg-red-100 text-red-600' 
    },
    { 
      id: 'objectifs', 
      title: 'Objectifs', 
      icon: <Target className="h-8 w-8" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      id: 'audits', 
      title: 'Audits', 
      icon: <FileText className="h-8 w-8" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      id: 'revues', 
      title: 'Revues de direction', 
      icon: <User className="h-8 w-8" />, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      id: 'actions', 
      title: 'Actions', 
      icon: <CheckSquare className="h-8 w-8" />, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      id: 'nonConformite', 
      title: 'Non Conformité', 
      icon: <AlertOctagon className="h-8 w-8" />, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
    { 
      id: 'sst', 
      title: 'Système de management Intégré', 
      icon: <Heart className="h-8 w-8" />, 
      color: 'bg-red-100 text-red-600' 
    },
    { 
      id: 'environnement', 
      title: 'Environnement', 
      icon: <Leaf className="h-8 w-8" />, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      id: 'energie', 
      title: 'Énergie', 
      icon: <Zap className="h-8 w-8" />, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
    { 
      id: 'production', 
      title: 'Production', 
      icon: <BarChart2 className="h-8 w-8" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      id: 'achats', 
      title: 'Achats', 
      icon: <ShoppingCart className="h-8 w-8" />, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      id: 'formation', 
      title: 'Formation', 
      icon: <BookOpen className="h-8 w-8" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      id: 'securite', 
      title: 'Sécurité alimentaire', 
      icon: <Utensils className="h-8 w-8" />, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
    { 
      id: 'maintenance', 
      title: 'Maintenance', 
      icon: <Menu className="h-8 w-8" />, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      id: 'qualite', 
      title: 'Qualité', 
      icon: <Award className="h-8 w-8" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      id: 'innovation', 
      title: 'Innovation', 
      icon: <Lightbulb className="h-8 w-8" />, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
  ];

  // Définition des variantes pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  // Variantes des éléments avec effet duveteux
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
    tap: { scale: 0.98 }
  };

  // Classes CSS pour le footer selon le thème
  const footerBgClass = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const footerTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-500';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <motion.h2 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Tableau de Bord Utilisateurs
          </motion.h2>
          <motion.p 
            className="mt-2 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sélectionnez une section pour commencer
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          id="menu"
          animate="visible"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              className={`flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer backdrop-blur-sm transition-shadow duration-300 ${
                settings.theme === 'light' 
                  ? 'shadow-sm hover:shadow-xl' 
                  : 'shadow-[0px_4px_4px_rgba(255,255,255,0.15)] hover:shadow-[0px_8px_24px_rgba(255,255,255,0.2)]'
              }`}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onSectionSelect(item.id)}
            >
              <div className={`${item.color} p-4 rounded-full mb-4 shadow-md`}>
                {item.icon}
              </div>
              <span className="text-sm font-medium text-center">
                {item.title}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer avec "Powered by" et logo */}
      <motion.div 
        className={`w-full ${footerBgClass} py-4 mt-8`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex justify-center items-center space-x-2">
          <p className={`text-sm font-medium ${footerTextClass}`}>Powered by</p>
          <div className="h-8 w-28 flex items-center justify-center">
            {/* Remplacez ceci par votre logo ou utilisez une image importée */}
            <a href="https://idatech.ma/">    <img 
                src="/ID&A TECH .png" // Utilisation du logo approprié
                alt="Logo" 
                className={` transition-filter duration-300`}
              /></a>
              
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainMenu;