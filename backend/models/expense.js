import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'online',
    // allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Expense.belongsTo(User, { foreignKey: 'userId' });

export default Expense;

// dummyData = [
//   {
//     "userId": 1,
//     "expenses": [
//       {
//         "id": 1,
//         "amount": 1000,
//         "description": "Rent",
//         "category": "housing",
//         "type": "expense", // or "income"
//         "paymentMethod": "online", // or "cash",
//         "date": "2022-01-01"
//       },{

//       },{

//       }
//     ]
//   },{

//   },{
    
//   }
// ]
