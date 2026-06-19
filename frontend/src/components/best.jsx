import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './title';
import ProductItem from './productitem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestseller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestproduct = products.filter((item) => item.bestseller);
        // It's a good practice to include `products` in the dependency array
        setBestSeller(bestproduct.slice(0, 5)); 
    }, [products]); // 👈 Added 'products' dependency

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ips
                </p>
            </div>

            {/* 👇 ADD THIS GRID CONTAINER! 👇 */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6'>
                {bestseller.map((item) => (
                    <ProductItem 
                        key={item._id} // Use item._id as key for better performance
                        id={item._id} 
                        name={item.name} 
                        image={item.image} 
                        price={item.price}
                    />
                ))}
            </div>
            {/* 👆 END GRID CONTAINER 👆 */}
        </div>
    );
}
export default BestSeller;