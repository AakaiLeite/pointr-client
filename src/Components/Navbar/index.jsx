// Import Dependencies
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth.context";

// React Component
function Navbar() {
  // Destructure AuthContext
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // Render Page
  return (
    <nav className="navbar">
    <Link to={`/`} className="navbar-img">
      <div className="navbar-img">
        <img className="pointr-logo" src="/images/pointr-logo.png" alt="Pointr Logo" />
        <h5>Pointr</h5>
      </div>
      </Link>
      <div className="navbar-main">
        <p>
          <Link to="/">Home</Link>
        </p>
        {isLoggedIn && (
          <div className="navbar-main">
            <p>|</p>
            <p>
              <Link to="/daily">Daily</Link>
            </p>
            <p>|</p>
            <p>
              <Link to="/weekly">Weekly</Link>
            </p>
            <p>|</p>
            <p>
              <Link to="/monthly">Monthly</Link>
            </p>
          </div>
        )}
      </div>
      <div className="navbar-auth">
        {!isLoggedIn && (
          <div className="navbar-auth">
            <p>
              <Link to="/login">Login</Link>
            </p>
            <p>|</p>
            <p>
              <Link to="/signup">Signup</Link>
            </p>
          </div>
        )}
        {isLoggedIn && (
          <div className="navbar-auth">
            <p>Hi {user && user.name}!</p>
            <p>
              <Link to="/login" onClick={logOutUser}>
                Logout
              </Link>
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}

// Export Component
export default Navbar;
