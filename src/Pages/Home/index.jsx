import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-background">
      <div className="home-container">
        <h1>Pointr</h1>
        <h2>Your Bullet Journalling App</h2>
      </div>
      <br />
      <div className="cta-button">
        <Link to="/login">Get Started</Link>
      </div>
    </div>
  );
}

export default Home;
