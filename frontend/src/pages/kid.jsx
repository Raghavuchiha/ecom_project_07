
import React , {useContext, useEffect, useState} from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/productitem";
import Title from "../components/title";


const Kid = () => {
    const { products } = useContext(ShopContext);
    const [kidProducts, setkidProducts] = useState([]);

    useEffect(() => {
        const filtered = products.filter((item) => item.category === "Kids");
        setkidProducts(filtered);
    }, [products]);

     return (
    <div className="pt-10">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1="Kid" text2="COLLECTION" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        {kidProducts.map((item) => (
          <ProductItem
            key={item._id}
            name={item.name}
            id={item._id}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
export default Kid;