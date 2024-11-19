import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Add some test items to the cart when the component mounts
        const testItems = [
            { name: 'Item 1', price: 10, quantity: 1, image: 'https://via.placeholder.com/150' },
            { name: 'Item 2', price: 20, quantity: 1, image: 'https://via.placeholder.com/150' },
            { name: 'Item 3', price: 30, quantity: 1, image: 'https://via.placeholder.com/150' }
        ];
        setCartItems(testItems);
    }, []);

    useEffect(() => {
        // Calculate the total price whenever cartItems change
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    const addItemToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeItemFromCart = (index) => {
        const newCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newCartItems);
    };

    const updateItemQuantity = (index, quantity) => {
        const newCartItems = cartItems.map((item, i) => 
            i === index ? { ...item, quantity: quantity } : item
        );
        setCartItems(newCartItems);
    };

    const proceedToPayment = () => {
        // Implement payment logic here
        alert('Proceeding to payment');
    };

    return (
        <div className="min-h-screen bg-green-100 text-green-900 font-poppins flex flex-col">
            <Navbar />

            {/* Cart Content */}
            <div className="container mx-auto py-8 flex-grow px-4 md:px-8 lg:px-16">
                <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is currently empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center mb-4 border-b pb-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <span className="flex-grow ml-4">{item.name}</span>
                                    <span className="w-20 text-right">${item.price.toFixed(2)}</span>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        className="w-16 text-center border rounded ml-4"
                                        onChange={(e) => updateItemQuantity(index, parseInt(e.target.value))}
                                    />
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                                        onClick={() => removeItemFromCart(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <>
                        <div className="text-right mt-4">
                            <span className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                            onClick={proceedToPayment}
                        >
                            Proceed to Payment
                        </button>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Cart;