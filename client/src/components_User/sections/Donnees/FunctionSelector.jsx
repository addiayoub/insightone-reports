import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Columns, FunctionSquare, Settings, AlertCircle, Loader } from 'lucide-react';
import { sqlService } from './api-service';

const FunctionSelector = ({ selectedFunction, onSelectFunction, onBack, onNext, selectedServer, selectedDb, selectedSchema }) => {
  const [functions, setFunctions] = useState([]);
  const [functionDetails, setFunctionDetails] = useState({});
  const [expandedFunction, setExpandedFunction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState({});
  const [error, setError] = useState(null);
  const [functionParams, setFunctionParams] = useState({});

  useEffect(() => {
    const fetchFunctions = async () => {
      if (!selectedDb || !selectedSchema) return;
      
      try {
        setLoading(true);
        const data = await sqlService.getFunctions(selectedServer?.id, selectedDb, selectedSchema);
        setFunctions(data);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les fonctions. Veuillez réessayer.');
        console.error('Erreur lors du chargement des fonctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFunctions();
  }, [selectedDb, selectedSchema, selectedServer]);

  const handleFunctionClick = async (funcId, funcName) => {
    onSelectFunction(funcId);
    
    if (expandedFunction === funcId) {
      setExpandedFunction(null);
      return;
    }
    
    setExpandedFunction(funcId);
    
    // Si les détails de cette fonction n'ont pas encore été chargés
    if (!functionDetails[funcId]) {
      try {
        setDetailsLoading(prev => ({ ...prev, [funcId]: true }));
        const details = await sqlService.getFunctionDetails(selectedServer?.id, selectedDb, selectedSchema, funcName);
        setFunctionDetails(prev => ({ ...prev, [funcId]: details }));
        
        // Initialiser les valeurs des paramètres
        const initialParams = {};
        details.parameters.forEach(param => {
          initialParams[param.name] = '';
        });
        setFunctionParams(prev => ({ ...prev, [funcId]: initialParams }));
      } catch (err) {
        console.error('Erreur lors du chargement des détails de la fonction:', err);
      } finally {
        setDetailsLoading(prev => ({ ...prev, [funcId]: false }));
      }
    }
  };

  const handleParamChange = (funcId, paramName, value) => {
    setFunctionParams(prev => ({
      ...prev,
      [funcId]: {
        ...(prev[funcId] || {}),
        [paramName]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader size={30} className="animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Chargement des fonctions...</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <button onClick={onBack} className="text-blue-500 hover:text-blue-700">
          <ChevronLeft />
        </button>
        <h3 className="text-lg font-medium">Sélectionnez une fonction</h3>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-3 text-red-700 mb-4">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      
      <div className="space-y-2">
        {functions.length > 0 ? (
          functions.map(func => (
            <div key={func.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                onClick={() => handleFunctionClick(func.id, func.name)}
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
                  {detailsLoading[func.id] ? (
                    <div className="flex justify-center p-4">
                      <Loader size={24} className="animate-spin text-blue-500" />
                    </div>
                  ) : (
                    <>
                      {functionDetails[func.id] && (
                        <>
                          <h5 className="text-sm font-medium mb-2 flex items-center">
                            <Columns className="mr-2" size={14} /> Colonnes disponibles
                          </h5>
                          <div className="grid grid-cols-3 gap-2">
                            {functionDetails[func.id].columns.map(col => (
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
                            {functionDetails[func.id].parameters.map(param => (
                              <div key={param.name} className="text-sm">
                                <label className="block text-gray-700 mb-1">{param.name}</label>
                                <input 
                                  type={param.type === 'date' ? 'date' : param.type === 'number' ? 'number' : 'text'} 
                                  className="w-full p-2 border border-gray-300 rounded-md text-xs" 
                                  placeholder={`Type: ${param.type}`}
                                  value={functionParams[func.id]?.[param.name] || ''}
                                  onChange={(e) => handleParamChange(func.id, param.name, e.target.value)}
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Aucune fonction disponible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionSelector;