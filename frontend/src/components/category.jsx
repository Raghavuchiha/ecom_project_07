import React from "react";
import { Link } from "react-router-dom";
import men from "../assets/men.png";

const Categories = () => {
  return (
    <div className="my-16">

      <h2 className="text-center text-3xl sm:text-4xl font-semibold tracking-wide mb-10">
        SHOP BY <span className="text-indigo-600">CATEGORY</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 sm:px-0">

        {/* MEN */}
        <Link to="/men">
          <div className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg">
            <img
              src={men}
              alt="MEN"
              className="h-64 w-full object-contain bg-white transition-transform duration-500 group-hover:scale-105"
            />
            <h2 className="absolute bottom-4 left-4 text-white text-3xl font-bold drop-shadow-lg">
              MEN
            </h2>
          </div>
        </Link>

        {/* WOMEN */}
        <Link to="/women">
          <div className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg">
            <img
              src="/src/assets/wmn.jpg"
              alt="WOMEN"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <h2 className="absolute bottom-4 left-4 text-white text-3xl font-bold drop-shadow-lg">
              WOMEN
            </h2>
          </div>
        </Link>

        {/* KIDS */}
        <Link to="kid">
          <div className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg">
            <img
              src="/src/assets/kd.jpg"
              alt="KIDS"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <h2 className="absolute bottom-4 left-4 text-white text-3xl font-bold drop-shadow-lg">
              KIDS
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
