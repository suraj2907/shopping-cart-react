import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../Redux/action/action";
import { NavLink } from "react-router-dom";

const MyCart = () => {
  const cartItems = useSelector((state) => state.handleCart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    // Retrieve the cart items from local storage
    const cartItemsJSON = localStorage.getItem("cartItems");

    if (Array.isArray(cartItemsJSON)) {
      // Parse the data and dispatch it to Redux
      const parsedCartItems = JSON.parse(cartItemsJSON);
      parsedCartItems.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  }, [dispatch]);

  const handleClose = (item) => {
    dispatch(removeFromCart(item));
      // Get the current cart items from local storage
      const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const cartItemElements = cartItems.map((cartItem) => {
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
        <div className="container py-4">
          <button
            className="btn-close float-end"
            aria-label="Close"
            onClick={() => handleClose(cartItem)}
          ></button>

          <div className="d-flex row justify-content-center">
            <div className="col-md-4">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4 ">
              <h3> {cartItem.title} </h3>
              <p className="lead"> {cartItem.description} </p>
              <p className="lead fw-bolder">${cartItem.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const emptyCart = () => {
    return (
      <div className="my-4 px-3 bg-light rounded-3 ">
        <div className="container py-4 ">
          <div className="row">
            <h3>Your Card is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  const button = () => {
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
      {cartItems.length === 0 && emptyCart()}

      {cartItems.length !== 0 && cartItemElements}
      {cartItems.length !== 0 && button()}
    </>
  );
};

export default MyCart;
