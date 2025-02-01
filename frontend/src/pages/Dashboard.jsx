import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  // State for transactions
  const [transactions, setTransactions] = useState([]);
  
  // State for form inputs
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  
  // States for calculated values
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  // Add a new transaction
  const addTransaction = () => {
    if (!amount || isNaN(amount)) return; // Basic validation

    const newTransaction = {
      id: transactions.length + 1,
      type: transactionType,
      amount: parseFloat(amount),
      description,
    };

    // Update transactions list
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);

    // Reset form fields
    setAmount('');
    setDescription('');
  };

  // Update income, expense, and balance
  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setRemainingBalance(income - expense);
  }, [transactions]);

  return (
    <>
      <Navbar/>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Balance Section */}
        <div className="flex justify-between mb-6">
          <div>
            <p className="text-lg font-medium text-gray-600">Total Income</p>
            <p className="text-xl font-semibold text-green-500">₹{totalIncome}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Total Expense</p>
            <p className="text-xl font-semibold text-red-500">₹{totalExpense}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Remaining Balance</p>
            <p className="text-xl font-semibold text-blue-500">₹{remainingBalance}</p>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Transaction description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <button
          onClick={addTransaction}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Add Transaction
        </button>

        {/* Transactions List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`p-4 border rounded-lg ${
                  transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <p className="text-lg font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.type}</p>
                <p
                  className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  ₹{transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
