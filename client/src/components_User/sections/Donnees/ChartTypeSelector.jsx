import React, { useState } from 'react';
import { 
  BarChart, PieChart, LineChart, ScatterChart,
  Gauge, Funnel, 
  CandlestickChart,
  GitGraph,
  RadarIcon,
  Fence,
  Network,
  Check
} from "lucide-react";
import ReactECharts from 'echarts-for-react';

const chartTypes = [
  { 
    id: 'bar', 
    name: 'Barres', 
    icon: <BarChart size={20} />,
    description: 'Affiche des données sous forme de barres rectangulaires',
    option: {
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{ 
        type: 'bar', 
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: '#5470C6' }
      }]
    }
  },
  { 
    id: 'line', 
    name: 'Ligne', 
    icon: <LineChart size={20} />,
    description: 'Affiche des données sous forme de lignes connectées',
    option: {
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{ 
        type: 'line', 
        data: [150, 230, 224, 218, 135, 147, 260],
        smooth: true,
        lineStyle: { color: '#91CC75' }
      }]
    }
  },
  { 
    id: 'pie', 
    name: 'Circulaire', 
    icon: <PieChart size={20} />,
    description: 'Affiche les proportions sous forme de secteurs circulaires',
    option: {
      series: [{
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }]
    }
  },
  { 
    id: 'scatter', 
    name: 'Dispersion', 
    icon: <ScatterChart size={20} />,
    description: 'Affiche des points pour visualiser les relations entre variables',
    option: {
      xAxis: {},
      yAxis: {},
      series: [{
        symbolSize: 20,
        type: 'scatter',
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
        itemStyle: { color: '#EE6666' }
      }]
    }
  },
  { 
    id: 'radar', 
    name: 'Radar', 
    icon: <RadarIcon size={20} />,
    description: 'Affiche des données multivariées sur des axes rayonnants',
    option: {
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
        ]
      }]
    }
  },
  { 
    id: 'treemap', 
    name: 'Treemap', 
    icon: <Network size={20} />,
    description: 'Affiche des données hiérarchiques sous forme de rectangles imbriqués',
    option: {
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
        }]
      }]
    }
  },
  { 
    id: 'sunburst', 
    name: 'Sunburst', 
    icon: <Fence size={20} />,
    description: 'Affiche des données hiérarchiques en anneaux concentriques',
    option: {
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
            }]
          }]
        }]
      }
    }
  },
  { 
    id: 'gauge', 
    name: 'Jauge', 
    icon: <Gauge size={20} />,
    description: 'Affiche une valeur sur une échelle circulaire',
    option: {
      series: [{
        type: 'gauge',
        data: [{ value: 50 }]
      }]
    }
  },
  { 
    id: 'funnel', 
    name: 'Entonnoir', 
    icon: <Funnel size={20} />,
    description: 'Affiche un processus avec étapes et taux de conversion',
    option: {
      series: [{
        type: 'funnel',
        data: [
          { value: 60, name: 'Visit' },
          { value: 40, name: 'Inquiry' }
        ]
      }]
    }
  },
  { 
    id: 'candlestick', 
    name: 'Chandelier', 
    icon: <CandlestickChart size={20} />,
    description: 'Affiche des données financières en chandeliers',
    option: {
      xAxis: { type: 'category' },
      yAxis: { scale: true },
      series: [{
        type: 'candlestick',
        data: [
          [20, 34, 10, 38]
        ]
      }]
    }
  },
  
];

const ChartPreview = ({ option }) => {
  return (
    <div className="w-full h-48">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};

const ChartTypeSelector = ({ onSelect, selectedChartType, onBack, onNext }) => {
  const [hoveredChart, setHoveredChart] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (chartType, event) => {
    setHoveredChart(chartType);
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: rect.right + 20,
      y: rect.top
    });
  };

  const handleMouseLeave = () => {
    setHoveredChart(null);
  };

  const handleSelect = (chartId) => {
    onSelect(chartId);
  };

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900">Sélectionner un type de graphique</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choisissez le type de visualisation qui convient le mieux à vos données
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chartTypes.map(chart => (
          <div 
            key={chart.id}
            onClick={() => handleSelect(chart.id)}
            onMouseEnter={(e) => handleMouseEnter(chart, e)}
            onMouseLeave={handleMouseLeave}
            className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
              selectedChartType === chart.id 
                ? 'border-blue-500 bg-blue-50 shadow' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`text-${selectedChartType === chart.id ? 'blue-600' : 'blue-500'}`}>
                {chart.icon}
              </div>
              <div>
                <h4 className="font-medium">{chart.name}</h4>
                <p className="text-sm text-gray-500">{chart.description}</p>
              </div>
            </div>
            
            {/* Indicateur de sélection */}
            {selectedChartType === chart.id && (
              <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Aperçu flottant au survol */}
      {hoveredChart && (
        <div 
          className="fixed z-50 bg-white p-4 rounded-lg shadow-xl border border-gray-200"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
            width: '400px',
            height: '300px'
          }}
        >
          <h4 className="font-medium mb-2">{hoveredChart.name}</h4>
          <ChartPreview option={hoveredChart.option} />
        </div>
      )}
      
      {/* Aperçu du graphique sélectionné */}
      {selectedChartType && (
        <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Aperçu du graphique sélectionné</h4>
          <div className="h-56 border border-gray-200 bg-white rounded-lg p-2">
            <ChartPreview option={chartTypes.find(c => c.id === selectedChartType).option} />
          </div>
          
          {/* Boutons de navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-md flex items-center space-x-2 text-gray-600 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span>Précédent</span>
            </button>
            
            <button
              onClick={onNext}
              className="px-4 py-2 rounded-md flex items-center space-x-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              <span>Terminer</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartTypeSelector;