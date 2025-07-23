import { useDispatch } from "react-redux"
import { decrease, increase, removeItem } from "../features/cart/cartSlice"

import { MdDeleteOutline } from "react-icons/md"
import { FiMinus, FiPlus } from "react-icons/fi"

import { shortenText } from "../helpers/helper"

import styls from "./BasketCard.module.css"

function BasketCard({ product }) {
  const { title, image, quantity, description } = product
  const dispatch = useDispatch()

  return (
    <div className={styls.card}>
      <img src={image} alt={title} />
      <p>{shortenText(title)}</p>
      <p>{shortenText(description)}</p>
      <div className={styls.actions}>
        {quantity === 1 ? (
          <button onClick={() => dispatch(removeItem(product))}>
            <MdDeleteOutline />
          </button>
        ) : (
          <button onClick={() => dispatch(decrease(product))}>
            <FiMinus />
          </button>
        )}

        <span>{quantity}</span>

        <button onClick={() => dispatch(increase(product))}>
          <FiPlus />
        </button>
      </div>
    </div>
  )
}

export default BasketCard
