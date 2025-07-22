import { configureStore } from "@reduxjs/toolkit"

import productsReducer from "../features/product/productsSlice"

import logger from "redux-logger"

const store = configureStore({
  reducer: { products: productsReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
