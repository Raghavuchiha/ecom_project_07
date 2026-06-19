import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, delivery_fee, currency } = useContext(ShopContext);
  const subtotal = getTotalCartAmount();
  const total = subtotal + delivery_fee;

  const [paymentMethod, setPaymentMethod] = useState("COD");

  return (
    <div className="px-10 md:px-20 lg:px-40 py-16 flex flex-col lg:flex-row justify-between gap-16">
      
      {/* -------- LEFT: Delivery Information -------- */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-6">
          DELIVERY <span className="font-normal">INFORMATION</span>
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <input type="text" placeholder="First name" className="border p-3 rounded-md" />
          <input type="text" placeholder="Last name" className="border p-3 rounded-md" />
          <input
            type="email"
            placeholder="Email address"
            className="md:col-span-2 border p-3 rounded-md"
          />
          <input
            type="text"
            placeholder="Street"
            className="md:col-span-2 border p-3 rounded-md"
          />
          <input type="text" placeholder="City" className="border p-3 rounded-md" />
          <input type="text" placeholder="State" className="border p-3 rounded-md" />
          <input type="text" placeholder="Zipcode" className="border p-3 rounded-md" />
          <input type="text" placeholder="Country" className="border p-3 rounded-md" />
          <input
            type="text"
            placeholder="Phone"
            className="md:col-span-2 border p-3 rounded-md"
          />
        </form>
      </div>

      {/* -------- RIGHT: Cart Totals + Payment Method -------- */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-6">
          CART <span className="font-normal">TOTALS</span>
        </h2>

        <div className="border-b pb-3 mb-3 text-sm">
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>
              {currency} {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping Fee</span>
            <span>
              {currency} {delivery_fee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 font-semibold">
            <span>Total</span>
            <span>
              {currency} {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* -------- Payment Method -------- */}
        <h2 className="text-2xl font-semibold mb-6">
          PAYMENT <span className="font-normal">METHOD</span>
        </h2>

        <div className="flex flex-wrap gap-3 text-sm">
          <label
            className={`flex items-center gap-2 px-5 py-3 border rounded-md cursor-pointer ${
              paymentMethod === "Stripe" ? "border-black bg-gray-50" : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="text-indigo-500 font-semibold">Stripe</span>
          </label>

          <label
            className={`flex items-center gap-2 px-5 py-3 border rounded-md cursor-pointer ${
              paymentMethod === "Razorpay" ? "border-black bg-gray-50" : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="Razorpay"
              checked={paymentMethod === "Razorpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="text-blue-600 font-semibold">Razorpay</span>
          </label>

          <label
            className={`flex items-center gap-2 px-5 py-3 border rounded-md cursor-pointer ${
              paymentMethod === "COD" ? "border-black bg-gray-50" : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="text-green-600 font-semibold">Cash on Delivery</span>
          </label>
        </div>

        <button className="mt-8 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
