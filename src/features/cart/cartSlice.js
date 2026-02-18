import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem { pizzaId, name, unitPrice, quantity, totalPrice }
      state.cart.push(action.payload)
    },
    deleteItem(state, action) {
      // payload = pizzaId
      //filter() will return a new array with all the items that do not match the pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
    },
    increaseItemQty(state, action) {
      // payload = pizzaId
      //   1 - Find item to update
      const item = state.cart.find((item) => item.pizzaId === action.payload)
      //   2 - Update quatity
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },
    decreaseItemQty(state, action) {
      // payload = pizzaId
      //   1 - Find item to update
      const item = state.cart.find((item) => item.pizzaId === action.payload)
      //   2 - Update quatity
      item.quantity--
      // 3 - Update price
      item.totalPrice = item.quantity * item.unitPrice

      if (item.quantity === 0)
        // calls the delete function in the reducer
        cartSlice.caseReducers.deleteItem(state, action)
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

// ** Functions for use with the useSelector hook.
// Will tally the total number of items in the cart and update the quantity and price
export const getTotalCartQty = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getCurrentQtyById = (id) => (state) =>
  // if there is an item that matches the passed id it will return the quantity of the id else 0.
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0

export const getCart = (state) => state.cart.cart

// ACTIONS
export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions

// EXPORT REDUCER TO SET UP STORE
export default cartSlice.reducer
