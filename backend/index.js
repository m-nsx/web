const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = 5000;

// Connexion à MongoDB via MongoClient
const client = new MongoClient('mongodb://127.0.0.1:27017', { useUnifiedTopology: true });

let db, votesCollection, categoriesCollection, usersCollection;
client.connect().then(async () => {
  // Connexion à la base de données "votesDB"
  db = client.db('votesDB');
  votesCollection = db.collection('votes');
  categoriesCollection = db.collection('categories');
  usersCollection = db.collection('users');
  console.log('Connected to MongoDB');
  // Drop old unique index on username if it exists
  try {
    await votesCollection.dropIndex("username_1");
    console.log("Dropped old unique index on username");
  } catch (e) {
    // Index might not exist, ignore error
  }
  // Create a composite unique index on username and title
  await votesCollection.createIndex({ username: 1, title: 1 }, { unique: true });
  console.log("Composite index on {username, title} created");
}).catch(console.error);

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
    await usersCollection.insertOne({ username, password: hashedPassword });
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
    const user = await usersCollection.findOne({ username });
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
    const existingVote = await votesCollection.findOne({ username, title: category });
    if (existingVote) {
      await votesCollection.updateOne(
        { _id: existingVote._id },
        { $set: { candidate: option, score } }
      );
      const updatedVote = await votesCollection.findOne({ _id: existingVote._id });
      return res.send({ message: `Vote updated with ${score} votes!`, vote: updatedVote });
    }
    const voteResult = await votesCollection.insertOne({ username, candidate: option, title: category, score });
    res.send({ message: `Vote recorded with ${score} votes!`, vote: voteResult.ops ? voteResult.ops[0] : {} });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Récupérer tous les votes
app.get('/votes', async (req, res) => {
  try {
    const votes = await votesCollection.find({}, { projection: { username: 1, candidate: 1, title: 1, score: 1 } }).toArray();
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
    const vote = await votesCollection.findOneAndUpdate(
      { username, title },
      { $set: { candidate }, $inc: { score } },
      { returnDocument: 'after' }
    );
    if (!vote.value) {
      return res.status(404).send({ error: 'Vote not found.' });
    }
    res.send({ message: 'Vote updated!', vote: vote.value });
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
    const vote = await votesCollection.findOneAndDelete({ username });
    if (!vote.value) {
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
    await categoriesCollection.insertOne({ name, options });
    res.send({ message: 'Category created successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await categoriesCollection.find().toArray();
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
    const category = await categoriesCollection.findOneAndDelete({ name });
    if (!category.value) {
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
    const user = await usersCollection.findOne({ username: req.user.username });
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).send({ error: 'Invalid old password.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await usersCollection.updateOne({ username: req.user.username }, { $set: { password: hashedPassword } });
    res.send({ message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete account
app.delete('/account', authenticateToken, async (req, res) => {
  try {
    const user = await usersCollection.findOneAndDelete({ username: req.user.username });
    if (!user.value) {
      return res.status(404).send({ error: 'Account not found.' });
    }
    res.send({ message: 'Account deleted successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Récupérer les meilleurs scores
app.get('/leaderboard', async (req, res) => {
  const { category } = req.query;
  try {
    const query = category ? { title: category } : {};
    const leaderboard = await votesCollection.find(query, { projection: { username: 1, score: 1 } })
      .sort({ score: -1 })
      .limit(10)
      .toArray();
    res.send({ leaderboard });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    await votesCollection.deleteMany({});
    await categoriesCollection.deleteMany({});
    console.log('Base de données réinitialisée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la réinitialisation de la base de données :', error.message);
  }
});