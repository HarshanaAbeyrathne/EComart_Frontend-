import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ecoFriendlyImage from '../assets/images/echo_friendly.png';
import recyclingImage from '../assets/images/recycle.png';
import secondhandImage from '../assets/images/SecondHand.png';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-poppins">
      <Navbar />
      <div className="flex-grow container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-8">About Us</h2>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">
            EcoMart is an innovative e-commerce platform focused on sustainability. The website acts as an intermediary, connecting individuals and businesses who want to sell or donate used, secondhand, or recyclable goods with those interested in purchasing or reusing these items. The aim is to promote eco-friendly practices by reducing waste and encouraging the reuse and recycling of items.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <img src={ecoFriendlyImage} alt="Eco Friendly" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">Eco-Friendly</h3>
              <p className="text-center text-gray-600">Promoting eco-friendly practices by reducing waste.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={recyclingImage} alt="Recycling" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">Recycling</h3>
              <p className="text-center text-gray-600">Encouraging the reuse and recycling of items.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src={secondhandImage} alt="Secondhand" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">Secondhand</h3>
              <p className="text-center text-gray-600">Connecting individuals and businesses for secondhand goods.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;