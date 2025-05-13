// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config({ path: '.env' });

// Connecter à la base de données
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.log('Erreur de connexion MongoDB:', err));

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

