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
    animation: false,
    grid: { top: 10, right: 10, bottom: 10, left: 10 }
  };

  switch(type) {
    case 'bar':
      return (
        <div className="w-48 h-32 bg-white rounded-md shadow-lg p-2">
          <ReactECharts 
            option={{ ...baseOption, ...getBarChartOption(barData.slice(0, 3)) }} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      );
    case 'pie':
      return (
        <div className="w-48 h-32 bg-white rounded-md shadow-lg p-2">
          <ReactECharts 
            option={{ ...baseOption, ...getPieChartOption() }} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      );
    case 'line':
      return (
        <div className="w-48 h-32 bg-white rounded-md shadow-lg p-2">
          <ReactECharts 
            option={{ ...baseOption, ...getLineChartOption() }} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      );
    case 'radar':
      return (
        <div className="w-48 h-32 bg-white rounded-md shadow-lg p-2">
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
                data: [
                  { value: [60, 70, 80, 50, 90] }
                ]
              }]
            }} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      );
    default:
      return (
        <div className="w-48 h-32 bg-white rounded-md shadow-lg p-2 flex items-center justify-center text-gray-500">
          Aperçu non disponible
        </div>
      );
  }
};

// Composant de graphique à glisser-déposer
// Composant de graphique à glisser-déposer
export const DraggableChart = ({ type, id, position, onMove, onEdit, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  const [showControls, setShowControls] = useState(false);
  const chartRef = useRef(null);
  const containerRef = useRef(null); // Référence au conteneur parent
  
  // Mise à jour de la position actuelle lorsque la position externe change
  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);
  
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!chartRef.current) return;
    
    // Récupérer la position du conteneur de travail
    const workspaceRect = document.querySelector('.h-full.min-h-\\[calc\\(100vh-180px\\)\\]').getBoundingClientRect();
    
    // Calculer l'offset par rapport à la position du conteneur de travail
    const offsetX = e.clientX - (workspaceRect.left + currentPosition.x);
    const offsetY = e.clientY - (workspaceRect.top + currentPosition.y);
    
    setIsDragging(true);
    setDragOffset({ x: offsetX, y: offsetY });
  };
  
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onMove(id, currentPosition);
    }
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      // Récupérer la position du conteneur de travail
      const workspaceRect = document.querySelector('.h-full.min-h-\\[calc\\(100vh-180px\\)\\]').getBoundingClientRect();
      
      // Calculer la nouvelle position relative au conteneur
      const newX = e.clientX - workspaceRect.left - dragOffset.x;
      const newY = e.clientY - workspaceRect.top - dragOffset.y;
      
      // Limiter la position à l'intérieur du conteneur
      const boundedX = Math.max(0, Math.min(newX, workspaceRect.width - 264));
      const boundedY = Math.max(0, Math.min(newY, workspaceRect.height - 200));
      
      setCurrentPosition({ x: boundedX, y: boundedY });
    }
  };
  
  const handleTouchStart = (e) => {
    if (!chartRef.current) return;
    const touch = e.touches[0];
    
    // Récupérer la position du conteneur de travail
    const workspaceRect = document.querySelector('.h-full.min-h-\\[calc\\(100vh-180px\\)\\]').getBoundingClientRect();
    
    // Calculer l'offset par rapport à la position du conteneur de travail
    const offsetX = touch.clientX - (workspaceRect.left + currentPosition.x);
    const offsetY = touch.clientY - (workspaceRect.top + currentPosition.y);
    
    setIsDragging(true);
    setDragOffset({ x: offsetX, y: offsetY });
  };
  
  const handleTouchMove = (e) => {
    if (isDragging && e.touches[0]) {
      const touch = e.touches[0];
      
      // Récupérer la position du conteneur de travail
      const workspaceRect = document.querySelector('.h-full.min-h-\\[calc\\(100vh-180px\\)\\]').getBoundingClientRect();
      
      // Calculer la nouvelle position relative au conteneur
      const newX = touch.clientX - workspaceRect.left - dragOffset.x;
      const newY = touch.clientY - workspaceRect.top - dragOffset.y;
      
      // Limiter la position à l'intérieur du conteneur
      const boundedX = Math.max(0, Math.min(newX, workspaceRect.width - 264));
      const boundedY = Math.max(0, Math.min(newY, workspaceRect.height - 200));
      
      setCurrentPosition({ x: boundedX, y: boundedY });
    }
  };
  
  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      onMove(id, currentPosition);
    }
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);
  
  const renderChart = () => {
  // Options de base pour tous les graphiques
  const baseOption = {
    animation: false,
    grid: { top: 30, right: 10, bottom: 30, left: 40 }
  };

  switch(type) {
    case 'bar':
      return (
        <ReactECharts 
          option={{ ...baseOption, ...getBarChartOption() }} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      );
    case 'pie':
      return (
        <ReactECharts 
          option={{ ...baseOption, ...getPieChartOption() }} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      );
    case 'line':
      return (
        <ReactECharts 
          option={{ ...baseOption, ...getLineChartOption() }} 
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
                { name: 'Indicateur 1', max: 100 },
                { name: 'Indicateur 2', max: 100 },
                { name: 'Indicateur 3', max: 100 },
                { name: 'Indicateur 4', max: 100 },
                { name: 'Indicateur 5', max: 100 }
              ]
            },
            series: [{
              type: 'radar',
              data: [
                { value: [60, 70, 80, 50, 90] }
              ]
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
              data: [[10, 5], [20, 20], [30, 15], [40, 25], [50, 10]],
              symbolSize: 10
            }]
          }} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      );
    // Ajoutez d'autres cas pour les types de graphiques
    default:
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Type de graphique non supporté
        </div>
      );
  }
};
  
  const style = {
    left: `${currentPosition.x}px`,
    top: `${currentPosition.y}px`,
    zIndex: isDragging ? 1000 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
    transition: isDragging ? 'none' : 'transform 0.2s ease',
    width: '264px'
  };
  
  return (
    <div 
      ref={chartRef}
      className="absolute bg-white rounded-lg shadow-lg"
      style={style}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div 
        className="w-full p-2 bg-gray-50 border-b border-gray-200 rounded-t-lg flex justify-between items-center select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <h3 className="text-sm font-medium text-gray-700">
          {type === 'bar' ? 'Graphique à barres' : 
           type === 'pie' ? 'Graphique circulaire' :
           type === 'line' ? 'Graphique linéaire' : 'Graphique'}
        </h3>
        <div className="flex space-x-1">
          {showControls && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
                className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <Pencil size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
          <button className="p-1 text-gray-500 cursor-grab active:cursor-grabbing">
            <MoveHorizontal size={16} />
          </button>
        </div>
      </div>
      <div className="w-64 h-48">
        {renderChart()}
      </div>
    </div>
  );
};

// Composant gestionnaire de graphiques
const ChartManager = ({ charts, setCharts }) => {
  const [nextId, setNextId] = useState(1);
  const [hoveredChart, setHoveredChart] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  // Ajout d'une référence pour suivre si la souris est au-dessus d'un élément du menu
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
    // Masquer le tooltip lorsqu'un graphique est ajouté
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
    // On utilise setTimeout pour permettre de détecter si la souris est passée
    // à un autre élément du menu ou si elle a vraiment quitté le menu
    setTimeout(() => {
      if (!menuHoveredRef.current) {
        setHoveredChart(null);
      }
    }, 50);
    menuHoveredRef.current = false;
  };

  // Événement pour gérer quand la souris quitte la zone du menu
  const handleMenuLeave = () => {
    menuHoveredRef.current = false;
    // Utiliser un court délai pour s'assurer que le tooltip disparaît correctement
    setTimeout(() => {
      if (!menuHoveredRef.current) {
        setHoveredChart(null);
      }
    }, 100);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar des graphiques */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
          <div 
            className="p-2 border-b border-gray-200"
            onMouseLeave={handleMenuLeave}
          >
            <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
              <h3 className="px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium">Types de graphiques</h3>
              <ul className="divide-y divide-gray-100">
                {chartTypes.map((chart) => (
                  <li 
                    key={chart.id}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2 transition-colors"
                    onClick={() => addChart(chart.id)}
                    onMouseEnter={(e) => handleChartHover(chart.id, e)}
                    onMouseLeave={handleChartLeave}
                  >
                    <div className="text-gray-500">{chart.icon}</div>
                    <span className="text-sm text-gray-700">{chart.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Mes graphiques</h3>
          {charts.length === 0 ? (
            <p className="text-sm text-gray-500">Aucun graphique ajouté</p>
          ) : (
            <ul className="space-y-2">
              {charts.map(chart => (
                <li 
                  key={chart.id}
                  className="p-2 text-sm bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between"
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Zone de travail */}
      <div className="flex-1 overflow-auto p-6 relative bg-gray-50">
        <div className="h-full min-h-[calc(100vh-180px)] border-2 border-dashed border-gray-300 rounded-lg bg-white relative">
          {charts.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <CircleAlert size={48} className="mb-2" />
              <p className="text-lg font-medium">Aucun graphique</p>
              <p className="text-sm">Ajoutez un graphique depuis le menu latéral</p>
            </div>
          )}
          
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
        </div>
      </div>
      
      {/* Tooltip de prévisualisation - maintenant conditionnel */}
      {hoveredChart && (
        <div
          className="fixed z-50 animate-fadeIn pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          <GraphPreview type={hoveredChart} />
        </div>
      )}
    </div>
  );
};

export default ChartManager;