// src/components/navbar.js
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ siteName = "Shop 2 React", totalQty = 0 }) {
  return (
    <nav className="navbar" style={{ background: "#00cfe8" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand fw-bold text-white text-decoration-none d-flex align-items-center">
          <span>Shop 2&nbsp;</span>
          <span className="brand-R">R</span>
          <span>&nbsp;eact</span>
        </Link>

        <Link to="/cart" className="text-white text-decoration-none d-flex align-items-center">
          <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
          <span>{totalQty} Items</span>
        </Link>
      </div>
    </nav>
  );
}
