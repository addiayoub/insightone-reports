import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart, PieChart, LineChart, AreaChart, ScatterChart,
  Gauge, Funnel, Map, X, ChevronLeft,
  CandlestickChart,
  GitGraph,
  MapIcon,
  RadarIcon,
  Fence,
  Network,
  LayoutDashboard,
  Plus,
  CircleAlert,
  Edit2,
  Check
} from "lucide-react";
import { DraggableChart } from './ChartManager';
import DatabaseSelector from './DatabaseSelector';
import SchemaSelector from './SchemaSelector';
import FunctionSelector from './FunctionSelector';
import ChartTypeSelector from './ChartTypeSelector';

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
      <div className="flex items-center space-x-1">
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
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 group">
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
    </div>
  );
};

const ChartCreationWizard = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedChartType, setSelectedChartType] = useState(null);

  const [selectedDb, setSelectedDb] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  
  const databases = [
    { id: 'db1', name: 'Production DB', type: 'PostgreSQL' },
    { id: 'db2', name: 'Analytics DB', type: 'MySQL' },
    { id: 'db3', name: 'Archive DB', type: 'MongoDB' },
  ];
  
  const schemas = [
    { id: 'schema1', name: 'public' },
    { id: 'schema2', name: 'analytics' },
    { id: 'schema3', name: 'security' },
  ];
  
  const functions = [
    {
      id: 'func1',
      name: 'get_sales_data',
      description: 'Retourne les données de vente',
      columns: [
        { name: 'month', type: 'varchar' },
        { name: 'amount', type: 'numeric' },
        { name: 'product', type: 'varchar' },
      ],
      parameters: [
        { name: 'start_date', type: 'date' },
        { name: 'end_date', type: 'date' },
      ]
    },
    // Plus de fonctions...
  ];

  const handleComplete = () => {
    const newChart = {
      type: selectedChartType,
      db: selectedDb,
      schema: selectedSchema,
      function: selectedFunction,
      position: { x: 100, y: 100 }
    };
    onComplete(newChart);
  };
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Ajouter un nouveau graphique</h2>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">1</div>
              <div className="w-16 h-1 bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">2</div>
              <div className="w-16 h-1 bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">3</div>
              <div className="w-16 h-1 bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">4</div>
            </div>
          </div>
          
          <div className="min-h-[400px]">
            {step === 1 && (
              <ChartTypeSelector onSelect={(type) => {
                setSelectedChartType(type);
                setStep(2);
              }} />
            )}
            {step === 2 && (
              <DatabaseSelector 
                databases={databases} 
                selectedDb={selectedDb} 
                onSelectDb={setSelectedDb}
                onNext={() => setStep(3)}
              />
            )}
            
            {step === 3 && (
              <SchemaSelector 
                schemas={schemas} 
                selectedSchema={selectedSchema} 
                onSelectSchema={setSelectedSchema}
                onBack={() => setStep(2)}
                onNext={() => setStep(4)}
              />
            )}
            
            {step === 4 && (
              <FunctionSelector 
                functions={functions} 
                selectedFunction={selectedFunction} 
                onSelectFunction={setSelectedFunction}
                onBack={() => setStep(3)}
                onNext={handleComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({  charts,  onEditChart, onDeleteChart, onMoveChart }) => {
  return (
    <div className="flex-1 overflow-auto p-6 relative bg-gray-50">
      <div className="h-full min-h-[calc(100vh-180px)] border-2 border-dashed border-gray-300 rounded-lg bg-white relative">
        {charts.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <CircleAlert size={48} className="mb-2" />
            <p className="text-lg font-medium">Aucun graphique</p>
            <p className="text-sm">Cliquez sur "Ajouter un graphique" pour commencer</p>
          </div>
        )}
        
        {charts.map(chart => (
          <DraggableChart
            key={chart.id}
            id={chart.id}
            type={chart.type}
            position={chart.position}
            onMove={onMoveChart}
            onEdit={onEditChart}
            onDelete={onDeleteChart}
          />
        ))}
      </div>
    </div>
  );
};

const DashboardApp = () => {
  const [dashboards, setDashboards] = useState([
    { 
      id: '1', 
      name: 'Tableau principal', 
      active: true,
      charts: []
    },
    { 
      id: '2', 
      name: 'Analyse sécurité', 
      active: false,
      charts: []
    }
  ]);
  
  const [showChartWizard, setShowChartWizard] = useState(false);
  const [nextChartId, setNextChartId] = useState(1);

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
    setDashboards(dashboards.map(db => ({
      ...db,
      active: db.id === id
    })));
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
    // Implémentez la logique d'édition ici
    console.log(`Editing chart ${chartId} in dashboard ${dashboardId}`);
  };

  const deleteChart = (dashboardId, chartId) => {
    setDashboards(dashboards.map(db => 
      db.id === dashboardId
        ? { ...db, charts: db.charts.filter(chart => chart.id !== chartId) }
        : db
    ));
  };

  const activeDashboard = dashboards.find(db => db.active);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Barre de navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-blue-600">
              <LayoutDashboard size={24} />
              <span className="text-xl font-semibold">Dashboard Builder</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Barre des tableaux de bord */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {dashboards.map(dashboard => (
                <EditableDashboardName
                  key={dashboard.id}
                  name={dashboard.name}
                  isActive={dashboard.active}
                  onNameChange={(newName) => updateDashboardName(dashboard.id, newName)}
                  onClick={() => switchDashboard(dashboard.id)}
                />
              ))}
              
              <button 
                onClick={createNewDashboard}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-1"
              >
                <Plus size={16} />
                <span>Nouveau tableau</span>
              </button>
            </div>
          </div>
          
          {activeDashboard && (
            <button 
              onClick={() => setShowChartWizard(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Ajouter un graphique</span>
            </button>
          )}
        </div>
      </div>
      
     <div className="flex flex-1 overflow-hidden">
        {/* Sidebar optionnelle */}
      
        
        {/* Tableau de bord actif */}
        {activeDashboard ? (
          <Dashboard 
            name={activeDashboard.name}
            charts={activeDashboard.charts}
            onAddChart={() => setShowChartWizard(true)}
            onEditChart={(chartId) => editChart(activeDashboard.id, chartId)}
            onDeleteChart={(chartId) => deleteChart(activeDashboard.id, chartId)}
            onMoveChart={(chartId, position) => moveChart(activeDashboard.id, chartId, position)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Sélectionnez ou créez un tableau de bord</p>
          </div>
        )}
      </div>
      
      {/* Wizard de création de graphique */}
      {showChartWizard && (
        <ChartCreationWizard 
          onComplete={addChartToDashboard}
          onCancel={() => setShowChartWizard(false)}
        />
      )}
      
      {/* Styles globaux */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardApp;