import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Payment() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate card number to contain only numbers
    if (name === 'cardNumber' && !/^\d*$/.test(value)) {
      return;
    }

    // Validate expiry date to contain only numbers and "/"
    if (name === 'expiryDate' && !/^\d*\/?\d*$/.test(value)) {
      return;
    }

    // Validate CVV to contain only numbers and be exactly 3 digits
    if (name === 'cvv' && (!/^\d*$/.test(value) || value.length > 3)) {
      return;
    }

    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log('Payment details submitted:', paymentDetails);
  };

  return (
    <div className='font-poppins'>
      <Navbar/>
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md bg-green-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Card Holder</label>
            <input
              type="text"
              name="cardHolder"
              value={paymentDetails.cardHolder}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="123"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full bg-green-600 hover:bg-green-700 text-white">Submit Payment</button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Payment;