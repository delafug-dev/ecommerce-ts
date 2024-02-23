import { ReactNode, createContext, useEffect, useState } from "react";
import { Producto } from "../interfaces/producto-tienda";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


const ProductoContext = createContext<any>(null);


const ProductoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {            
            const resp = await axios.get('http://localhost:3000/products');
            setProductos(resp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async (id: string) => { 
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const newProduct = async (newProduct: Producto) => {
        try {
            const newId = uuidv4();
            const response = await axios.post('http://localhost:3000/products', { ...newProduct, id: newId });
            setProductos((prevProducts) => [...prevProducts, response.data]); 
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async (id: string, newProduct: Producto) => {
        try {
            await axios.put(`http://localhost:3000/products/${id}`, newProduct);
            setProductos(productos.map(producto => producto.id === id ? newProduct : producto));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProductoContext.Provider value={{productos, deleteProduct, newProduct, updateProduct}}>
            {children}
        </ProductoContext.Provider>
    );
};

export { ProductoProvider, ProductoContext}