import { createSlice } from "@reduxjs/toolkit"
import { sumPrice, sumQuantity } from "../../helpers/helper"

const initialState = {
  selectedItems: [],
  itemsCouter: 0,
  totalPrice: 0,
  checkout: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 })
        state.totalPrice = sumPrice(state.selectedItems)
        state.itemsCouter = sumQuantity(state.selectedItems)
        state.checkout = false
      }
    },
    removeItem: (state, action) => {
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      )
      state.selectedItems = newSelectedItems
      state.totalPrice = sumPrice(newSelectedItems)
      state.itemsCouter = sumQuantity(newSelectedItems)
    },
    increase: (state, action) => {
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      )
      state.selectedItems[increaseIndex].quantity++
      state.totalPrice = sumPrice(state.selectedItems)
      state.itemsCouter = sumQuantity(state.selectedItems)
    },
    decrease: (state, action) => {
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      )
      state.selectedItems[decreaseIndex].quantity--
      state.totalPrice = sumPrice(state.selectedItems)
      state.itemsCouter = sumQuantity(state.selectedItems)
    },
    checkout: (state) => {
      state.selectedItems = []
      state.totalPrice = 0
      state.itemsCouter = 0
      state.checkout = true
    },
  },
})

export default cartSlice.reducer
export const { addItem, removeItem, increase, decrease, checkout } =
  cartSlice.actions
