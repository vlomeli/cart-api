import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAdd = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemove = (product) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />

      {isCartOpen && (
        <CartSidebar
          cartItems={cartItems}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleDelete={handleDelete}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      <Routes>
        <Route path="/" element={<Home handleAdd={handleAdd} />} />
        <Route
          path="/product/:id"
          element={<ProductDetail handleAdd={handleAdd} />}
        />
      </Routes>
    </>
  );
}

export default App;
