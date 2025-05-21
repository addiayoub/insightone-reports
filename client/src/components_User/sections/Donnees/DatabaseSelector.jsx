import React, { useState, useEffect } from 'react';
import { Database, ChevronLeft, AlertCircle, Loader } from 'lucide-react';
import { sqlService } from './api-service';

const DatabaseSelector = ({ selectedDb, onSelectDb, onNext, onBack, selectedServer }) => {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        setLoading(true);
        const data = await sqlService.getDatabases(selectedServer?.id);
        setDatabases(data);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les bases de données. Veuillez réessayer.');
        console.error('Erreur lors du chargement des bases de données:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDatabases();
  }, [selectedServer]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader size={30} className="animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Chargement des bases de données...</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <button onClick={onBack} className="text-blue-500 hover:text-blue-700">
          <ChevronLeft />
        </button>
        <h3 className="text-lg font-medium">Sélectionnez une base de données</h3>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-3 text-red-700 mb-4">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {databases.length > 0 ? (
          databases.map(db => (
            <div 
              key={db.id}
              onClick={() => onSelectDb(db.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedDb === db.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
            >
              <div className="flex items-center space-x-3">
                <Database className="text-blue-500" />
                <div>
                  <h4 className="font-medium">{db.name}</h4>
                  <p className="text-sm text-gray-500">{db.type}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 p-6 text-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Aucune base de données disponible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseSelector;