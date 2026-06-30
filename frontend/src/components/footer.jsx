import React from 'react';
// import { assets } from '../assets/assets'; // Remove if not using

const Footer = () => {
  return (
    <div className="flex justify-between px-10 py-10 bg-gray-100">
      {/* Company Links */}
      <div>
        <p className="text-xl font-medium mb-5">YOKAI</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      {/* Support Links */}
      <div>
        <p className="text-xl font-medium mb-5">SUPPORT</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>FAQs</li>
          <li>Contact Us</li>
          <li>Help Center</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
