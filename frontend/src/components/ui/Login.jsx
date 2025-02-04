import React from "react";
import GOOGLE_ICON from "../../assets/google_logo.svg";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full h-full flex items-start">
                {/* Left Side */}
                <div className="relative bg-black w-1/2 h-full flex flex-col">
                    <div className="absolute top-[20%] left-[10%] flex flex-col">
                        <h1 className="max-w-[500px]  text-3xl text-white font-bold py-2"
                            style={{ fontFamily: "'Iter', sans-serif" }}>
                            NeuroNote
                        </h1>
                        <h1 className="text-4xl text-white font-bold my-4">
                            Turn your ideas into scripts
                        </h1>
                        <p className="text-xl text-white font-normal">
                            Start for free and get going!
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-10 justify-center items-center">


                    {/* Login Form */}
                    <div className="w-full flex flex-col max-w-[500px] py-10">
                        <div className="w-full flex flex-col">
                            <h3 className="text-2xl font-semibold mb-4">Login</h3>
                            <p className="text-sm mb-2">Welcome Back! Please enter your details.</p>
                        </div>

                        {/* Input Fields */}
                        <div className="w-full flex flex-col">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none"
                            />
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="w-full flex items-center justify-between">

                            <p className="text-sm font-medium cursor-pointer underline">
                                Forgot password?
                            </p>
                        </div>

                        {/* Login and Register Buttons */}
                        <div className="w-full flex flex-col my-4 gap-4">
                            <button className="w-full text-white bg-black border border-black rounded-2xl p-3 text-center cursor-pointer">
                                Login
                            </button>
                            <button
                                className="w-full text-black bg-white border border-black rounded-2xl p-3 text-center cursor-pointer"
                                onClick={() => navigate('/Register')} // Navigate to Register Page
                            >
                                Register
                            </button>
                        </div>


                        {/* Divider */}
                        <div className="w-full flex items-center justify-center relative py-4">
                            <div className="w-full h-[1px] bg-black"></div>
                            <p className="text-lg absolute text-black/80 bg-[#f5f5f5] px-2">or</p>
                        </div>

                        {/* Google Sign-In Button */}
                        <button className="w-full text-black bg-white border border-black/40 rounded-2xl p-4 text-center flex items-center justify-center cursor-pointer">
                            <img src={GOOGLE_ICON} alt="Google Icon" className="h-6 mr-2" />
                            Sign In With Google
                        </button>
                    </div>

                    {/* Sign Up Prompt */}
                    <div className="w-full flex items-center justify-center">
                        <p className="text-sm text-black">
                            Don't have an account?{" "}
                            <span className="font-semibold underline cursor-pointer">
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


const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 py-6 shadow-2xl">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                <p className="text-sm text-white">© {new Date().getFullYear()} NeuroNote™. All rights reserved.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="text-sm text-white hover:underline">About</a>
                    <a href="#" className="text-sm text-white hover:underline">Privacy Policy</a>
                    <a href="#" className="text-sm text-white hover:underline">Licensing</a>
                    <a href="#" className="text-sm text-white hover:underline">Github</a>
                </div>
            </div>
        </footer>
    );
};

export default Login;
