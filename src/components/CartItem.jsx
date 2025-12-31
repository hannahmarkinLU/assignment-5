import React from "react";
import "./CartItem.css";

export default function CartItem({ item, removeItem }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">
          ${item.price} × {item.quantity}
        </p>
      </div>
      <button className="remove-btn" onClick={() => removeItem(item)}>
        Remove
      </button>
    </div>
  );
}
