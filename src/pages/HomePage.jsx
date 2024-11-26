// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";

// compornents
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import ItemDisplay from '../components/ItemDisplay';

import homeImage from '../assets/images/home.png';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen font-poppins">
            <Navbar />
            <SearchBar />
            <div className="container mx-auto px-4 py-16">

                {/* Content Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Text Content */}
                    <div className="max-w-lg text-center lg:text-left">
                        <h2 className="text-4xl font-bold mb-4 ml-7 text-green-500">
                            SUSTAINABLE AND RECYCLE <br /> PRODUCTS
                        </h2>
                        <p className="text-gray-600 mb-6 ml-7">
                            Ecomart emphasizes the reuse and upcycling of garments, giving them a
                            new lease of life. On the other hand, upcycling transforms old or
                            discarded materials into new products with higher value.
                        </p>
                        <div className="flex justify-center lg:justify-start space-x-4 ml-7">
                            <button className="btn btn-outline btn-accent" onClick={() => navigate('/login')}>Sell now</button>
                            <button className="btn btn-success text-white" onClick={() => navigate('/login')}>Buy now</button>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="mt-8 lg:mt-0 lg:mr-20">
                        <img
                            src={homeImage}
                            alt="Sustainable Products"
                            className="max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* items */}
            <h1 className="text-2xl font-bold text-center mb-8 bg-green-100">Most Recent Products</h1>

            <ItemDisplay/>
                
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
