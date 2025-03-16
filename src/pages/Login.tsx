import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-blue-600 to-pink-500">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-10 rounded-xl shadow-2xl w-96 border border-purple-400"
      >
        <div className="flex items-center justify-center mb-6">
          <LogIn className="h-10 w-10 text-purple-400" />
          <h2 className="text-3xl font-extrabold ml-3 text-white">Login</h2>
        </div>

        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-purple-300 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-purple-300 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200 font-bold"
          >
            Login
          </motion.button>
        </form>
        <p className="mt-5 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-300 hover:text-purple-400">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
