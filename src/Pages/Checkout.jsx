import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.handleCart);

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 bg-slate-50 min-h-screen">
      <div className="pt-16 mb-10 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-slate-900 text-center tracking-tight drop-shadow-sm">
          Checkout
        </h2>
        <div className="mt-2 w-16 h-1 bg-yellow-400 rounded-full"></div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Summary */}
        <div className="lg:w-1/3 w-full bg-white rounded-3xl shadow-lg border border-slate-100 p-8 mb-8 lg:mb-0">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between">
            <span>Your Cart</span>
            <span className="bg-yellow-400 text-slate-900 font-bold rounded-full px-3 py-1 text-base">
              {cartItems.length}
            </span>
          </h3>
          <ul className="divide-y divide-slate-100 mb-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="py-3 flex justify-between items-center"
              >
                <span className="font-medium text-slate-800 truncate max-w-[120px]">
                  {item.title.substring(0, 20)}
                </span>
                <span className="text-slate-600 font-semibold">
                  {item.qty} x{" "}
                  <span className="text-green-600 font-bold">
                    ${item.price}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <span className="font-bold text-slate-900">Total (USD)</span>
            <span className="text-xl font-extrabold text-green-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        {/* Billing & Payment Form */}
        <div className="lg:w-2/3 w-full bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Billing Address
          </h3>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-slate-700 font-semibold mb-1"
              >
                Username
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-l-lg text-slate-500">
                  @
                </span>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 rounded-r-lg border-t border-b border-r border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-slate-700 font-semibold mb-1"
              >
                Email{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-slate-700 font-semibold mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="1234 Main St"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address2"
                className="block text-slate-700 font-semibold mb-1"
              >
                Address 2{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="address2"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Apartment or suite"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="country"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  Country
                </label>
                <select
                  id="country"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                >
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="state"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  State
                </label>
                <select
                  id="state"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                >
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="zip"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="same-address"
                className="accent-yellow-400 w-5 h-5 rounded"
              />
              <label htmlFor="same-address" className="text-slate-700">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="save-info"
                className="accent-yellow-400 w-5 h-5 rounded"
              />
              <label htmlFor="save-info" className="text-slate-700">
                Save this information for next time
              </label>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Payment
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="radio"
                  id="credit"
                  name="paymentMethod"
                  className="accent-yellow-400 w-5 h-5"
                  required
                />
                <label htmlFor="credit" className="text-slate-700">
                  Credit card
                </label>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="radio"
                  id="debit"
                  name="paymentMethod"
                  className="accent-yellow-400 w-5 h-5"
                  required
                />
                <label htmlFor="debit" className="text-slate-700">
                  Debit card
                </label>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  className="accent-yellow-400 w-5 h-5"
                  required
                />
                <label htmlFor="paypal" className="text-slate-700">
                  PayPal
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="cc-name"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  Name on card
                </label>
                <input
                  type="text"
                  id="cc-name"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
                <small className="text-slate-400">
                  Full name as displayed on card
                </small>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="cc-number"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  Credit card number
                </label>
                <input
                  type="text"
                  id="cc-number"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="cc-expiration"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  Expiration
                </label>
                <input
                  type="text"
                  id="cc-expiration"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="cc-cvv"
                  className="block text-slate-700 font-semibold mb-1"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cc-cvv"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-8 px-8 py-4 rounded-2xl bg-yellow-400 text-slate-900 font-extrabold text-lg shadow-lg border-2 border-yellow-400 hover:bg-yellow-300 hover:text-slate-900 transition"
            >
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
