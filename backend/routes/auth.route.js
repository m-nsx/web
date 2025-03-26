import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/auth.model.js';

const router = express.Router();

// POST request to create a new user
router.post('/add-user', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        // const saltQuantity = 16; // Specify the amount of salt used
        // const hPassword = await bcrypt.hash(password, saltQuantity);
        const account = 'user';

        const newUser = new User({
            username,
            hpassword: password,
            account
        });

        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET request to retrieve all attributes from a user given its id
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET request to retrieve user id by username
router.get('/user-id/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: { id: user._id } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET request to retrieve user password by username
router.get('/user-password/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: { password: user.hpassword } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET request to retrieve all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE request to delete a user given its id
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;