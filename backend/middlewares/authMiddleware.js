import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authentication token is missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{ model: Role }],
      });
  
      if (user && user.Role.name === 'admin') {
        next();
      } else {
        res.status(403).json({ message: 'Access denied.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  };
  
