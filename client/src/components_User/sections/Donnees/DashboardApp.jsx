import Dashboard from './Dashboard';
import  { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard,
  Plus,
  Edit2,
  Check,
  MoreHorizontal,
  ChevronDown,
  Save,
  Edit
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import ChartCreationWizard from './ChartCreationWizard';

// Composant pour le nom éditable du tableau de bord
const EditableDashboardName = ({ name, isActive, onNameChange, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditedName(name);
  }, [name]);

  const handleSave = () => {
    if (editedName.trim() !== '') {
      onNameChange(editedName);
    } else {
      setEditedName(name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedName(name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="flex items-center space-x-1"
      >
        <input
          ref={inputRef}
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="px-2 py-1 text-sm rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
        />
        <button 
          onClick={handleSave}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <Check size={14} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      className="flex items-center space-x-1 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        onClick={() => {
          if (isActive) {
            setIsEditing(true);
          } else {
            onClick();
          }
        }}
        className={`px-3 py-1 text-sm rounded-md flex items-center ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        {name}
      </button>
      {isActive && (
        <button 
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit2 size={14} />
        </button>
      )}
    </motion.div>
  );
};

// Menu déroulant pour les tableaux excédentaires
const DashboardOverflowMenu = ({ dashboards, onDashboardSelect, onDashboardRename }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const updatePosition = () => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    };

    if (isOpen) {
      updatePosition();
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen]);

  if (dashboards.length === 0) return null;

  return (
    <>
      <div className="relative">
        <motion.button 
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MoreHorizontal size={16} />
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
          style={{ pointerEvents: "none" }}
        >
          <div
            ref={menuRef}
            className="pointer-events-auto"
            style={{
              position: 'absolute',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-48"
            >
              {dashboards.map(db => (
                <motion.div 
                  key={db.id} 
                  className="px-4 py-2 hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    onDashboardSelect(db.id);
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 2 }}
                >
                  <span className={`text-sm ${db.active ? 'font-semibold text-blue-600' : ''}`}>{db.name}</span>
                  {db.active && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newName = prompt("Nouveau nom du tableau:", db.name);
                        if (newName && newName.trim() !== '') {
                          onDashboardRename(db.id, newName);
                        }
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

// Assistant de création de graphique

// Composant principal de l'application
const DashboardApp = () => {
  const [dashboards, setDashboards] = useState([
    { 
      id: '1', 
      name: 'Tableau exemple', 
      active: true,
      charts: [
        { id: 'chart-1', type: 'bar', position: { x: 50, y: 50 } },
        { id: 'chart-2', type: 'pie', position: { x: 400, y: 50 } }
      ]
    }
  ]);
  
  const [showChartWizard, setShowChartWizard] = useState(false);
  const [nextChartId, setNextChartId] = useState(4);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  
  const MAX_VISIBLE_DASHBOARDS = 4;

  const createNewDashboard = () => {
    const newId = Date.now().toString();
    const newDashboard = {
      id: newId,
      name: 'Nouveau tableau',
      active: true,
      charts: []
    };
    
    setDashboards(dashboards.map(db => ({ ...db, active: false })).concat(newDashboard));
  };

  const updateDashboardName = (dashboardId, newName) => {
    setDashboards(dashboards.map(db => 
      db.id === dashboardId 
        ? { ...db, name: newName }
        : db
    ));
  };

  const switchDashboard = (id) => {
    if (dashboards.find(db => db.id === id)?.active) return;
    
    setIsSwitching(true);
    setTimeout(() => {
      setDashboards(dashboards.map(db => ({
        ...db,
        active: db.id === id
      })));
      setIsSwitching(false);
    }, 300);
  };

  const addChartToDashboard = (chartConfig) => {
    const activeDashboard = dashboards.find(db => db.active);
    if (!activeDashboard) return;
    
    const newChart = {
      id: `chart-${nextChartId}`,
      ...chartConfig
    };
    
    setDashboards(dashboards.map(db => 
      db.id === activeDashboard.id 
        ? { ...db, charts: [...db.charts, newChart] } 
        : db
    ));
    
    setNextChartId(nextChartId + 1);
    setShowChartWizard(false);
  };

  const moveChart = (dashboardId, chartId, position) => {
    setDashboards(dashboards.map(db => 
      db.id === dashboardId
        ? {
            ...db,
            charts: db.charts.map(chart =>
              chart.id === chartId ? { ...chart, position } : chart
            )
          }
        : db
    ));
  };

  const editChart = (dashboardId, chartId) => {
    console.log(`Editing chart ${chartId} in dashboard ${dashboardId}`);
  };

  const deleteChart = (dashboardId, chartId) => {
    setDashboards(dashboards.map(db => 
      db.id === dashboardId
        ? { ...db, charts: db.charts.filter(chart => chart.id !== chartId) }
        : db
    ));
  };

  const saveDashboard = () => {
    setIsViewMode(true);
  };

  const editDashboard = () => {
    setIsViewMode(false);
  };

  const activeDashboard = dashboards.find(db => db.active);
  const visibleDashboards = dashboards.slice(0, MAX_VISIBLE_DASHBOARDS);
  const overflowDashboards = dashboards.length > MAX_VISIBLE_DASHBOARDS 
    ? dashboards.slice(MAX_VISIBLE_DASHBOARDS) 
    : [];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Barre de navigation */}
      <motion.div 
        className="bg-white border-b border-gray-200"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-8">
            <motion.div 
              className="flex items-center space-x-2 text-blue-600"
              whileHover={{ scale: 1.02 }}
            >
              <LayoutDashboard size={24} />
              <span className="text-xl font-semibold">Dashboard Builder</span>
            </motion.div>
          </div>

          {activeDashboard && (
            <div className="flex space-x-3">
              {!isViewMode ? (
                <>
                  <motion.button
                    onClick={() => setShowChartWizard(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    <span>Ajouter un graphique</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={saveDashboard}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save size={16} />
                    <span>Sauvegarder</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={editDashboard}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit size={16} />
                  <span>Modifier</span>
                </motion.button>
              )}
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Barre des tableaux de bord */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex items-center justify-between py-2 overflow-x-auto">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {/* Tableaux visibles */}
              <AnimatePresence initial={false}>
                {visibleDashboards.map(dashboard => (
                  <motion.div
                    key={dashboard.id}
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <EditableDashboardName
                      name={dashboard.name}
                      isActive={dashboard.active}
                      onNameChange={(newName) => updateDashboardName(dashboard.id, newName)}
                      onClick={() => switchDashboard(dashboard.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Menu d'overflow pour les tableaux supplémentaires */}
              {overflowDashboards.length > 0 && (
                <DashboardOverflowMenu 
                  dashboards={overflowDashboards} 
                  onDashboardSelect={switchDashboard}
                  onDashboardRename={updateDashboardName}
                />
              )}
              
              <motion.button 
                onClick={createNewDashboard}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={16} />
                <span>Nouveau tableau</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Tableau de bord actif */}
        <AnimatePresence mode="wait">
          {activeDashboard ? (
            <motion.div
              key={activeDashboard.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <Dashboard 
                charts={activeDashboard.charts}
                onEditChart={(chartId) => editChart(activeDashboard.id, chartId)}
                onDeleteChart={(chartId) => deleteChart(activeDashboard.id, chartId)}
                onMoveChart={(chartId, position) => moveChart(activeDashboard.id, chartId, position)}
                isSwitching={isSwitching}
                isViewMode={isViewMode}
              />
            </motion.div>
          ) : (
            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>Sélectionnez ou créez un tableau de bord</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Wizard de création de graphique */}
      {showChartWizard && (
        <ChartCreationWizard
          onComplete={addChartToDashboard}
          onCancel={() => setShowChartWizard(false)}
        />
      )}
    </div>
  );
};

export default DashboardApp;