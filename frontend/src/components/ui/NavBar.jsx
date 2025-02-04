import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const navigate = useNavigate();

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle navigation
  const navigateTo = (path) => {
    navigate(path);
    setIsOpen(false); // Close mobile menu after navigation
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove the token
    setIsAuthenticated(false); // Update authentication status
    navigate("/login"); // Redirect to home page
  };

  return (
    <nav className="bg-gray-300 text-black shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-auto w-full"
        >
          <div
            className="cursor-pointer flex justify-center md:justify-start"
            onClick={() => navigateTo("/")}
          >
            <h1 className="text-3xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 hover:from-gray-700 hover:to-black transition-all duration-300">
              QuillSync
            </h1>
          </div>
        </motion.div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <X className="w-8 h-8 transition-transform duration-300 transform hover:scale-110" />
            ) : (
              <Menu className="w-8 h-8 transition-transform duration-300 transform hover:scale-110" />
            )}
          </button>
        </div>
        <div
          className={`md:flex md:items-center md:space-x-6 text-lg ${isOpen ? "hidden md:flex" : "hidden"
            }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6">
            <li>
              <div
                onClick={() => navigateTo("/our-services")}
                className="block py-2 px-4 transition-colors duration-300 hover:text-black cursor-pointer"
              >
                Our Services
              </div>
            </li>
            <li>
              <div
                onClick={() => navigateTo("/our-customers")}
                className="block py-2 px-4 transition-colors duration-300 hover:text-black cursor-pointer"
              >
                Our Customers
              </div>
            </li>
            <li>
              <div
                onClick={() => navigateTo("/our-team")}
                className="block py-2 px-4 transition-colors duration-300 hover:text-black cursor-pointer"
              >
                Our Team
              </div>
            </li>
            {/* Conditionally render Login or Logout button */}
            {!isAuthenticated ? (
              <li className="flex justify-center">
                <button
                  onClick={() => navigateTo("/login")}
                  className="relative px-6 py-2 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-transparent overflow-hidden transition-all duration-300 transform hover:scale-105 group"
                >
                  <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                    Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </li>
            ) : (
              <li className="flex justify-center">
                <button
                  onClick={handleLogout}
                  className="relative px-6 py-2 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-transparent overflow-hidden transition-all duration-300 transform hover:scale-105 group"
                >
                  <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                    Logout
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </li>
            )}
          </ul>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-white text-gray-800 flex flex-col justify-center items-center z-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 focus:outline-none hover:rotate-90 transition-transform duration-300"
              >
                <X className="w-8 h-8" />
              </button>
              <ul className="flex flex-col space-y-4 text-lg mb-8 items-center w-full">
                <li className="w-full text-center">
                  <div
                    onClick={() => navigateTo("/our-services")}
                    className="block py-2 px-4 transition-colors duration-300 hover:text-black cursor-pointer"
                  >
                    Our Services
                  </div>
                </li>
                <li className="w-full text-center">
                  <div
                    onClick={() => navigateTo("/our-customers")}
                    className="block py-2 px-4 transition-colors duration-300 hover:text-black cursor-pointer"
                  >
                    Our Customers
                  </div>
                </li>
                <li className="w-full text-center">
                  <div
                    onClick={() => navigateTo("/our-team")}
                    className="block py-2 px-4 transition-colors duration-300 hover:text-black cursor-pointer"
                  >
                    Our Team
                  </div>
                </li>
                {/* Conditionally render Login or Logout button in mobile menu */}
                {!isAuthenticated ? (
                  <li className="w-full flex justify-center">
                    <button
                      onClick={() => navigateTo("/login")}
                      className="relative px-8 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-transparent overflow-hidden transition-all duration-300 transform hover:scale-105 group"
                    >
                      <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                        Login
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>
                  </li>
                ) : (
                  <li className="w-full flex justify-center">
                    <button
                      onClick={handleLogout}
                      className="relative px-8 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-transparent overflow-hidden transition-all duration-300 transform hover:scale-105 group"
                    >
                      <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                        Logout
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>
                  </li>
                )}
              </ul>
              <div className="absolute bottom-8 flex flex-col items-center space-y-4">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 hover:from-gray-700 hover:to-black transition-all duration-300">
                  QuillSync
                </h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className="h-1 bg-gradient-to-r from-gray-400 to-black"
        layoutId="underline"
      ></motion.div>
    </nav>
  );
};

export default Navbar;