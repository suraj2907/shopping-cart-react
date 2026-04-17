import { createStore, combineReducers, applyMiddleware } from "redux";
import handleCart from "./reducer/reducer";
import {thunk} from "redux-thunk";

//import { loadCartFromLocalStorage } from "./action/action";

const rootReducer = combineReducers({
  handleCart,
});

// Load initial state from localStorage
const persistedCart = localStorage.getItem("CartItems")
  ? JSON.parse(localStorage.getItem("CartItems"))
  : [];

const preloadedState = {
  handleCart: persistedCart,
};

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

// Subscribe to store changes to save cart to localStorage
store.subscribe(() => {
  localStorage.setItem("CartItems", JSON.stringify(store.getState().handleCart));
});

export default store;
