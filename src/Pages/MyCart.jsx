import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartItemsFromCache,
} from "../redux/action/action";
import { NavLink } from "react-router-dom";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";

const MyCart = () => {
  const cartItem = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClose = (item) => {
    dispatch(removeFromCart(item));
  };

  const cartItems = (item) => {
    return (
      <div
        className="px-6 m-4 bg-slate-50 rounded-3xl shadow-lg border border-slate-100 transition hover:shadow-2xl"
        key={item.id}
      >
        <div className="py-6 relative">
          <button
            className="absolute top-6 right-6 text-slate-400 hover:text-yellow-400 text-2xl p-2 rounded-full transition border border-transparent hover:border-yellow-400 bg-white shadow-sm"
            aria-label="Remove from cart"
            onClick={() => handleClose(item)}
          >
            <FaTimes />
          </button>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white rounded-2xl p-4 shadow-md flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-40 object-contain"
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <h3 className="font-bold text-2xl mb-2 text-slate-800">
                {item.title}
              </h3>
              <p className="text-slate-600 mb-3 text-base">
                {item.description.substring(0, 250)}
              </p>
              <div className="flex flex-wrap gap-6 items-center justify-between mt-2">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-300 transition shadow"
                  onClick={() => handleDecrement(item)}
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                <p className="text-xl font-bold text-center text-slate-800">
                  <span className="block text-xs font-medium text-slate-500">
                    Quantity
                  </span>
                  <span className="text-yellow-400 ml-2">{item.qty}</span>
                </p>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-300 transition shadow"
                  onClick={() => handleIncrement(item)}
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
              </div>
              <p className="text-lg text-center mt-4 font-semibold text-slate-800">
                Price per item:
                <span className="text-green-600 font-bold ml-2">
                  ${item.price}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="my-8 px-6 bg-slate-50 rounded-3xl shadow-lg border border-slate-100">
        <div className="py-16 flex flex-col items-center">
          <h3 className="font-bold text-2xl text-slate-800 mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-slate-500">
            Looks like you haven't added anything yet.
          </p>
        </div>
      </div>
    );
  };

  const checkoutButton = () => {
    return (
      <div className="flex justify-center my-10">
        <NavLink
          to="/checkout"
          className="px-10 py-4 rounded-2xl bg-yellow-400 text-slate-900 font-extrabold text-lg shadow-lg border-2 border-yellow-400 hover:bg-yellow-300 hover:text-slate-900 transition"
        >
          Checkout
        </NavLink>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-slate-50 min-h-screen">
      <div className="pt-16 mb-10 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-slate-900 text-center tracking-tight drop-shadow-sm">
          My Cart
        </h2>
        <div className="mt-2 w-16 h-1 bg-yellow-400 rounded-full"></div>
      </div>
      {cartItem.length === 0 && emptyCart()}
      {cartItem.length !== 0 && cartItem.map(cartItems)}
      {cartItem.length !== 0 && checkoutButton()}
    </div>
  );
};

export default MyCart;
