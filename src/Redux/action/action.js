import { ADD_TO_CART, REMOVE_FROM_CART } from "./action-type";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});
