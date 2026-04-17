import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_FROM_CACHE,
} from "../action/action-type";

const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increment its quantity immutably
        return state.map((item, index) =>
          index === existingProductIndex ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [
          ...state,

          {
            ...product,
            qty: 1,
          },
        ];
      }

    case REMOVE_FROM_CART:
      const existingProductToRemove = state.find(
        (item) => item.id === product.id
      );

      if (existingProductToRemove.qty === 1) {
        // Remove the item from the cart if qty is 1
        return state.filter((item) => item.id !== product.id);
      } else {
        // Decrement the quantity when qty is greater than 1
        return state.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty - 1 } : item
        );
      }

    case UPDATE_CART_FROM_CACHE:
      return action.payload.map((item) => ({
        ...item,
        qty: item.qty,
      }));

    default:
      return state;
  }
};

export default handleCart;
