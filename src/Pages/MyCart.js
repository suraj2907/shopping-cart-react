import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/action/action";

const MyCart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const cartItems = (cartItem) => {
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
        <div className="container py-4">
          <button className="btn-close float-end" aria-label="Close"></button>

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
              <p className="lead fw-bolder">
                ${cartItem.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{state.length !== 0 && state.map(cartItems)}</>;
};

export default MyCart;
