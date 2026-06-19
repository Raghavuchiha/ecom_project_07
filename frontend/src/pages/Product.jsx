import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
//import { assets } from "../assets/assets";

const Product = () => {
  const { productID } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [showNotification, setShowNotification] = useState(false);

  // Fetch product data based on productID
  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id.toString() === productID) {
        setProductData(item);
        setImage(item.image[0]);
        
        // Get related products (same category, different product)
        const related = products.filter(
          (product) => 
            product.category === item.category && 
            product._id !== item._id
        ).slice(0, 4);
        setRelatedProducts(related);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productID]);

  const handleAddToCart = () => {
    if (productData.sizes && productData.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    
    addToCart(productData._id, selectedSize);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleGoToCart = () => {
    navigate('/Cart');
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-10'>
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in flex items-center gap-3">
          <span>✓ Product added to cart!</span>
          <button 
            onClick={handleGoToCart}
            className="ml-2 bg-white text-green-600 px-4 py-1 rounded font-medium hover:bg-gray-100 transition-all"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 rounded ${
                  image === item ? 'border-orange-500' : 'border-gray-200'
                } hover:border-orange-300 transition-all`}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto rounded-lg" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4].map((star) => (
              <svg key={star} className="w-4 h-4 fill-orange-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
            <svg className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <p className="pl-2 text-sm">(122)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Size Selection */}
          {productData.sizes && productData.sizes.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p className="font-medium">Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-2 px-4 rounded ${
                      selectedSize === size
                        ? 'border-orange-500 bg-orange-50 text-orange-600'
                        : 'border-gray-300 bg-gray-50'
                    } hover:border-orange-400 transition-all`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-800 transition-all rounded w-full sm:w-auto"
          >
            ADD TO CART
          </button>

          {/* Additional Info */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✓ 100% Original product</p>
            <p>✓ Cash on delivery is available on this product</p>
            <p>✓ Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews Tabs */}
      <div className="mt-20">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-5 py-3 text-sm font-medium ${
              activeTab === 'description'
                ? 'border-b-2 border-black'
                : 'text-gray-500'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3 text-sm font-medium ${
              activeTab === 'reviews'
                ? 'border-b-2 border-black'
                : 'text-gray-500'
            }`}
          >
            Reviews (122)
          </button>
        </div>

        <div className="py-6 text-sm text-gray-500">
          {activeTab === 'description' ? (
            <div className="flex flex-col gap-4">
              <p>
                An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
              </p>
              <p>
                E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer. These websites typically display products or services along with detailed descriptions, images, prices, and any available variations.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-black">John D.</p>
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <svg key={star} className="w-4 h-4 fill-orange-500" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-1">Posted 2 days ago</p>
                <p>Great quality product! Exactly as described. Fast shipping too.</p>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-black">Sarah M.</p>
                  <div className="flex">
                    {[1,2,3,4].map((star) => (
                      <svg key={star} className="w-4 h-4 fill-orange-500" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-1">Posted 1 week ago</p>
                <p>Very satisfied with my purchase. Would recommend!</p>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-black">Mike R.</p>
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <svg key={star} className="w-4 h-4 fill-orange-500" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-1">Posted 2 weeks ago</p>
                <p>Perfect fit and excellent material. Will buy again!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="my-24">
        <div className="text-center text-3xl py-2">
          <h2 className="inline-block">
            <span className="text-gray-500">RELATED</span> PRODUCTS
          </h2>
          <div className="w-16 h-[2px] bg-gray-700 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6 mt-10">
          {relatedProducts.map((item, index) => (
            <div 
              key={index} 
              className="cursor-pointer group"
              onClick={() => handleProductClick(item._id)}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="hover:scale-110 transition-transform duration-300 w-full"
                />
              </div>
              <p className="pt-3 pb-1 text-sm">{item.name}</p>
              <p className="text-sm font-medium">
                {currency}{item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  ) : (
    <div className='opacity-0'>Loading...</div>
  );
};

export default Product;