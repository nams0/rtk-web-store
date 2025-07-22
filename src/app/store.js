import { configureStore } from "@reduxjs/toolkit"

import productsReducer from "../features/product/productsSlice"
import cartReducer from "../features/cart/cartSlice"

import logger from "redux-logger"

const store = configureStore({
  reducer: { products: productsReducer, cart: cartReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
