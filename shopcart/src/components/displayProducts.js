// src/components/displayProducts.js
import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";

function DisplayProducts({ products = [], onAdd, onSub, onReset, onResetAll }) {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);

  const [sortMode, setSortMode] = useState("normal"); // "normal" | "low" | "high"
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const openModal = (p) => { setActive(p); setShow(true); };
  const closeModal = () => setShow(false);

  const fmtUSD = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  // filter first
  const filtered = useMemo(() => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    return products.filter((p) => {
      const okMin = Number.isFinite(min) ? p.price >= min : true;
      const okMax = Number.isFinite(max) ? p.price <= max : true;
      return okMin && okMax;
    });
  }, [products, minPrice, maxPrice]);

  // then sort
  const sortedProducts = useMemo(() => {
    const withIdx = filtered.map((p, i) => ({ ...p, _idx: i }));
    if (sortMode === "low")  return [...withIdx].sort((a, b) => a.price - b.price);
    if (sortMode === "high") return [...withIdx].sort((a, b) => b.price - a.price);
    return [...withIdx].sort((a, b) => a._idx - b._idx);
  }, [filtered, sortMode]);

  const clearRange = () => { setMinPrice(""); setMaxPrice(""); };

  return (
    <div className="container py-3">
      {/* TOP BAR */}
      <div className="d-flex justify-content-between align-items-end mb-3 flex-wrap gap-2">

        {/* LEFT: count + range */}
        <div className="d-flex align-items-end gap-3 flex-wrap">
          <div className="fw-semibold">
            {sortedProducts.length} item{sortedProducts.length !== 1 ? "s" : ""}
          </div>

          <div className="d-flex align-items-end gap-2">
            <div>
              <label htmlFor="min" className="form-label mb-1 small">Min ($)</label>
              <input
                id="min"
                type="number"
                className="form-control"
                placeholder="e.g. 10"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <label htmlFor="max" className="form-label mb-1 small">Max ($)</label>
              <input
                id="max"
                type="number"
                className="form-control"
                placeholder="e.g. 50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
              />
            </div>
            <button className="btn btn-outline-secondary" onClick={clearRange}>
              Clear
            </button>
          </div>
        </div>

        {/* RIGHT: sort + Reset All */}
        <div className="d-flex align-items-end gap-2">
          <div className="me-2 fw-semibold">Sort:</div>
          <select
            id="sort"
            className="form-select w-auto"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="low">Lowest</option>
            <option value="high">Highest</option>
          </select>

          <button className="btn btn-outline-danger" onClick={onResetAll}>
            Reset All
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="list-group">
        {sortedProducts.map((p) => (
          <div key={p.id} className="list-group-item">
            {/* title + price */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-semibold">{p.desc}</div>
              <div className="fw-semibold">{fmtUSD(p.price)}</div>
            </div>

            {/* image + controls */}
            <div className="d-flex align-items-center">
              <img
                src={p.image}
                alt={p.desc}
                width="100"
                height="100"
                style={{ objectFit: "contain", cursor: "pointer" }}
                onClick={() => openModal(p)}
              />

              <div className="ms-4 d-flex align-items-center">
                <small className="text-muted me-3">Quantity</small>

                <button
                  className="btn btn-light border me-2"
                  onClick={() => onSub(p.id)}
                  disabled={(p.value || 0) === 0} // polish: disable when 0
                  title={(p.value || 0) === 0 ? "Quantity is already 0" : "Decrease"}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <button className="btn btn-light border me-2" onClick={() => onReset(p.id)}>
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>

                <button className="btn btn-primary me-3" onClick={() => onAdd(p.id)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>

                <div className="bg-light border rounded px-3 py-1">{p.value || 0}</div>
              </div>
            </div>
          </div>
        ))}

        {/* empty state */}
        {sortedProducts.length === 0 && (
          <div className="list-group-item text-center text-muted">
            No items match this range.
          </div>
        )}
      </div>

      {/* MODAL */}
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{active?.desc}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {active && (
            <>
              <img
                src={active.image}
                alt={active.desc}
                className="img-fluid mb-2"
                style={{ display: "block", margin: "0 auto" }}
              />
              <div className="mb-2 fw-semibold text-center">
                {fmtUSD(active.price)}
              </div>
              <div className="rating-small text-muted text-center">
                Ratings: <strong>{active.ratings}</strong>/5
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DisplayProducts;
