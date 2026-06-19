import React from 'react';

const About = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center px-16 py-20">
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
        alt="fashion"
        className="w-[450px] h-[480px] rounded-xl shadow-md"
      />

      <div className="md:ml-12 mt-8 md:mt-0 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">
          ABOUT <span className="text-pink-500">US</span>
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Forever was born out of a passion for innovation and a desire to revolutionize the way
          people shop online. We aim to provide a unique, seamless, and inspiring shopping
          experience that combines style with comfort.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Since our inception, we've worked tirelessly to curate a diverse selection of
          high-quality products that cater to every taste and preference. Whether you're looking
          for something trendy or timeless, we’ve got you covered.
        </p>

        <h3 className="font-bold mt-6 mb-2">Our Mission</h3>
        <p className="text-gray-700">
          Our mission at Forever is to empower customers with choice, convenience, and confidence.
          We believe fashion should be accessible, expressive, and inclusive for everyone.
        </p>
      </div>
    </section>
  );
};

export default About;
