import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BedItem from '../components/BedItem'; // Assuming BedItem is exported and can be imported

const AuctionItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('/item');
        const auctionItems = response.data.filter(item => item.pricingType === 'auction');
        setItems(auctionItems);
      } catch (error) {
        console.error('Failed to fetch items', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold text-green-600 text-center my-4">Auction Items</h1>
      <div className="flex flex-wrap justify-center items-stretch m-4">
        {items.map((item, index) => (
          <BedItem
            key={index}
            title={item.title}
            description={item.description}
            price={item.highestBid.amount}
            image={`http://localhost:3100${item.photo}`} 
            itemId={item._id}
            onAddToCart={() => console.log('Add to cart clicked')}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AuctionItems;
