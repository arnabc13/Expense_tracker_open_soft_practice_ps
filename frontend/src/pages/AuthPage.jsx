import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const AuthPage = () => {
  const {login, signup, user, apiUrl} = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && !formData.name) {
      toast.error("Name is required for signup");
      // setError("Name is required for signup");
      return;
    }

    try {
      if(isLogin){
        const result = await login(formData.email, formData.password);
  
        if(result){
          navigate('/');
        }
      }else{
        const result = await signup(formData.name, formData.email, formData.password);
        if(result){
          setIsLogin(true);
        }else{
          toast.error('Something went wrong! Please try again later');
        }
      }
      // const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      // const response = await axios.post(url, {
      //   name: formData.name,
      //   email: formData.email,
      //   password: formData.password
      // });
      // console.log('response: ', response);
      // if(response.success){
        
      // }
      // console.log("Success:", data);
      // // Handle successful login/signup (store token, redirect, etc.)
    } catch (err) {
      toast.error('Invalid credentials')
      // setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login to Expense Tracker" : "Sign Up for Expense Tracker"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring focus:ring-blue-500"
            required
          />
          
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-blue-400 cursor-pointer hover:underline" onClick={toggleMode}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
