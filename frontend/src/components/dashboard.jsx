import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Expense Tracker Dashboard</h1>
      </header>

      {/* Overview Panel */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">$5,000</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-600">$2,800</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Remaining Balance</h2>
          <p className="text-2xl font-bold text-blue-600">$2,200</p>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="bg-white shadow-md rounded-lg">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">2025-01-25</td>
                <td className="px-4 py-2">Food</td>
                <td className="px-4 py-2 text-red-600">-$30</td>
              </tr>
              <tr>
                <td className="px-4 py-2">2025-01-24</td>
                <td className="px-4 py-2">Transport</td>
                <td className="px-4 py-2 text-red-600">-$10</td>
              </tr>
              <tr>
                <td className="px-4 py-2">2025-01-23</td>
                <td className="px-4 py-2">Salary</td>
                <td className="px-4 py-2 text-green-600">+$3,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Expense/Income */}
      <section>
        <h2 className="text-xl font-bold mb-4">Quick Add</h2>
        <form className="flex flex-col gap-4 bg-white p-4 shadow-md rounded-lg">
          <input
            type="text"
            placeholder="Amount"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Category"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Add Transaction
          </button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;
