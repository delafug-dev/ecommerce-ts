import { Producto } from "../../interfaces/producto-tienda";
import { useAuth } from "../../hooks/useAuth";
import { useCartProduct } from "../../hooks/useCartProduct";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import { ModalEditProduct } from "../edit-product/ModalEditProduct";

interface CardProps {
    producto: Producto;
    
}

export const Card: React.FC<CardProps> = ({producto}) => {

    const {title, description, price, image, id} = producto;
    const { user } = useAuth();
    const { deleteProduct } = useProducts();
    const [modalEditProduct, setModalEditProduct] = useState(false);

    const { addProductToCart, addProductTotalNumber } = useCartProduct();
    const navigate = useNavigate();
    const handleCardClick = () => {
        if(!user || !user.username || user.username.length === 0) {
            navigate('/login')
            return;
        }else {
            navigate(`/product/${id}`, { state: { from: location.pathname } });           
        }
        
    };

    const handleEditProduct = () => {
        setModalEditProduct(!modalEditProduct);
    }
    

  return (
      <div className="overflow-hidden shadow-sm">
          <a onClick={handleCardClick}
              href="#"
              className="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100"
          >
              <img
                  src={image}
                  loading="lazy"
                  alt="Photo by Austin Wade"
                  className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            {user && user.username && user.username.length > 0 &&
                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                                -50%
                </span>
            }
              
          </a>

          <div className="flex flex-col items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
              <div  onClick={handleCardClick} className="flex flex-col">
                  <a
                      href="#"
                      className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg truncate"
                  >
                      {title}
                  </a>
                  <div className="text-sm text-gray-500 lg:text-base max-h-[2.4em] overflow-hidden">
                        <p className="line-clamp-2">{description}</p>
                  </div>
              </div>

              <div className="flex flex-row items-center gap-3 mt-5">
                  <span className="font-bold text-gray-600 lg:text-lg">
                      {price}€
                  </span>
                  { user && user.username && user.username.length > 0 &&
                        <button onClick={() => {addProductToCart(producto); addProductTotalNumber()}} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded">
                            Añadir al carrito
                        </button>
                  }
                  
              </div>
                  { user.role === 'admin' && 
                    <div className="flex flex-row items-center gap-3 mt-5">
                        <button onClick={handleEditProduct} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded">
                                Editar Producto
                        </button>
                        <button onClick={() => deleteProduct(producto.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                Eliminar Producto
                        </button>
                    </div>
                  }
          </div>
                  {
                        modalEditProduct ? <ModalEditProduct toggleModal={handleEditProduct} producto={producto}/> : null
                  }
      </div>
  )
}
