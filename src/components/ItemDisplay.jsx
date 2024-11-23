import React, { useState, useEffect } from "react";
import ProductModal from "../modal/SelectRoleModal";
import Item from "./Item";
import { useNavigate } from "react-router-dom";

function ItemDisplay({ isLoggedIn }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // State for fetched items
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedProduct, setSelectedProduct] = useState(null); // Modal state

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/items"); // Adjust the API endpoint
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItems(data.items); // Assuming the response has a key 'items'
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleProductClick = (item) => {
    if (isLoggedIn) {
      console.log(`Logged-in user clicked on: ${item.title}`);
      navigate(`/products/${item.id}`); // Navigate to product details page
    } else {
      setSelectedProduct(item); // Show modal if user is not logged in
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Close the modal
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, { ...item, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${item.title} has been added to your cart.`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-green-100 font-poppins">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
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
