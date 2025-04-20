import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import "../styles/SignUp.css";

function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // In a real app, you would send this to your backend
    const newUser = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    };

    // Save to localStorage (simulating backend)
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    // Redirect to home
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="name-input">
            <div className="input">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="signup-btn">
          <h3>Sign Up <FaArrowRight className="arrow-icon" /></h3>
        </button>
      </form>

      <div className="login-prompt">
        Already have an account? <span onClick={() => navigate("/login")}>Login!</span>
      </div>
    </div>
  );
}

export default SignUpPage;