import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // Ensure all prices are numbers
    const validatedCart = savedCart.map((item) => ({
      ...item,
      price: parseFloat(item.price), // Convert price to a number
    }));
    setCartItems(validatedCart);
  }, []);

  // Recalculate the total price whenever the cart items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Update item quantity
  const updateItemQuantity = (index, quantity) => {
    if (quantity < 1) return; // Ensure quantity is at least 1
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = quantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove an item from the cart
  const removeItemFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Proceed to payment (placeholder)
  const proceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-green-100 text-green-900 font-poppins flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is currently empty.</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-4 border-b pb-4"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="flex-grow ml-4">{item.title}</span>
                  <span className="w-20 text-right">${item.price.toFixed(2)}</span>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 text-center border rounded ml-4"
                    onChange={(e) =>
                      updateItemQuantity(index, parseInt(e.target.value, 10))
                    }
                  />
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                    onClick={() => removeItemFromCart(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cartItems.length > 0 && (
          <>
            <div className="text-right mt-4">
              <span className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              onClick={proceedToPayment}
            >
              Proceed to Payment
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
