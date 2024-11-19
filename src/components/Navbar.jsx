import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="navbar bg-green-500 text-white font-poppins">
            {/* Navbar Start */}
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl" onClick={() => navigate('/home')}>EComart</a>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center flex justify-center">
                <ul className="menu menu-horizontal px-4">
                    <li><a onClick={() => navigate('/home')}>Home</a></li>
                    <li><a onClick={() => navigate('/categorie')}>Categories</a></li>
                    <li><a onClick={() => navigate('/additem')}>Sell/Donate</a></li>
                    <li><a onClick={() => navigate('/buy')}>Buy</a></li>
                    <li><a onClick={() => navigate('/home')}>Bidding</a></li>
                    <li><a onClick={() => navigate('/contactus')}>Contact Us</a></li>
                    <li><a onClick={() => navigate('/aboutus')}>About Us</a></li>
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center space-x-4">
                {/* Notification Button */}
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>

                {/* Cart Button */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={() => navigate('/cart')}>
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Conditional Rendering */}
                {isLoggedIn ? (
        // If user is logged in, show profile picture
        <div className="avatar">
            <div
                className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2 cursor-pointer"
                onClick={() => navigate('/userprofile')}
                role="button"
                tabIndex={0}
            >
                <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Profile"
                />
            </div>
        </div>
                ) : (
                    // If user is not logged in, show login and sign-in buttons
                    <div>
                        <button className="btn btn-active btn-ghost mr-2" onClick={() => setIsLoggedIn(true)}>
                            Login
                        </button>
                        <button className="btn btn-active btn-ghost">
                            Sign In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
