import { MdDeleteOutline } from "react-icons/md"
import { FiMinus, FiPlus } from "react-icons/fi"

import { shortenText } from "../helpers/helper"

import styls from "./BasketCard.module.css"

function BasketCard({ product, dispatch }) {
  const { title, image, quantity, description } = product

  const clickHandler = (type) => {
    dispatch({ type, payload: product })
  }

  return (
    <div className={styls.card}>
      <img src={image} alt={title} />
      <p>{shortenText(title)}</p>
      <p>{shortenText(description)}</p>
      <div className={styls.actions}>
        {quantity === 1 ? (
          <button onClick={() => clickHandler("REMOVE_ITEM")}>
            <MdDeleteOutline />
          </button>
        ) : (
          <button onClick={() => clickHandler("DECREASE")}>
            <FiMinus />
          </button>
        )}

        <span>{quantity}</span>

        <button onClick={() => clickHandler("INCREASE")}>
          <FiPlus />
        </button>
      </div>
    </div>
  )
}

export default BasketCard
