import { ADD_TO_CART, REMOVE_FROM_CART } from "./action-type";

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
