import BasketCard from "../components/BasketCard"
import BasketSidebar from "../components/BasketSidebar"
import { MdRemoveShoppingCart } from "react-icons/md"

import { useSelector } from "react-redux"

import styles from "./CheckoutPage.module.css"

function CheckoutPage() {
  const store = useSelector((store) => store.cart)
  console.log(store)

  if (!store.itemsCounter)
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
      <BasketSidebar store={store} />
      <div className={styles.products}>
        {store.selectedItems.map((product) => (
          <BasketCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default CheckoutPage
