import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // Store user role
  const [showNotificationModal, setShowNotificationModal] = useState(false); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on token presence

    // Optionally, fetch and set role from localStorage or API
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowNotificationModal(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  }

  return (
    <div className="navbar bg-green-500 text-white font-poppins">
      {/* Navbar Start */}
      <div className="navbar-start">
        <a
          className="btn btn-ghost text-xl cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Ecomart
        </a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center flex justify-center">
        <ul className="menu menu-horizontal px-4">
          <li>
            <a onClick={() => navigate("/home")}>Home</a>
          </li>
          <li>
            <a onClick={() => navigate("/categorie")}>Categories</a>
          </li>
          <li>
            <a onClick={() => navigate("/additem")}>Sell/Donate</a>
          </li>
          <li>
            <a onClick={() => navigate("/buy")}>Buy</a>
          </li>
          <li>
            <a onClick={() => navigate("/bidding")}>Bidding</a>
          </li>
          <li>
            <a onClick={() => navigate("/chat")}>Chat</a>
          </li>
          <li>
            <a onClick={() => navigate("/contactus")}>Contact Us</a>
          </li>
          <li>
            <a onClick={() => navigate("/aboutus")}>About Us</a>
          </li>
          <li>
            <a onClick={() => navigate("/blog")}>Blog</a>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Notification Button */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setShowNotificationModal(true)}
        >
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
        <div
          className="btn btn-ghost btn-circle"
          onClick={() => navigate("/cart")}
          role="button"
        >
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

        {/* Conditional Rendering */}
        {isLoggedIn ? (
          <>
          
          <div className="avatar">
         

            <div
              className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2 cursor-pointer"
              // onClick={() => navigate("/userprofile")}
              role="button"
              tabIndex={0}
            >
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
              />
            </div>
          
          </div>
          <button className="btn btn-active btn-ghost mr-2" onClick={handleLogOut}>
                LogOut
              </button>
          </>
          
          // If user is logged in, show profile picture
         
        ) : (
          // If user is not logged in, show login and sign-in buttons
          <div>
            <button
              className="btn btn-active btn-ghost mr-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-active btn-ghost"
              onClick={() => navigate("/signup")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div
          className="modal modal-open"
          onClick={handleCloseModal}
          role="button"
          tabIndex={0}
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg text-black">Notifications</h3>
            <p className="py-4 text-black">
              You have no new notifications at the moment.
            </p>
            <div className="modal-action">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
