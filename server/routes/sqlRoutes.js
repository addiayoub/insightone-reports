// routes/sqlRoutes.js
const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController');

// Routes pour la gestion des serveurs
router.get('/servers', sqlController.getServers);
router.get('/servers/:server/connect', sqlController.connectToServer);

// Routes pour l'exploration des bases de données (sans spécifier de serveur)
router.get('/databases', sqlController.getAllDatabases);
router.get('/databases/:database/schemas', sqlController.getSchemas);
router.get('/databases/:database/schemas/:schema/functions', sqlController.getFunctions);
router.get('/databases/:database/schemas/:schema/functions/:function_name', sqlController.getFunctionDetails);
router.post('/databases/:database/schemas/:schema/functions/:function_name/execute', sqlController.executeFunction);

// Routes pour l'exploration des bases de données (avec un serveur spécifié)
router.get('/servers/:server/databases', sqlController.getAllDatabases);
router.get('/servers/:server/databases/:database/schemas', sqlController.getSchemas);
router.get('/servers/:server/databases/:database/schemas/:schema/functions', sqlController.getFunctions);
router.get('/servers/:server/databases/:database/schemas/:schema/functions/:function_name', sqlController.getFunctionDetails);
router.post('/servers/:server/databases/:database/schemas/:schema/functions/:function_name/execute', sqlController.executeFunction);

module.exports = router;    