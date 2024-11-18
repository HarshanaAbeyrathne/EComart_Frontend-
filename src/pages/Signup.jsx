import React, { useState } from "react";
import image3 from "../assets/images/ecomart_logo.png"; // Adjust the path based on your file structure

function Signup() {
    const [type, setType] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [name, setName] = useState("");

    // Check if passwords match
    const checkPassword = (value) => {
        setCpassword(value);
        if (password !== value) {
        setType(false);
        } else {
        setType(true);
        }
    };

    // Handle signup (replace with your backend logic later)
    const handleSignup = () => {
        console.log("Sign up with:", { name, email, password, cpassword });
        if (type) {
        // Signup logic here (e.g., call Firebase or your backend)
        alert("Signed up successfully");
        } else {
        alert("Passwords do not match");
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
            className="mx-auto h-40 w-auto rounded-[70px]"
            src={image3}
            alt="Ecomart Logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for your account
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Name Input */}
            <div>
            <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Name
            </label>
            <div className="mt-2">
                <input
                id="name"
                name="name"
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ backgroundColor: "white" }}
                />
            </div>
            </div>

            {/* Mobile Number Input */}
            <div>
            <label
                htmlFor="mobile"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Mobile Number
            </label>
            <div className="mt-2">
                <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                onChange={(e) => setMobile(e.target.value)}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ backgroundColor: "white" }}
                placeholder="+94 XX XXXX XXX"
                />
            </div>
            </div>

            {/* Address Input */}
            <div>
            <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Address
            </label>
            <div className="mt-2">
                <textarea
                id="address"
                name="address"
                required
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ backgroundColor: "white" }}
                placeholder="Enter your full address"
                />
            </div>
            </div>

            {/* Email Input */}
            <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Email address
            </label>
            <div className="mt-2">
                <input
                id="email"
                name="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="@gmail.com"
                style={{ backgroundColor: "white" }}
                />
            </div>
            </div>

            {/* Password Input */}
            <div>
            <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Password
            </label>
            <div className="mt-2">
                <input
                id="password"
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ backgroundColor: "white" }}
                />
            </div>
            </div>

            {/* Confirm Password Input */}
            <div>
            <label
                htmlFor="cpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Confirm Password
            </label>
            <div className="mt-2">
                <input
                id="cpassword"
                name="cpassword"
                type="password"
                required
                onChange={(e) => checkPassword(e.target.value)}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ backgroundColor: "white" }}
                />
            </div>
            {!type && (
                <div className="mt-1 text-sm text-red-500">
                Passwords do not match.
                </div>
            )}
            </div>

            {/* Signup Button */}
            <div className="pt-5">
            <button
                type="button"
                onClick={handleSignup}
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Sign up
            </button>
            </div>

            {/* Already have an account */}
            <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
                href="/login"
                className="font-semibold leading-6 text-info hover:text-indigo-500"
            >
                Sign in
            </a>
            </p>
        </div>
        </div>
);
}

export default Signup;
