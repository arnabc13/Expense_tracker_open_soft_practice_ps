import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import Expense from '../models/expense.js';

const router = express.Router();

router.get('/test', async(req, res) => {
  res.status(200).json('Api is working');
})

router.post('/add', authenticate, async (req, res) => {
  const { amount, description, category, paymentMethod, userId } = req.body;

  try {
    const expense = await Expense.create({
      amount,
      description,
      category,
      paymentMethod,
      userId,
    });
    res.status(201).json({ expense });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add expense', error: err.message });
  }
});

router.get('/list/:id', async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.params.id } });
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
  }
});

export default router;
