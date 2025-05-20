import React from "react";
import "../styles/CartSidebar.css";

function CartSidebar({
  cartItems,
  handleAdd,
  handleRemove,
  handleDelete,
  onClose,
}) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <div className="cart-item-header">
                <h3 className="cart-item-name">{item.name}</h3>
                <p>${item.price}</p>
              </div>

              <div className="cart-controls">
                <button onClick={() => handleRemove(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleAdd(item)}>+</button>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <div className="cart-total">
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default CartSidebar;
