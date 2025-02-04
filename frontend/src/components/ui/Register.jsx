import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();

    
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    
    const handleRegister = async (e) => {
        e.preventDefault();

        // Trim inputs to remove leading/trailing spaces
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        // Basic Validation
        if (!trimmedUsername || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
            setError("All fields are required and cannot be empty or contain only spaces.");
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Password length validation
        if (trimmedPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        // Confirm password validation
        if (trimmedPassword !== trimmedConfirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Prepare Data
        const registerData = {
            username: trimmedUsername,
            email: trimmedEmail,
            password: trimmedPassword,
        };

        try {
            // Send POST request to the backend API
            const response = await fetch("http://localhost:3002/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed!");
            }

            const data = await response.json();

            // Store access token
            localStorage.setItem("accessToken", data.access_token);

            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error);
            setError(error.message || "An error occurred during registration.");
        }
    };
    

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full h-full flex items-start">
                
                <div className="relative bg-black w-1/2 h-full flex flex-col">
                    <div className="absolute top-[20%] left-[10%] flex flex-col">
                        <h1 className="max-w-[500px] text-3xl text-white font-bold py-2">
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

                
                <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-10 justify-center items-center">
                    <form onSubmit={handleRegister} className="w-full flex flex-col max-w-[500px] py-10">
                        <h3 className="text-2xl font-semibold mb-4">Register</h3>
                        <p className="text-sm mb-2">Create your account and start exploring.</p>

                        
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                       
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none"
                        />

                        
                        <button
                            type="submit"
                            className="w-full text-white bg-black border border-black rounded-2xl p-3 text-center my-4 cursor-pointer"
                        >
                            Register
                        </button>

                        
                        <p className="text-sm text-black text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="font-semibold underline cursor-pointer">
                                Sign In
                            </Link>
                        </p>
                    </form>     
                </div>
            </div>

            
            <Footer />
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 py-6 shadow-2xl">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                <p className="text-sm text-white">© {new Date().getFullYear()} QuillSync™. All rights reserved.</p>
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

export default Register;