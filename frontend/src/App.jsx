import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import UserDashboard from "./pages/Dashboard2";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
