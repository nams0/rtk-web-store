import { createContext, useContext, useEffect, useState } from "react"
import api from "../services/config"

const ProductContext = createContext()

function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(await api.get("/products"))
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchProducts()
  }, [])
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  )
}

const useProducts = () => {
  const products = useContext(ProductContext)
  return products
} //custom hook

const useProductsDetails = (id) => {
  const products = useContext(ProductContext)
  const result = products.find((product) => product.id === id)
  return result
} //custom hook

export default ProductProvider
export { useProducts, useProductsDetails }
