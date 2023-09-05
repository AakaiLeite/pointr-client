// Clear ESlint errors
/* eslint-disable no-unused-vars */

// Import Dependencies
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

// Defining the API base URL
const API_URL = "http://localhost:5005";

// React Page Component
function Login() {
  // React Router Navigate
  const navigate = useNavigate();

  // State Variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // Destructuring the AuthContext object
  const { storeToken, authenticateUser } = useContext(AuthContext);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/monthly");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  // Render Page
  return (
    <div className="login-background">
      <div className="auth-container">
        <h1>Login</h1>
        <form className="auth-form" onSubmit={handleSubmit} id="loginForm">
          <div className="auth-form-content">
            <label>Email:</label>
            <label>Password:</label>
          </div>
          <div className="auth-form-content">
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
        <button type="submit" form="loginForm">
          Log In
        </button>
        {errorMessage && <p>{errorMessage}</p>}
        <p>Do not have an account yet?</p>
        <Link className="signup-link" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

// Export Page
export default Login;
