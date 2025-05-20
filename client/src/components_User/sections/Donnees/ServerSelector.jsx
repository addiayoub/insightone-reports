import React from 'react';
import { Server } from 'lucide-react';

const ServerSelector = ({ servers, selectedServer, onSelectServer, onNext }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900">Sélectionner un serveur</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choisissez le serveur auquel vous souhaitez vous connecter
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servers.map((server) => (
          <div 
            key={server.id}
            onClick={() => onSelectServer(server)}
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
        ))}
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