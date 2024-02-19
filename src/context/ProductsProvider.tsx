import data from "../../data/db.json";
import { ReactNode, createContext } from "react";


const ProductoContext = createContext<any>(null);

const updatedData = data.products.map((producto) => ({
    ...producto,
    quantity: 0, 
}));


const ProductoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    

    return (
        <ProductoContext.Provider value={[{ producto: updatedData }]}>
            {children}
        </ProductoContext.Provider>
    );
};

export { ProductoProvider, ProductoContext}