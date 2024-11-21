import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch cart items from the backend
    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/cart');
                if (!response.ok) throw new Error('Failed to fetch cart items');
                const data = await response.json();
                setCartItems(data.cartItems); // Assuming the API returns { cartItems: [] }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Calculate total price whenever cartItems change
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    // Add an item to the cart
    const addItemToCart = async (item) => {
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (!response.ok) throw new Error('Failed to add item to cart');
            const data = await response.json();
            setCartItems(data.cartItems); // Update the cart items
        } catch (err) {
            alert(err.message);
        }
    };

    // Remove an item from the cart
    const removeItemFromCart = async (index) => {
        try {
            const response = await fetch('/api/cart/remove', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemIndex: index }),
            });
            if (!response.ok) throw new Error('Failed to remove item from cart');
            const data = await response.json();
            setCartItems(data.cartItems); // Update the cart items
        } catch (err) {
            alert(err.message);
        }
    };

    // Update item quantity
    const updateItemQuantity = async (index, quantity) => {
        try {
            const response = await fetch('/api/cart/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemIndex: index, quantity }),
            });
            if (!response.ok) throw new Error('Failed to update item quantity');
            const data = await response.json();
            setCartItems(data.cartItems); // Update the cart items
        } catch (err) {
            alert(err.message);
        }
    };

    // Proceed to payment
    const proceedToPayment = async () => {
        try {
            const response = await fetch('/api/cart/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems, totalPrice }),
            });
            if (!response.ok) throw new Error('Payment failed');
            const data = await response.json();
            alert(`Payment successful! Order ID: ${data.orderId}`);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-green-100 text-green-900 font-poppins flex flex-col">
            <Navbar />
            {/* Cart Content */}
            <div className="container mx-auto py-8 flex-grow px-4 md:px-8 lg:px-16">
                <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is currently empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center mb-4 border-b pb-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <span className="flex-grow ml-4">{item.name}</span>
                                    <span className="w-20 text-right">${item.price.toFixed(2)}</span>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        className="w-16 text-center border rounded ml-4"
                                        onChange={(e) =>
                                            updateItemQuantity(index, parseInt(e.target.value))
                                        }
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
                            <span className="text-xl font-bold">
                                Total: ${totalPrice.toFixed(2)}
                            </span>
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
