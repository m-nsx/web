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

// Définition du modèle de vote
const voteSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  candidate: { type: String, required: true },
  title: { type: String, required: true },
  score: { type: Number, required: true }, // Ajout du champ score
});
const Vote = mongoose.model('Vote', voteSchema);

// Define the schema and model for categories
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  options: { type: [String], required: true },
});
const Category = mongoose.model('Category', categorySchema);

// Define the schema and model for users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

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

// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ error: 'All fields are required.' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ error: 'All fields are required.' });
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Créer un vote avec un score
app.post('/vote', authenticateToken, async (req, res) => {
  const { username, category, option, score } = req.body;
  if (!username || !category || !option || typeof score !== 'number' || score <= 0) {
    return res.status(400).send({ error: 'All fields are required, and score must be a positive number.' });
  }
  try {
    // Vérifiez si un vote existe déjà pour cet utilisateur et cette catégorie
    const existingVote = await Vote.findOne({ username, title: category });
    if (existingVote) {
      // Si un vote existe, mettez à jour le score
      existingVote.score = score;
      existingVote.candidate = option; // Met à jour l'option si nécessaire
      await existingVote.save();
      return res.send({ message: `Vote updated with ${score} votes!`, vote: existingVote });
    }

    // Sinon, créez un nouveau vote
    const vote = new Vote({ username, candidate: option, title: category, score });
    await vote.save();
    res.send({ message: `Vote recorded with ${score} votes!`, vote });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Récupérer tous les votes
app.get('/votes', async (req, res) => {
  try {
    const votes = await Vote.find({}, { username: 1, candidate: 1, title: 1, score: 1 });
    res.send({ votes });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Mettre à jour un vote
app.put('/vote', async (req, res) => {
  const { username, candidate, title, score } = req.body;
  if (!username || !candidate || !title || typeof score !== 'number' || score <= 0) {
    return res.status(400).send({ error: 'All fields are required, and score must be a positive number.' });
  }
  try {
    const vote = await Vote.findOneAndUpdate(
      { username, title },
      { candidate, $inc: { score } }, // Incrémente le score
      { new: true } // Retourne le document mis à jour
    );
    if (!vote) {
      return res.status(404).send({ error: 'Vote not found.' });
    }
    res.send({ message: 'Vote updated!', vote });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Supprimer un vote
app.delete('/vote', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send({ error: 'Username is required.' });
  }
  try {
    const vote = await Vote.findOneAndDelete({ username });
    if (!vote) {
      return res.status(404).send({ error: 'Vote not found.' });
    }
    res.send({ message: 'Vote deleted successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create a new category
app.post('/category', async (req, res) => {
  const { name, options } = req.body;
  if (!name || !options || !Array.isArray(options) || options.length === 0) {
    return res.status(400).send({ error: 'Name and options are required, and options must be a non-empty array.' });
  }
  try {
    const category = new Category({ name, options });
    await category.save();
    res.send({ message: 'Category created successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send({ categories });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a category
app.delete('/category', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ error: 'Category name is required.' });
  }
  try {
    const category = await Category.findOneAndDelete({ name });
    if (!category) {
      return res.status(404).send({ error: 'Category not found.' });
    }
    res.send({ message: 'Category deleted successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update password
app.put('/account/password', authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).send({ error: 'Both old and new passwords are required.' });
  }
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).send({ error: 'Invalid old password.' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.send({ message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete account
app.delete('/account', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.user.username });
    if (!user) {
      return res.status(404).send({ error: 'Account not found.' });
    }
    res.send({ message: 'Account deleted successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
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