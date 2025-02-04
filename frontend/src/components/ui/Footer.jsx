"use client";

import React from "react";
import { FaGithub, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 py-4 shadow-2xl z-50">
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

export default Footer;
