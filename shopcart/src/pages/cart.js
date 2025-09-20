// src/pages/cart.js
/**
 * Cart page:
 * - Shows ONLY items with qty >= 1
 * - Displays image, name, ratings, and quantity
 */
export default function Cart({ items = [] }) {
  const visible = items.filter((it) => (it.value || 0) > 0);

  return (
    <div className="container py-3">
      <h3>Cart</h3>

      {visible.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="list-group">
          {visible.map((it) => (
            <li key={it.id} className="list-group-item d-flex align-items-center">
              <img
                src={it.img}
                alt={it.desc}
                width={48}
                height={48}
                className="me-3"
                style={{ objectFit: "cover" }}
              />
              <div className="me-auto">
                <div>{it.desc}</div>
                <small className="text-muted">Ratings: {it.ratings} / 5</small>
              </div>
              <span className="badge bg-primary rounded-pill">
                Qty: {it.value}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
