// Import Dependencies
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth.context";

// React Page Component
function Home() {
  // Context Variables
  const { user } = useContext(AuthContext);

  // Render Page
  return (
  
    <div className="home-background">
      <div className="home-container">
        <h1>Pointr</h1>
        <h3>Your Bullet Journalling App</h3>
      </div>
      <br />
      <div className="cta-button">
        {user && <Link to="/monthly">Get Started</Link>}
        {!user && <Link to="/login">Get Started</Link>}
      </div>
    </div>
  );
}

// Export Page
export default Home;
