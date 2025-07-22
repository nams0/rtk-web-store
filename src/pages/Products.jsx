import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Card from "../components/Card"
import Loader from "../components/Loader"
import { fetchProducts } from "../features/product/productsSlice"

import {
  categoriseProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper"

import styles from "./Products.module.css"
import SearchBox from "../components/SearchBox"
import Sidebar from "../components/Sidebar"

function Products() {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState({})
  const [displayed, setDisplayed] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const { products, loading } = useSelector((store) => store.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    setDisplayed(products)
    setQuery(getInitialQuery(searchParams))
  }, [products])

  useEffect(() => {
    setSearchParams(query)
    setSearch(query.search || "")
    const searchedProducts = searchProducts(products, query.search)
    const categorisedProducts = categoriseProducts(
      searchedProducts,
      query.category
    )
    setDisplayed(categorisedProducts)
  }, [query])

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />

      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  )
}

export default Products
