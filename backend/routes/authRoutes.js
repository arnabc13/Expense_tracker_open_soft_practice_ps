import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ success: true, message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Registration failed', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('yo')
    const user = await User.findOne({ where: { email } });
    console.log('user: ', user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: true, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
});

export default router;
