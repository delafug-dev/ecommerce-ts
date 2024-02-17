import { useContext } from "react"
import { ProductoContext } from "../context/ProductsProvider"

export const useProduct = () => { 


    
    return useContext(ProductoContext)
}