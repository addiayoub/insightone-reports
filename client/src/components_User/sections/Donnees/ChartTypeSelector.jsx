import React, { useState } from 'react'
import { 
  BarChart, PieChart, LineChart, ScatterChart,
    
  Gauge, Funnel, 
  CandlestickChart,
  GitGraph,
  RadarIcon,
  Fence,
  Network,


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
  { 
    id: 'graph', 
    name: 'Réseau', 
    icon: <GitGraph size={20} />,
    description: 'Affiche des relations entre noeuds dans un graphe',
    option: {
      series: [{
        type: 'graph',
        data: [{
          id: '0',
          symbolSize: 50
        }]
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
const ChartTypeSelector = ({ onSelect }) => {
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

  return (
    <div className="relative">
      <h3 className="text-lg font-medium mb-4">Sélectionnez un type de graphique</h3>
      <div className="grid grid-cols-3 gap-4">
        {chartTypes.map(chart => (
          <div 
            key={chart.id}
            onClick={() => onSelect(chart.id)}
            onMouseEnter={(e) => handleMouseEnter(chart, e)}
            onMouseLeave={handleMouseLeave}
            className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="text-blue-500">{chart.icon}</div>
              <div>
                <h4 className="font-medium">{chart.name}</h4>
                <p className="text-sm text-gray-500">{chart.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hoveredChart && (
        <div 
          className="fixed z-50 bg-white p-4 rounded-lg shadow-xl border border-gray-200 animate-fadeIn"
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
    </div>
  );
};

export default ChartTypeSelector