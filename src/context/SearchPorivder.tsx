import { ReactNode, createContext, useState } from "react";
import { Producto } from "../interfaces/producto-tienda";
import { useProducts } from "../hooks/useProducts";


const SearchContext = createContext<any>(null);


const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [stateSearchProduct, setStateSearchProduct] = useState<Producto[]>([]);

    const producto = useProducts().products;

    const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const search = e.target.value;
        const filteredProductos = producto.filter((producto: Producto) => {
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