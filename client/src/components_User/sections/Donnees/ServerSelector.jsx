import React, { useState, useEffect } from 'react';
import { Server, AlertCircle, Loader } from 'lucide-react';
import { sqlService } from './api-service';

const ServerSelector = ({ selectedServer, onSelectServer, onNext }) => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   // Dans ServerSelector.js
const fetchServers = async () => {
  try {
    setLoading(true);
    const response = await sqlService.getServers();
    // Si vous ne pouvez pas modifier le service, transformez les données ici
    const formattedServers = response.data.map(server => ({
      id: server.name,
      name: server.name,
      location: 'Local',
    }));
    setServers(formattedServers);
    setError(null);
  } catch (err) {
    setError('Impossible de charger les serveurs. Veuillez réessayer.');
    console.error('Erreur lors du chargement des serveurs:', err);
  } finally {
    setLoading(false);
  }
};

    fetchServers();
  }, []);

  const handleServerSelect = async (server) => {
  try {
    // Tester la connexion au serveur sélectionné
    await sqlService.connectToServer(server.id);
    onSelectServer(server);
    setError(null); // Clear any previous errors
  } catch (err) {
    setError(`Impossible de se connecter au serveur ${server.name}. Vérifiez que le serveur est accessible.`);
    console.error('Erreur de connexion au serveur:', err);
  }
};

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader size={30} className="animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Chargement des serveurs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900">Sélectionner un serveur</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choisissez le serveur auquel vous souhaitez vous connecter
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-3 text-red-700 mb-4">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
{servers && servers.length > 0 ? (
          servers.map((server) => (
            <div 
              key={server.id}
              onClick={() => handleServerSelect(server)}
              className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                selectedServer?.id === server.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  selectedServer?.id === server.id 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <Server size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{server.name}</h4>
                  <p className="text-sm text-gray-500">{server.location}</p>
                </div>
              </div>
              {selectedServer?.id === server.id && (
                <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-blue-500"></div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-3 p-6 text-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Aucun serveur disponible</p>
          </div>
        )}
      </div>

      {selectedServer && (
        <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h4 className="font-medium text-gray-900">Serveur sélectionné</h4>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Nom:</span> {selectedServer.name}
            </div>
            <div>
              <span className="text-gray-500">Région:</span> {selectedServer.location}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerSelector;