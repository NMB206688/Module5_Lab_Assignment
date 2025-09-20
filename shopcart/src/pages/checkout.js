// src/pages/checkout.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Checkout() {
  const name = localStorage.getItem("userName") || "Guest";

  return (
    <div className="container py-3">
      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Check Out</h4>
        </div>
        <div className="card-body">
          <p className="text-success d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            <span>Welcome Back {name}!</span>
          </p>

          <p className="mb-0">Time to check out?</p>
        </div>
      </div>
    </div>
  );
}
