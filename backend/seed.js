// src/seed.js

import sequelize from './config/db.js'; // Database connection
import User from './models/user.js'; // User model
import Expense from './models/expense.js'; // Expense model

// Define the dummy data
const dummyUsers = [
  { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'securepass' },
];

const dummyExpenses = [
  { userId: 1, description: 'Grocery shopping', amount: 50.25, category: 'Food', date: new Date() },
  { userId: 1, description: 'Electricity bill', amount: 75.00, category: 'Utilities', date: new Date() },
  { userId: 2, description: 'Coffee with friends', amount: 15.00, category: 'Entertainment', date: new Date() },
  { userId: 2, description: 'Online course subscription', amount: 120.00, category: 'Education', date: new Date() },
];

// Function to insert dummy data
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Reset the database

    console.log('Database synced successfully.');

    // Insert dummy users
    const users = await User.bulkCreate(dummyUsers);
    console.log(`Inserted ${users.length} users.`);

    // Insert dummy expenses
    const expenses = await Expense.bulkCreate(dummyExpenses);
    console.log(`Inserted ${expenses.length} expenses.`);

    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error inserting dummy data:', error.message);
  } finally {
    await sequelize.close(); // Close the database connection
    console.log('Database connection closed.');
  }
};

// Run the seed script
seedDatabase();
