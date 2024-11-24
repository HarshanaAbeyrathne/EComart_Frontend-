import React, { useState, useEffect } from "react";
import ProductModal from "../modal/SelectRoleModal";
import Item from "./Item";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import axios from "axios";

function ItemDisplay({ isLoggedIn }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // State for fetched items
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedProduct, setSelectedProduct] = useState(null); // Modal state

  // Fetch items from backend API
  useEffect(() => {
    // Fetch items from the backend
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/item'); // No need for /api here because baseURL already includes it
       
        
        setItems(response.data);
        console.log(response.data);

      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const addToCart = (item) => {
    try {
      // Get the existing cart from local storage or initialize an empty array
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      // Add the new item to the cart
      cart.push({ ...item, quantity: 1 });
      // Save the updated cart back to local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${item.title} has been added to your cart.`);
    } catch (err) {
      alert("Failed to add item to cart");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-green-100 font-poppins">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        
        <p className="text-center text-red-500">{error}  <div> dd</div> </p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No items found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

       
          {items.map((item) => (
    <div
    key={item._id} // Unique key
    role="button"
    tabIndex="0"
    className="cursor-pointer"
    // onClick={() => handleProductClick(item)}
    onKeyDown={(e) => e.key === "Enter" && handleProductClick(item)}
  >
              <Item
                title={item.title}
                description={item.description}
                price={String(item.price)}
                image={`http://localhost:3100${item.photo}`} 
                onAddToCart={addToCart} // Pass the add-to-cart handler
              />
            </div>
          ))}
        </div>
      )}

      {/* Render the Modal */}
      {selectedProduct && (
        <ProductModal onClose={handleCloseModal}>
          <h2 className="text-xl font-semibold mb-4">
            Please log in to view more details about "{selectedProduct.title}"
          </h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLoginRedirect}
          >
            Go to Login
          </button>
        </ProductModal>
      )}
    </div>
  );
}

export default ItemDisplay;
