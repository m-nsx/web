import express from 'express';

import Category from '../models/Category.model';

const router = express.Router();

// Create a new category
router.post('/category', async (req, res) => {
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
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send({ categories });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a category
router.delete('/category', async (req, res) => {
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

export default router;