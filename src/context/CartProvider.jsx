import { createContext, useContext, useEffect, useReducer } from "react"

import { sumProducts } from "../helpers/helper"

const loadInitialState = () => {
  // handle errors during server-side rendering (SSR)
  if (typeof window !== undefined) {
    const savedState = localStorage.getItem("cart")
    return savedState
      ? JSON.parse(savedState)
      : {
          selectedItems: [],
          itemsCouter: 0,
          totalPrice: 0,
          checkout: false,
        }
  }

  return {
    selectedItems: [],
    itemsCouter: 0,
    totalPrice: 0,
    checkout: false,
  }
}

const initialState = loadInitialState()

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id))
        state.selectedItems.push({ ...action.payload, quantity: 1 })
      return {
        ...state,
        ...sumProducts(state.selectedItems),
        checkout: false,
      }

    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      )
      return {
        selectedItems: [...newSelectedItems],
        ...sumProducts(newSelectedItems),
        checkout: false,
      }

    case "INCREASE":
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      )
      state.selectedItems[increaseIndex].quantity++
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      }

    case "DECREASE":
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      )
      state.selectedItems[decreaseIndex].quantity--
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      }

    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCouter: 0,
        totalPrice: 0,
        checkout: true,
      }

    default:
      throw new Error("Invalid Action!")
  }
}

const CartContext = createContext()

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (typeof window !== undefined)
      localStorage.setItem("cart", JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext)
  return [state, dispatch]
} //custom hook

export default CartProvider
export { useCart }
