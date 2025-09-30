// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar";
import DisplayProducts from "./components/displayProducts";
import CartPage from "./pages/cart";
import SignIn from "./pages/signin";
import Checkout from "./pages/checkout";
import initialProducts from "./data/products";

const STORAGE_KEY = "cart.qty";

export default function App() {
  // initialize from localStorage (merge saved qty onto product list)
  const [products, setProducts] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); // { [id]: qty }
    return initialProducts.map((p) => ({
      ...p,
      value: Number.isFinite(saved[p.id]) ? saved[p.id] : p.value || 0,
    }));
  });

  // persist whenever quantities change
  useEffect(() => {
    const map = products.reduce((acc, p) => {
      acc[p.id] = p.value || 0;
      return acc;
    }, {});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  }, [products]);

  // total items for the navbar badge
  const totalQty = useMemo(
    () => products.reduce((sum, p) => sum + (p.value || 0), 0),
    [products]
  );

  // handlers used on Home and Cart
  const handleAdd = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: (p.value || 0) + 1 } : p))
    );
  };

  const handleSub = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, value: Math.max(0, (p.value || 0) - 1) } : p
      )
    );
  };

  const handleReset = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: 0 } : p))
    );
  };

  // Reset all quantities to 0
  const handleResetAll = () => {
    setProducts((prev) => prev.map((p) => ({ ...p, value: 0 })));
  };

  return (
    <BrowserRouter>
      <Navbar siteName="Shop 2 React" totalQty={totalQty} />

      <Routes>
        {/* Home (products list + modal) */}
        <Route
          path="/"
          element={
            <DisplayProducts
              products={products}
              onAdd={handleAdd}
              onSub={handleSub}
              onReset={handleReset}
              onResetAll={handleResetAll}
            />
          }
        />

        {/* Cart (shows only qty >= 1 and Check Out when not empty) */}
        <Route
          path="/cart"
          element={
            <CartPage
              items={products}
              onAdd={handleAdd}
              onSub={handleSub}
              onReset={handleReset}
            />
          }
        />

        {/* Part 1 additions */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/checkout" element={<Checkout items={products} />} />
      </Routes>
    </BrowserRouter>
  );
}
