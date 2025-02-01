import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
          <motion.div
            className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          ></motion.div>
        </div>

        {/* Loading Text */}
        <p className="text-lg font-semibold tracking-wider">
          Loading<span>{dots}</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Loading;
