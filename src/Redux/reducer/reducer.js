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
        // If the product already exists in the cart, increment its quantity
        const updatedCart = [...state];
        updatedCart[existingProductIndex].qty += 1;
        return updatedCart;
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
        const updatedCart = state.filter(
          (item) => item.id !== product.id || item.qty > 1
        );
        localStorage.setItem("CartItems", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        // Decrement the quantity when qty is greater than 1
        const updatedCart = state.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty - 1 } : item
        );
        localStorage.setItem("CartItems", JSON.stringify(updatedCart));
        return updatedCart;
      }

    case UPDATE_CART_FROM_CACHE:
      const cartItems = action.payload.map((item) => ({
        ...item,
        qty: item.qty,
      }));
      return cartItems;

    default:
      return state;
  }
};

export default handleCart;
