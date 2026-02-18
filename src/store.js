import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'

const store = configureStore({
  reducer: { user: userReducer, cart: cartReducer },
})

// EXPORT STORE TO PROVIDE IT TO THE main.jsx for accessing the store in the whole app
export default store
