import React from "react";
import PropTypes from "prop-types";

function Item({ title, description, price, image, onAddToCart }) {
  return (
    <div className="card bg-white w-76 shadow-xl font-poppins">
      <figure className="px-10 pt-10">
        <img
          src={image || "https://via.placeholder.com/150"} // Fallback for missing image
          alt={title}
          className="rounded-xl w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <h2 className="text-red-600 text-2xl">${price}</h2>
        <div className="card-actions">
          <button
            className="btn btn-accent"
            onClick={() => onAddToCart({ title, description, price, image })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Prop validation
Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string, // Optional
  onAddToCart: PropTypes.func.isRequired, // Add-to-cart handler
};

export default Item;
