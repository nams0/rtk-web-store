import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

import { PiShoppingCartSimpleBold } from "react-icons/pi"

import styles from "./Layout.module.css"

function Layout({ children }) {
  const store = useSelector((store) => store.cart)

  return (
    <>
      <header className={styles.header}>
        <Link to="/products">Nams0 Store</Link>
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!store.itemsCounter && <span>{store.itemsCounter}</span>}
          </div>
        </Link>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>Developed by Amirhossein with ❤️</p>
      </footer>
    </>
  )
}

export default Layout
