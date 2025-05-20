import React, { useEffect, useRef, useState } from 'react'
  import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { MoveHorizontal, Pencil, Trash2 } from 'lucide-react';

export const DraggableChart = ({ type, id, position, onMove, onEdit, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  const [showControls, setShowControls] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!chartRef.current) return;

    const workspaceRect = document.querySelector('.h-full.min-h-\\[calc\\(100vh-180px\\)\\]').getBoundingClientRect();
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
      const workspaceRect = document.querySelector('.h-full.min-h-\\[calc\\(100vh-180px\\)\\]').getBoundingClientRect();
      const newX = e.clientX - workspaceRect.left - dragOffset.x;
      const newY = e.clientY - workspaceRect.top - dragOffset.y;
      const boundedX = Math.max(0, Math.min(newX, workspaceRect.width - 264));
      const boundedY = Math.max(0, Math.min(newY, workspaceRect.height - 200));
      setCurrentPosition({ x: boundedX, y: boundedY });
    }
  };

  const handleTouchStart = (e) => {
    if (!chartRef.current) return;
    const touch = e.touches[0];
    const workspaceRect = document.querySelector('.h-full.min-h-\\[calc\\(100vh-180px\\)\\]').getBoundingClientRect();
    const offsetX = touch.clientX - (workspaceRect.left + currentPosition.x);
    const offsetY = touch.clientY - (workspaceRect.top + currentPosition.y);
    setIsDragging(true);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleTouchMove = (e) => {``
    if (isDragging && e.touches[0]) {
      const touch = e.touches[0];
      const workspaceRect = document.querySelector('.h-full.min-h-\\[calc\\(100vh-180px\\)\\]').getBoundingClientRect();
      const newX = touch.clientX - workspaceRect.left - dragOffset.x;
      const newY = touch.clientY - workspaceRect.top - dragOffset.y;
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
    // Options de base avec animations activées
    const baseOption = {
      animation: true,
      animationDuration: 1000, // Durée de l'animation en millisecondes
      animationEasing: 'elasticOut', // Courbe d'animation fluide
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
    <motion.div
      ref={chartRef}
      className="absolute bg-white rounded-lg shadow-lg"
      style={style}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div 
        className="w-full p-2 bg-gray-50 border-b border-gray-200 rounded-t-lg flex justify-between items-center select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <h3 className="text-sm font-medium text-gray-700">
          {type === 'bar' ? 'Graphique à barres' : 
           type === 'pie' ? 'Graphique circulaire' :
           type === 'line' ? 'Graphique linéaire' : 
           type === 'scatter' ? 'Graphique de dispersion' :
           type === 'radar' ? 'Graphique radar' :
           type === 'treemap' ? 'Treemap' :
           type === 'sunburst' ? 'Sunburst' :
           type === 'gauge' ? 'Jauge' :
           type === 'funnel' ? 'Entonnoir' :
           type === 'candlestick' ? 'Chandelier' :
           type === 'graph' ? 'Graphique réseau' :
           'Graphique'}
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
    </motion.div>
  );
};

export default DraggableChart