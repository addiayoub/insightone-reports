import { ChevronDown, ChevronLeft, ChevronRight, Columns, FunctionSquare, Settings } from 'lucide-react';
import React, { useState } from 'react'

const FunctionSelector = ({ functions, selectedFunction, onSelectFunction, onBack, onNext }) => {
  const [expandedFunction, setExpandedFunction] = useState(null);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <button onClick={onBack} className="text-blue-500 hover:text-blue-700">
          <ChevronLeft />
        </button>
        <h3 className="text-lg font-medium">Sélectionnez une fonction</h3>
      </div>
      
      <div className="space-y-2">
        {functions.map(func => (
          <div key={func.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              onClick={() => {
                onSelectFunction(func.id);
                setExpandedFunction(expandedFunction === func.id ? null : func.id);
              }}
              className={`p-3 cursor-pointer transition-all ${selectedFunction === func.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FunctionSquare className="text-purple-500" />
                  <div>
                    <h4 className="font-medium">{func.name}</h4>
                    <p className="text-sm text-gray-500">{func.description}</p>
                  </div>
                </div>
                {expandedFunction === func.id ? <ChevronDown /> : <ChevronRight />}
              </div>
            </div>
            
            {expandedFunction === func.id && (
              <div className="p-3 bg-gray-50 border-t border-gray-200 animate-slideDown">
                <h5 className="text-sm font-medium mb-2 flex items-center">
                  <Columns className="mr-2" size={14} /> Colonnes disponibles
                </h5>
                <div className="grid grid-cols-3 gap-2">
                  {func.columns.map(col => (
                    <div key={col.name} className="text-sm p-2 bg-white rounded border border-gray-200">
                      <div className="font-mono text-xs">{col.name}</div>
                      <div className="text-xs text-gray-500">{col.type}</div>
                    </div>
                  ))}
                </div>
                
                <h5 className="text-sm font-medium mt-4 mb-2 flex items-center">
                  <Settings className="mr-2" size={14} /> Paramètres
                </h5>
                <div className="space-y-2">
                  {func.parameters.map(param => (
                    <div key={param.name} className="text-sm">
                      <label className="block text-gray-700 mb-1">{param.name}</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md text-xs" 
                        placeholder={`Type: ${param.type}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {selectedFunction && (
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Terminer la configuration
          </button>
        </div>
      )}
    </div>
  );
};

export default FunctionSelector