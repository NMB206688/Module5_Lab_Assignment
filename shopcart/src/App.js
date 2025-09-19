// src/App.js
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "Shop to React",
      products: [
        { id: 1, desc: "Unisex Cologne", image: "products/cologne.jpg", value: 0 },
        { id: 2, desc: "Apple iWatch",  image: "products/iwatch.jpg",  value: 0 },
        { id: 3, desc: "Unique Mug",    image: "products/mug.jpg",     value: 0 },
        { id: 4, desc: "Mens Wallet",   image: "products/wallet.jpg",  value: 0 },
      ],
    };
  }

  render() {
    const { siteName, products } = this.state;
    const totalQty = products.reduce((sum, p) => sum + p.value, 0);

    return (
      <div>
        {/* Top bar */}
        <nav className="navbar" style={{ background: "#00cfe8" }}>
          <div className="container-fluid d-flex justify-content-between">
            <span className="navbar-brand fw-bold text-white">{siteName}</span>
            <span className="text-white">
              <FontAwesomeIcon icon={faShoppingCart} /> {totalQty} Items
            </span>
          </div>
        </nav>

        {/* Product rows */}
        <div className="container py-4">
          <div className="list-group">
            {products.map((p) => (
              <div key={p.id} className="list-group-item">
                <div className="d-flex align-items-center">
                  <img
                    src={p.image}
                    alt={p.desc}
                    width="100"
                    height="100"
                    className="me-3"
                    style={{ objectFit: "contain" }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{p.desc}</h6>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      readOnly
                      value={p.value}
                      className="form-control text-center me-2"
                      style={{ width: "60px" }}
                    />
                    <small className="text-muted">quantity</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
