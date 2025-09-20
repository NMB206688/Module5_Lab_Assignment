// src/pages/cart.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function Cart({ items = [], onAdd, onSub, onReset }) {
  const navigate = useNavigate();
  const totalQty = items.reduce((s, p) => s + (p.value || 0), 0);
  const visible = items.filter((it) => (it.value || 0) > 0);

  // --- Empty cart view (matches screenshot) ---
  if (totalQty === 0) {
    return (
      <div className="container py-3">
        <h3 className="mb-3">Your Cart Items</h3>
        <p>There are <strong>{totalQty}</strong> items in your cart.</p>
        <Link to="/" className="btn btn-success">Continue Shop</Link>
      </div>
    );
  }

  // --- Non-empty cart view ---
  return (
    <div className="container py-3">
      <h3 className="mb-3">Your Cart Items</h3>

      <div className="list-group">
        {visible.map((it) => (
          <div key={it.id} className="list-group-item">
            <div className="mb-2 fw-semibold">{it.desc}</div>

            <div className="d-flex align-items-center">
              <img
                src={it.image}
                alt={it.desc}
                width="100"
                height="100"
                style={{ objectFit: "contain" }}
              />

              <div className="ms-4 d-flex align-items-center">
                <small className="text-muted me-3">Quantity</small>

                <button className="btn btn-light border me-2" onClick={() => onSub(it.id)}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <button className="btn btn-light border me-2" onClick={() => onReset(it.id)}>
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>

                <button className="btn btn-primary me-3" onClick={() => onAdd(it.id)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>

                <div className="bg-light border rounded px-3 py-1">{it.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Check Out button appears ONLY when cart has items */}
      <div className="text-start mt-3">
        <button className="btn btn-success" onClick={() => navigate("/signin")}>
          Check Out
        </button>
      </div>
    </div>
  );
}
