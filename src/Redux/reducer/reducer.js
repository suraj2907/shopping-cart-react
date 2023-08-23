import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/action-type";

const initialState = {
  cartItems: [],
  qty: 1,
};

const handleCart = (state = initialState, action) => {
  console.log("Current State:", state);
  const product = action.payload;
  console.log("Action type:", action.type);

  switch (action.type) {
    case ADD_TO_CART:
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  qty: item.qty + 1,
                }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...product,
              qty: 1,
            },
          ],
        };
      }

    case REMOVE_FROM_CART:
      const existingProductToRemove = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingProductToRemove.qty === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== product.id),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  qty: item.qty - 1,
                }
              : item
          ),
        };
      }

    default:
      return state;
  }
};

export default handleCart;
