import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_FROM_CACHE,
} from "./action-type";

export const addToCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
};

export const removeFromCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });
  };
};

export const updateCartItemsFromCache = (cartItems) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CART_FROM_CACHE,
      payload: cartItems,
    });
  };
};
