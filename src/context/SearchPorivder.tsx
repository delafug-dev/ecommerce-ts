import { ReactNode, createContext, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { Producto } from "../interfaces/producto-tienda";


const SearchContext = createContext<any>(null);


const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [stateSearchProduct, setStateSearchProduct] = useState<Producto[]>([]);

    const producto = useProduct();
    const productos = producto[0].producto;

    const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const search = e.target.value;
        const filteredProductos = productos.filter((producto: Producto) => {
          return producto.title.toLowerCase().includes(search.toLowerCase());
        });
        setStateSearchProduct(filteredProductos);
    };

    return (
        <SearchContext.Provider value={{
            searchProduct,
            stateSearchProduct,
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchProvider, SearchContext}