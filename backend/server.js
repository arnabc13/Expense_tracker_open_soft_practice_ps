import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/admin', adminRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    
    sequelize.sync().then(() => {
      console.log('Database synced');
      app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
    }).catch((error) => {
      console.error('Error syncing the database:', error);
    });

  })
  .catch((err) => {
    console.log('Database URL:', process.env.DB_URL);
    console.error('Error connecting to the database:', err.message);
  });
