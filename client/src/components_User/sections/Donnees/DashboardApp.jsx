import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
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
  Check,
  MoreHorizontal,
  ChevronDown,
  Loader2,
  Save,
  Edit
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import DraggableChart from './DraggableChart';
import DatabaseSelector from './DatabaseSelector';
import SchemaSelector from './SchemaSelector';
import FunctionSelector from './FunctionSelector';
import ChartTypeSelector from './ChartTypeSelector';

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
const ChartCreationWizard = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedChartType, setSelectedChartType] = useState(null);
  const [selectedDb, setSelectedDb] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  ];

  const handleComplete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newChart = {
        type: selectedChartType,
        db: selectedDb,
        schema: selectedSchema,
        function: selectedFunction,
        position: { x: 100, y: 100 }
      };
      onComplete(newChart);
      setIsSubmitting(false);
    }, 800); // Simuler un chargement
  };

  const steps = [
    { id: 1, title: 'Type de graphique' },
    { id: 2, title: 'Base de données' },
    { id: 3, title: 'Schéma' },
    { id: 4, title: 'Fonction' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Ajouter un nouveau graphique</h2>
            <button 
              onClick={onCancel} 
              className="text-gray-500 hover:text-gray-700 transition-colors"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((stepItem, index) => (
                <React.Fragment key={stepItem.id}>
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepItem.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                    animate={{ 
                      scale: step === stepItem.id ? 1.1 : 1,
                      backgroundColor: step >= stepItem.id ? '#3B82F6' : '#E5E7EB'
                    }}
                  >
                    {stepItem.id}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="w-16 h-1 bg-gray-200"
                      animate={{ 
                        backgroundColor: step > stepItem.id ? '#3B82F6' : '#E5E7EB'
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step === 1 ? -20 : 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-4"
              >
                {step === 1 && (
                  <ChartTypeSelector 
                    onSelect={(type) => {
                      setSelectedChartType(type);
                      setStep(2);
                    }} 
                  />
                )}
                {step === 2 && (
                  <DatabaseSelector 
                    databases={databases} 
                    selectedDb={selectedDb} 
                    onSelectDb={setSelectedDb}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
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
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={16} />
              <span>Précédent</span>
            </button>
            
            {step < 4 ? (
              <button
                onClick={() => step < 4 && setStep(step + 1)}
                disabled={step === 4 || (step === 1 && !selectedChartType) || (step === 2 && !selectedDb) || (step === 3 && !selectedSchema)}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 ${(step === 4 || (step === 1 && !selectedChartType) || (step === 2 && !selectedDb) || (step === 3 && !selectedSchema)) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                <span>Suivant</span>
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!selectedFunction || isSubmitting}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 ${!selectedFunction || isSubmitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Création...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Terminer</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Composant StaticChart pour le mode visualisation
const StaticChart = ({ type }) => {
  const renderChart = () => {
    const baseOption = {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'elasticOut',
      grid: { top: 30, right: 10, bottom: 30, left: 40 }
    };

     switch (type) {
          case 'bar':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                  yAxis: { type: 'value' },
                  series: [{ 
                    type: 'bar', 
                    data: [120, 200, 150, 80, 70, 110, 130],
                    itemStyle: { color: '#5470C6' },
                    animationDelay: (idx) => idx * 100 // Décalage d'animation pour chaque barre
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'pie':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  series: [{
                    type: 'pie',
                    radius: '50%',
                    data: [
                      { value: 1048, name: 'Search Engine' },
                      { value: 735, name: 'Direct' },
                      { value: 580, name: 'Email' },
                      { value: 484, name: 'Union Ads' },
                      { value: 300, name: 'Video Ads' }
                    ],
                    animationType: 'scale', // Animation d'expansion
                    animationDelay: (idx) => idx * 100
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'line':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                  yAxis: { type: 'value' },
                  series: [{ 
                    type: 'line', 
                    data: [150, 230, 224, 218, 135, 147, 260],
                    smooth: true,
                    lineStyle: { color: '#91CC75' },
                    animationDelay: (idx) => idx * 50
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'scatter':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  xAxis: { type: 'value' },
                  yAxis: { type: 'value' },
                  series: [{
                    type: 'scatter',
                    symbolSize: 20,
                    data: [
                      [10.0, 8.04],
                      [8.0, 6.95],
                      [13.0, 7.58],
                      [9.0, 8.81],
                      [11.0, 8.33],
                      [14.0, 9.96],
                      [6.0, 7.24],
                      [4.0, 4.26],
                      [12.0, 10.84],
                      [7.0, 4.82],
                      [5.0, 5.68]
                    ],
                    itemStyle: { color: '#EE6666' },
                    animationDelay: (idx) => idx * 50
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'radar':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  radar: {
                    indicator: [
                      { name: 'Sales', max: 6500 },
                      { name: 'Administration', max: 16000 },
                      { name: 'IT', max: 30000 },
                      { name: 'Customer', max: 38000 },
                      { name: 'Dev', max: 52000 },
                      { name: 'Marketing', max: 25000 }
                    ]
                  },
                  series: [{
                    type: 'radar',
                    data: [
                      { value: [4200, 3000, 20000, 35000, 50000, 18000] }
                    ],
                    animationDelay: (idx) => idx * 100
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'treemap':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  series: [{
                    type: 'treemap',
                    data: [{
                      name: 'nodeA',
                      value: 10,
                      children: [{
                        name: 'nodeAa',
                        value: 4
                      }, {
                        name: 'nodeAb',
                        value: 6
                      }]
                    }],
                    animationDelay: (idx) => idx * 100
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'sunburst':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  series: {
                    type: 'sunburst',
                    data: [{
                      name: 'Grandpa',
                      children: [{
                        name: 'Uncle Leo',
                        value: 15,
                        children: [{
                          name: 'Cousin Jack',
                          value: 2
                        }, {
                          name: 'Cousin Mary',
                          value: 5,
                          children: [{
                            name: 'Jackson',
                            value: 2
                          }]
                        }]
                      }],
                      animationType: 'scale',
                      animationDelay: (idx) => idx * 100
                    }]
                  }
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'gauge':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  series: [{
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: 50 }],
                    animationDelay: 200
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'funnel':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  series: [{
                    type: 'funnel',
                    data: [
                      { value: 60, name: 'Visit' },
                      { value: 40, name: 'Inquiry' },
                      { value: 20, name: 'Order' },
                      { value: 10, name: 'Payment' }
                    ],
                    animationDelay: (idx) => idx * 100
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'candlestick':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  xAxis: { type: 'category', data: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'] },
                  yAxis: { scale: true },
                  series: [{
                    type: 'candlestick',
                    data: [
                      [20, 34, 10, 38],
                      [40, 35, 30, 50],
                      [31, 38, 33, 44],
                      [38, 15, 5, 42],
                      [34, 44, 12, 56]
                    ],
                    animationDelay: (idx) => idx * 100
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          case 'graph':
            return (
              <ReactECharts 
                option={{ 
                  ...baseOption,
                  series: [{
                    type: 'graph',
                    layout: 'force',
                    data: [
                      { id: '0', name: 'Node 0', symbolSize: 50 },
                      { id: '1', name: 'Node 1', symbolSize: 30 },
                      { id: '2', name: 'Node 2', symbolSize: 30 },
                      { id: '3', name: 'Node 3', symbolSize: 30 }
                    ],
                    links: [
                      { source: '0', target: '1' },
                      { source: '0', target: '2' },
                      { source: '0', target: '3' }
                    ],
                    emphasis: { focus: 'adjacency' },
                    roam: true,
                    label: { show: true },
                    force: { repulsion: 100 },
                    animationDelay: (idx) => idx * 100
                  }]
                }} 
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            );
          default:
            return (
              <div className="flex items-center justify-center h-full text-gray-500">
                Type de graphique non supporté: {type}
              </div>
        );
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-4 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        {type === 'bar' ? 'Graphique à barres' : 
         type === 'pie' ? 'Graphique circulaire' :
         type === 'line' ? 'Graphique linéaire' : 'Graphique'}
      </h3>
      <div className="w-full h-64">
        {renderChart()}
      </div>
    </motion.div>
  );
};

// Composant Dashboard avec animations
const Dashboard = ({ charts, onEditChart, onDeleteChart, onMoveChart, isSwitching, isViewMode }) => {
  return (
    <div className="flex-1 overflow-auto p-6 relative bg-gray-50">
      {!isViewMode ? (
        <motion.div 
          className="h-full min-h-[calc(100vh-180px)] border-2 border-dashed border-gray-300 rounded-lg bg-white relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {charts.length === 0 && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CircleAlert size={48} className="mb-2" />
              <p className="text-lg font-medium">Aucun graphique</p>
              <p className="text-sm">Cliquez sur "Ajouter un graphique" pour commencer</p>
            </motion.div>
          )}
          
          <AnimatePresence>
            {charts.map(chart => (
              <motion.div
                key={chart.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <DraggableChart
                  id={chart.id}
                  type={chart.type}
                  position={chart.position}
                  onMove={onMoveChart}
                  onEdit={onEditChart}
                  onDelete={onDeleteChart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charts.length === 0 ? (
            <motion.div 
              className="col-span-full h-full flex flex-col items-center justify-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CircleAlert size={48} className="mb-2" />
              <p className="text-lg font-medium">Aucun graphique</p>
              <p className="text-sm">Retournez en mode édition pour ajouter des graphiques</p>
            </motion.div>
          ) : (
            charts.map(chart => (
              <StaticChart key={chart.id} type={chart.type} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Composant principal de l'application
const DashboardApp = () => {
  const [dashboards, setDashboards] = useState([
    { 
      id: '1', 
      name: 'Tableau principal', 
      active: true,
      charts: [
        { id: 'chart-1', type: 'bar', position: { x: 50, y: 50 } },
        { id: 'chart-2', type: 'pie', position: { x: 400, y: 50 } }
      ]
    },
    { 
      id: '2', 
      name: 'Analyse sécurité', 
      active: false,
      charts: [
        { id: 'chart-3', type: 'line', position: { x: 50, y: 50 } }
      ]
    },
    { 
      id: '3', 
      name: 'Performance', 
      active: false,
      charts: []
    },
    { 
      id: '4', 
      name: 'Ventes', 
      active: false,
      charts: []
    },
    { 
      id: '5', 
      name: 'Clients', 
      active: false,
      charts: []
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