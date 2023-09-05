// Clear ESlint errors
/* eslint-disable no-unused-vars */

// Import Basics
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

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <p>Don't have an account yet?</p>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Login;
