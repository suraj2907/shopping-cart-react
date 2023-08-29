import { createStore, combineReducers, applyMiddleware } from "redux";
import handleCart from "./reducer/reducer";
import thunk from "redux-thunk";
//import { loadCartFromLocalStorage } from "./action/action";

const rootReducer = combineReducers({
  handleCart,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

// Load initial cart items from local storage when the store is created
// store.dispatch(loadCartFromLocalStorage());
export default store;
