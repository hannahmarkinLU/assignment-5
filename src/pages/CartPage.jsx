import React from "react";
import CartItem from "../components/CartItem";

function CartPage({ products, removeFromCart }) {
  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        products.map((item) => (
          <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
        ))
      )}
    </div>
  );
}

export default CartPage;
