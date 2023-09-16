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
                height="150px"
                width="150px"
              />
            </div>
            <div className="col-md-4 flex-wrap mt-3 ">
              <h3 className="overflow-hidden"> {item.title} </h3>
              <p className="lead"> {item.description.substring(0, 250)} </p>
              <div className="d-flex justify-content-around align-items-center">
                <button
                  className="qty-btn btn fw-semibold"
                  onClick={() => handleDecrement(item)}
                >
                  Decrease
                </button>
                <p className="fs-2xl fw-semi-bolder  text-center ">
                  Items Quantity-:
                  <span className="text-danger text-center fw-bolder fs-4">
                    {" "}
                    {item.qty}
                  </span>
                </p>
                <button
                  className="qty-btn btn fw-semibold"
                  onClick={() => handleIncrement(item)}
                >
                  Increase
                </button>
              </div>
              <p className="fs-5 text-center mt-3 fw-semi-bolder">
                Price of 1 Product is-:{" "}
                <span className="text-success fw-bolder "> ${item.price}</span>
              </p>{" "}
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
            <h3 className=" overflow-hidden">Your Cart is Empty</h3>
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
