import { useState, useEffect, createContext } from "react";
import axios from "axios";

const API_URL = "https://pointr-backend.onrender.com";

// Create a context to hold authentication-related data
const AuthContext = createContext();

// A wrapper component to manage authentication state
function AuthProviderWrapper(props) {
  // State variables to track user's authentication status and data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Function to store a token in the browser's local storage
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  // Function to authenticate the user by checking a stored token
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // Update user state with data from the server
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch(() => {
          // Clear user state if verification fails
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // Clear user state if no stored token is found
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  // Other code related to AuthProviderWrapper...

  // Provide authentication data to components within this context
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        removeToken,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Export the AuthProviderWrapper component and the AuthContext for use in other parts of the app
export { AuthProviderWrapper, AuthContext };
