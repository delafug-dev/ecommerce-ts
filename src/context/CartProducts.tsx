import { createContext, useEffect, useState } from "react";
import { Producto } from "../interfaces/producto-tienda";

interface CartProductsContextProps {
    cartProducts: Producto[];
    addProductToCart: (producto: Producto) => void;
    totalProductsNumber: number;
    addProductTotalNumber: () => void;
    finishPurchase: () => void;
    deletePurchase: () => void;
}


const CartProductsContext = createContext<CartProductsContextProps>({} as CartProductsContextProps);


const CartProductsProvider = ({ children }) => {


  const [cartProducts, setCartProduct] = useState<Producto[]>([]);

  const [totalProductsNumber, setTotalProductsNumber] = useState<number>(cartProducts.reduce((acc, product) => acc + (product.quantity ?? 0), 0));

  useEffect(() => {
      const itemsSaved = JSON.parse(localStorage.getItem('cartProducts') || '[]');
      itemsSaved && setCartProduct(itemsSaved);
      setTotalProductsNumber(itemsSaved.reduce((acc, product) => acc + product.quantity, 0));  
  }, []);
  
  const addProductTotalNumber = () => {
      setTotalProductsNumber(totalProductsNumber + 1);
  }

  const addProductToCart = (producto: Producto) => { 
      const productExist = cartProducts.find((product) => product.id === producto.id);
      if(productExist) {
          const newCart = cartProducts.map((product) => product.id === producto.id ? {...product, quantity: (product.quantity ?? 0) + 1} : product);
          setCartProduct(newCart)
          localStorage.setItem('cartProducts', JSON.stringify(newCart));
      }else {
            setCartProduct([...cartProducts, {...producto, quantity: 1}]);
            localStorage.setItem('cartProducts', JSON.stringify([...cartProducts, {...producto, quantity: 1}]));
      }
  }

    const finishPurchase = () => {
        alert('Redirigiendo a pasarela de pago...');
        localStorage.removeItem('cartProducts')
        setTotalProductsNumber(0);
        window.location.pathname = '/';
    }

    const deletePurchase = () => {
        localStorage.removeItem('cartProducts')
        setTotalProductsNumber(0);
        window.location.pathname = '/';
    }

  return (
      <CartProductsContext.Provider value={{
          cartProducts,
          addProductToCart,
          totalProductsNumber,
          addProductTotalNumber,
          finishPurchase,
          deletePurchase
      }}>
          {children}
      </CartProductsContext.Provider>
  );
}


export { CartProductsProvider, CartProductsContext }