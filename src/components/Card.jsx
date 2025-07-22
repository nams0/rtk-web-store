import { useDispatch, useSelector } from "react-redux"

import {
  addItem,
  decrease,
  increase,
  removeItem,
} from "../features/cart/cartSlice"

import { Link } from "react-router-dom"

import { TbListDetails } from "react-icons/tb"
import { TbShoppingBagCheck } from "react-icons/tb"
import { MdDeleteOutline } from "react-icons/md"
import { FiMinus, FiPlus } from "react-icons/fi"

import { productQuantity, shortenText } from "../helpers/helper"

import styles from "./Card.module.css"

function Card({ data }) {
  const { id, title, image, price } = data

  const store = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  const quantity = productQuantity(store, id)

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
            <button onClick={() => dispatch(removeItem(data))}>
              <MdDeleteOutline />
            </button>
          )}

          {quantity >= 2 && (
            <button onClick={() => dispatch(decrease(data))}>
              <FiMinus />
            </button>
          )}

          <span>{!!quantity && quantity}</span>

          {quantity === 0 ? (
            <button onClick={() => dispatch(addItem(data))}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => dispatch(increase(data))}>
              <FiPlus />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
