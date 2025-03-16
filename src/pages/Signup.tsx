import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [gamingId, setGamingId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Step 1: Validate if email is a Gmail account
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("⚠️ Please enter a valid Gmail address (e.g., example@gmail.com).");
      return;
    }

    try {
      // Step 2: Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 3: Send email verification
      await sendEmailVerification(user);

      // Step 4: Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        gamingId,
        email,
        verified: false, // Initially set as false
      });

      // Step 5: Show success message and ask user to verify email
      toast.success("🎉 Signup successful! Please verify your email before logging in.", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/"); // Redirect to home page

    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("⚠️ Email is already in use. Try another one.");
      } else if (err.code === "auth/weak-password") {
        setError("⚠️ Password is too weak. Use a stronger password.");
      } else if (err.code === "auth/invalid-email") {
        setError("⚠️ Invalid email format. Please check and try again.");
      } else {
        setError("⚠️ Failed to create account. Please try again.");
      }
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
          <UserPlus className="h-10 w-10 text-purple-400" />
          <h2 className="text-3xl font-extrabold ml-3 text-white">Sign Up</h2>
        </div>

        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-purple-300 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 text-sm font-semibold mb-2">Gaming ID</label>
            <input
              type="text"
              value={gamingId}
              onChange={(e) => setGamingId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

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
            Sign Up
          </motion.button>
        </form>

        <p className="mt-5 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-300 hover:text-purple-400">Login  </Link>
          <Link to="/" className="text-purple-300 hover:text-purple-400">Home</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
