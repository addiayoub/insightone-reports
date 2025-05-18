import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Users, UserPlus, UserCog, UserX, Search, LogOut, 
  LineChart, ChevronDown, Check, X, Trash2, Edit3, Shield, User,
  Mail, Lock, Plus, Save
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSettings } from '../../settings/SettingsContext'; // Import the settings context

const MySwal = withReactContent(Swal);

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const { settings } = useSettings(); // Get the current theme from settings context
  const isDarkMode = settings.theme === 'dark';
const [isSearchVisible, setIsSearchVisible] = useState(false);
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  // Configure SweetAlert theme based on current app theme
  const configureSweetAlert = () => {
    if (isDarkMode) {
      MySwal.mixin({
        background: 'rgba(30, 30, 30, 0.98)',
        backdrop: `rgba(15, 15, 15, 0.8)`,
        customClass: {
          popup: 'backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl',
          confirmButton: 'px-4 py-2 rounded-lg',
          cancelButton: 'px-4 py-2 rounded-lg'
        }
      });
    } else {
      MySwal.mixin({
        background: 'rgba(255, 255, 255, 0.98)',
        backdrop: `rgba(79, 70, 229, 0.05)`,
        customClass: {
          popup: 'backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl',
          confirmButton: 'px-4 py-2 rounded-lg',
          cancelButton: 'px-4 py-2 rounded-lg'
        }
      });
    }
  };

  // Apply Sweet Alert theme when app theme changes
  useEffect(() => {
    configureSweetAlert();
  }, [settings.theme]);

  // Alertes personnalisées
  const showAlert = (title, html, icon, confirmText) => {
    return MySwal.fire({
      title: <span className={`text-${icon === 'success' ? 'orange' : 'red'}-600 font-semibold`}>{title}</span>,
      html: <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{html}</div>,
      icon: icon,
      background: isDarkMode ? 'rgba(30, 30, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
      backdrop: isDarkMode ? `rgba(15, 15, 15, 0.8)` : `rgba(79, 70, 229, 0.05)`,
      showConfirmButton: true,
      confirmButtonText: confirmText || <div className="text-white bg-green-200 hover:text-white p-3 cursor-pointer rounded-full transition-colors duration-300 hover:bg-green-500"
      ><Check className="h-5 w-5" /></div>,
      confirmButtonColor: '#6366f1',
      customClass: {
        popup: isDarkMode 
          ? 'backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl'
          : 'backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl',
        confirmButton: 'px-4 py-2 rounded-lg'
      },
      buttonsStyling: false
    });
  };

  const showDeleteConfirm = (userName) => {
    return MySwal.fire({
      title: <span className="text-red-600 font-semibold">Confirmer la suppression</span>,
      html: <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
        Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{userName}</strong> ?
      </p>,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: <div className="text-white bg-red-200 hover:text-white p-3 cursor-pointer rounded-full transition-colors duration-300 hover:bg-red-500"
      ><Trash2 className="h-5 w-5" /></div>,
      cancelButtonText: <div className="text-white bg-green-200 hover:text-white p-3 cursor-pointer rounded-full transition-colors duration-300 hover:bg-green-500"
      ><X className="h-5 w-5" /></div>,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      background: isDarkMode ? 'rgba(30, 30, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
      customClass: {
        popup: isDarkMode 
          ? 'backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl'
          : 'backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl',
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      },
      buttonsStyling: false
    });
  };

  // Formulaire de création dans Swal
  const showCreateForm = () => {
    MySwal.fire({
      title: <span className="text-green-600 font-semibold">Nouvel Utilisateur</span>,
      html: (
        <div className="text-left">
          <div className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Nom complet
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="swal-input1"
                type="text"
                className={`swal2-input pl-10 w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                placeholder="Jean Dupont"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="swal-input2"
                type="email"
                className={`swal2-input pl-10 w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                placeholder="jean@example.com"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="swal-input3"
                type="password"
                className={`swal2-input pl-10 w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                placeholder="••••••••"
                required
                minLength="6"
              />
            </div>
            <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Minimum 6 caractères
            </p>
          </div>
          
          <div className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Rôle
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
              <select
                id="swal-input4"
                className={`swal2-input pl-10 w-full appearance-none ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      ),
      background: isDarkMode ? 'rgba(30, 30, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
      showCancelButton: true,
      confirmButtonText: <div className="text-white bg-green-300 hover:text-white p-3 cursor-pointer transition-colors duration-300 rounded-full hover:bg-green-700"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}><Plus className="h-5 w-5 " /></div>,
      cancelButtonText: <div className="text-white bg-red-200 hover:text-white p-3 cursor-pointer rounded-full transition-colors duration-300 hover:bg-red-500"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}><X className="h-5 w-5 " /></div>,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#9ca3af',
      focusConfirm: false,
      preConfirm: () => {
        return {
          nom: document.getElementById('swal-input1').value,
          email: document.getElementById('swal-input2').value,
          password: document.getElementById('swal-input3').value,
          role: document.getElementById('swal-input4').value
        };
      },
      customClass: {
        popup: isDarkMode 
          ? 'backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl'
          : 'backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl',
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      },
      buttonsStyling: false,
      didOpen: () => {
        document.querySelectorAll('.swal2-input').forEach(input => {
          input.style.border = isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb';
          input.style.borderRadius = '0.5rem';
          input.style.padding = '0.5rem 0.75rem 0.5rem 2.5rem';
          input.style.width = '80%';
          input.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
          if (isDarkMode) {
            input.style.backgroundColor = '#1f2937';
            input.style.color = '#ffffff';
          }
        });
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(`${API_URL}/users`, result.value, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setUsers([...users, response.data.data]);
          await showAlert('Succès', 'Utilisateur créé avec succès', 'success');
        } catch (error) {
          showAlert('Erreur', error.response?.data?.error || 'Erreur lors de la création', 'error');
        }
      }
    });
  };

  // Formulaire d'édition dans Swal
  const showEditForm = (user) => {
    MySwal.fire({
      title: <span className="text-orange-600 font-semibold">Modifier Utilisateur</span>,
      html: (
        <div className="text-left">
          <div className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Nom complet
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="swal-edit1"
                type="text"
                className={`swal2-input pl-10 w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                defaultValue={user.nom}
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="swal-edit2"
                type="email"
                className={`swal2-input pl-10 w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                defaultValue={user.email}
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Nouveau mot de passe 
              <span className="text-gray-400 ml-1">(optionnel)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="swal-edit3"
                type="password"
                className={`swal2-input pl-10 w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                placeholder="Laisser vide pour ne pas changer"
                minLength="6"
              />
            </div>
            <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Minimum 6 caractères
            </p>
          </div>
          
          <div className="mb-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Rôle
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
              <select
                id="swal-edit4"
                className={`swal2-input pl-10 w-full appearance-none ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                defaultValue={user.role}
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      ),
      background: isDarkMode ? 'rgba(30, 30, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
      showCancelButton: true,
      confirmButtonText: <div className="text-white bg-green-200 hover:text-white p-3 cursor-pointer transition-colors duration-300 rounded-full hover:bg-green-700"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}><Save className="h-5 w-5 " /></div>,
      cancelButtonText: <div className="text-white bg-red-200 hover:text-white p-3 cursor-pointer rounded-full transition-colors duration-300 hover:bg-red-500"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}><X className="h-5 w-5 " /></div>,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#9ca3af',
      focusConfirm: false,
      preConfirm: () => {
        return {
          nom: document.getElementById('swal-edit1').value,
          email: document.getElementById('swal-edit2').value,
          password: document.getElementById('swal-edit3').value,
          role: document.getElementById('swal-edit4').value
        };
      },
      customClass: {
        popup: isDarkMode 
          ? 'backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl'
          : 'backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl',
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      },
      buttonsStyling: false,
      didOpen: () => {
        document.querySelectorAll('.swal2-input').forEach(input => {
          input.style.border = isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb';
          input.style.borderRadius = '0.5rem';
          input.style.padding = '0.5rem 0.75rem 0.5rem 2.5rem';
          input.style.width = '80%';
          input.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
          if (isDarkMode) {
            input.style.backgroundColor = '#1f2937';
            input.style.color = '#ffffff';
          }
        });
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          const formData = result.value;
          if (!formData.password) {
            delete formData.password;
          }
          
          const response = await axios.put(`${API_URL}/users/${user._id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setUsers(users.map(u => u._id === user._id ? response.data.data : u));
          await showAlert('Succès', 'Utilisateur mis à jour avec succès', 'success');
        } catch (error) {
          showAlert('Erreur', error.response?.data?.error || 'Erreur lors de la mise à jour', 'error');
        }
      }
    });
  };

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        showAlert('Erreur', 'Erreur lors du chargement des utilisateurs', 'error');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(user =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Handle user deletion
  const handleDeleteUser = async (userId, userName) => {
    const result = await showDeleteConfirm(userName);
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(users.filter(user => user._id !== userId));
        showAlert('Succès', 'Utilisateur supprimé avec succès', 'success');
      } catch (error) {
        showAlert('Erreur', 'Erreur lors de la suppression', 'error');
      }
    }
  };

  return (
    <motion.div 
      className={isDarkMode 
        ? "min-h-screen bg-gradient-to-br from-gray-900 to-gray-800" 
        : "min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className={isDarkMode
              ? "bg-gray-800 rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-700 hover:border-blue-700 transition-all"
              : "bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100 hover:border-blue-100 transition-all"}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className={isDarkMode ? "bg-blue-900 p-3 rounded-full" : "bg-blue-100 p-3 rounded-full"}>
              <Users className={isDarkMode ? "text-blue-300 h-5 w-5" : "text-blue-600 h-5 w-5"} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Total Utilisateurs</p>
              <p className={isDarkMode ? "text-2xl font-bold text-gray-100" : "text-2xl font-bold text-gray-800"}>{users.length}</p>
            </div>
          </motion.div>

          <motion.div 
            className={isDarkMode
              ? "bg-gray-800 rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-700 hover:border-purple-700 transition-all"
              : "bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100 hover:border-blue-100 transition-all"}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className={isDarkMode ? "bg-purple-900 p-3 rounded-full" : "bg-purple-100 p-3 rounded-full"}>
              <Shield className={isDarkMode ? "text-purple-300 h-5 w-5" : "text-purple-600 h-5 w-5"} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Administrateurs</p>
              <p className={isDarkMode ? "text-2xl font-bold text-gray-100" : "text-2xl font-bold text-gray-800"}>
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </motion.div>

          <motion.div 
            className={isDarkMode
              ? "bg-gray-800 rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-700 hover:border-green-700 transition-all"
              : "bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100 hover:border-blue-100 transition-all"}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className={isDarkMode ? "bg-green-900 p-3 rounded-full" : "bg-green-100 p-3 rounded-full"}>
              <LineChart className={isDarkMode ? "text-green-300 h-5 w-5" : "text-green-600 h-5 w-5"} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Utilisateurs Actifs</p>
              <p className={isDarkMode ? "text-2xl font-bold text-gray-100" : "text-2xl font-bold text-gray-800"}>{users.length}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* User Management Section */}
        <motion.div 
          className={isDarkMode
            ? "bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-700"
            : "bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
     <div className={isDarkMode 
  ? "px-6 py-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
  : "px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"}>
  <h2 className={isDarkMode ? "text-lg font-semibold text-gray-100" : "text-lg font-semibold text-gray-800"}>
    Gestion des Utilisateurs
  </h2>
  
  <div className="flex items-center gap-3">
    <motion.button
      onClick={() => setIsSearchVisible(!isSearchVisible)}
      className={isDarkMode 
        ? "text-gray-400 hover:text-white p-3 rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
        : "text-gray-500 hover:text-gray-800 p-3 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <Search className="h-5 w-5" />
    </motion.button>

    {isSearchVisible && (
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '16rem', opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-400 h-4 w-4" />
        </div>
        <motion.input
          type="text"
          placeholder="Rechercher..."
          className={isDarkMode
            ? "pl-10 pr-4 py-2 border border-blue-700 bg-blue-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            : "pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          whileFocus={{ scale: 1.01 }}
          autoFocus
        />
      </motion.div>
    )}
    
    <motion.button
      onClick={showCreateForm}
      className={isDarkMode 
        ? "text-green-400 hover:text-white p-3 rounded-full cursor-pointer hover:bg-green-600 transition-colors" 
        : "text-green-600 hover:text-white p-3 rounded-full cursor-pointer hover:bg-green-500 transition-colors"}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <UserPlus className="h-5 w-5" />
    </motion.button>
  </div>
</div>

{/* Users Table */}
<div className="overflow-x-auto">
  {loading ? (
    <motion.div 
      className="p-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-500'} mx-auto`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Chargement des utilisateurs...</p>
    </motion.div>
  ) : (
    <table className={`min-w-full divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
      <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
        <tr>
          <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Nom</th>
          <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Email</th>
          <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Rôle</th>
          <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Date de Création</th>
          <th className={`px-6 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
        </tr>
      </thead>
      <tbody className={isDarkMode ? "bg-gray-800 divide-gray-700" : "bg-white divide-gray-200"}>
        {filteredUsers.map((user) => (
          <motion.tr 
            key={user._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.1)' : 'rgba(79, 70, 229, 0.03)' }}
            className={isDarkMode ? "hover:bg-gray-700/50 transition-colors" : "hover:bg-blue-50/50 transition-colors"}
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-10 w-10 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center shadow-inner`}>
                  <span className={isDarkMode ? "text-blue-300 font-medium" : "text-blue-600 font-medium"}>
                    {user.nom.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-4">
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{user.nom}</div>
                </div>
              </div>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${user.role === 'admin' 
                  ? (isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800')
                  : (isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')}`}>
                {user.role}
              </span>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end space-x-3">
                <motion.button
                  onClick={() => showEditForm(user)}
                  className={isDarkMode
                    ? "text-orange-400 hover:text-white p-3 cursor-pointer rounded-full hover:bg-orange-600"
                    : "text-orange-600 hover:text-orange-800 p-3 cursor-pointer rounded-full hover:bg-orange-100"}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit3 className="h-5 w-5" />
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteUser(user._id, user.nom)}
                  className={isDarkMode
                    ? "text-red-400 hover:text-white p-3 cursor-pointer rounded-full hover:bg-red-600"
                    : "text-red-600 hover:text-red-800 p-3 cursor-pointer rounded-full hover:bg-red-100"}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="h-5 w-5" />
                </motion.button>
              </div>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  )}
</div>
</motion.div>
</main>
</motion.div>
);
};

export default UsersManagement;