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
    // const fetchItems = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const response = await axiosInstance.get("/api/item");
    //     if (!response.ok) throw new Error("Failed to fetch items");
    //     const data = await response.json();
    //     console.log(data);
    //     setItems(data.items); // Assuming the response has a key 'items'
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/item'); // No need for /api here because baseURL already includes it
        setItems(response.data); // Assuming response contains { items: [...] }
        console.log(response.data);

      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Handle when a product is clicked
  const handleProductClick = (item) => {
    // if (isLoggedIn) {
    //   console.log(`Logged-in user clicked on: ${item.title}`);
    //   navigate(`/products/${item.id}`); // Navigate to product details page
    // } else {
    //   setSelectedProduct(item); // Show modal if user is not logged in
    // }
    setSelectedProduct(item);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Close the modal
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  const addToCart = async (item) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, quantity: 1 }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      alert(`${item.title} has been added to your cart.`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-green-100 font-poppins">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        
        <p className="text-center text-red-500">{error}  <div> huknw</div> </p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No items found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

       
          {items.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex="0"
              className="cursor-pointer"
              onClick={() => handleProductClick(item)}
              onKeyDown={(e) => e.key === "Enter" && handleProductClick(item)}
            >
              <Item
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.image} // Pass the image URL from the backend
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
