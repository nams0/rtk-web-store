import BasketCard from "../components/BasketCard"
import BasketSidebar from "../components/BasketSidebar"
import { MdRemoveShoppingCart } from "react-icons/md"

import { useCart } from "../context/CartProvider"

import styles from "./CheckoutPage.module.css"

function CheckoutPage() {
  const [state, dispatch] = useCart()
  if (!state.itemsCounter)
    return (
      <div className={styles.emptycontainer}>
        <div className={styles.empty}>
          <h1>Cart is empty !</h1>
          <MdRemoveShoppingCart />
        </div>
      </div>
    )

  return (
    <div className={styles.container}>
      <BasketSidebar state={state} dispatch={dispatch} />
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard key={product.id} product={product} dispatch={dispatch} />
        ))}
      </div>
    </div>
  )
}

export default CheckoutPage
