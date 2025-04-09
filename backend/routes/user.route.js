import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const router = express.Router();
const SECRET_KEY = 'azyudgugyTUtygtuyudzgygyezGYHGYF1653749';

// User registration
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
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

// Update password
router.put('/account/password', authenticateToken, async (req, res) => {
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
router.delete('/account', authenticateToken, async (req, res) => {
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

export default router;