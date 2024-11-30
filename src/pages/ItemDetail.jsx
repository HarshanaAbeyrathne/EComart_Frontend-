import React, { useEffect, useState } from "react";
import { useParams,useNavigate  } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/item/${id}`);
        setItem(response.data);
      } catch (err) {
        setError("Failed to fetch item details");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleBackClick = () => {
    navigate("/categorie"); // Navigate to /categorie
  };

  const addToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${item.title} has been added to your cart.`);
    } catch (err) {
      alert("Failed to add item to cart");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!item) return null;

  return (
    <div>
    <Navbar />
        <div className="container mx-auto px-4 py-8 font-poppins">
             {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="mb-4  text-green-500 px-4 py-2 rounded hover:bg-green-400 hover:text-white"
      >
        Back to Categories
      </button>
        <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Image Section */}
            <div className="md:w-1/2 p-4">
            <img
                src={`http://localhost:3100${item.photo}`}
                alt={item.title}
                className="w-full rounded-lg"
            />
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-4">
            <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <h2 className="text-xl text-red-600 font-bold mb-4">${item.price}</h2>
            <button
                className="btn bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                onClick={addToCart}
            >
                Add to Cart
            </button>
            </div>
        </div>
        </div>
        <Footer />
    </div>
  );
}

export default ItemDetail;
