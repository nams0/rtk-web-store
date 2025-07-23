import { configureStore, combineReducers } from "@reduxjs/toolkit"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import productsReducer from "../features/product/productsSlice"
import cartReducer from "../features/cart/cartSlice"

import logger from "redux-logger"

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // only cart will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // this actions are not serializable
      },
    }).concat(logger),
})

export default store
export const persistor = persistStore(store)
