import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartItemsFromCache,
} from "../Redux/action/action";
import { NavLink } from "react-router-dom";

const MyCart = () => {
  const cartItem = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartItemJSON = localStorage.getItem("CartItems");
    if (cartItemJSON) {
      const cartItems = JSON.parse(cartItemJSON);
      dispatch(updateCartItemsFromCache(cartItems));
    }
  }, [dispatch]);

  const handleIncrement = (item) => {
    // Dispatch the addToCart action to increment quantity in Redux store
    dispatch(addToCart(item));

    // Update the quantity in local storage
    const existingCartItemsJSON = localStorage.getItem("CartItems");
    const existingCartItems = existingCartItemsJSON
      ? JSON.parse(existingCartItemsJSON)
      : [];

    const itemIndexToUpdate = existingCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndexToUpdate !== -1) {
      existingCartItems[itemIndexToUpdate].qty++;
      localStorage.setItem("CartItems", JSON.stringify(existingCartItems));
    }
  };

  const handleDecrement = (item) => {
    // Find the item in local storage
    const existingCartItemsJSON = localStorage.getItem("CartItems");
    const existingCartItems = existingCartItemsJSON
      ? JSON.parse(existingCartItemsJSON)
      : [];

    const itemIndexToUpdate = existingCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndexToUpdate !== -1) {
      if (existingCartItems[itemIndexToUpdate].qty > 1) {
        // If the quantity is greater than 1, update Redux store and local storage
        dispatch(removeFromCart(item));
        existingCartItems[itemIndexToUpdate].qty--;

        // Update local storage
        localStorage.setItem("CartItems", JSON.stringify(existingCartItems));
      } else {
        // If the quantity is 1, remove the item from Redux store and local storage
        dispatch(removeFromCart(item));

        // Remove the item from local storage
        existingCartItems.splice(itemIndexToUpdate, 1);
        localStorage.setItem("CartItems", JSON.stringify(existingCartItems));
      }
    }
  };

  const handleClose = (item) => {
    dispatch(removeFromCart(item));
    // Remove the item from local storage as well
    const existingCartItemsJSON = localStorage.getItem("CartItems");
    const existingCartItems = existingCartItemsJSON
      ? JSON.parse(existingCartItemsJSON)
      : [];

    // Find the index of the item to be removed in local storage
    const itemIndexToRemove = existingCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndexToRemove !== -1) {
      // Update the item quantity in local storage
      if (existingCartItems[itemIndexToRemove].qty >= 1) {
        existingCartItems[itemIndexToRemove].qty--;
      } else {
        // If the quantity is 1, remove the item from local storage
        existingCartItems.splice(itemIndexToRemove, 1);
      }

      localStorage.setItem("CartItems", JSON.stringify(existingCartItems));
    }
  };

  const cartItems = (item) => {
    return (
      <div className="px-4 my-5 bg-gray-100 rounded-2xl shadow" key={item.id}>
        <div className="py-4 relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
            aria-label="Close"
            onClick={() => handleClose(item)}
          >
            &times;
          </button>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div>
              <img
                src={item.image}
                alt={item.title}
                className="h-36 w-36 object-contain"
              />
            </div>
            <div className="flex-1 mt-3 md:mt-0">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">
                {item.description.substring(0, 250)}
              </p>
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={() => handleDecrement(item)}
                >
                  Decrease
                </button>
                <p className="text-lg font-semibold text-center">
                  Items Quantity:
                  <span className="text-red-600 font-bold ml-2">
                    {item.qty}
                  </span>
                </p>
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={() => handleIncrement(item)}
                >
                  Increase
                </button>
              </div>
              <p className="text-base text-center mt-3 font-semibold">
                Price of 1 Product:
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
      <div className="my-4 px-3 bg-gray-100 rounded-2xl shadow">
        <div className="py-8 flex justify-center">
          <h3 className="font-bold text-xl">Your Cart is Empty</h3>
        </div>
      </div>
    );
  };

  const checkoutButton = () => {
    return (
      <div className="flex justify-center my-8">
        <NavLink
          to="/checkout"
          className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition"
        >
          Checkout
        </NavLink>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {cartItem.length === 0 && emptyCart()}
      {cartItem.length !== 0 && cartItem.map(cartItems)}
      {cartItem.length !== 0 && checkoutButton()}
    </div>
  );
};

export default MyCart;
