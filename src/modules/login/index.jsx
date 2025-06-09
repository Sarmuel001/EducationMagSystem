import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import YearSelection from "../yearSelection";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(YearSelection);
  
  const handleLogin = () => {
    if (username.trim() !== "") {
      localStorage.setItem("username", username);
      navigate("../yearSelection");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Enter Your Username</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        style={{ padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px", cursor:"pointer", backgroundColor:"green", borderRadius:"5px" }}>Proceed</button>
    </div>
  );
};

export default LoginPage;
