const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/votesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const SECRET_KEY = 'azyudgugyTUtygtuyudzgygyezGYHGYF1653749';

// Middleware to verify tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ error: 'Access denied' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Autorise uniquement cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autorise ces méthodes HTTP
  allowedHeaders: ['Content-Type', 'Authorization'], // Autorise ces en-têtes
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Backend is running 👋');
});

// Récupérer les meilleurs scores
app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Vote.find({}, { username: 1, score: 1 })
      .sort({ score: -1 }) // Trie par score décroissant
      .limit(10); // Limite à 10 résultats
    res.send({ leaderboard });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    // Supprimez les données si nécessaire (optionnel)
    await Vote.deleteMany({}); // Supprime tous les votes
    await Category.deleteMany({}); // Supprime toutes les catégories
    console.log('Base de données réinitialisée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la réinitialisation de la base de données :', error.message);
  }
});