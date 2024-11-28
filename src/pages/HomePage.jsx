import React from 'react';
import { useNavigate } from "react-router-dom";
import { Carousel, Typography, Button } from "@material-tailwind/react";

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import ItemDisplay from '../components/ItemDisplay';

// Image Paths
import homeImage from '../assets/images/slide1.png';
import homeImage2 from '../assets/images/slide2.png';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen font-poppins">
            <Navbar />
            <SearchBar />
            <div className="container mx-auto px-4 py-16">

                {/* Carousel Section */}
                <Carousel className="rounded-xl">
                    <div className="relative w-screen h-96 flex items-center justify-center">
                        {/* Background Image */}
                        <img
                            src={homeImage}
                            alt="Slide 1"
                            className="absolute w-screen h-full object-cover"
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>
                        {/* Text Content */}
                        <div className="relative text-center text-white">
                            <Typography
                                variant="h1"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                Reusable and Recyclable Products 
                            </Typography>
                            <Typography
                                variant="lead"
                                className="mb-12 opacity-80"
                            >
                                Welcome to EcoMart, Sri Lanka's top platform for buying, selling, and donating reusable and recyclable items. <br /> 
                                Join us to declutter, find affordable secondhand products, and embrace sustainable living. <br />
                                Together, let's create a greener, cleaner future!                                      
                            </Typography>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="white" onClick={() => navigate('/login')}>
                                    Sell Now
                                </Button>
                                <Button size="lg" color="white" variant="text" onClick={() => navigate('/login')}>
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-screen h-96 flex items-center justify-center">
                        {/* Background Image */}
                        <img
                            src={homeImage2}
                            alt="Slide 2"
                            className="absolute w-screen h-full object-cover"
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>
                        {/* Text Content */}
                        <div className="relative text-center text-white">
                            <Typography
                                variant="h1"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                TRANSFORMING OLD TO NEW
                            </Typography>
                            <Typography
                                variant="lead"
                                className="mb-12 opacity-80"
                            >
                                Our mission is to create new opportunities from discarded materials, <br />
                                elevating them into something of greater value and sustainability.
                            </Typography>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="white" onClick={() => navigate('/login')}>
                                    Explore More
                                </Button>
                                <Button size="lg" color="white" variant="text" onClick={() => navigate('/aboutus')}>
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </Carousel>

            </div>

            {/* Items Section */}
            <h1 className="text-2xl font-bold text-center mb-8 ">Most Recent Products</h1>
            <ItemDisplay />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
