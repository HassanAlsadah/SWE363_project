import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUsers } from "../data/users";
import "../styles/Login.css";
import { FaGoogle, FaUser, FaLock, FaArrowRight } from "react-icons/fa";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Find user with matching credentials
    const user = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Store user data in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Redirect to home page
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="inputs">
          <div className="input">
            <FaUser className="input-icon" />
            <input
              type="email"
              placeholder="Example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="login-btn">
          <h3>Login <FaArrowRight className="arrow-icon" /></h3>
        </button>
      </form>

      <div className="forgot-password">
        Forgot Password? <span>Click Here!</span>
      </div>

      <hr />

      <div className="submit-container">
        <div className="submit">
          <FaGoogle className="google-icon" />
          Continue with Google
        </div>

        <h3>OR</h3>

        <div className="submit" onClick={() => navigate("/signup")}>
          Sign Up
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;