import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  const handleCTA = () => {
    if (storedToken) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="home-background">
      <div className="home-container">
        <h1>Pointr</h1>
        <h2>Your Bullet Journalling App</h2>
      </div>
      <br />
      <div className="cta-button">
        <Link to={handleCTA}>Get Started</Link>
      </div>
    </div>
  );
}

export default Home;
