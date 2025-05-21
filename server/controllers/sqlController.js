// controllers/sqlController.js
const SQLModel = require('../models/sqlModel');

// Contrôleur pour les opérations SQL Server
const sqlController = {
  // Obtenir la liste des serveurs configurés
  getServers: async (req, res) => {
    try {
      const servers = await SQLModel.getServers();
      res.status(200).json({
        success: true,
        count: servers.length,
        data: servers
      });
    } catch (error) {
      console.error('Erreur dans le contrôleur getServers:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des serveurs',
        error: error.message
      });
    }
  },

  // Se connecter à un serveur spécifique
  connectToServer: async (req, res) => {
    try {
      const { server } = req.params;
      
      if (!server) {
        return res.status(400).json({
          success: false,
          message: 'Nom de serveur requis'
        });
      }

      const result = await SQLModel.connectToServer(server);
      res.status(200).json({
        success: true,
        message: `Connecté au serveur ${server}`,
        data: result
      });
    } catch (error) {
      console.error('Erreur dans le contrôleur connectToServer:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la connexion au serveur',
        error: error.message
      });
    }
  },

  // Obtenir toutes les bases de données
  getAllDatabases: async (req, res) => {
    try {
      const { server } = req.params;
      const databases = await SQLModel.getAllDatabases(server || null);
      res.status(200).json({
        success: true,
        count: databases.length,
        data: databases
      });
    } catch (error) {
      console.error('Erreur dans le contrôleur getAllDatabases:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des bases de données',
        error: error.message
      });
    }
  },

  // Obtenir tous les schémas d'une base de données
  getSchemas: async (req, res) => {
    try {
      const { server, database } = req.params;
      
      if (!database) {
        return res.status(400).json({
          success: false,
          message: 'Nom de base de données requis'
        });
      }

      const schemas = await SQLModel.getSchemas(database, server || null);
      res.status(200).json({
        success: true,
        count: schemas.length,
        data: schemas
      });
    } catch (error) {
      console.error('Erreur dans le contrôleur getSchemas:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des schémas',
        error: error.message
      });
    }
  },

  // Obtenir toutes les fonctions d'un schéma
  getFunctions: async (req, res) => {
    try {
      const { server, database, schema } = req.params;
      
      if (!database || !schema) {
        return res.status(400).json({
          success: false,
          message: 'Nom de base de données et nom de schéma requis'
        });
      }

      const functions = await SQLModel.getFunctions(database, schema, server || null);
      res.status(200).json({
        success: true,
        count: functions.length,
        data: functions
      });
    } catch (error) {
      console.error('Erreur dans le contrôleur getFunctions:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des fonctions',
        error: error.message
      });
    }
  },
executeFunction: async (req, res) => {
  try {
    const { server, database, schema, function_name } = req.params;
    const { parameters } = req.body; // Les paramètres sont envoyés dans le corps de la requête
    
    if (!database || !schema || !function_name) {
      return res.status(400).json({
        success: false,
        message: 'Nom de base de données, nom de schéma et nom de fonction requis'
      });
    }

    // Vérifier que les paramètres sont dans un format valide
    if (parameters && !Array.isArray(parameters)) {
      return res.status(400).json({
        success: false,
        message: 'Les paramètres doivent être fournis sous forme de tableau'
      });
    }

    const result = await SQLModel.executeFunction(
      database, 
      schema, 
      function_name, 
      parameters || [], 
      server || null
    );
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Erreur dans le contrôleur executeFunction:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'exécution de la fonction",
      error: error.message
    });
  }
}
,
  // Obtenir les détails d'une fonction spécifique
  getFunctionDetails: async (req, res) => {
    try {
      const { server, database, schema, function_name } = req.params;
      
      if (!database || !schema || !function_name) {
        return res.status(400).json({
          success: false,
          message: 'Nom de base de données, nom de schéma et nom de fonction requis'
        });
      }

      const functionDetails = await SQLModel.getFunctionDetails(database, schema, function_name, server || null);
      res.status(200).json({
        success: true,
        data: functionDetails
      });
    } catch (error) {
      console.error('Erreur dans le contrôleur getFunctionDetails:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des détails de la fonction',
        error: error.message
      });
    }
  }
};

module.exports = sqlController;