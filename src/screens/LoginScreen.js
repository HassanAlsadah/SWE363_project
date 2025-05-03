import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FaGoogle, FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import { api } from "../utils/api";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(api.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store user data and token
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      
      // Set cookie for server-side authentication
      document.cookie = `token=${data.token}; path=/; ${
        process.env.NODE_ENV === "production" ? "Secure; SameSite=Strict" : ""
      }`;

      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
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
              minLength="6"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="login-btn"
          disabled={isLoading}
        >
          <h3>
            {isLoading ? "Logging in..." : "Login"}{" "}
            <FaArrowRight className="arrow-icon" />
          </h3>
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