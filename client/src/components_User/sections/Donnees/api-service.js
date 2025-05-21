// api-service.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const sqlService = {
  // Requêtes concernant les serveurs
  getServers: async () => {
    const response = await api.get('/sql/servers');
    return response.data;
  },
  
 connectToServer: async (serverId) => {
    // Encode the serverId to handle special characters
    const encodedServerId = encodeURIComponent(serverId);
    const response = await api.get(`/sql/servers/${encodedServerId}/connect`);
    return response.data;
  },
  
  // Requêtes concernant les bases de données
    getDatabases: async (serverId) => {
    const response = await api.get(
      serverId ? `/sql/servers/${serverId}/databases` : '/sql/databases'
    );
    
    // Transformez la réponse ici
    return response.data.data.map(db => ({
      id: db.name,
      name: db.name,
      type: 'SQL Server'
    }));
  },
  
  // Requêtes concernant les schémas
  getSchemas: async (serverId, databaseId) => {
    const endpoint = serverId 
      ? `/sql/servers/${serverId}/databases/${databaseId}/schemas`
      : `/sql/databases/${databaseId}/schemas`;
    
    const response = await api.get(endpoint);
    return response.data;
  },
  
  // Requêtes concernant les fonctions
  getFunctions: async (serverId, databaseId, schemaId) => {
    const endpoint = serverId
      ? `/sql/servers/${serverId}/databases/${databaseId}/schemas/${schemaId}/functions`
      : `/sql/databases/${databaseId}/schemas/${schemaId}/functions`;
    
    const response = await api.get(endpoint);
    return response.data;
  },
  
  // Récupération des détails d'une fonction
  getFunctionDetails: async (serverId, databaseId, schemaId, functionName) => {
    const endpoint = serverId
      ? `/sql/servers/${serverId}/databases/${databaseId}/schemas/${schemaId}/functions/${functionName}`
      : `/sql/databases/${databaseId}/schemas/${schemaId}/functions/${functionName}`;
    
    const response = await api.get(endpoint);
    return response.data;
  },
  
  // Exécution d'une fonction
  executeFunction: async (serverId, databaseId, schemaId, functionName, parameters) => {
    const endpoint = serverId
      ? `/sql/servers/${serverId}/databases/${databaseId}/schemas/${schemaId}/functions/${functionName}/execute`
      : `/sql/databases/${databaseId}/schemas/${schemaId}/functions/${functionName}/execute`;
    
    const response = await api.post(endpoint, { parameters });
    return response.data;
  }
};

export default sqlService;