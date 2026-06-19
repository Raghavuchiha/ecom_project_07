import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { search, setSearch,getCartCount } = useContext(ShopContext);


  return (
    <div className="w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">

        {/* ✅ Logo (Left) */}
        <Link to="/">
         YOKAI
        </Link>

        {/* ✅ Center Menu (Keep same items) */}
        <ul className="hidden md:flex gap-6 font-semibold text-sm text-gray-800">
          <NavLink to="/" className="hover:text-yellow-500 transition">HOME</NavLink>
          <NavLink to="/collection" className="hover:text-yellow-500 transition">COLLECTION</NavLink>
          <NavLink to="/about" className="hover:text-yellow-500 transition">ABOUT</NavLink>
          <NavLink to="/contact" className="hover:text-yellow-500 transition">CONTACT</NavLink>
        </ul>

        {/* ✅ Right Section (Search + Login + Cart) */}
        <div className="flex items-center gap-6">

          {/* Search Bar like  */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-md w-64">
            
            <input
              type="text"
              placeholder="Search by products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full text-sm focus:outline-none"
             // onClick={() => setShowSearch(true)}
            />
          </div>

          {/* Login */}
          <Link to="/login" className="text-sm font-semibold hover:text-yellow-500">
            LOGIN
          </Link>

          {/* Cart */}
          <Link to="/Cart" className="relative">
            <img src={assets.cart_icon} className="w-5" alt="cart" />
            <p className="absolute right-[-6px] top-[-6px] w-4 text-center bg-yellow-400 text-black rounded-full text-[10px] font-bold">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Hamburger */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 cursor-pointer md:hidden"
            alt="menu"
          />
        </div>
      </div>

      {/* ✅ Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 z-50 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          {/* Back */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 border-b cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="back" />
            <p>Back</p>
          </div>

          {/* Same menu items in mobile view */}
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b" to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
