import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/action-type";

const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;

  switch (action.type) {
    case ADD_TO_CART:
     
      const existingProduct = state.find((item) => item.id === product.id);
      console.log(existingProduct);
      if (existingProduct) {
        return state.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
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
        return state.filter((item) => item.id !== product.id);
      } else {
        return state.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty - 1 } : item
        );
      }

    default:
      return state;
  }
};

export default handleCart;
