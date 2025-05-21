// models/sqlModel.js
const { connectSQL, getConfiguredServers, sql } = require('../db/sql.config');

class SQLModel {
  // Récupérer la liste des serveurs configurés
  static async getServers() {
    try {
      const servers = getConfiguredServers();
      return servers.map(server => ({ name: server }));
    } catch (error) {
      console.error('Erreur lors de la récupération des serveurs:', error);
      throw error;
    }
  }
static async executeFunction(databaseName, schemaName, functionName, parameters = [], serverName = null) {
  try {
    const pool = await connectSQL(serverName);
    
    // Utiliser la base de données spécifiée
    await pool.request().query(`USE [${databaseName}]`);
    
    // Construire la requête dynamiquement avec les paramètres
    let query = `SELECT * FROM [${schemaName}].[${functionName}](`;
    
    // Ajouter les paramètres avec leur valeur
    const paramPlaceholders = [];
    const request = pool.request();
    
    // Traiter chaque paramètre et l'ajouter à la requête
    if (parameters && parameters.length > 0) {
      parameters.forEach((param, index) => {
        const paramName = `param${index}`;
        paramPlaceholders.push(`@${paramName}`);
        
        // Ajouter le paramètre à la requête
        request.input(paramName, param.value);
      });
      
      query += paramPlaceholders.join(', ');
    }
    
    query += ')';
    
    // Exécuter la requête
    const result = await request.query(query);
    
    return {
      success: true,
      recordset: result.recordset,
      rowsAffected: result.rowsAffected
    };
  } catch (error) {
    console.error(`Erreur lors de l'exécution de la fonction ${functionName}:`, error);
    throw error;
  }
}
  // Se connecter à un serveur spécifique
  static async connectToServer(serverName) {
    try {
      await connectSQL(serverName);
      return { success: true, message: `Connecté au serveur ${serverName}` };
    } catch (error) {
      console.error(`Erreur lors de la connexion au serveur ${serverName}:`, error);
      throw error;
    }
  }

  // Récupérer toutes les bases de données du serveur actuellement connecté
  static async getAllDatabases(serverName = null) {
    try {
      const pool = await connectSQL(serverName);
      const result = await pool.request()
        .query('SELECT name FROM sys.databases WHERE database_id > 4'); // Exclut les bases système
      
      return result.recordset;
    } catch (error) {
      console.error('Erreur lors de la récupération des bases de données:', error);
      throw error;
    }
  }

  // Récupérer tous les schémas d'une base de données spécifique
  static async getSchemas(databaseName, serverName = null) {
    try {
      const pool = await connectSQL(serverName);
      const result = await pool.request()
        .query(`USE [${databaseName}]; SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA;`);
      
      return result.recordset;
    } catch (error) {
      console.error(`Erreur lors de la récupération des schémas pour la base de données ${databaseName}:`, error);
      throw error;
    }
  }

  // Récupérer toutes les fonctions d'un schéma spécifique
  static async getFunctions(databaseName, schemaName, serverName = null) {
    try {
      const pool = await connectSQL(serverName);
      const result = await pool.request()
        .query(`
          USE [${databaseName}];
          SELECT 
            ROUTINE_NAME,
            ROUTINE_TYPE,
            CREATED,
            LAST_ALTERED
          FROM INFORMATION_SCHEMA.ROUTINES
          WHERE ROUTINE_SCHEMA = '${schemaName}'
          AND ROUTINE_TYPE = 'FUNCTION'
          ORDER BY ROUTINE_NAME;
        `);
      
      return result.recordset;
    } catch (error) {
      console.error(`Erreur lors de la récupération des fonctions pour le schéma ${schemaName}:`, error);
      throw error;
    }
  }

  // Récupérer les détails d'une fonction spécifique
  static async getFunctionDetails(databaseName, schemaName, functionName, serverName = null) {
    try {
      const pool = await connectSQL(serverName);
      
      // Récupérer la définition de la fonction
      const definitionResult = await pool.request()
        .query(`
          USE [${databaseName}];
          SELECT OBJECT_DEFINITION(OBJECT_ID('[${schemaName}].[${functionName}]')) AS function_definition;
        `);
      
      // Récupérer les informations sur les paramètres de la fonction
      const parametersResult = await pool.request()
        .query(`
          USE [${databaseName}];
          SELECT 
            p.name AS parameter_name,
            t.name AS parameter_type,
            p.max_length,
            p.precision,
            p.scale,
            p.is_output,
            p.has_default_value,
            p.default_value
          FROM sys.parameters p
          INNER JOIN sys.types t ON p.system_type_id = t.system_type_id
          WHERE object_id = OBJECT_ID('[${schemaName}].[${functionName}]')
          ORDER BY p.parameter_id;
        `);
      
      // Récupérer les informations sur les colonnes retournées (pour les fonctions de table)
      const columnsResult = await pool.request()
        .query(`
          USE [${databaseName}];
          SELECT 
            c.name AS column_name,
            t.name AS data_type,
            c.max_length,
            c.precision,
            c.scale,
            c.is_nullable
          FROM sys.columns c
          INNER JOIN sys.types t ON c.system_type_id = t.system_type_id
          WHERE c.object_id = OBJECT_ID('[${schemaName}].[${functionName}]')
          ORDER BY c.column_id;
        `);
      
      // Déterminer le type de retour (scalaire ou table)
      const typeResult = await pool.request()
        .query(`
          USE [${databaseName}];
          SELECT 
            SCHEMA_NAME(o.schema_id) AS schema_name,
            o.name AS function_name,
            o.type_desc AS function_type
          FROM sys.objects o
          WHERE o.object_id = OBJECT_ID('[${schemaName}].[${functionName}]');
        `);
      
      // Rassembler toutes les informations
      return {
        function_definition: definitionResult.recordset[0]?.function_definition,
        function_type: typeResult.recordset[0]?.function_type,
        parameters: parametersResult.recordset,
        return_columns: columnsResult.recordset
      };
    } catch (error) {
      console.error(`Erreur lors de la récupération des détails de la fonction ${functionName}:`, error);
      throw error;
    }
  }
}

module.exports = SQLModel;