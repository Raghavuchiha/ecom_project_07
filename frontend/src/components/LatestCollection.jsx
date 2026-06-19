import React, { useContext, useEffect, useState } from "react";
import Title from "./title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./productitem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-16">
      {/* HEADER */}
      <div className="text-center py-10">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide">
          LATEST{" "}
          <span className="text-3xl sm:text-4xl font-semibold tracking-wide">
            COLLECTIONS
          </span>
        </h2>
        
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
