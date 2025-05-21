// routes/sqlRoutes.js
const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController');

// Route pour obtenir toutes les bases de données
router.get('/databases', sqlController.getAllDatabases);

// Route pour obtenir tous les schémas d'une base de données
router.get('/databases/:database/schemas', sqlController.getSchemas);

// Route pour obtenir toutes les fonctions d'un schéma
router.get('/databases/:database/schemas/:schema/functions', sqlController.getFunctions);

// Route pour obtenir les détails d'une fonction spécifique
router.get('/databases/:database/schemas/:schema/functions/:function_name', sqlController.getFunctionDetails);

module.exports = router;