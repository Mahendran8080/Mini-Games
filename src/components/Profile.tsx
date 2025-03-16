import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data only when authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-12 h-12 border-t-4 border-purple-500 rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-10 rounded-xl shadow-lg bg-gray-800 border border-purple-500"
      >
        <h2 className="text-3xl font-bold text-purple-400 mb-5">Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Gaming ID:</strong> {user?.gamingId}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </motion.div>
    </div>
  );
};

export default Profile;
