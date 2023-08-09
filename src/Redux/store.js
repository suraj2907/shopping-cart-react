import { createStore, combineReducers } from "redux";
import handleCart from "./reducer/reducer";

const rootReducer = combineReducers({
  handleCart,
});

const store = createStore(rootReducer);
export default store;
