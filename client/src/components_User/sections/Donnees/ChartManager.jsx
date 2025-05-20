  import ReactECharts from 'echarts-for-react';
  import { 
    BarChart, 
    PieChart, 
    LineChart,
    AreaChart,
    ScatterChart,
    CircleAlert,
    Pencil,
    Trash2,
    MoveHorizontal,
    Plus,
    XCircle
  } from "lucide-react";
  import { useEffect, useState, useRef } from 'react';
 import { motion } from 'framer-motion';
import DraggableChart from './DraggableChart';

  // Données d'exemple
  const barData = [
    { name: 'Jan', valeur: 3, presque: 5, actions: 7 },
    { name: 'Fév', valeur: 2, presque: 4, actions: 7 },
    { name: 'Mar', valeur: 1, presque: 3, actions: 5 },
    { name: 'Avr', valeur: 0, presque: 2, actions: 3 },
    { name: 'Mai', valeur: 0, presque: 4, actions: 6 },
    { name: 'Juin', valeur: 0, presque: 4, actions: 5 },
  ];

  const pieData = [
    { name: 'Conformes', value: 92, color: '#4ade80' },
    { name: 'Non-conformités mineures', value: 15, color: '#f97316' },
    { name: 'Non-conformités majeures', value: 5, color: '#ef4444' },
    { name: 'Observations', value: 8, color: '#94a3b8' },
  ];

  const lineData = [
    { name: 'Jan', valeur: 20 },
    { name: 'Fév', valeur: 25 },
    { name: 'Mar', valeur: 35 },
    { name: 'Avr', valeur: 30 },
    { name: 'Mai', valeur: 45 },
    { name: 'Juin', valeur: 40 },
  ];

  // Configuration des options pour les graphiques ECharts
  const getBarChartOption = (data = barData) => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Incidents', 'Presque acc.', 'Actions']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Incidents',
        type: 'bar',
        data: data.map(item => item.valeur),
        itemStyle: {
          color: '#ef4444'
        }
      },
      {
        name: 'Presque acc.',
        type: 'bar',
        data: data.map(item => item.presque),
        itemStyle: {
          color: '#f97316'
        }
      },
      {
        name: 'Actions',
        type: 'bar',
        data: data.map(item => item.actions),
        itemStyle: {
          color: '#3b82f6'
        }
      }
    ]
  });

  const getPieChartOption = (data = pieData) => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: data.map(item => item.name)
    },
    series: [
      {
        name: 'Statistiques',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color
          }
        }))
      }
    ]
  });

  const getLineChartOption = (data = lineData) => ({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Valeur',
        type: 'line',
        data: data.map(item => item.valeur),
        lineStyle: {
          color: '#3b82f6'
        },
        itemStyle: {
          color: '#3b82f6'
        }
      }
    ]
  });

  const GraphPreview = ({ type }) => {
  const baseOption = {
    animation: true,
    animationDuration: 800,
    animationEasing: 'elasticOut',
    grid: { top: 10, right: 10, bottom: 10, left: 10 }
  };

  switch (type) {
    case 'bar':
      return (
        <motion.div
          className="w-48 h-32 bg-white rounded-md shadow-lg p-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ReactECharts 
            option={{ 
              ...baseOption, 
              ...getBarChartOption(barData.slice(0, 3)),
              series: [
                {
                  name: 'Incidents',
                  type: 'bar',
                  data: barData.slice(0, 3).map(item => item.valeur),
                  itemStyle: { color: '#ef4444' },
                  animationDelay: (idx) => idx * 100
                },
                {
                  name: 'Presque acc.',
                  type: 'bar',
                  data: barData.slice(0, 3).map(item => item.presque),
                  itemStyle: { color: '#f97316' },
                  animationDelay: (idx) => idx * 100
                },
                {
                  name: 'Actions',
                  type: 'bar',
                  data: barData.slice(0, 3).map(item => item.actions),
                  itemStyle: { color: '#3b82f6' },
                  animationDelay: (idx) => idx * 100
                }
              ]
            }} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </motion.div>
      );
    case 'pie':
      return (
        <motion.div
          className="w-48 h-32 bg-white rounded-md shadow-lg p-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ReactECharts 
            option={{ 
              ...baseOption, 
              ...getPieChartOption(),
              series: [{
                name: 'Statistiques',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: { show: false, position: 'center' },
                emphasis: { label: { show: true, fontSize: '12', fontWeight: 'bold' } },
                labelLine: { show: false },
                data: pieData.map(item => ({
                  value: item.value,
                  name: item.name,
                  itemStyle: { color: item.color }
                })),
                animationType: 'scale',
                animationDelay: (idx) => idx * 100
              }]
            }} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </motion.div>
      );
    case 'line':
      return (
        <motion.div
          className="w-48 h-32 bg-white rounded-md shadow-lg p-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ReactECharts 
            option={{ 
              ...baseOption, 
              ...getLineChartOption(),
              series: [{
                name: 'Valeur',
                type: 'line',
                data: lineData.map(item => item.valeur),
                lineStyle: { color: '#3b82f6' },
                itemStyle: { color: '#3b82f6' },
                animationDelay: (idx) => idx * 50
              }]
            }} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </motion.div>
      );
    case 'radar':
      return (
        <motion.div
          className="w-48 h-32 bg-white rounded-md shadow-lg p-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ReactECharts 
            option={{ 
              ...baseOption,
              radar: {
                indicator: [
                  { name: 'Indicateur 1', max: 100 },
                  { name: 'Indicateur 2', max: 100 },
                  { name: 'Indicateur 3', max: 100 },
                  { name: 'Indicateur 4', max: 100 },
                  { name: 'Indicateur 5', max: 100 }
                ]
              },
              series: [{
                type: 'radar',
                data: [{ value: [60, 70, 80, 50, 90] }],
                animationDelay: (idx) => idx * 100
              }]
            }} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </motion.div>
      );
    default:
      return (
        <motion.div
          className="w-48 h-32 bg-white rounded-md shadow-lg p-2 flex items-center justify-center text-gray-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          Aperçu non disponible
        </motion.div>
      );
  }
};





const ChartManager = ({ charts, setCharts }) => {
  const [nextId, setNextId] = useState(1);
  const [hoveredChart, setHoveredChart] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const menuHoveredRef = useRef(false);

  const chartTypes = [
    { id: 'bar', icon: <BarChart size={16} />, name: 'Barres' },
    { id: 'pie', icon: <PieChart size={16} />, name: 'Circulaire' },
    { id: 'line', icon: <LineChart size={16} />, name: 'Ligne' },
    { id: 'area', icon: <AreaChart size={16} />, name: 'Surface' },
    { id: 'scatter', icon: <ScatterChart size={16} />, name: 'Dispersion' },
  ];

  const addChart = (type) => {
    const id = `chart-${nextId}`;
    setCharts([
      ...charts,
      { id, type, position: { x: 100 + (charts.length * 20), y: 100 + (charts.length * 20) } }
    ]);
    setNextId(nextId + 1);
    setIsAdding(false);
    setHoveredChart(null);
  };

  const moveChart = (id, position) => {
    setCharts(
      charts.map(chart => 
        chart.id === id ? { ...chart, position } : chart
      )
    );
  };

  const editChart = (id) => {
    console.log(`Édition du graphique ${id}`);
  };

  const deleteChart = (id) => {
    setCharts(charts.filter(chart => chart.id !== id));
  };

  const handleChartHover = (type, e) => {
    setHoveredChart(type);
    setTooltipPosition({ 
      x: e.clientX + 10, 
      y: e.clientY + 10 
    });
    menuHoveredRef.current = true;
  };

  const handleChartLeave = () => {
    setTimeout(() => {
      if (!menuHoveredRef.current) {
        setHoveredChart(null);
      }
    }, 50);
    menuHoveredRef.current = false;
  };

  const handleMenuLeave = () => {
    menuHoveredRef.current = false;
    setTimeout(() => {
      if (!menuHoveredRef.current) {
        setHoveredChart(null);
      }
    }, 100);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar des graphiques */}
      <motion.div 
        className="w-64 bg-white border-r border-gray-200 flex flex-col"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Graphiques</h3>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`w-full py-2 px-3 text-sm rounded-md flex items-center justify-center space-x-2 transition-colors ${isAdding ? 'bg-blue-100 text-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            <Plus size={16} />
            <span>Ajouter un graphique</span>
          </button>
        </div>
        
        {isAdding && (
          <motion.div 
            className="p-2 border-b border-gray-200"
            onMouseLeave={handleMenuLeave}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
              <h3 className="px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium">Types de graphiques</h3>
              <ul className="divide-y divide-gray-100">
                {chartTypes.map((chart) => (
                  <motion.li 
                    key={chart.id}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2 transition-colors"
                    onClick={() => addChart(chart.id)}
                    onMouseEnter={(e) => handleChartHover(chart.id, e)}
                    onMouseLeave={handleChartLeave}
                    whileHover={{ x: 2 }}
                  >
                    <div className="text-gray-500">{chart.icon}</div>
                    <span className="text-sm text-gray-700">{chart.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
        
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Mes graphiques</h3>
          {charts.length === 0 ? (
            <p className="text-sm text-gray-500">Aucun graphique ajouté</p>
          ) : (
            <ul className="space-y-2">
              {charts.map(chart => (
                <motion.li 
                  key={chart.id}
                  className="p-2 text-sm bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    {chart.type === 'bar' && <BarChart size={14} className="text-blue-500" />}
                    {chart.type === 'pie' && <PieChart size={14} className="text-green-500" />}
                    {chart.type === 'line' && <LineChart size={14} className="text-purple-500" />}
                    <span>
                      {chart.type === 'bar' ? 'Barres' : 
                       chart.type === 'pie' ? 'Circulaire' :
                       chart.type === 'line' ? 'Ligne' : 'Graphique'}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteChart(chart.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <XCircle size={16} />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
      
      {/* Zone de travail */}
      <motion.div 
        className="flex-1 overflow-auto p-6 relative bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="h-full min-h-[calc(100vh-180px)] border-2 border-dashed border-gray-300 rounded-lg bg-white relative"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
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
              <p className="text-sm">Ajoutez un graphique depuis le menu latéral</p>
            </motion.div>
          )}
          
          <AnimatePresence>
            {charts.map(chart => (
              <DraggableChart
                key={chart.id}
                id={chart.id}
                type={chart.type}
                position={chart.position}
                onMove={moveChart}
                onEdit={editChart}
                onDelete={deleteChart}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      {/* Tooltip de prévisualisation */}
      <AnimatePresence>
        {hoveredChart && (
          <motion.div
            className="fixed z-50"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <GraphPreview type={hoveredChart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChartManager;//////