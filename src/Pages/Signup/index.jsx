// Clear ESlint errors
/* eslint-disable no-unused-vars */

// Import Dependencies
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Defining the API base URL
const API_URL = "https://pointr-backend.onrender.com";

function Signup() {
  // State Variables
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState(null);

  // React Router Navigate
  const navigate = useNavigate();

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, email, password }; 

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  // Render Page
  return (
    <div className="signup-background">
      <div className="auth-container">
      <h1>Signup and be Awesome</h1>
      <form className="auth-form" onSubmit={handleSubmit} id="signupForm">
      <div className="auth-form-content">
      <label>
          Name:
               </label>
        <label>
          Email:
             </label>
        <label>
          Password:
            </label>
      </div>
      <div className="auth-form-content">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
      </form>
        <button type="submit" form="signupForm">Sign Up</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

// Export Component
export default Signup;
