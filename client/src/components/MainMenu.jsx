import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Shield, Settings, AlertTriangle, Target, FileText, User, CheckSquare, 
  AlertOctagon, Heart, Leaf, Zap, BarChart2, ShoppingCart, BookOpen, Utensils, 
   Award, Lightbulb,
  Menu
} from 'lucide-react';
import { useSettings } from '../settings/SettingsContext';

const MainMenu = ({ onSectionSelect }) => {
    const { settings } = useSettings(); // Ajoutez cette ligne pour accéder aux paramètres

  const menuItems = [
    { 
      id: 'contexte', 
      title: 'Contexte', 
      icon: <Globe className="h-8 w-8" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      id: 'users', 
      title: 'Utilisateurs', 
      icon: <User className="h-8 w-8" />, 
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      boxShadow: settings.theme === 'light' 
      ? "0px 5px 15px rgba(0,0,0,0.05)" 
      : "0px 5px 15px rgba(0,0,0,0.05)",
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.05,
      boxShadow: settings.theme === 'light' 
      ? "0px 5px 15px rgba(0,0,0,0.1)" 
      : "0px 5px 15px rgba(255,255,255,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <motion.h2 
          className="text-3xl font-bold "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Tableau de Bord Administratif
        </motion.h2>
        <motion.p 
          className="mt-2 text-lg "
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
        id='menu'
        animate="visible"
      >
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            className="flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onSectionSelect(item.id)}
          >
            <div className={`${item.color} p-4 rounded-full mb-4`}>
              {item.icon}
            </div>
            <span className="text-sm font-medium  text-center">
              {item.title}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MainMenu;