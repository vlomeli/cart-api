import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ cartItems, onCartClick }) {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          DigitalNEST Shop
        </Link>
        <div className="cart-icon" onClick={onCartClick} style={{ cursor: "pointer" }}>
          🛒
          {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
        </div>
      </div>
    </nav>
  );
}


export default Navbar;