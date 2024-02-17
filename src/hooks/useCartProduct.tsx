import { useContext } from "react"
import { CartProductsContext } from "../context/CartProducts"

export const useCartProduct = () => {
    return useContext(CartProductsContext)
}