import React from "react";
import "./ProductCard.css";

function ProductCard({ id, name, price, image, description, onAddToCart }) {
  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={name} />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">${price}</p>
      <button
        className="add-to-cart-btn"
        onClick={() =>
          onAddToCart({
            id,
            name,
            price,
            image,
            description,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
