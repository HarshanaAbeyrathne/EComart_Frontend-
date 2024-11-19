    import React from "react";
    import Footer from "../components/Footer";
    import Navbar from "../components/Navbar";

    function AddItem() {
    return (
        <div className="font-poppins">
        {/* Navbar Component */}
        <Navbar />
        
        {/* Main Content */}
        <div className="min-h-screen  flex flex-col items-center p-5">
        <h1 className="text-2xl font-bold mb-5 text-green-700">Start Your Product Listing</h1>

        {/* Form Section */}
        <div className="w-full max-w-4xl bg-gray-100 shadow-md rounded-lg p-5">
            {/* Photos and Videos */}
            <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Photo</h2>
            <div className="flex space-x-4">
                <div className="w-1/2 h-32 border border-dashed flex items-center justify-center text-gray-500">
                <button className="btn bg-green-300 hover:bg-green-400">Add Photos</button>
                </div>
                {/* <div className="w-1/2 h-32 border border-dashed flex items-center justify-center text-gray-500">
                <button className="btn bg-green-300 hover:bg-green-400">Add Video</button>
                </div> */}
            </div>
            </div>

            {/* Title Section */}
            <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Item Title</label>
            <input
                type="text"
                placeholder="Type your product title"
                className="input input-bordered w-full mb-4"
            />
            <label className="block text-sm font-semibold mb-2">
                Subtitle (optional) - LKR. 300
            </label>
            <input
                type="text"
                placeholder="Add a subtitle"
                className="input input-bordered w-full"
            />
            </div>

            {/* Item Category */}
            <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Item Category</label>
            <div className="flex items-center justify-between">
                <span className="text-gray-700">Fashion {`>`} Men's Clothes</span>
                <button className="btn bg-green-300 hover:bg-green-400">Edit</button>
            </div>
            </div>

            {/* Product Description */}
            <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
                Product Description
            </label>
            <textarea
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
                placeholder="Total Quantity"
                className="input input-bordered w-full"
            />
            </div>

            {/* Pricing Section */}
            <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Pricing</label>
            <div className="flex space-x-4">
                <select className="select select-bordered w-1/3">
                <option value="fixed">Fixed Price</option>
                <option value="auction">Auction</option>
                <option value="donation">Donation</option>
                </select>
                <input
                type="number"
                placeholder="Price (LKR)"
                className="input input-bordered w-2/3"
                />
            </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
            <button className="btn bg-green-600 hover:bg-green-800 w-full text-white">Submit Listing</button>
            </div>
        </div>
        </div>
            {/* Footer Component */}
            <Footer />
        </div>
    );
    }

    export default AddItem;
