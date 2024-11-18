import React, { useState } from 'react';
import ProductModal from '../modal/SelectRoleModal';
import Item from './Item';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router

function ItemDisplay({ isLoggedIn}) { // hadd code this line
    const navigate = useNavigate(); // React Router hook for navigation
    const items = [
        { id: 1, title: "Used Men's Watch", description: "Men's Watch", price: "Rs.100" },
        { id: 2, title: "Used Women's Bag", description: "Women's Bag", price: "Rs.200" },
        { id: 3, title: "Used Headphones", description: "Headphones", price: "Rs.300" },
        { id: 4, title: "Used Shoes", description: "Sports Shoes", price: "Rs.400" },
        { id: 5, title: "Used Laptop", description: "Laptop", price: "Rs.500" },
    ];

    const [selectedProduct, setSelectedProduct] = useState(null);

    // console.log("isLoggedIn value:", isLoggedIn);


    const handleProductClick = (item) => {
        if (isLoggedIn) {
            console.log(`Logged-in user clicked on: ${item.title}`);
            // Add logic for logged-in users (e.g., navigate to item details)
            // navigate(`/products/${item.id}`); 
            // Example: Navigate to product details
        } else {
            setSelectedProduct(item); // Show modal if user is not logged in
        }
    };

    const handleCloseModal = () => {
        setSelectedProduct(null); // Close the modal
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-green-100">
            <h1 className="text-2xl font-bold text-center mb-8">Most Recent Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} 
                         role="button" 
                         tabIndex="0" 
                         className="cursor-pointer"
                         onClick={() => handleProductClick(item)}
                         onKeyDown={(e) => e.key === 'Enter' && handleProductClick(item)}>
                        <Item
                            title={item.title}
                            description={item.description}
                            price={item.price}
                        />
                    </div>
                ))}
            </div>

            {/* Render the Modal */}
            {selectedProduct && (
                <ProductModal onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold mb-4">
                        Please log in to view more details about "{selectedProduct.title}"
                    </h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleLoginRedirect}
                    >
                        Go to Login
                    </button>
                </ProductModal>
            )}
        </div>
    );
}

export default ItemDisplay;
