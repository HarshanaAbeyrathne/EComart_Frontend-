import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const AuctionItems = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [bidAmount, setBidAmount] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all auction items
  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const response = await axiosInstance.get("/items");
        const filteredItems = response.data.filter(
          (item) => item.pricingType === "auction"
        );
        setAuctionItems(filteredItems);
      } catch (err) {
        setError("Failed to fetch auction items");
      }
    };
    fetchAuctionItems();
  }, []);

  // Handle bid submission
  const handlePlaceBid = async (itemId) => {
    const amount = bidAmount[itemId];

    if (!amount) {
      setError("Please enter a valid bid amount.");
      return;
    }

    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("User not logged in. Please log in to place a bid.");
        return;
      }

      const response = await axiosInstance.post(`/bidding/${itemId}/bid`, {
        userId,
        bidAmount: amount,
      });

      setSuccess("Bid placed successfully!");
      setError(null);

      // Update the highest bid in the UI
      const updatedItems = auctionItems.map((item) =>
        item._id === itemId
          ? { ...item, highestBid: { amount, userId } }
          : item
      );
      setAuctionItems(updatedItems);

      setBidAmount((prev) => ({ ...prev, [itemId]: "" }));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to place the bid");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
          Auction Items
        </h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-center text-green-500 mb-4">{success}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {auctionItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.photo}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">{item.subtitle}</p>
                <p className="text-gray-800 font-semibold mb-2">
                  Current Highest Bid:{" "}
                  <span className="text-green-600">
                    LKR {item.highestBid?.amount || item.price}
                  </span>
                </p>

                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="number"
                    className="input input-bordered w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
                    placeholder="Enter your bid (LKR)"
                    value={bidAmount[item._id] || ""}
                    onChange={(e) =>
                      setBidAmount((prev) => ({
                        ...prev,
                        [item._id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => handlePlaceBid(item._id)}
                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionItems;
