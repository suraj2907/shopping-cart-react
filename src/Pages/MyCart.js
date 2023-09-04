import React, { useEffect, useState } from "react";
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
    // Dispatch the removeFromCart action to decrement quantity in Redux store
    dispatch(removeFromCart(item));

    // Update the quantity in local storage
    const existingCartItemsJSON = localStorage.getItem("CartItems");
    const existingCartItems = existingCartItemsJSON
      ? JSON.parse(existingCartItemsJSON)
      : [];

    const itemIndexToUpdate = existingCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (
      itemIndexToUpdate !== -1 &&
      existingCartItems[itemIndexToUpdate].qty > 1
    ) {
      existingCartItems[itemIndexToUpdate].qty--;
    } else if (itemIndexToUpdate !== -1) {
      // If the quantity is 1, remove the item from local storage

      existingCartItems.splice(itemIndexToUpdate, 1);
      localStorage.setItem("CartItems", JSON.stringify(existingCartItems));
    }

    localStorage.setItem("CartItems", JSON.stringify(existingCartItems));
  };

  const cartItems = (item) => {
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={item.id}>
        <div className="container py-4">
          <button
            className="btn-close float-end"
            aria-label="Close"
            onClick={() => handleClose(item)}
          ></button>

          <div className="d-flex row justify-content-center">
            <div className="col-md-4">
              <img
                src={item.image}
                alt={item.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4 ">
              <h3> {item.title} </h3>
              <p className="lead"> {item.description} </p>
              <p className="lead fw-bolder">${item.price}</p>
              <button onClick={() => handleIncrement(item)}>+</button>
              <p>{item.qty}</p>
              <button onClick={() => handleDecrement(item)}>-</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="my-4 px-3 bg-light rounded-3 ">
        <div className="container py-4 ">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  const checkoutButton = () => {
    return (
      <div className="container ">
        <div className="row">
          <NavLink
            to="/checkout"
            className="btn mb-5 btn-outline-primary w-25 mx-auto"
          >
            Checkout
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <>
      {cartItem.length === 0 && emptyCart()}

      {cartItem.length !== 0 && cartItem.map(cartItems)}
      {cartItem.length !== 0 && checkoutButton()}
    </>
  );
};

export default MyCart;
