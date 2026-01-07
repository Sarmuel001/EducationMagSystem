import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      toast.error("Please enter your pass");
      return;
    }

    // 🔐 CHECK IF AN EXAM IS STILL ACTIVE (TIMER EXISTS)
    const examEndTime = localStorage.getItem("examEndTime");

    if (examEndTime && Number(examEndTime) > Date.now()) {
      const activeUser = localStorage.getItem("username") || "Another student";
      alert(
        `⚠️ ${activeUser} is currently writing an exam on this device.\nPlease wait until submission.`
      );
      return;
    }

    // 🧹 CLEAR ANY OLD SESSION COMPLETELY
    localStorage.clear();

    // 🚀 START NEW SESSION
    localStorage.setItem("username", username);

    navigate("../yearSelection");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-[url('/back.jpg')] bg-cover bg-center blur-sm z-0"></div>

      {/* Foreground */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/20 border border-black/50 backdrop-blur-lg p-6 px-4 text-center rounded-md shadow-lg max-w-sm w-full">
          <ToastContainer />
          <FaUser className="m-auto text-blue-950 text-3xl mb-2" />

          <h2 className="text-xl font-semibold mb-4">Student Pass</h2>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your pass..."
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none"
          />

          <button
            className="w-full bg-blue-950 hover:bg-blue-900 text-white py-2 rounded transition"
            onClick={handleLogin}
          >
            Proceed
          </button>

          <p className="mt-3">
            <a href="/" className="text-blue-950 underline">
              Return Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
