import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth.context";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-background">
      <div className="home-container">
        <h1>Pointr</h1>
        <h2>Your Bullet Journalling App</h2>
      </div>
      <br />
      <div className="cta-button">
        {user && <Link to="/dashboard">Your Dashboard</Link>}
        {!user && <Link to="/login">Get Started</Link>}
      </div>
    </div>
  );
}

export default Home;
