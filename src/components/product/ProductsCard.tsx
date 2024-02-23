import { useProducts } from "../../hooks/useProducts";
import { useSearch } from "../../hooks/useSearch";
import { Producto } from "../../interfaces/producto-tienda";
import { Card } from "./Card";
import { Modal } from '../new-product/Modal';
import { useState } from "react";


export const ProductsCard = () => {

  const { stateSearchProduct } = useSearch();
  const {productos} = useProducts();
  console.log(productos)

  const [modalHidden, setModalHidden] = useState(true);
  const toggleModal = () => setModalHidden(!modalHidden);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
          { stateSearchProduct.length > 0 ?
            stateSearchProduct.map((producto: Producto) => (
              <Card key={producto.id} producto={producto} />
              ))
            :
              productos.map((producto) => (
                <Card key={producto.id} producto={producto} />
              ))
          }

        </div>

          <div className="flex justify-end mt-14">
            <button onClick={toggleModal} className="py-2 px-6 uppercase bg-blue-500 hover:bg-blue-700 text-white text-xl rounded-md ">
              Add Product
            </button>
            {
              modalHidden ? null : <Modal toggleModal={toggleModal}/>
            }
          </div>

      </div>
    </div>
  );
}
