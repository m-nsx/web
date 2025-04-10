const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware');
const { getVotesCollection } = require('../database');
const { notifyClients } = require('../websocket'); // Import WebSocket notification utility

// Create or update vote
router.post('/vote', authenticateToken, async (req, res) => {
  const { username, category, option, score } = req.body;
  if (!username || !category || !option || typeof score !== 'number' || score <= 0) {
    return res.status(400).send({ error: 'All fields are required, and score must be a positive number.' });
  }
  try {
    const voteCol = getVotesCollection();
    const existingVote = await voteCol.findOne({ username, title: category });
    if (existingVote) {
      await voteCol.updateOne({ _id: existingVote._id }, { $set: { candidate: option, score } });
      const updatedVote = await voteCol.findOne({ _id: existingVote._id });
      return res.send({ message: `Vote updated with ${score} votes!`, vote: updatedVote });
    }
    const voteResult = await voteCol.insertOne({ username, candidate: option, title: category, score });
    res.send({ message: `Vote recorded with ${score} votes!`, vote: voteResult.ops ? voteResult.ops[0] : {} });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all votes
router.get('/votes', async (req, res) => {
  try {
    const votes = await getVotesCollection().find({}, { projection: { username: 1, candidate: 1, title: 1, score: 1 } }).toArray();
    res.send({ votes });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update vote
router.put('/vote', async (req, res) => {
  const { username, candidate, title, score } = req.body;
  if (!username || !candidate || !title || typeof score !== 'number' || score <= 0) {
    return res.status(400).send({ error: 'All fields are required, and score must be a positive number.' });
  }
  try {
    const result = await getVotesCollection().findOneAndUpdate(
      { username, title },
      { $set: { candidate }, $inc: { score } },
      { returnDocument: 'after' }
    );
    if (!result.value) {
      return res.status(404).send({ error: 'Vote not found.' });
    }
    res.send({ message: 'Vote updated!', vote: result.value });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete vote
router.delete('/vote', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).send({ error: 'Username is required.' });
  try {
    const result = await getVotesCollection().findOneAndDelete({ username });
    if (!result.value) {
      return res.status(404).send({ error: 'Vote not found.' });
    }
    notifyClients('voteDeleted', { username }); // Notify clients about the deletion
    res.send({ message: 'Vote deleted successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { title: category } : {};
    const leaderboard = await getVotesCollection()
      .find(filter, { projection: { username: 1, score: 1 } })
      .sort({ score: -1 })
      .limit(10)
      .toArray();
    res.send({ leaderboard });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
