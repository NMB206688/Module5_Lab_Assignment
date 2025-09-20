// src/components/displayProducts.js
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";

// BASIC list + modal to match the PDF
function DisplayProducts({ products = [], onAdd, onSub, onReset }) {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);

  const openModal = (p) => { setActive(p); setShow(true); };
  const closeModal = () => setShow(false);

  return (
    <div className="container py-3">
      <div className="list-group">
        {products.map((p) => (
          <div key={p.id} className="list-group-item">
            {/* title row */}
            <div className="mb-2 fw-semibold">{p.desc}</div>

            {/* image + controls row */}
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

                <button className="btn btn-light border me-2" onClick={() => onSub(p.id)}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <button className="btn btn-light border me-2" onClick={() => onReset(p.id)}>
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>

                <button className="btn btn-primary me-3" onClick={() => onAdd(p.id)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>

                <div className="bg-light border rounded px-3 py-1">{p.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (lightbox) */}
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
              <div className="rating-small text-muted">
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
