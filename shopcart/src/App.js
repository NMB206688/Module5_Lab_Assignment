// src/App.js
import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import DisplayProducts from "./components/displayProducts";
import CartPage from "./pages/cart";
import initialProducts from "./data/products";
import "./App.css";


export default function App() {
  const [products, setProducts] = useState(initialProducts);

  const totalQty = useMemo(
    () => products.reduce((sum, p) => sum + (p.value || 0), 0),
    [products]
  );

  const handleAdd = (id) => {
    setProducts((prev) => prev.map((p) =>
      p.id === id ? { ...p, value: (p.value || 0) + 1 } : p
    ));
  };

  const handleSub = (id) => {
    setProducts((prev) => prev.map((p) =>
      p.id === id ? { ...p, value: Math.max(0, (p.value || 0) - 1) } : p
    ));
  };

  const handleReset = (id) => {
    setProducts((prev) => prev.map((p) =>
      p.id === id ? { ...p, value: 0 } : p
    ));
  };

  return (
    <BrowserRouter>
      <Navbar siteName="Shop 2 React" totalQty={totalQty} />
      <Routes>
        <Route
          path="/"
          element={
            <DisplayProducts
              products={products}
              onAdd={handleAdd}
              onSub={handleSub}
              onReset={handleReset}
            />
          }
        />
        <Route path="/cart" element={<CartPage items={products} />} />
      </Routes>
    </BrowserRouter>
  );
}
