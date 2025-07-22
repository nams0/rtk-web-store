import { TbError404 } from "react-icons/tb"

import styles from "./PageNotFound.module.css"

import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.notfound}>
        <TbError404 />
        <h1>Page Not Found !</h1>
      </div>
      <Link to="/products">Back to Home</Link>
    </div>
  )
}

export default PageNotFound
