import { Link } from "react-router-dom"

import { TbListDetails } from "react-icons/tb"
import { TbShoppingBagCheck } from "react-icons/tb"
import { MdDeleteOutline } from "react-icons/md"
import { FiMinus, FiPlus } from "react-icons/fi"

import { productQuantity, shortenText } from "../helpers/helper"
import { useCart } from "../context/CartProvider"

import styles from "./Card.module.css"

function Card({ data }) {
  const { id, title, image, price } = data

  const [state, dispatch] = useCart()

  const quantity = productQuantity(state, id)

  const clickHandler = (type) => {
    dispatch({ type, payload: data })
  }

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price} $</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {quantity === 1 && (
            <button onClick={() => clickHandler("REMOVE_ITEM")}>
              <MdDeleteOutline />
            </button>
          )}

          {quantity >= 2 && (
            <button onClick={() => clickHandler("DECREASE")}>
              <FiMinus />
            </button>
          )}

          <span>{!!quantity && quantity}</span>

          {quantity === 0 ? (
            <button onClick={() => clickHandler("ADD_ITEM")}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => clickHandler("INCREASE")}>
              <FiPlus />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
