import React, { useState } from "react";
import "./../LoginPage.css"; 
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      // Assuming login is successful
      setLoggedIn(true);
      alert("Login successful!");
    } else {
      alert("Please enter username and password.");
    }
  };

  return (
    <div className="login-container">
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <Link to="/Login/Home" className="home-link">
            Home
          </Link>
          <button onClick={() => setLoggedIn(false)}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <br />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
          <br />
          <Link to="/register" style={{ margin: 10 }}>
            {" "}
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
