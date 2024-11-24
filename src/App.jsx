import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import './index.css'; // Import Tailwind CSS

// import pages
import Home from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyAccount from './pages/VerifyAccount';
import AddItem from './pages/AddItem';
import UserProfile from './pages/UserProfile';
import Categorie from './pages/Categorie';
import Payment from './pages/Payment';
import ContactUs from './pages/ContactUs';
import Aboutus from './pages/AboutUs';
import Buy from './pages/Buy'
import Cart from './pages/Cart';
import Bidding from './pages/AuctionItems';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/verify" element={<VerifyAccount/>} />
                <Route path="/additem" element={<AddItem/>} />
                <Route path="/userprofile" element={<UserProfile/>} />
                <Route path="/categorie" element={<Categorie/>} />
                <Route path="/payment" element={<Payment/>} />
                <Route path="/contactus" element={<ContactUs/>} />
                <Route path="/aboutus" element={<Aboutus/>} />
                <Route path="/buy" element={<Buy/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/bidding" element={<Bidding/>} />
                
                {/* <Route path="/about" element={<h1>About</h1>} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
