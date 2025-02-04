import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); 

        
        const loginData = {
            username,
            password,
        };



        try {
            const response = await fetch("http://localhost:3002/auth/login", {
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

            
            localStorage.setItem("accessToken", data.access_token);
            sessionStorage.setItem("username",loginData.username);
            sessionStorage.setItem("userId", data.userId);
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            
            <div className="flex-grow flex">
                
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

                
                <div className="w-1/2 bg-[#f5f5f5] flex flex-col p-10 justify-center items-center">
                    
                    <form onSubmit={handleLogin} className="w-full flex flex-col max-w-[500px] py-10">
                        <div className="w-full flex flex-col">
                            <h3 className="text-2xl font-semibold mb-4">Login</h3>
                            <p className="text-sm mb-2">Welcome Back! Please enter your details.</p>
                        </div>

                        
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

                        
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm font-medium cursor-pointer underline">
                                Forgot password?
                            </p>
                        </div>

                        
                        <div className="w-full flex flex-col my-4 gap-4">
                            <button type="submit" className="w-full text-white bg-black border border-black rounded-2xl p-3 text-center cursor-pointer">
                                Login
                            </button>
                            <button
                                type="button"
                                className="w-full text-black bg-white border border-black rounded-2xl p-3 text-center cursor-pointer"
                                onClick={() => navigate('/Register')} 
                            >
                                Register
                            </button>
                        </div>

                        

                    </form>

                    
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

            
            <Footer />
        </div>
    );
};

export default Login;