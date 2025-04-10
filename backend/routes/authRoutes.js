const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { getUsersCollection } = require('../database');
const SECRET_KEY = 'azyudgugyTUtygtuyudzgygyezGYHGYF1653749';

// Registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ error: 'All fields are required.' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await getUsersCollection().insertOne({ username, password: hashedPassword });
    res.send({ message: 'Inscription réussie !' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ error: 'All fields are required.' });
  try {
    const user = await getUsersCollection().findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ message: 'Connexion réussie !', token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
