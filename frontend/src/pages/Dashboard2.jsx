import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Loading from "./Loading";

const UserDashboard = () => {
	const { apiUrl, loading, user } = useAuth();
	const [expenses, setExpenses] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({
		amount: "",
		type: "expense",
		description: "",
		category: "",
		paymentMethod: "online",
		date: new Date().toISOString().split("T")[0], // Default to today's date
	});
	const [expenseLoading, setExpenseLoading] = useState(false);
	const [editingExpense, setEditingExpense] = useState(null);

	// Fetch Expenses
	useEffect(() => {
		fetchExpenses();
	}, [loading]);

	const fetchExpenses = async () => {
		if (!loading && user) {
			const token = localStorage.getItem("token");
			try {
				setExpenseLoading(true);
				const response = await axios.get(apiUrl + "/api/expenses/list", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setExpenses(response.data.expenses);
			} catch (error) {
				toast.error("Failed to fetch expenses");
			} finally{
				setExpenseLoading(false);
			}
		}
	};

	// Handle input change
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Open Modal for Adding/Editing
	const openModal = (expense = null) => {
		if (expense) {
			setEditingExpense(expense);
			setFormData({
				amount: expense.amount,
				type: expense.type,
				description: expense.description,
				category: expense.category,
				paymentMethod: expense.paymentMethod,
				date: new Date(expense.date).toISOString().split("T")[0],
			});
		} else {
			setEditingExpense(null);
			setFormData({
				amount: "",
				type: "expense",
				description: "",
				category: "",
				paymentMethod: "online",
				date: new Date().toISOString().split("T")[0],
			});
		}
		setShowModal(true);
	};

	// Close Modal (on click outside)
	const closeModal = () => {
		setShowModal(false);
		setEditingExpense(null);
	};

	// Add or Update Expense
	const handleSaveExpense = async (e) => {
		e.preventDefault();
		setExpenseLoading(true);

		try {
			const token = localStorage.getItem("token");
			if (editingExpense) {
				// Update expense
				console.log('type: ', formData.type);
				await axios.put(apiUrl + `/api/expenses/update/${editingExpense.id}`, {
					amount: formData.amount,
					type: formData.type,
					description: formData.description,
					category: formData.category,
					paymentMethod: formData.paymentMethod,
					date: formData.date,
					userId: user.id
				}, {
					headers: { Authorization: `Bearer ${token}` },
				});
				fetchExpenses();
				toast.success("Expense updated successfully!");
			} else {
				// Add new expense
				const response = await axios.post(apiUrl + "/api/expenses/add", {
					amount: formData.amount,
					type: formData.type,
					description: formData.description,
					category: formData.category,
					paymentMethod: formData.paymentMethod,
					date: formData.date,
					userId: user.id
				}, {
					headers: { Authorization: `Bearer ${token}` },
				});
				fetchExpenses();
				// setExpenses([...expenses, response.data.expense]);
				toast.success("Expense added successfully!");
			}
			setShowModal(false);
			fetchExpenses();
		} catch (error) {
			toast.error("Failed to save expense");
		} finally {
			setExpenseLoading(false);
		}
	};

	if(loading || expenseLoading) return (<Loading />);

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-900 text-white p-6">
				<div className="max-w-5xl mx-auto space-y-4">
					<h2 className="text-2xl font-semibold text-gray-300 mb-4">My Expenses</h2>

					{/* Expense Table */}
					<div className="overflow-x-auto">
						<table className="min-w-full bg-gray-800 shadow-md rounded-lg">
							<thead>
								<tr className="bg-gray-700 text-gray-300">
									<th className="px-4 py-2 text-left">Amount (Rs)</th>
									<th className="px-4 py-2 text-left">Type</th>
									<th className="px-4 py-2 text-left">Category</th>
									<th className="px-4 py-2 text-left">Payment Method</th>
									<th className="px-4 py-2 text-left">Description</th>
									<th className="px-4 py-2 text-left">Date</th>
									<th className="px-4 py-2 text-center sticky right-0 bg-gray-700">Actions</th>
								</tr>
							</thead>
							<tbody>
								{expenses.length > 0 ? (
									expenses.map((expense) => (
										<tr key={expense.id} className="border-b border-gray-700 hover:bg-gray-750">
											{/* Amount Column */}
											<td className="px-4 py-2 capitalize">{expense.amount}</td>

											{/* Type Column with Capsule Styling */}
											<td className="px-4 py-2">
												<span
													className={`px-3 py-1 rounded-full text-white ${
														expense.type === "expense" ? "bg-red-600" : "bg-green-600"
													}`}
												>
													{expense.type.charAt(0).toUpperCase() + expense.type.slice(1)}
												</span>
											</td>

											{/* Category Column */}
											<td className="px-4 py-2 capitalize">{expense.category}</td>

											{/* Payment Method Column with Capsule Styling */}
											<td className="px-4 py-2">
												<span
													className={`px-3 py-1 rounded-full text-white ${
														expense.paymentMethod === "online" ? "bg-blue-600" : "bg-gray-600"
													}`}
												>
													{expense.paymentMethod.charAt(0).toUpperCase() + expense.paymentMethod.slice(1)}
												</span>
											</td>

											{/* Description Column */}
											<td className="px-4 py-2">{expense.description || "--"}</td>

											{/* Date Column */}
											<td className="px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>

											{/* Actions Column */}
											<td className="px-4 py-2 text-center sticky right-0 bg-gray-800">
												<button
													className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
													onClick={() => openModal(expense)}
												>
													✏️ Edit
												</button>
												<button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition ml-2">
													🗑️ Delete
												</button>
											</td>
										</tr>

									))
								) : (
									<tr>
										<td colSpan="7" className="text-center text-gray-400 py-4">No expenses found.</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Floating Add Expense Button */}
				<button onClick={() => openModal()} className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-lg">
					➕
				</button>

				{/* Modal */}
				{showModal && (
					<div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-xs" onClick={closeModal}>
						<div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
							<button onClick={closeModal} className="absolute top-3 right-4 text-gray-400 hover:text-gray-200 transition">✖</button>
							<h3 className="text-lg font-bold mb-3">{editingExpense ? "Edit Expense" : "Add New Expense"}</h3>
							<form onSubmit={handleSaveExpense} className="space-y-4">
								{/* Amount Input */}
								<input
									type="number"
									name="amount"
									value={formData.amount}
									onChange={handleChange}
									placeholder="Amount"
									className="w-full p-2 rounded bg-gray-700 text-white"
									required
								/>

								{/* Category Input */}
								<input
									type="text"
									name="category"
									value={formData.category}
									onChange={handleChange}
									placeholder="Category"
									className="w-full p-2 rounded bg-gray-700 text-white"
									required
								/>

								{/* Description Textarea */}
								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									placeholder="Description"
									className="w-full p-2 rounded bg-gray-700 text-white"
									rows="4"
								></textarea>

								{/* Type Dropdown */}
								<select
									name="type"
									value={formData.type}
									onChange={handleChange}
									className="w-full p-2 rounded bg-gray-700 text-white"
									required
								>
									<option value="expense">Expense</option>
									<option value="income">Income</option>
								</select>

								{/* Payment Method Dropdown */}
								<select
									name="paymentMethod"
									value={formData.paymentMethod}
									onChange={handleChange}
									className="w-full p-2 rounded bg-gray-700 text-white"
									required
								>
									<option value="online">Online</option>
									<option value="cash">Cash</option>
								</select>

								{/* Date Input */}
								<input
									type="date"
									name="date"
									value={formData.date}
									onChange={handleChange}
									className="w-full p-2 rounded bg-gray-700 text-white"
									required
								/>

								{/* Submit Button */}
								<button
									type="submit"
									className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
								>
									{editingExpense ? "Update Expense" : "Add Expense"}
								</button>
							</form>

						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default UserDashboard;