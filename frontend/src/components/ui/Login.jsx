import React from "react";
import GOOGLE_ICON from "../../assets/google_logo.svg";
import leftimg from "../../assets/left_img.jpg";
const colors = {
    primary: "#060606",
    background: "#E0E0E0",
    disabled: "#D9D9D9",
};
import Footer from './Footer.jsx';

const Login = () => {
    return (
        <>
        <div className="w-full h-screen flex items-start">
            {/* Left Side */}
            <div className="relative bg-black w-1/2 h-full flex flex-col">
                <div className="absolute top-[20%] left-[10%] flex flex-col">
                    <h1 className="text-4xl text-white font-bold my-4">
                        Turn your ideas into scripts
                    </h1>
                    <p className="text-xl text-white font-normal">
                        Start for free and get going!
                    </p>
                </div>
                
            </div>

            {/* Right Side */}
            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
                <h1 className="max-w-[500px] mx-auto text-2xl text-black font-bold py-2"
                    style={{ fontFamily: "'Iter', sans-serif" }}>
                    NeuroNote
                </h1>


                {/* Login Form */}
                <div className="w-full flex flex-col max-w-[500px]">
                    <div className="w-full flex flex-col ">
                        <h3 className="text-2xl font-semibold mb-4">Login</h3>
                        <p className="text-sm mb-2">Welcome Back ! Please enter your details.</p>
                    </div>

                    {/* Input Fields */}
                    <div className="w-full flex flex-col">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full text-black py-1 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full text-black py-1 my-1 bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="w-full flex items-center justify-between">
                        <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                            Forgot password?
                        </p>
                    </div>

                    {/* Login and Register Buttons */}
                    <div className="w-full flex flex-col my-4">
                        <button className="w-full text-white my-2 font-semibold bg-[#060606] border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                            Login
                        </button>
                        <button className="w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                            Register
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="w-full flex items-center justify-center relative py-4">
                        <div className="w-full h-[1px] bg-black"></div>
                        <p className="text-lg absolute text-black/80 bg-[#f5f5f5] px-2">or</p>
                    </div>

                    {/* Google Sign-In Button */}
                    <button className="w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                        <img src={GOOGLE_ICON} alt="Google Icon" className="h-6 mr-2" />
                        Sign In With Google
                    </button>
                </div>

                {/* Sign Up Prompt */}
                <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606]">
                        Don't have an account?{" "}
                        <span className="font-semibold underline underline-offset-2 cursor-pointer">
                            Sign Up
                        </span>
                    </p>
                </div>
                <Footer />
            </div>
            
        </div>
        
        </>
    );
};

export default Login;