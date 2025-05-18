import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          DigitalNEST Shop
        </Link>
        <div className="cart-icon">🛒</div>
      </div>
    </nav>
  );
}


export default Navbar;