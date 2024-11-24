import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import image3 from "../assets/images/ecomart_logo.png"; // Adjust the path based on your file structure

function VerifyAccount() {
  const [otp, setOtp] = useState(new Array(6).fill("")); // State to store OTP
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success state

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box
    if (value && index < otp.length - 1) {
      e.target.nextSibling.focus();
    }

    // Check if all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      verifyOtp(newOtp.join("")); // Call the verification API
    }
  };

  // Call the backend to verify the OTP
  const verifyOtp = async (code) => {
    try {
      setError(null);
      setSuccess(null);
        const email = localStorage.getItem("email");
      const response = await axiosInstance.post("/auth/verify", { otp: code ,email: email});

      if (response.status === 200) {
        setSuccess("Account verified successfully!");
        localStorage.removeItem("email");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.username); 
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP.");
    }
  };

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
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 bg-green-200 text-center text-lg text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            />
          ))}
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
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
