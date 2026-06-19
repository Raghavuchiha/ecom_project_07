import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Trash2, Truck, CreditCard, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, removeFromCart, getTotalCartAmount,navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Collect item data from cartItems
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            tempData.push({
              ...product,
              size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <section className="min-h-screen bg-gray-50 px-8 md:px-20 py-12">
      <h1 className="text-3xl font-bold mb-8">My Bag 🛍️</h1>

      {/* Empty cart */}
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-xl mb-4">Your bag is empty 😔</p>
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Cart Items */}
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm">
            {cartData.map((item) => (
              <div
                key={item._id + item.size}
                className="flex flex-col md:flex-row gap-6 border-b pb-6 mb-6"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.category} • Size: {item.size}
                  </p>
                  <p className="text-gray-700 font-medium mt-2">
                    {currency}
                    {item.price}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-lg">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Price Summary */}
          <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>
                {currency}
                {getTotalCartAmount()}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {currency}
                {getTotalCartAmount()}
              </span>
            </div>

            <button onClick = {()=>navigate('/place-order')} className="w-full mt-6 bg-yellow-400 py-3 rounded-full font-semibold hover:bg-yellow-500 transition">
              Proceed to Checkout
            </button>

            <div className="flex flex-col gap-3 mt-8 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" /> Free Delivery on all orders
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> 100% Secure Payments
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw className="w-4 h-4" /> Easy Returns & Refunds
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
