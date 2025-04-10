const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { authenticateToken } = require('../middleware');
const { getUsersCollection } = require('../database');

// Update password
router.put('/account/password', authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).send({ error: 'Both old and new passwords are required.' });
  try {
    const user = await getUsersCollection().findOne({ username: req.user.username });
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).send({ error: 'Invalid old password.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await getUsersCollection().updateOne({ username: req.user.username }, { $set: { password: hashedPassword } });
    res.send({ message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const result = await getUsersCollection().findOneAndDelete({ username: req.user.username });
    if (!result.value) return res.status(404).send({ error: 'Account not found.' });
    res.send({ message: 'Account deleted successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
