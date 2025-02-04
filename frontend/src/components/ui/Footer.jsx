"use client";

import React from "react";
import { FaGithub, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center space-y-4">
        {/* Footer Text */}
        <p className="text-center">Made for DEVSOC 2025 - Team Real</p>
      </div>
    </footer>
  );
};

export default Footer;
