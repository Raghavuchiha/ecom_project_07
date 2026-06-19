import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    search,
    setSearch,
    getCartCount,
    user,
    logout,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wider"
        >
          YOKAI
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-semibold text-sm text-gray-800">
          <NavLink to="/" className="hover:text-yellow-500 transition">
            HOME
          </NavLink>

          <NavLink
            to="/collection"
            className="hover:text-yellow-500 transition"
          >
            COLLECTION
          </NavLink>

          <NavLink
            to="/about"
            className="hover:text-yellow-500 transition"
          >
            ABOUT
          </NavLink>

          <NavLink
            to="/contact"
            className="hover:text-yellow-500 transition"
          >
            CONTACT
          </NavLink>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Search */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-md w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full text-sm focus:outline-none"
            />
          </div>

          {/* Authentication */}
          {user ? (
            <div className="flex items-center gap-4">

              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-semibold hover:text-yellow-500"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>

                <span className="hidden md:block">
                  {user.username}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-600 hover:text-red-500 transition"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold hover:text-yellow-500 transition"
            >
              LOGIN
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-5"
              alt="cart"
            />

            <p className="absolute right-[-6px] top-[-6px] w-4 text-center bg-yellow-400 text-black rounded-full text-[10px] font-bold">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Button */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 cursor-pointer md:hidden"
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
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
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="back"
            />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/"
          >
            HOME
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/collection"
          >
            COLLECTION
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/about"
          >
            ABOUT
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/contact"
          >
            CONTACT
          </NavLink>

          {user ? (
            <>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-3 pl-6 border-b"
                to="/profile"
              >
                PROFILE
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setVisible(false);
                }}
                className="py-3 pl-6 border-b text-left"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <NavLink
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b"
              to="/login"
            >
              LOGIN
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
