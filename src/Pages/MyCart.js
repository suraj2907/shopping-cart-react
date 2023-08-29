import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../Redux/action/action";
import { NavLink } from "react-router-dom";

const MyCart = () => {
  const cartItem = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartJSON = localStorage.getItem("CartItems");
    if (cartJSON) {
      const cartArray = JSON.parse(cartJSON);
      // Dispatch addToCart action to populate the Redux store with items from local storage
      cartArray.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  }, [dispatch]);

  const handleClose = (item) => {
    dispatch(removeFromCart(item));
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
