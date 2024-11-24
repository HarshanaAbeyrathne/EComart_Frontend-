import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosInstance";

function AddItem() {
  // State for form inputs
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "Fashion > Men's Clothes",
    description: "",
    quantity: "",
    pricingType: "fixed",
    price: "",
    photo: null, // Placeholder for photo file
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
  
    // Create a FormData object for file upload
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("subtitle", formData.subtitle);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("quantity", formData.quantity);
    formDataToSubmit.append("pricingType", formData.pricingType);
    formDataToSubmit.append("price", formData.price);
    if (formData.photo) {
      formDataToSubmit.append("photo", formData.photo);
    }
  
    try {
      const response = await axiosInstance.post("/item", formDataToSubmit);
      if (response.status === 200 || response.status === 201) {
        // Success case
        setSuccessMessage("Listing created successfully!");
        setFormData({
          title: "",
          subtitle: "",
          category: "Fashion > Men's Clothes",
          description: "",
          quantity: "",
          pricingType: "fixed",
          price: "",
          photo: null,
        });
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (err) {
      // Handle and display specific error message
      if (err.response && err.response.data && err.response.data.error) {
        // If the error comes from the server and includes a specific error message
        setError(err.response.data.error);
      } else {
        // General fallback for unexpected errors
        setError(err.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <div className="font-poppins">
      {/* Navbar Component */}
      <Navbar />
      
      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center p-5">
        <h1 className="text-2xl font-bold mb-5 text-green-700">Start Your Product Listing</h1>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-gray-100 shadow-md rounded-lg p-5"
        >
          {/* Photos and Videos */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Photo</h2>
            <div className="flex space-x-4">
              <input
                type="file"
                accept="image/*"
                className="w-1/2 h-32 border border-dashed flex items-center justify-center text-gray-500"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* Title Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Item Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Type your product title"
              className="input input-bordered w-full mb-4"
            />
            <label className="block text-sm font-semibold mb-2">
              Subtitle (optional) - LKR. 300
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="Add a subtitle"
              className="input input-bordered w-full"
            />
          </div>

          {/* Item Category */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Item Category</label>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{formData.category}</span>
              <button
                type="button"
                className="btn bg-green-300 hover:bg-green-400"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add your product description with item specification here..."
              className="textarea textarea-bordered w-full"
              rows="5"
            ></textarea>
          </div>

          {/* Quantity Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Quantity (How many available for sale)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Total Quantity"
              className="input input-bordered w-full"
            />
          </div>

          {/* Pricing Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Pricing</label>
            <div className="flex space-x-4">
              <select
                name="pricingType"
                value={formData.pricingType}
                onChange={handleInputChange}
                className="select select-bordered w-1/3"
              >
                <option value="fixed">Fixed Price</option>
                <option value="auction">Auction</option>
                <option value="donation">Donation</option>
              </select>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price (LKR)"
                className="input input-bordered w-2/3"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-800 w-full text-white"
            >
              Submit Listing
            </button>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default AddItem;
