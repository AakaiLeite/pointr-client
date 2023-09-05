import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-img">
        <img src="/public/images/pointr-logo.png" alt="Pointr Logo" />
        <h5>Pointr</h5>
      </div>
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

export default Navbar;
