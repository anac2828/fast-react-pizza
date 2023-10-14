import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload
      );
    },
    increaseItemQty(state, action) {
      // payload = pizzaId
      //   1 - Find item to update
      const item = state.cart.filter(
        (item) => item.pizzaId === action.payload
      );
      //   2 - Update quatity
      item.quantity++;
    },
    decreaseItemQty(state, action) {
      // payload = pizzaId
      //   1 - Find item to update
      const item = state.cart.filter(
        (item) => item.pizzaId === action.payload
      );
      //   2 - Update quatity
      item.quantity--;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

// look into reselect library to optimize getter functions
// will tally the total number of items in the cart and update the quantity and price
export const getTotalCartQty = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQtyById = (id) => (state) =>
  // if there is an item that matches the passed id it will return the quantity o fthe id else 0.
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getCart = (state) => state.cart.cart;

export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
