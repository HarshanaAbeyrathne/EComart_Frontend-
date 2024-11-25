import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import Navbar from "../components/Navbar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store the selected order
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Assume userId is stored in localStorage
        const response = await axiosInstance.get(`/order/${userId}`);
        setOrders(response.data.orders);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order
  };

  const closeModal = () => {
    setSelectedOrder(null); // Clear the selected order to close the modal
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-green-100 font-poppins">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold mb-4">Your Orders</h2>
          {error && <p className="text-red-500">{error}</p>}
          {orders.length === 0 ? (
            <p className="text-gray-500">You have no orders yet.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">Order ID: {order._id}</h3>
                    <p>Total: ${order.total.toFixed(2)}</p>
                    <p>Items: {order.items.length}</p>
                  </div>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Order Details</h3>
            <p className="mt-2">
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul className="list-disc pl-5">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.title} - ${item.price.toFixed(2)} x {item.quantity}
                </li>
              ))}
            </ul>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
