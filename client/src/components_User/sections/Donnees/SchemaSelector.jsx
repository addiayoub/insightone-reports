import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Table, AlertCircle, Loader } from 'lucide-react';
import { sqlService } from './api-service';

const SchemaSelector = ({ selectedSchema, onSelectSchema, onBack, onNext, selectedServer, selectedDb }) => {
  const [schemas, setSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemas = async () => {
      if (!selectedDb) return;
      
      try {
        setLoading(true);
        const data = await sqlService.getSchemas(selectedServer?.id, selectedDb);
        setSchemas(data);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les schémas. Veuillez réessayer.');
        console.error('Erreur lors du chargement des schémas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemas();
  }, [selectedDb, selectedServer]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader size={30} className="animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Chargement des schémas...</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <button onClick={onBack} className="text-blue-500 hover:text-blue-700">
          <ChevronLeft />
        </button>
        <h3 className="text-lg font-medium">Sélectionnez un schéma</h3>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-3 text-red-700 mb-4">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      
      <div className="space-y-2">
        {schemas.length > 0 ? (
          schemas.map(schema => (
            <div 
              key={schema.id}
              onClick={() => onSelectSchema(schema.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedSchema === schema.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Table className="text-blue-500" />
                  <h4 className="font-medium">{schema.name}</h4>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Aucun schéma disponible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaSelector;