import express from 'express';

import Vote from '../models/vote.model.js';

const router = express.Router();

// Créer un vote avec un score
router.post('/vote', authenticateToken, async (req, res) => {
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
router.get('/votes', async (req, res) => {
try {
        const votes = await Vote.find({}, { username: 1, candidate: 1, title: 1, score: 1 });
        res.send({ votes });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
  
  // Mettre à jour un vote
router.put('/vote', async (req, res) => {
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
router.delete('/vote', async (req, res) => {
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

export default router;