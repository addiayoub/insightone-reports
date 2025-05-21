// controllers/sqlController.js
const SQLModel = require('../models/sqlModel');

// Contrôleur pour les opérations SQL Server
const sqlController = {
  // Obtenir toutes les bases de données
  getAllDatabases: async (req, res) => {
    try {
      const databases = await SQLModel.getAllDatabases();
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
      const { database } = req.params;
      
      if (!database) {
        return res.status(400).json({
          success: false,
          message: 'Nom de base de données requis'
        });
      }

      const schemas = await SQLModel.getSchemas(database);
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
      const { database, schema } = req.params;
      
      if (!database || !schema) {
        return res.status(400).json({
          success: false,
          message: 'Nom de base de données et nom de schéma requis'
        });
      }

      const functions = await SQLModel.getFunctions(database, schema);
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

  // Obtenir les détails d'une fonction spécifique
  getFunctionDetails: async (req, res) => {
    try {
      const { database, schema, function_name } = req.params;
      
      if (!database || !schema || !function_name) {
        return res.status(400).json({
          success: false,
          message: 'Nom de base de données, nom de schéma et nom de fonction requis'
        });
      }

      const functionDetails = await SQLModel.getFunctionDetails(database, schema, function_name);
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