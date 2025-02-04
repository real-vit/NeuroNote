import React, { useState } from "react";
import GOOGLE_ICON from "../../assets/google_logo.svg";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Prepare the login request body
        const loginData = {
            username,
            password,
        };

        try {
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error("Login failed!");
            }

            const data = await response.json();

            // Store the access token in localStorage
            localStorage.setItem("accessToken", data.access_token);

            // Navigate to a different page on successful login (e.g., Dashboard)
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <div className="flex-grow flex">
                {/* Left Side */}
                <div className="relative bg-black w-1/2 flex flex-col">
                    <div className="absolute top-[20%] left-[10%] flex flex-col">
                        <h1 className="max-w-[500px] text-3xl text-white font-bold py-2 cursor-pointer"
                            style={{ fontFamily: "'Iter', sans-serif" }}
                            onClick={() => navigate('/')}>
                            QuillSync
                        </h1>
                        <h1 className="text-4xl text-white font-bold my-4">
                            Smarter Learning,<br />
                            <span>Seamless Collaboration.</span>
                        </h1>
                        <br />
                        <p className="text-xl text-white font-normal">
                            Start for free and get going!
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/2 bg-[#f5f5f5] flex flex-col p-10 justify-center items-center">
                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="w-full flex flex-col max-w-[500px] py-10">
                        <div className="w-full flex flex-col">
                            <h3 className="text-2xl font-semibold mb-4">Login</h3>
                            <p className="text-sm mb-2">Welcome Back! Please enter your details.</p>
                        </div>

                        {/* Input Fields */}
                        <div className="w-full flex flex-col">
                            <input
                                type="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none"
                            />
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        {/* Remember Me and Forgot Password */}
                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm font-medium cursor-pointer underline">
                                Forgot password?
                            </p>
                        </div>

                        {/* Login and Register Buttons */}
                        <div className="w-full flex flex-col my-4 gap-4">
                            <button type="submit" className="w-full text-white bg-black border border-black rounded-2xl p-3 text-center cursor-pointer">
                                Login
                            </button>
                            <button
                                type="button"
                                className="w-full text-black bg-white border border-black rounded-2xl p-3 text-center cursor-pointer"
                                onClick={() => navigate('/Register')} // Navigate to Register Page
                            >
                                Register
                            </button>
                        </div>

                        

                    </form>

                    {/* Sign Up Prompt */}
                    <div className="w-full flex items-center justify-center">
                        <p className="text-sm text-black">
                            Don't have an account?{" "}
                            <span className="font-semibold underline cursor-pointer" onClick={() => navigate('/Register')}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default Login;