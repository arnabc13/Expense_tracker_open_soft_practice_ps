import express from 'express';
import { User, Role } from '../models/index.js'; // Ensure your models are indexed correctly
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role }],
    });

    if (!user || user.Role.name !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

router.get('/users', authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Role, attributes: ['name'] }],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.patch('/users/:userId', authenticateToken, adminMiddleware, async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.roleId = roleId;
    await user.save();

    res.json({ message: 'User role updated successfully.', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});


router.delete('/users/:userId', authenticateToken, adminMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: 'User deactivated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.get('/analytics', authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const userCount = await User.count();
    const activeUsers = await User.count({ where: { isActive: true } });

    res.json({
      totalUsers: userCount,
      activeUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;
