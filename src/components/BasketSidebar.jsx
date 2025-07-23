import { TbChecklist } from "react-icons/tb"
import { FaHashtag } from "react-icons/fa"
import { BsPatchCheck } from "react-icons/bs"

import { checkout } from "../features/cart/cartSlice"

import { useDispatch } from "react-redux"

import styles from "./BasketSidebar.module.css"

function BasketSidebar({ store }) {
  const dispatch = useDispatch()

  return (
    <div className={styles.sidebar}>
      <div>
        <TbChecklist />
        <p>Total Price:</p>
        <span>{store.totalPrice} $</span>
      </div>

      <div>
        <FaHashtag />
        <p>Quantity:</p>
        <span>{store.itemsCounter}</span>
      </div>

      <div>
        <BsPatchCheck />
        <p>Status:</p>
        <span>{!store.checkout && "Pending ..."}</span>
      </div>
      <button onClick={() => dispatch(checkout())}>Checkout</button>
    </div>
  )
}

export default BasketSidebar
