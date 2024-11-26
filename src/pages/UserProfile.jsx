import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserProfile() {
    const [user, setUser] = useState({
        name: "John Doe",
        mobile: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        email: "john.doe@example.com",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User info submitted:", user);
        // Handle form submission logic here
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear local storage
        navigate("/"); // Navigate to the home page
    };

    return (
        <div>
            <Navbar />
            <div className="font-poppins flex flex-col items-center p-6 bg-white min-h-screen">
                <div className="card w-full max-w-lg bg-green-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="User"
                            className="rounded-full w-32 h-32"
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Edit Profile</h2>
                        <form onSubmit={handleSubmit} className="w-full max-w-lg">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mobile Number</span>
                                </label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={user.mobile}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={user.address}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn bg-green-300 hover:bg-green-500 w-full"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        <div className="form-control mt-6">
                            <button
                                onClick={handleLogout}
                                className="btn bg-red-300 hover:bg-red-500 w-full"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserProfile;
