import React, { useState } from 'react';

import homeImage from '../assets/images/ecomart_logo.png';

function SearchBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="bg-white p-4 shadow-md flex items-center justify-between space-x-4 font-poppins">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <img
                    src={homeImage}
                    alt="Ecomart Logo"
                    className="w-20 h-20 object-contain"
                />

                <div className="relative">
                    <button
                        className="text-sm font-semibold flex items-center space-x-1"
                        onClick={toggleDropdown}
                    >
                        <span>SHOP BY CATEGORY</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.879a1 1 0 011.414 1.293l-4 4.707a1 1 0 01-1.414 0l-4-4.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                            <ul className="py-1">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Fashion
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Electronics
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Home and Garden
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Toys
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Books
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Input Section */}
            <div className="flex flex-grow justify-center items-center space-x-2 text-white">
                <div className="flex items-center w-full max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search for Anything"
                        className="flex-grow px-4 py-2 border text-white rounded-l-md focus:outline-none bg-green-500 placeholder-white"
                        style={{ height: '40px' }} // Adjust the height as needed
                    />
                    <button className="px-6 py-2 bg-green-700 text-white font-semibold rounded-r-md hover:bg-green-800"
                        style={{ height: '40px' }} // Adjust the height as needed
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Dropdown Section */}
                <div className="flex items-center">
    <select
        className="border px-3 py-2 rounded focus:outline-none bg-green-500 text-white"
        defaultValue=""
    >
        <option value="" disabled>
            Categories
        </option>
        <option value="electronics">Electronics</option>
        <option value="home">Home & Garden</option>
        <option value="fashion">Fashion</option>
        <option value="toys">Toys</option>
        <option value="sport">Sports Goods</option>
        <option value="jewelries">Jewelries</option>
    </select>
</div>
            </div>
        </div>
    );
}

export default SearchBar;
