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


  const [cartProducts, setCartProduct] = useState<Producto[]>(() => {
      const storedCartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
      return storedCartProducts;
  });

  const [totalProductsNumber, setTotalProductsNumber] = useState<number>(cartProducts.reduce((acc, product) => acc + product.quantity, 0));

  useEffect(() => {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      console.log(cartProducts);
  }, [cartProducts]);
  
  const addProductTotalNumber = () => {
      setTotalProductsNumber(totalProductsNumber + 1);
  }

  const addProductToCart = (producto: Producto) => { 
      producto.quantity = 1;
      const productExist = cartProducts.find((product) => product.id === producto.id);
      if(productExist) {
          const newCart = cartProducts.map((product) => product.id === producto.id ? {...product, quantity: product.quantity + 1} : product);
          return setCartProduct(newCart);
      }
      setCartProduct([...cartProducts, {...producto, quantity: 1}]);
  }

    const finishPurchase = () => {
        alert('Redirigiendo a pasarela de pago...');
        setCartProduct([]);
        setTotalProductsNumber(0);
        window.location.pathname = '/';
    }

    const deletePurchase = () => {
        setCartProduct([]);
        setTotalProductsNumber(0);
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