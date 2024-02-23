import { useContext } from "react"
import { ProductoContext } from "../context/ProductoProvider";


export function useProducts() {
    const context = useContext(ProductoContext);

    if (!context) {
        throw new Error('useProducts debe usarse dentro de un ProductsProvider');
    }

    return context;
}