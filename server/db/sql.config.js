// db/sql.config.js
const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

// Configuration de la connexion SQL Server
const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // Pour Azure
    trustServerCertificate: true // Changer selon votre environnement
  }
};

// Fonction pour établir une connexion à SQL Server
const connectSQL = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    console.log('SQL Server connecté');
    return pool;
  } catch (err) {
    console.error('Erreur de connexion SQL Server:', err);
    throw err;
  }
};

module.exports = { connectSQL, sql };