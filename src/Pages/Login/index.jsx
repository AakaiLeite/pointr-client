//
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

// Defining the API base URL
const API_URL = "http://localhost:5005";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // run when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    //Creating a request body object with email and password
    const requestBody = { name, email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
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
