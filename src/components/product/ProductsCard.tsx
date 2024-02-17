import { useProduct } from "../../hooks/useProduct";
import { useSearch } from "../../hooks/useSearch";
import { Producto } from "../../interfaces/producto-tienda";
import { Card } from "./Card";


export const ProductsCard = () => {

  const { stateSearchProduct } = useSearch();
  const products = useProduct();
  const productos = products[0].producto as Producto[];

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
      </div>
    </div>
  );
}
