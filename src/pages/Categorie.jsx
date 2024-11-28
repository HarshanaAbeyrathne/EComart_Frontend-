import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemDisplay from "../components/ItemDisplay";
import axiosInstance from "../axiosInstance";

const categories = {
  Fashion: [
    "Men’s Clothing",
    "Women’s Clothing",
    "Kids’ Wear",
    "Footwear",
    "Accessories",
  ],
  Electronics: [
    "Mobile Phones & Accessories",
    "Computers & Tablets",
    "Home Appliances",
    "Cameras & Photography",
    "Audio & Headphones",
  ],
  Home: [
    "Furniture",
    "Kitchen & Dining",
    "Home Decor",
    "Bedding & Bath",
    "Cleaning Supplies",
  ],
  Toys: [
    "Educational Toys",
    "Action Figures",
    "Dolls & Plush Toys",
    "Outdoor & Sports Toys",
    "Puzzles & Board Games",
  ],
  Books: [
    "Fiction",
    "Non-Fiction",
    "Children’s Books",
    "Educational & Textbooks",
    "Self-Help & Personal Developments",
  ],
};

function Categorie() {
  const [filters, setFilters] = useState({
    subcategories: [],
    price: "",
    buyMethod: [],
    shipping: [],
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/item", {
        params: filters,
      });
      setItems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedFilter = checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter((item) => item !== value);
      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: e.target.value });
  };

  const handleApplyFilters = () => {
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gray-100 sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            {Object.keys(categories).map((mainCategory) => (
              <div key={mainCategory} className="mb-4">
                <h4 className="font-semibold mb-2">{mainCategory}</h4>
                <ul>
                  {categories[mainCategory].map((subcategory) => (
                    <li key={subcategory} className="mb-2">
                      <input
                        type="checkbox"
                        value={subcategory}
                        onChange={(e) => handleCheckboxChange(e, "subcategories")}
                        className="mr-2"
                      />
                      {subcategory}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Price</h3>
            <select
              className="select select-bordered w-full"
              onChange={handlePriceChange}
            >
              <option value="">Select Price Range</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
            </select>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Buy Method</h3>
            <ul>
              <li>
                <input
                  type="checkbox"
                  value="Buy Now"
                  onChange={(e) => handleCheckboxChange(e, "buyMethod")}
                  className="mr-2"
                />
                Buy Now
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Auction"
                  onChange={(e) => handleCheckboxChange(e, "buyMethod")}
                  className="mr-2"
                />
                Auction
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Shipping</h3>
            <ul>
              <li>
                <input
                  type="checkbox"
                  value="Free Shipping"
                  onChange={(e) => handleCheckboxChange(e, "shipping")}
                  className="mr-2"
                />
                Free Shipping
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Paid Shipping"
                  onChange={(e) => handleCheckboxChange(e, "shipping")}
                  className="mr-2"
                />
                Paid Shipping
              </li>
            </ul>
          </div>
          <button
            className="btn bg-green-300 hover:bg-green-500 w-full mt-4"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4 overflow-y-auto h-screen">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : items.length === 0 ? (
            <p className="text-gray-500">No items found</p>
          ) : (
            <ItemDisplay items={items} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Categorie;
