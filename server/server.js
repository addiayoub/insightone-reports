// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectSQL } = require('./db/sql.config');

// Charger les variables d'environnement
dotenv.config({ path: '.env' });

// Connecter à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.log('Erreur de connexion MongoDB:', err));

// Tester la connexion SQL Server au démarrage
connectSQL()
  .then(() => console.log('SQL Server connecté au démarrage'))
  .catch(err => console.log('Erreur de connexion SQL Server au démarrage:', err));

const app = express();

// Body parser
app.use(express.json());
// Configuration CORS - Autoriser toutes les origines
app.use(cors({
  origin: '*', // Permet toutes les origines
  credentials: true
}));

// Cookie parser
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sql', require('./routes/sqlRoutes')); // Nouvelles routes SQL

// Gérer les routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} non trouvée`
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});