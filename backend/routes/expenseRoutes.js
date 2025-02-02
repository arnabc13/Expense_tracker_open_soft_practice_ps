import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import Expense from '../models/expense.js';

const router = express.Router();

router.get('/test', async(req, res) => {
  res.status(200).json('Api is working');
})

router.post('/add', authenticate, async (req, res) => {
  const { amount, type, description, category, paymentMethod, date, userId } = req.body;

  try {
    const expense = await Expense.create({
      amount,
      type,
      description,
      category,
      paymentMethod,
      date,
      userId,
    });
    res.status(201).json({ expense });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to add expense', error: err.message });
  }
});

//lists the transactions of a particular userId
router.get('/list', authenticate, async (req, res) => {
  const id = req.user.id;
  try {
    const expenses = await Expense.findAll({ where: { userId: id } }); 
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
  }
});

// Update an existing expense
router.put('/update/:id',authenticate,  async (req, res) => {
  const { amount, type, description, category, paymentMethod, date } = req.body;

  try {
    const expense = await Expense.findOne({ where: { id: req.params.id} });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    
    expense.amount = amount !== undefined ? amount : expense.amount;
    expense.type = type !== undefined ? type : expense.type;
    expense.description = description !== undefined ? description : expense.description;
    expense.category = category !== undefined ? category : expense.category;
    expense.paymentMethod = paymentMethod !== undefined ? paymentMethod : expense.paymentMethod;
    expense.date = date !== undefined ? date : expense.date;

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
