const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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
});
const Vote = mongoose.model('Vote', voteSchema);

// Define the schema and model for categories
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  options: { type: [String], required: true },
});
const Category = mongoose.model('Category', categorySchema);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is running 👋');
});

// Créer un vote
app.post('/vote', async (req, res) => {
  const { username, category, option } = req.body;
  if (!username || !category || !option) {
    return res.status(400).send({ error: 'All fields are required.' });
  }
  try {
    const vote = new Vote({ username, candidate: option, title: category });
    await vote.save();
    res.send({ message: 'Vote recorded!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Récupérer tous les votes
app.get('/votes', async (req, res) => {
  try {
    const votes = await Vote.find();
    res.send({ votes });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Mettre à jour un vote
app.put('/vote', async (req, res) => {
  const { username, candidate, title } = req.body;
  if (!username || !candidate || !title) {
    return res.status(400).send({ error: 'All fields are required.' });
  }
  try {
    const vote = await Vote.findOneAndUpdate(
      { username },
      { candidate, title },
      { new: true } // Ensure the updated document is returned
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
