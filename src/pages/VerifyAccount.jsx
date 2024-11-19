import React from "react";
import image3 from "../assets/images/ecomart_logo.png"; // Adjust the path based on your file structure

function VerifyAccount() {
  return (
    <div className="flex min-h-screen font-poppins">
      {/* Left Side: Verification Form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white p-10">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">
          Verify Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter Verifying Code
        </p>
        <div className="flex space-x-2">
          {/* Input Boxes for Verification Code */}
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 bg-green-200 text-center text-lg text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            />
          ))}
        </div>
        <button
          className="mt-6 w-32 py-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600"
        >
          Verify
        </button>
      </div>

      {/* Right Side: Logo and Description */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-10">
        <img
          className="h-40 w-auto mb-4"
          src={image3}
          alt="Ecomart Logo"
        />
        <h2 className="text-center text-3xl font-bold text-green-600 mb-4">
          ECO MART
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Join a thriving community of buyers and sellers, where every deal is a win.
          Don't miss out—sign in now and experience the convenience and excitement
          of buying and selling online!
        </p>
      </div>
    </div>
  );
}

export default VerifyAccount;
