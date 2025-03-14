import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Keep this for styling.

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form reload
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    else if (username.trim() && password.trim()) {
      navigate("/test"); // Navigate to typing test page
    }
     else {
      alert("Please enter valid credentials");
    }
  };


  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <h2>Please enter your credentials to log in</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
