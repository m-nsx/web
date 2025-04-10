const express = require('express');
const router = express.Router();
const { getCategoriesCollection } = require('../database');
const { notifyClients } = require('../websocket'); // Import WebSocket notification utility

// Create category
router.post('/category', async (req, res) => {
  const { name, options } = req.body;
  if (!name || !options || !Array.isArray(options) || options.length === 0) {
    return res.status(400).send({ error: 'Name and options are required, and options must be a non-empty array.' });
  }
  try {
    await getCategoriesCollection().insertOne({ name, options });
    res.send({ message: 'Category created successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await getCategoriesCollection().find().toArray();
    res.send({ categories });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete category
router.delete('/category', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send({ error: 'Category name is required.' });
  try {
    const result = await getCategoriesCollection().findOneAndDelete({ name });
    if (!result.value) {
      return res.status(404).send({ error: 'Category not found.' });
    }
    notifyClients('categoryDeleted', { name }); // Notify clients about the deletion
    res.send({ message: 'Category deleted successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
