import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../axiosInstance"; // Ensure axiosInstance is correctly configured

function BedItem({ title, description, price, image, itemId, onBidSuccess }) {
  const [bidAmount, setBidAmount] = useState(""); // State for the bid amount
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const [highestBid, setHighestBid] = useState(price); // State for the highest bid price 
  const[successMsg , setSuccessMsg] = useState("");

  const handleBidSubmit = async () => {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage

    // Validate user ID
    if (!userId) {
      setError("User not logged in. Please log in to place a bid.");
      return;
    }

    // Validate the bid amount
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= parseFloat(price)) {
      setError("Bid must be higher than the current highest bid price.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      // Call backend API to place a bid
      const response = await axiosInstance.post(`/bid/${itemId}/bid`, {
        userId,
        bidAmount: parseFloat(bidAmount),
      });
      if(response.status === 400){
        setError("Bid must be higher than the current highest bid price.");
        return;
      }

      // Handle success
      
      setBidAmount(""); // Reset the bid amount field
      // onBidSuccess(response.data); // Notify parent component of successful bid
      setError("");
      setHighestBid(bidAmount); // Update the highest bid price
      setSuccessMsg("Bid placed successfully");
      console.log("Bid placed successfully");
    } catch (err) {
      console.error("Failed to place bid", err);
      setError(err.response?.data?.message || "Failed to place the bid.");
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-red-600 text-2xl">
          Highest Bid Price
          <br />
          ${highestBid}
        </h2>

        {/* Input for bid amount */}
        <div className="w-full mt-4">
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Enter your bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMsg && <p className="text-green-500 mt-2">{successMsg}</p>}
        {/* Loading or Place Bid Button */}
        <div className="card-actions mt-4">
          <button
            className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
            onClick={handleBidSubmit}
            disabled={loading}
          >
            {loading ? "Placing Bid..." : "Place Bid"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Prop validation
BedItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string, // Optional
  itemId: PropTypes.string.isRequired, // ID of the item to place a bid on
  onBidSuccess: PropTypes.func, // Optional callback for successful bid
};

export default BedItem;
