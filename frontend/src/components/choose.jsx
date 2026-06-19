const WhyChooseUs = () => {
  const features = [
    {
      title: "Quality Assurance",
      desc: "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
    },
    {
      title: "Convenience",
      desc: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
    },
    {
      title: "Exceptional Customer Service",
      desc: "Our team of dedicated professionals is here to assist you, ensuring your satisfaction is our top priority.",
    },
  ];

  return (
    <section className="bg-white py-16 px-12">
      <h2 className="text-2xl font-semibold text-center mb-12">
        WHY <span className="text-pink-500">CHOOSE US</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((item, i) => (
          <div key={i} className="border p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-3">{item.title}:</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
