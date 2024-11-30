import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Item from "./Item";

function ItemDisplay() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/item");
        setItems(response.data);
      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
    
  }, []);

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };
 // API response data


  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
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
              key={item._id}
              role="button"
              tabIndex="0"
              className="cursor-pointer"
              onClick={() => handleItemClick(item._id)}
              onKeyDown={(e) => e.key === "Enter" && handleItemClick(item._id)}
            >
              <Item
                title={item.title}
                price={String(item.price)}
                image={`http://localhost:3100${item.photo}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemDisplay;
