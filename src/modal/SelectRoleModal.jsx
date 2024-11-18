import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductModal = ({ product, onClose }) => {
    const navigate = useNavigate(); // Hook to handle navigation

    const handleNavigate = () => {
        navigate('/login'); // Navigate to the /login page
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg w-96 p-6 relative shadow-lg"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                {/* Modal Content */}
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        DO YOU WANT TO
                    </h2>
                    <div className="flex justify-between w-full">
                        <button
                            className="w-1/2 bg-black text-white py-2 px-4 rounded mr-2 hover:bg-gray-800 transition"
                            onClick={handleNavigate} // Navigate on click
                        >
                            Sell
                        </button>
                        <button
                            className="w-1/2 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
                            onClick={handleNavigate} // Navigate on click
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
