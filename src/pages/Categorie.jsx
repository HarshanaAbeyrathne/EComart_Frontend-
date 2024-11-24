import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemDisplay from '../components/ItemDisplay';
import axiosInstance from '../axiosInstance';

function Categorie() {
  const [filters, setFilters] = useState({
    categories: [],
    price: '',
    buyMethod: [],
    shipping: []
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch items based on filters
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      // Axios handles the response parsing automatically
      const response = await axiosInstance.get('/item');
      console.log(response.data);
      // Assuming the backend returns { items: [...] } in the response
      setItems(response.data);
    } catch (err) {
      // Use Axios' error object for detailed error information
      setError(err.response?.data?.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };
  

  // Handle checkbox changes
  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedFilter = checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter((item) => item !== value);
      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  // Handle price changes
  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: e.target.value });
  };

  // Handle apply filters button click
  const handleApplyFilters = () => {
    fetchItems(); // Fetch items from the backend when filters are applied
  };

  // Initial fetch without filters
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='font-poppins'>
      <Navbar />
      <div className="flex">
        {/* Sidebar for filters */}
        <div className="w-1/4 p-4 bg-gray-100 sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul>
              <li>
                <input
                  type="checkbox"
                  value="Category 1"
                  onChange={(e) => handleCheckboxChange(e, 'categories')}
                />{' '}
                Category 1
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Category 2"
                  onChange={(e) => handleCheckboxChange(e, 'categories')}
                />{' '}
                Category 2
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Category 3"
                  onChange={(e) => handleCheckboxChange(e, 'categories')}
                />{' '}
                Category 3
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Price</h3>
            <select className="select select-bordered w-full" onChange={handlePriceChange}>
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
                  onChange={(e) => handleCheckboxChange(e, 'buyMethod')}
                />{' '}
                Buy Now
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Auction"
                  onChange={(e) => handleCheckboxChange(e, 'buyMethod')}
                />{' '}
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
                  onChange={(e) => handleCheckboxChange(e, 'shipping')}
                />{' '}
                Free Shipping
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Paid Shipping"
                  onChange={(e) => handleCheckboxChange(e, 'shipping')}
                />{' '}
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

        {/* Main content area */}
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
