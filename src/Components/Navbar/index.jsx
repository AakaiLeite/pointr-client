import {Link} from "react-router-dom";

function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar-img">
        <img src="/public/images/pointr-logo.png" alt="Pointr Logo" />
        <h5>Pointr</h5>
      </div>
      <div className="navbar-main">
          <p><Link to='/'>Home</Link></p>
          <p>|</p>
          <p><Link to='/daily'>Daily</Link></p>
          <p>|</p>
          <p><Link to='/weekly'>Weekly</Link></p>
          <p>|</p>
          <p><Link to='/monthly'>Monthly</Link></p>
      </div>
      <div className="navbar-auth">
          <p><Link to='/login'>Login</Link></p>
          <p>|</p>
          <p><Link to='/signup'>Signup</Link></p>
      </div>
    </nav>
  );
}

export default Navbar;
// keep me in the working tabs!
