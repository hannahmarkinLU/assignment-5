import React from "react";
import CartItem from "../components/CartItem";

export default function CartPage({ products, removeFromCart }) {
  // Calculate total
  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {products.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))}

          {/* Display total */}
          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
        </>
      )}
    </div>
  );
}
