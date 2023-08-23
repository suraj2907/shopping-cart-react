import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_FROM_STORAGE,
} from "./action-type";

export const addToCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });

    const updatedCart = getState();
    localStorage.setItem("cartItems", JSON.stringify(updatedCart.handleCart));
  };
};

export const removeFromCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });

    const updatedCart = getState();
    localStorage.setItem("cartItems", JSON.stringify(updatedCart.handleCart));
  };
};
export const loadCartFromLocalStorage = () => (dispatch) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // Dispatch an action to set the initial cart state from local storage
  dispatch({ type: SET_CART_FROM_STORAGE, payload: cartItems });
};
