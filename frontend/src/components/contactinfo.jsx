import React from "react";

const Cont = () => {
  return (
    <section className="px-16 py-20 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-10">
        CONTACT <span className="text-pink-500">US</span>
        <div className="w-16 h-[2px] bg-gray-300 mt-2 mx-auto"></div>
      </h2>

      {/* Content */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        {/* Image Section */}
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
          alt="Contact office"
          className="w-[450px] h-[480px] object-cover rounded-xl shadow-md"
        />

        {/* Info Section */}
        <div className="max-w-md">
          <h3 className="font-semibold text-lg mb-2">Our Store</h3>
          <p className="text-gray-700 mb-1">412201 Seasons Mall</p>
          <p className="text-gray-700 mb-1">Seasons Mall, hadapsar,pune</p>
          <p className="text-gray-700 mb-1">Tel: (91) 555-0132</p>
          <p className="text-gray-700 mb-6">Email: Forever@gmail.com</p>

          <h3 className="font-semibold text-lg mb-2">Careers at Forever</h3>
          <p className="text-gray-700 mb-4">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black text-black px-6 py-2 rounded-md hover:bg-black hover:text-white transition">
            Explore Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cont;
