// db/sql.config.js
const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

// Fonction pour établir une connexion à un serveur SQL Server spécifique
const connectToServer = async (serverConfig) => {
  try {
    // Déconnexion des connexions existantes si nécessaire
    if (global.sqlPool) {
      await global.sqlPool.close();
    }
    
    // Créer une nouvelle connexion
    const pool = await sql.connect(serverConfig);
    console.log(`SQL Server connecté: ${serverConfig.server}`);
    
    // Stocker la connexion globalement pour une utilisation ultérieure
    global.sqlPool = pool;
    global.currentServerConfig = serverConfig;
    
    return pool;
  } catch (err) {
    console.error(`Erreur de connexion SQL Server ${serverConfig.server}:`, err);
    throw err;
  }
};

// Fonction pour obtenir la connexion existante ou se connecter par défaut
const connectSQL = async (serverName = null) => {
  // Si un nom de serveur est fourni, construire une nouvelle configuration
  if (serverName) {
    // Configuration basée sur le serveur spécifié
    const serverConfig = {
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      server: serverName,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    };
    
    return await connectToServer(serverConfig);
  }
  
  // Utiliser la connexion existante si disponible
  if (global.sqlPool) {
    return global.sqlPool;
  }
  
  // Configuration par défaut à partir des variables d'environnement
  const defaultConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };
  
  // Se connecter avec la configuration par défaut
  return await connectToServer(defaultConfig);
};

// Liste des serveurs configurés
const getConfiguredServers = () => {
  // Récupérer la liste des serveurs à partir des variables d'environnement
  const serverListStr = process.env.SQL_SERVER_LIST || process.env.SQL_SERVER;
  const serverList = serverListStr.split(',').map(server => server.trim());
  
  return serverList;
};

// Exporter les fonctions et l'objet SQL
module.exports = { connectSQL, getConfiguredServers, sql };