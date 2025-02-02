import React, { useEffect, useState } from "react";
import "./userAnalytics.css";

const UserAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("./dummy_data.json")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="userAnalytics">
      <h2 className="userAnalyticsHeading">User Analytics</h2>
      <table className="userTable">
        <thead>
          <tr className="tableHeadRow">
            <th className="tabelHead">User ID</th>
            <th className="tabelHead">Name</th>
            <th className="tabelHead">Last Transaction</th>
            <th className="tabelHead">Last Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const lastTransaction =
              user.expenses.length > 0
                ? user.expenses[user.expenses.length - 1]
                : null;
            return (
              <tr
                key={user.userId}
                className="tableRow"
                onClick={() => handleUserClick(user)}
              >
                <td className="tableData">{user.userId}</td>
                <td className="tableData">{user.name}</td>
                <td className="tableData">
                  {lastTransaction ? lastTransaction.date : "N/A"}
                </td>
                <td className="tableData">
                  ${lastTransaction ? lastTransaction.amount : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="userDetailsHeadig">User Details</h3>
            <p>
              <strong>User ID:</strong> {selectedUser.userId}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <h4 className="text-lg font-semibold mt-4">Transactions:</h4>
            <table className="w-full border-collapse border mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="tabelHead">Amount</th>
                  <th className="tabelHead">Description</th>
                  <th className="tabelHead">Category</th>
                  <th className="tabelHead">Type</th>
                  <th className="tabelHead">Payment Method</th>
                  <th className="tabelHead">Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.expenses.map((expense) => (
                  <tr key={expense.id} className="border">
                    <td className="tableData">${expense.amount}</td>
                    <td className="tableData">{expense.description}</td>
                    <td className="tableData">{expense.category}</td>
                    <td className="tableData">{expense.type}</td>
                    <td className="tableData">{expense.paymentMethod}</td>
                    <td className="tableData">{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="closeModalButton" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
