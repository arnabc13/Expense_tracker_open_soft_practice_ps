import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import Expense from '../models/expense.js';

const router = express.Router();

router.get('/test', async(req, res) => {
  res.status(200).json('Api is working');
})

router.post('/add', authenticate,async (req, res) => {
  const { amount, description, category, paymentMethod,userId } = req.body;
  

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

//lists the transactions of a particular userId
router.get('/list/:id', async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.params.id } }); 
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
  }
});

// Update an existing expense
router.put('/update/:id',authenticate,  async (req, res) => {
  const { amount, description, category, paymentMethod } = req.body;

  try {
    const expense = await Expense.findOne({ where: { id: req.params.id} });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    
    expense.amount = amount !== undefined ? amount : expense.amount;
    expense.description = description !== undefined ? description : expense.description;
    expense.category = category !== undefined ? category : expense.category;
    expense.paymentMethod = paymentMethod !== undefined ? paymentMethod : expense.paymentMethod;

    await expense.save();
    
    res.json({ message: 'Expense updated successfully', expense });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update expense', error: err.message });
  }
});

// Delete an expense
router.delete('/delete/:id', authenticate,  async (req, res) => {
  try {
    const expense = await Expense.findOne({ where: { id: req.params.id } });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete expense', error: err.message });
  }
});


export default router;
