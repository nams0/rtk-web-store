import { createQueryObject } from "../helpers/helper"
import { categories } from "../constants/list"

import { FaListUl } from "react-icons/fa"

import styles from "./Sidebar.module.css"

function Sidebar({ query: { category }, setQuery }) {
  const categoryHandler = ({ tagName, innerText }) => {
    if (tagName !== "LI") return
    const category = innerText.toLowerCase()
    setQuery((query) => createQueryObject(query, { category }))
  }

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={(e) => categoryHandler(e.target)}>
        {categories.map((item) => (
          <li
            key={item.id}
            className={
              item.type.toLocaleLowerCase() === category ||
              (!category && item.type === "All")
                ? styles.selected
                : null
            }
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
