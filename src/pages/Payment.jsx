import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function Payment() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate inputs
    if (name === "cardNumber" && !/^\d*$/.test(value)) return;
    if (name === "expiryDate" && !/^\d*\/?\d*$/.test(value)) return;
    if (name === "cvv" && (!/^\d*$/.test(value) || value.length > 3)) return;

    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Retrieve order data from localStorage
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    const userId = localStorage.getItem("userId"); // Get the user ID

    if (!orderData || !userId) {
      setError("Failed to process the order. Please try again.");
      return;
    }

    try {
      // Send order data to the backend
      const response = await axiosInstance.post("/order", {
        userId,
        items: orderData.items,
        total: orderData.total,
      });

      if (response.status === 200) {
        localStorage.removeItem("cart"); // Clear the cart
        localStorage.removeItem("orderData"); // Clear the temporary order data
        navigate("/home"); // Redirect to a thank-you page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Please try again.");
    }
  };

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-md bg-green-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Payment Details
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Card Holder
              </label>
              <input
                type="text"
                name="cardHolder"
                value={paymentDetails.cardHolder}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Submit Payment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;
